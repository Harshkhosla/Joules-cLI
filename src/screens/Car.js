import React, { useState } from 'react'
import Header from '../components/Header';
import { SafeAreaView, StyleSheet, TextInput, Alert } from 'react-native';
import { Text, View, Linking } from 'react-native';
import Button from '../components/Button'
import Background from '../components/Background';
import DropDownPicker from 'react-native-dropdown-picker';
import BackButton from '../components/BackButton'
import { useDispatch, useSelector } from 'react-redux';
import { CarDetails } from '../Redux/Action';


export default function Car({ navigation }) {
  const dispatch = useDispatch()
  const Data = useSelector(state => state?.userReducers?.house_voltage)
  console.log(Data);
  const data = [{ label: 'Tata nexon gv', value: '30.2KWH' }, { label: 'Tata Nexon EV Max', value: '40.5kWh' }];
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState([
    { label: 'Tata nexon gv', value: [{ Battery_Pack: '30.2KWH' }, { Car: "Tata nexon gv" }, { House_voltage: Data }] },
    { label: 'Tata Nexon EV Max', value: [{ Battery_Pack: '40.5kWh' }, { Car: "Tata Nexon EV Max" }, { House_voltage: Data }] }
  ]);

  const Samplerun = () => {
    console.log("ckehbcv");
    console.log(value);
    dispatch(CarDetails(value));
    () => navigation.replace('House')
  }

  return (
    <Background>
      <BackButton goBack={navigation.goBack} />
      <Header>
        Which Car Do you Own
      </Header>

      <DropDownPicker
        open={open}
        value={value}
        items={items}
        setOpen={setOpen}
        setValue={setValue}
        setItems={setItems}
      />
      <Button
        mode="contained"
        onPress={Samplerun}
      >to home </Button>
    </Background>
  )
}