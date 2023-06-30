import React from 'react';
import Header from '../components/Header';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { SafeAreaView, StyleSheet, Alert, Dimensions } from 'react-native';
import Button from '../components/Button';
import Background from '../components/Background';
import Loadinput from '../components/Loadinput';
import BackButton from '../components/BackButton';
import { useDispatch, useSelector } from 'react-redux';
import { setLoad } from '../Redux/Action';
import Logo from '../components/Logo';
import Loadcomponent from '../components/Loadcomponent';
import EvCharging from '../components/EvCharging';
import Loago1 from '../components/Loago1';
import { Text, View, Image, Linking } from 'react-native';

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

export default function Load({ navigation }) {
  const dispatch = useDispatch();
  const [text, onChangeText] = React.useState('');

  const OnClick = () => {
    console.log(text);
    const sample = text / 0.22;
    const house_voltage = Math.floor(sample);
    if (text < "10") {
      Alert.alert('Alert Title', 'Connect to the nearest Discom', [
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        { text: 'OK', onPress: () => console.log('OK Pressed') },
      ]);
    } else {
      dispatch(setLoad(house_voltage));
      navigation.navigate('Eligible');
    }
  }

  return (
    <Background>
      <BackButton goBack={navigation.goBack} />
      <View style={styles.logoContainer}>
        <Image
          source={require('../assets/jouls.png')}
          style={styles.logo}
        />
      </View>

      <Header style={styles.header}>
        What is the maximum electrical sanctioned {'\n'} load of your home ?
      </Header>

      <Loadinput
        label="Enter electrical sanctioned load"
        style={styles.input}
        onChangeText={onChangeText}
        value={text}
        keyboardType="numeric"
      />

      <View style={styles.imageContainer}>
        <Image
          source={require('../assets/charger1.png')}
          style={styles.image}
        />
      </View>

      <View style={styles.imageContainer}>
        <Image
          source={require('../assets/Untitled.png')}
          style={styles.image1}
        />
      </View>
      
    </Background>
  );
}

const styles = StyleSheet.create({
  logoContainer: {
    alignItems: 'center',
    marginTop: screenHeight * 0.04,
  },
  logo: {
    width: screenWidth * 0.3,
    height: screenHeight * 0.05,
    marginTop: screenHeight * -0.02,
    top:screenHeight * 0.025,
  },
  header: {
    fontSize: 25,
    fontWeight: 'bold',
    color: 'black',
    textAlign: 'center',
    marginTop: screenHeight * 0.45,
     marginBottom: screenHeight * 0.03,
  },
  input: {
    height: screenHeight * 0.065,
    width: screenWidth * 0.8,
    marginTop: screenHeight * 0.0002,
    // borderWidth: 1,
    // padding: 10,
    color: '#F2F3F8',
  },
  imageContainer: {
    alignItems: 'center',
    marginTop: screenHeight * 0.01,
  },
  image: {
    width: screenWidth * 0.5,
    height: screenWidth * 0.5,
    marginTop: screenHeight * 0.006,
    marginLeft: screenWidth * 0.49,
    right: screenWidth * -0.08,
  },
  image1: {
    width: screenWidth * 0.7,
    height: screenWidth * 0.8,
    marginTop: screenHeight * -0.92,
    marginBottom: screenHeight * 0.52,
    paddingBottom: screenHeight * 0.21,
  },
});