import React, { useState, useEffect } from 'react';
import Animated, {
    useSharedValue,
    withTiming,
    useAnimatedStyle,
    Easing,
  } from 'react-native-reanimated';
  import { Camera, CameraType } from 'expo-camera';
  import { Button, StyleSheet, Text, TouchableOpacity, View, Dimensions } from 'react-native';
  
  const { width, height } = Dimensions.get('window');

  export default function PermisoCamara() {
    const [type, setType] = useState(CameraType.back);
    const [permission, requestPermission] = Camera.useCameraPermissions();

    const randomWidth = useSharedValue(10);

    // modificar randomWidth para que sea un valor entre 0 y 350 automaticamente cada 2 segundos
    useEffect(() => {
        const interval = setInterval(() => {
            randomWidth.value = Math.random() * 350;
        }
        , 1000);
        return () => clearInterval(interval);
    }, []);


  
    const config = {
      duration: 500,
      easing: Easing.bezier(0.5, 0.01, 0, 1),
    };
  
    const style = useAnimatedStyle(() => {
      return {
        width: withTiming(randomWidth.value, config),
        height: withTiming(randomWidth.value, config),
      };
    });
  
    return (
      <View style={styles.container}>
        <Animated.View style={[styles.box, style]} />
        <Button
          title="toggle"
          onPress={() => {
            randomWidth.value = Math.random() * 350;
          }}
        />
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
    },
    box: {
      width: 100,
      height: 80,
      backgroundColor: 'red',
      margin: 30,
    },
  });
  