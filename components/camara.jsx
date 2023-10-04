import React, { useState, useEffect } from 'react';
import { Camera, CameraType } from 'expo-camera';
import { Button, StyleSheet, Text, TouchableOpacity, View, Dimensions, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const { width, height } = Dimensions.get('window');

export default function Camara() {
  const [type, setType] = useState(CameraType.front);
  const [permission, requestPermission] = Camera.useCameraPermissions();
  const [hora, sethora] = useState("");
  const [fecha, setfecha] = useState("Lunes 20 de Septiembre");
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
        <View >
        <Text style={styles.fecha}>{fecha}</Text>
       <Text style={styles.hora}>{hora}</Text>
        </View>
      <View style={{ marginHorizontal: 10, borderRadius: 30, overflow: 'hidden' }}>
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
        <TouchableOpacity style={styles.boton} >
          <Text style={{ textAlign: 'center', color: "white", fontSize:20 }}>Marcar</Text>
        </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: "#28233F"
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
    marginBottom: 10
  },
  boton: {
    backgroundColor: "#4C4BF1",
    justifyContent: "center",
    height: 50,
    marginHorizontal: 100,
    marginVertical: 10,
    padding: 10,
    borderRadius: 50
  }
  
});
