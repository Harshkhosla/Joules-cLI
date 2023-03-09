import React, { useState } from 'react'
import Header from '../components/Header';
import { SafeAreaView, StyleSheet, TextInput, Alert } from 'react-native';
import { Text, View, Linking } from 'react-native';
import Button from '../components/Button'
import Background from '../components/Background';
import { useDispatch, useSelector } from 'react-redux';
import { SetDate } from '../Redux/Action';


export default function Eligible({ navigation }) {
  const dispatch = useDispatch()
  const [user, setUserData] = React.useState({ field1: '', field2: "" });
  console.log(user);
  const Click = () => {
    // console.log('wev,mn');
    // console.log(user,"enfhgevwfnbv");
    // const  {field1,field2} = user;           
    //      fetch("https://api.thingspeak.com/update?api_key=YQVCR2JG4XJJO80B&field1="+ JSON.stringify({
    //       field1,field2
    //     }), {
    //       method: "POST",
    //       headers: {
    //         "content-type": "application/json",
    //       }, 
    //     })
    //       .then((response) => response.json())                
    //       .then((response) => {
    //         toast.success(response?.toast)
    //         console.log(response,"casdvas")
    //         if (!response?.success) {
    //           throw Error(response.error)
    //         }  
    //       })
    //       .catch((err) => {
    //         console.log(err,"cvdsavs");         
    //       });
    dispatch(SetDate(user))
  }


  const SampleClick = () => {
    fetch("http://192.168.1.1/genericArgs?username=Redmi&password=123456789", {

      method: "GET",
      headers: {
        "content-type": "application/json",
      },
    })
      .then(response => response.json())
      .then(response => {
        dispatch(saveData(response))
        // setSettingsData(response);/
        console.log("kj");
      })
      .catch(error => {
        // console.log(error, "joih");
      });
  }



  return (
    <Background>
      {/* <BackButton goBack={navigation.goBack} /> */}

      <TextInput
        style={styles.input}
        onChangeText={(text) => setUserData({ ...user, field1: text })}
        value={user.field1}
      />
      <TextInput
        style={styles.input}
        onChangeText={(field2) => setUserData({ ...user, field2: field2 })}
        value={user.field2}
      />
      <Button
        mode="contained"
        onPress={Click}
      >
        Navigating to Car section
      </Button>
    </Background>
  )
}
const styles = StyleSheet.create({
  input: {
    borderWidth: 1,
    borderColor: 'black',
    width: 300,
    height: 50,
    padding: 10,
    margin: 10
  },

})
