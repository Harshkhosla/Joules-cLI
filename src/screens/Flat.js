import React, { useState } from 'react';
import { View, ScrollView, Image ,Dimensions } from 'react-native';
import { RadioButton } from 'react-native-paper';
import Background from '../components/Background';
import BackButton from '../components/BackButton';
import Logo from '../components/Logo';
import Header from '../components/Header';
import Button from '../components/Button';
import { emailValidator } from '../helpers/emailValidator';
import Elegiblity from '../components/Elegiblity';
import { setFlat } from '../Redux/Action';
import { useDispatch, useSelector } from 'react-redux';
import { Click } from '../Redux/Action';
import EvCharging from '../components/EvCharging';
import { StyleSheet } from 'react-native';



const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;


export default function Flat({ navigation }) {
  const imagesAllData = useSelector((state) => state?.userReducers);
  console.log(imagesAllData);

  const [value, setValue] = useState('');
  const dispatch = useDispatch();
  const sendResetPasswordEmail = () => {
    console.log(value);
    dispatch(setFlat(value));
    dispatch(Click(imagesAllData));
    navigation.navigate('HomePage');
  };

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
      <Background>
        <Logo  />
        <BackButton goBack={navigation.goBack} />
        <Elegiblity  />
        <Header >Where do You live?</Header>
        <View>
          <RadioButton.Group onValueChange={(value) => setValue(value)} value={value}>
            <RadioButton.Item label="Apartments" value="Apartments" />
            <RadioButton.Item label="Individual House" value="Individual House" />
          </RadioButton.Group>
        </View>

        <Button mode="contained" onPress={sendResetPasswordEmail} style={{ marginTop: 10 }}>
          Done
        </Button>
        {/* <EvCharging /> */}
        {/* <View>
        <Image source={require('../assets/charger1.png')} style={styles.images} />
      </View> */}
      </Background>
    </ScrollView>
  );
}
const styles = StyleSheet.create({


image: {
  width: screenWidth * 0.24,
  height: screenHeight * 0.07,
  top: screenHeight * 0.006,
  alignSelf: 'center',
},
});