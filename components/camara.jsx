import React, { useState, useEffect } from 'react';
import { Camera, CameraType } from 'expo-camera';
import { Button, StyleSheet, Text, TouchableOpacity, View, Dimensions, Image, Modal  } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';

const { width, height } = Dimensions.get('window');

export default function Camara() {
  const [type, setType] = useState(CameraType.front);
  const [permission, requestPermission] = Camera.useCameraPermissions();
  const [hora, sethora] = useState("");
  const [fecha, setfecha] = useState("Lunes 20 de Septiembre");
  const [modalVisible, setModalVisible] = useState(false);
  const navigation = useNavigation();
  useEffect(() => {
    requestPermission();
    console.log(hora)
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
        >
        </Camera>
      </View>
            <TouchableOpacity  onPress={() => {setModalVisible(true)}}>
              <LinearGradient colors={['#E53854', '#E53854']} style={styles.boton}> 
                  <Text style={{ textAlign: 'center', color: "white", fontSize:18 }}>Tomar foto</Text>
              </LinearGradient>
            </TouchableOpacity>
      </LinearGradient>

      {/* modal para confirmar marcaje de asisatencia  */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
      
      >
        <View style={{ flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "rgba(0,0,0,0.5)" }}>
          <View style={{ backgroundColor: "#292937", width: width * 0.8,  borderRadius: 20, padding: 20 }}>
            <Text style={{ textAlign: "center", fontSize: 20, color:"white" }}>Asistencia Marcada</Text>
            <TouchableOpacity  style={[styles.boton,  {backgroundColor:"#E53854"}]} onPress={() => {setModalVisible(!modalVisible);}}>
                <Text style={{ textAlign: 'center', color: "white", fontSize: 18 }}>Aceptar</Text>
            </TouchableOpacity>
              
           
          </View>
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
