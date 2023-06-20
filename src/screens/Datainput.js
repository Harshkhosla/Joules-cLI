import React from 'react';
import Header from '../components/Header';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { SafeAreaView, StyleSheet, Alert } from 'react-native';
import Button from '../components/Button';
import Newbutton from '../components/Newbutton';
import Background from '../components/Background';
import TextInput from '../components/TextInput';
import BackButton from '../components/BackButton';
import { useDispatch, useSelector } from 'react-redux';
import { setName } from '../Redux/Action';
import { Text, View, Image, Linking, Dimensions } from 'react-native';
import Loadcomponent from '../components/Loadcomponent';
import { log } from 'react-native-reanimated';

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

export default function Datainput({ navigation }) {
  const dispatch = useDispatch();
  const [text, onChangeText] = React.useState('');

  const OnClick = () => {
    // const sample = text / 0.22;
    // const house_voltage = Math.floor(sample);

    // if (text < '10') {
    //   Alert.alert('Alert Title', 'Connect to the nearest Discom', [
    //     {
    //       text: 'Cancel',
    //       onPress: () => console.log('Cancel Pressed'),
    //       style: 'cancel',
    //     },
    //     { text: 'OK', onPress: () => console.log('OK Pressed') },
    //   ]);
    // } else {
      // dispatch(setName(house_voltage));
      navigation.navigate('Load');
    // }
  };

  return (
    <Background>
      <View>
        <Image source={require('../assets/jouls.png')} style={styles.image} />
      </View>
      <BackButton goBack={navigation.goBack} />
      <View>
        <Image source={require('../assets/charger1.png')} style={styles.images} />
      </View>
      <Header style={styles.header}>
        To improve your experience, we kindly request your input through a short questionnaire. 
        {'\n'}{'\n'}
        It does not require any personal information and will greatly assist us in understanding your specific needs and preferences.
      </Header>

      <Newbutton mode="contained" onPress={OnClick}>
        Okay 
      </Newbutton>
    </Background>
  );
}

const styles = StyleSheet.create({
  input: {
    height: screenHeight * 0.1,
    width: screenWidth * 0.8,
    margin: screenHeight * 0.02,
    borderWidth: 1,
    padding: 10,
    color: 'black',
  },
  header: {
    fontSize: screenWidth * 0.048,
    color: 'black',
    marginTop: screenHeight * -0.35,
    // marginBottom: screenHeight * 0.05,
    marginHorizontal: screenWidth * -0.05,
    // textAlign: 'center',
    fontWeight: 'bold',
  },
  image: {
    width: screenWidth * 0.24,
    height: screenHeight * 0.07,
    marginTop: screenHeight * -0.39,
    // marginBottom: screenHeight * 0.1,
    alignSelf: 'center',
  },
  images: {
    width: screenWidth * 0.45,
    height: screenWidth * 0.45,
    top: screenHeight * 0.36,
    right: screenWidth * -0.275,
    alignSelf: 'center',
  },
});