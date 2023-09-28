import React, { useState, useEffect } from 'react';
import { Camera, CameraType } from 'expo-camera';
import { Button, StyleSheet, Text, TouchableOpacity, View, Dimensions, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const { width, height } = Dimensions.get('window');

export default function Camara() {
  const [type, setType] = useState(CameraType.front);
  const [permission, requestPermission] = Camera.useCameraPermissions();
  const [hora, sethora] = useState("08:40");
  const navigation = useNavigation();
  useEffect(() => {
    requestPermission(); 
    console.log(hora)
  },[]);
  

  if (!permission) {
    // Camera permissions are still loading
    return <View />;
  }

  if (!permission.granted) {
    return (
      <View style={{backgroundColor: "black", flex: 1, justifyContent:"center", alignContent:"center"}}>
      <Image source={{uri: 'https://i.gifer.com/8Etj.gif'}} style={{width: 200, height: 200, alignSelf:"center"}}/>
     <Text style={{ textAlign: 'center',  color:"white"}}>Necesitamos permiso para la cámara</Text>
     <TouchableOpacity style={styles.boton} onPress={requestPermission }>
         {
             !permission.granted ? <Text style={{ textAlign: 'center',  color:"white"}}>Dar permiso</Text> : <Text style={{ textAlign: 'center',  color:"white"}}>Ya tienes permiso</Text>
         }
     </TouchableOpacity>
     </View>
    )
  }

  return (
    <View style={styles.container}>
      <Camera style={styles.camera} type={type}>
        <View style={{justifyContent:"center"}} >
          <Text style={{ alignSelf:"center", marginTop: 90, color:"white", textShadowColor: 'black', textShadowOffset: { width: 2, height: 2 }, textShadowRadius: 3 }}> 28 Septiembre 2023</Text>
          <Text style={{ color: 'white', fontSize: 40, fontWeight:"bold", textShadowColor: 'black', textShadowOffset: { width: 2, height: 2 }, textShadowRadius: 3}}>{hora} {"pm"}</Text>
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} >
            <Text style={styles.text}>Marcar </Text>
          </TouchableOpacity>
        </View>
      </Camera>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  camera: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
    marginTop: height*0.70,
    opacity: 0.5,
  },
  button: {
    flex: 1,
    alignSelf: 'flex-end',
    backgroundColor: 'transparent',
    alignItems: 'center',
    margin: 50,
    padding: 5,
    height: 50,
    borderRadius: 20,
    borderColor: 'gray',
    borderWidth: 2,
    
  },
  text: {
    fontSize: 22,
    fontWeight: 'bold',
    color: 'white',
  },
  boton:{
    alignSelf: 'center',
    justifyContent: 'center',
    backgroundColor: '#C91503',
    margin: 20,
    width: width*0.3,
    height: 50,
    borderRadius: 20,
}
});
