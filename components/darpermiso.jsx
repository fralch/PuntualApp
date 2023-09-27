import React, { useState, useEffect } from 'react';
import { Camera, CameraType } from 'expo-camera';
import { Button, StyleSheet, Text, TouchableOpacity, View, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

export default function PermisoCamara() {
    const [type, setType] = useState(CameraType.back);
    const [permission, requestPermission] = Camera.useCameraPermissions();

    

    return (
        <View style={styles.container}>
        <Text style={{ textAlign: 'center' }}>We need your permission to show the camera</Text>
        <TouchableOpacity style={styles.boton} onPress={requestPermission}>
            <Text style={styles.text}>Grant Permission</Text>
        </TouchableOpacity>

        </View>
      );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      backgroundColor: '#000',
    },
    // crear boton circular
    boton:{
        backgroundColor: 'red',
        padding: 20,
        margin: 20,
        width: height / 6,
        height: height / 6,
        borderRadius: (height / 6) / 2,
    }
});