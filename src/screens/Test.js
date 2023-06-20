import React, { useEffect, useState } from 'react'
import Header from '../components/Header';
import { SafeAreaView, StyleSheet, Alert } from 'react-native';
// import { Text, View, Linking } from 'react-native';
// import Button from '../components/Button'
import Background from '../components/Background';
import DropDownPicker from 'react-native-dropdown-picker';
import BackButton from '../components/BackButton'
import { useDispatch, useSelector } from 'react-redux';
import { setCar } from '../Redux/Action';
import EvCharging from '../components/EvCharging';
import Logo from '../components/Logo';
// import React, { useState } from 'react';
import { View, Text, Button, FlatList } from 'react-native';
import TextInput from '../components/TextInput'
// import WebSocket from 'react-native-websocket';
// import mqtt from "mqtt";


export default function Test({ navigation }) {

  const [message, setMessage] = useState('');
  useEffect(()=>{
    var ws = new WebSocket('ws://backend-production-e1c2.up.railway.app');
    ws.onopen = () => {
    // connection opened
    // console.log("hehee");
    ws.send('something'); // send a message
  };
  
  ws.onmessage = e => {
    // a message was received
    console.log(e.data);
  };
  
  ws.onerror = e => {
    // an error occurred
    console.log(e.message);
  };
  
  ws.onclose = e => {
    // connection closed
    console.log(e.code, e.reason);
  };
  },[1000])
  
  const Samplerun = () => {
    
  
};

const [devices, setDevices] = useState([]);
  const [deviceName, setDeviceName] = useState('');
  const [deviceAddress, setDeviceAddress] = useState('');

  const addDevice = () => {
    // Create a new device object with the entered details
    const newDevice = {
      name: deviceName,
      address: deviceAddress,
    };

    // Add the new device to the devices list
    setDevices((prevDevices) => [...prevDevices, newDevice]);

    // Clear the input fields
    setDeviceName('');
    setDeviceAddress('');
  };

  const renderDeviceItem = ({ item }) => (
    <Text style={styles.deviceText}>{item.name} - {item.address}</Text>
  );


  return (
    <Background>
      <BackButton goBack={navigation.goBack} />
      <Logo />
      <View>
      <FlatList
        data={devices}
        renderItem={renderDeviceItem}
        keyExtractor={(item, index) => index.toString()}
      />

      <TextInput
        placeholder="Device Name"
        value={deviceName}
        onChangeText={setDeviceName}
      />

      <TextInput
        placeholder="Device Address"
        value={deviceAddress}
        onChangeText={setDeviceAddress}
      />

      <Button title="Add Device" onPress={addDevice} />
    </View>
    </Background>
  )
}

const styles = StyleSheet.create({
  deviceText: {
    color: 'black',
  },
});