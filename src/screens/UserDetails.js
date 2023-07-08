import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity, TextInput, Dimensions, Text, Image } from 'react-native';
import Background from '../components/Background';
import Header from '../components/Header';
import Button from '../components/Button';
import BackButton from '../components/BackButton';
import { useDispatch, useSelector } from 'react-redux';
import { UpdatName, loginuser } from '../Redux/Action';
import Logo from '../components/Logo';


const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;
export default function UserDetails({ navigation }) {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState({
    name: '',
    password: '',
  });
  console.log(data);

  const Porduct_Key = useSelector(state => state?.userReducers?.setProductkey)
  const id = useSelector(state => state?.userReducers?.Product?._id)
  console.log(id);

  const onConnect = async () => {
    try {
      const response = await fetch('http://192.168.4.1/');
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const responseData = await response.text();

      // const parsedResponse = parse(responseData);
      // const messageElement = parsedResponse.querySelector('h1');
      // const message = messageElement?.text || '';
      console.log(responseData);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const saveData = async (data) => {

    const { name, password } = data;

    // Perform input validation
    // if (name.trim() === '' || password.trim() === '') {
    //   // Display an error or show a toast message indicating that the input is empty
    //   return;
    // }

    try {
      const response = await fetch(
        `http://192.168.4.1/?username=${name}&password=${password}&`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            name,
            password,
          }),
        }
      );

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      hit();
      navigation.navigate('Clamp');

      const result = await response.text();
      console.log(result);
      // Additional logic with the result
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const hit = () => {
    dispatch(UpdatName(Porduct_Key, id));
  }
  return (
    <Background>
      <BackButton />
      <Logo></Logo>
      <Header style={styles.header}>Add to your Wifi network</Header>
      <View>
        {/* <Image
          style={styles.image}
        /> */}
        <View >
          <Text style={styles.inputtext}>
          Connect the charger to your wifi network to control it remotely
          </Text>
        </View>
      </View>
      <View style={styles.overlayed}></View>
      <View>
        {/* Add circular rectangular TextInput components */}
        <View style={styles.circularInputContainer1}>
          <TextInput
            style={styles.circularInput}
            placeholder="SSID"
            placeholderTextColor="#CCCCCC"
            name="name"
            value={data.name}
            onChangeText={(txt) => setData((prevData) => ({ ...prevData, name: txt }))} />
        </View>
        <View style={styles.circularInputContainer2}>
          <TextInput
            style={styles.circularInput}
            placeholder="Password"
            placeholderTextColor="#CCCCCC"
            name="password"
            value={data.password}
            onChangeText={(txt) => setData((prevData) => ({ ...prevData, password: txt }))}
          />
        </View>
        <TouchableOpacity
          style={styles.changeButton}
          onPress={saveData}
        >
          <Text style={styles.changeButtonText}>Add</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.changeButton1}
          onPress={() => navigation.navigate('Navbar')}
        >
          <Text style={styles.changeButtonText}>Skip</Text>
        </TouchableOpacity>
      </View>
    </Background>
  );
}

const styles = StyleSheet.create({
  circularInputContainer1: {
    borderWidth: 3,
    borderColor: '#CCCCCC',
    borderRadius: 20,
    width: screenWidth * 0.8,
    height: screenHeight * 0.07,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: screenHeight * -0.5,
    top: screenHeight * 0.38,

  },
  circularInputContainer2: {
    borderWidth: 3,
    borderColor: '#CCCCCC',
    borderRadius: 20,
    width: screenWidth * 0.8,
    height: screenHeight * 0.07,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: screenHeight * 0.06,
    top: screenHeight * 0.37

  },
  circularInput: {
    width: '80%',
    height: '80%',
    fontSize: 16,
    color:"black"

  },
  changeButton: {
    borderWidth: 2,
    borderColor: '#118615',
    borderRadius: 30,
    width: screenWidth * 0.4,
    height: screenHeight * 0.06,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: screenHeight * 0.13,
    marginLeft: screenWidth * 0.18,
    top: screenHeight * 0.33
  },
  changeButton1: {
    borderWidth: 2,
    borderColor: '#118615',
    borderRadius: 30,
    width: screenWidth * 0.4,
    height: screenHeight * 0.06,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: screenHeight * 0.07,
    marginLeft: screenWidth * 0.18,
    top: screenHeight * 0.3
  },
  changeButtonText: {
    fontSize: screenWidth * 0.04,
    // fontWeight: 'bold',
    color: 'black',
  },
  sample: {
    fontSize: screenWidth * 0.05,
    fontWeight: 'bold',
    paddingVertical: screenHeight * 0.012,
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputtext: {
    fontSize: screenWidth * 0.052,
    marginTop: screenHeight * -0.32, // Adjust the marginTop value as per your requirement
    textAlign: 'center', // Align the text in the center
    color: 'black',
    fontWeight: 'bold',
  },
  
  header: {
    fontSize: screenWidth * 0.05,
    fontWeight: 'bold',
    color: 'black',
    marginTop: screenHeight * 0.13,
    marginBottom: screenHeight * 0.06,
    top: screenHeight * -0.34,
  },



  next: {
    borderRadius: screenWidth * 0.03,
    backgroundColor: 'green',
    marginTop: screenHeight * 0,
    width: screenWidth * 0.8,
  },



  overlayed: {
    position: 'absolute',
    top: screenHeight * 0.08,
    left: screenWidth * 0.05,
    right: screenWidth * 0.05,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },



});
