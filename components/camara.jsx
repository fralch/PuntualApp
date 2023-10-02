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
       <View style={{ marginHorizontal: 10, }}>
            <Camera style={{ height: height * 0.72 }}  >

            </Camera>
          </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
 
  
});
