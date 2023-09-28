import React, { useState, useEffect } from 'react';
import { Camera, CameraType } from 'expo-camera';
import { Button, StyleSheet, Text, TouchableOpacity, View, Dimensions, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const { width, height } = Dimensions.get('window');

export default function Camara() {
  const [type, setType] = useState(CameraType.back);
  const [permission, requestPermission] = Camera.useCameraPermissions();
  const navigation = useNavigation();
  useEffect(() => {
    requestPermission();
  },[]);
  

  if (!permission) {
    // Camera permissions are still loading
    return <View />;
  }

  if (!permission.granted) {
    // Permissions are granted
    // Start the camera preview
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

  function toggleCameraType() {
    setType(current => (current === CameraType.back ? CameraType.front : CameraType.back));
  }

  return (
    <View style={styles.container}>
      <Camera style={styles.camera} type={type}>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={toggleCameraType}>
            <Text style={styles.text}>Flip Camera</Text>
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
  },
  buttonContainer: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: 'transparent',
    margin: 64,
  },
  button: {
    flex: 1,
    alignSelf: 'flex-end',
    alignItems: 'center',
  },
  text: {
    fontSize: 24,
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
