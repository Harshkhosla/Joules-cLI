import { View, Text, StatusBar } from 'react-native';
import React, { useCallback } from 'react';
import { useNavigation, useFocusEffect, useIsFocused } from '@react-navigation/native';
import Logo from '../components/Logo';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Splash = () => {
  const navigation = useNavigation();
  const isFocused = useIsFocused();

  useFocusEffect(
    useCallback(() => {
      const getData = async () => {
        const email = await AsyncStorage.getItem('Authtoken');
        console.log(email);
        if (email !== null) {
          navigation.navigate('Home');
        } else {
          navigation.navigate('LoginScreen');
        }
      };

      setTimeout(() => {
        getData();
      }, 1000);

      return () => {
        // Clean up the effect when the component is unfocused or unmounted
      };
    }, [navigation])
  );

  return (
    <>
      <StatusBar
        animated={true}
        backgroundColor="#FFFFFF"
        barStyle="light-content"
      />
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: '#FFFFFF',
        }}
      >
        <View
          style={{
            alignItems: 'center',
            justifyContent: 'center',
            width: 200,
            height: 200,
            borderRadius: 200,
            backgroundColor: '#FFFFFF',
          }}
        >
          <Logo />
        </View>
      </View>
    </>
  );
};

export default Splash;
