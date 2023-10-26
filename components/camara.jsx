import React, { useState, useEffect , useRef} from 'react';
import { Camera, CameraType } from 'expo-camera';
import { Button, StyleSheet, Text, TouchableOpacity, View, Dimensions, Image, Modal, TextInput , Alert,ActivityIndicator  } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { getSesion, storeSesion, removeSesion } from '../hooks/handleSession.js';
import { LinearGradient } from 'expo-linear-gradient';

const { width, height } = Dimensions.get('window');

export default function Camara() {
  const [type, setType] = useState(CameraType.front);
  const [permission, requestPermission] = Camera.useCameraPermissions();
  const [hora, sethora] = useState("");
  const [fecha, setfecha] = useState("Lunes 20 de Septiembre");
  const [modalVisible, setModalVisible] = useState(false);
  const [modalDNI, setModalDNI] = useState(false);
  const [sesion, setSesion] = useState(null);
  const [loading, setLoading] = useState(false);
  const [mensajeRetorno, setMensajeRetorno] = useState("");
  const navigation = useNavigation();
  const camaraRef = useRef(null);

  useEffect(() => {
    requestPermission();
  }, []);

  useEffect(() => {
    getSesion()
    .then((data) => {
      if (data == null) {
        console.log(`get sesion ${data}`);
        setModalDNI(true);
      }
      else {
        setSesion(JSON.parse(data));
        console.log(`sesion obtenida sesion ${data}`);
      }
    });
  }, []);

  useEffect(() => {
    const fecha_actual = new Date();
    const dia = fecha_actual.getDay();
    const mes = fecha_actual.getMonth();
    const ano = fecha_actual.getFullYear();

    const meses = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio","Agosto","Septiembre","Octubre","Noviembre","Diciembre"];

    setfecha(` ${fecha_actual.getDate()} de ${meses[mes]} del ${ano}`);
  }, []);


  if (!permission) {
    // Camera permissions are still loading
    return <View />;
  }

  if (!permission.granted) {
    return (
      <View style={{ backgroundColor: "black", flex: 1, justifyContent: "center", alignContent: "center" }}>
        <Image source={{ uri: 'https://i.gifer.com/8Etj.gif' }} style={{ width: 200, height: 200, alignSelf: "center" }} />
        <Text style={{ textAlign: 'center', color: "white" }}>Necesitamos permiso para la cámara</Text>
        <TouchableOpacity style={styles.boton} onPress={requestPermission}>
          {
            !permission.granted ? <Text style={{ textAlign: 'center', color: "white" }}>Dar permiso</Text> : <Text style={{ textAlign: 'center', color: "white" }}>Ya tienes permiso</Text>
          }
        </TouchableOpacity>
      </View>
    )
  }
  const guardarContras = () => {
    storeSesion(sesion)
      .then(() => {
        // setModalDNI(false);
      });
  }

  const borrarSession = () => {
      removeSesion()
      .then(() => {
        setSesion(null);
        setModalDNI(true);
        getSesion()
          .then((data) => {
            console.log(`datos de la sesion ${data}`);
          });
        
      });
  }
  const tomarFoto = async () => {
    const foto = await camaraRef.current.takePictureAsync();
    setLoading(true);
    const formData = new FormData();
    formData.append('dni', sesion.dni);
    formData.append('foto', {
      uri: foto.uri,
      type: 'image/jpeg',
      name: 'foto.jpg',
    });

    const response = await fetch('http://192.168.1.26:3000/registro_asistencias', {
      method: 'POST',
      body: formData,
    });

    const data = await response.json();
    console.log(data);
    setMensajeRetorno(data.message ? data.message : data.error);
    setLoading(false);
    setModalVisible(true);
  
  }


  return (
    
    <View style={styles.container}> 
      <LinearGradient colors={['#18191c', '#2F2E3C']} style={{flex:1, paddingTop:60}} 
      start={{ x: 0.9, y: 1}} end={{ x: 0.1, y: 1 }}
       >
        <View  style={styles.fecha_completa}>
          <Text style={styles.fecha}>{fecha}</Text>
          <Text style={styles.hora}>{hora}</Text>
          <Text style={{color:"white", alignSelf:"center", marginVertical:0}}>Total min tarde: 12</Text>
        </View>
      <View style={{ marginHorizontal: 10, borderRadius:50, overflow: 'hidden' }}>
        <Camera style={{ height: height * 0.70 }}  
          type={type}
          onCameraReady={() => {
            setInterval(() => {
              sethora(new Date().toLocaleTimeString())
            }, 1000)
          }}
          ref={camaraRef}
        >
        </Camera>
      </View>
            <TouchableOpacity  onPress={() => {
              tomarFoto();
             
              
            }}>
              <LinearGradient colors={['#E53854', '#E53854']} style={styles.boton}> 
                  <Text style={{ textAlign: 'center', color: "white", fontSize:18 }}>Tomar foto</Text>
              </LinearGradient>
            </TouchableOpacity>
      </LinearGradient>

      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
      
      >
        <View style={{ flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "rgba(0,0,0,0.5)" }}>
          <View style={{ backgroundColor: "#292937", width: width * 0.8,  borderRadius: 20, padding: 20 }}>
            <Text style={{ textAlign: "center", fontSize: 20, color:"white" }}>{mensajeRetorno}</Text>
            <TouchableOpacity  style={[styles.boton,  {backgroundColor:"#E53854"}]} onPress={() => {setModalVisible(!modalVisible);}}>
                <Text style={{ textAlign: 'center', color: "white", fontSize: 18 }}>Aceptar</Text>
            </TouchableOpacity>
              
           
          </View>
        </View>
      </Modal>
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalDNI}
      
      >
        <View style={{ flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "rgba(0,0,0,0.5)" }}>
          <View style={{ backgroundColor: "#292937", width: width * 0.8, borderRadius: 20, padding: 20 }}>
            <TextInput style={{ textAlign: "center", borderBottomColor: 'white', borderBottomWidth: 1, marginTop: 20, marginBottom: 20, height: 40, fontSize: 20, color: "white"
           }} placeholder="Ingrese su DNI" placeholderTextColor="white" keyboardType="numeric" maxLength={8} onChangeText={(text) => {setSesion({ dni: text });}}/>
            <TouchableOpacity  style={[styles.boton,  {backgroundColor:"#E53854"}]} onPress={
              () => {
                console.log(JSON.stringify(sesion));
                storeSesion(JSON.stringify(sesion))
                  .then(() => {
                    setModalDNI(false);
                  });
              }
            }>
                <Text style={{ textAlign: 'center', color: "white", fontSize: 18 }}>Guardar</Text>
            </TouchableOpacity>
              
           
          </View>
        </View>
      </Modal>
      <Modal 
        animationType="fade"
        transparent={true}
        visible={loading}
      >
        <View style={{ flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "rgba(0,0,0,0.5)" }}>
            <ActivityIndicator size="large" color="#E53854" />
            <Text style={{ textAlign: "center", fontSize: 20, color:"white" }}>Cargando...</Text>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  fecha: {
    color: "white",
    fontSize: 15,
    textAlign: "center",
  },
  hora: {
    color: "white",
    fontSize: 40,
    textAlign: "center",
  },
  boton: {
    backgroundColor: "#292937",
    justifyContent: "center",
    height: 60,
    marginHorizontal: 80,
    marginVertical: 10,
    padding: 10,
    borderRadius: 50
  }, 
  fecha_completa:{
    marginHorizontal:30, 
    marginBottom:15,
    padding:5, 
    borderRadius:20,
   
  }
  
});
