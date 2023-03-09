import React, { Component } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  TextInput,
  Text,
} from 'react-native';
import { useState, useEffect } from 'react';
import Background from '../components/Background'
import Button from '../components/Button'
import BackButton from '../components/BackButton'
import RNSpeedometer from 'react-native-speedometer'

export default function Meter({ navigation }) {
  const [state, setState] = useState();
  const [data, setData] = useState();
  setInterval(() => {

    const allCarBrand = async () => {
      try {
        const response = await fetch(
          "https://api.thingspeak.com/channels/2034222/feeds.json?api_key=P7G58EFGWC7MP4EI&results=1"
        );
        const data = await response.json();
        console.log(data);

        // if (!data.success) {
        //   throw new Error(data.message);
        // }
        setState(data?.feeds);
      } catch (error) {
        console.log(error);
      }
    };
    const sampleData = state?.map((val, key) => {
      return <>
        {val?.field1}
      </>;
    })
    console.log(sampleData?.[0]?.props?.children, "fbdkehb");
    const dataa = sampleData?.[0]?.props?.children
    setData(dataa);
    // console.log(data);
    allCarBrand();
  }, 25000);
  return (
    <Background>

      <SafeAreaView style={styles.container}>
        <RNSpeedometer style={styles.labels} value={data == null ? data : 1} size={400} />
      </SafeAreaView>
      <Text>

      </Text>

      <Button
        mode="outlined"
        onPress={() =>
          navigation.navigate('HomePage')
        }
      >
        Entering
      </Button>
    </Background>
  )
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  textInput: {
    borderBottomWidth: 0.3,
    borderBottomColor: 'black',
    height: 25,
    fontSize: 16,
    marginVertical: 50,
    marginHorizontal: 20,
  }, labels: [
    {
      name: 'Too Slow',
      labelColor: '#ff2900',
      activeBarColor: '#ff2900',
    },
    {
      name: 'Very Slow',
      labelColor: '#C5C5C5',
      activeBarColor: '#C5C5C5',
    },
    {
      name: 'Slow',
      labelColor: '#f4ab44',
      activeBarColor: '#f4ab44',
    },
    {
      name: 'Normal',
      labelColor: '#f2cf1f',
      activeBarColor: '#f2cf1f',
    },
    {
      name: 'Fast',
      labelColor: '#14eb6e',
      activeBarColor: '#14eb6e',
    },
    {
      name: 'Unbelievably Fast',
      labelColor: '#00ff6b',
      activeBarColor: '#00ff6b',
    },
  ],

});