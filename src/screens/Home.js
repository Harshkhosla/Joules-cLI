import React, { useState } from 'react'
import Header from '../components/Header';
import {SafeAreaView, StyleSheet, TextInput, Alert} from 'react-native';
import { Text, View,   Linking } from 'react-native';
import Button from '../components/Button'
import Background from '../components/Background';
import BackButton from '../components/BackButton'
import RNSpeedometer from 'react-native-speedometer'
// import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';


export default function Eligible({ navigation }) {
  const [state, setState] = useState();
  const [data,setData] =useState(9);
    const [user, setUserData] = React.useState({ field1: 'balanced_mode_on', field2: "" });
    console.log(user);
    setInterval(() => {
      
      const allCarBrand = async () => {
        try {
          const response = await fetch(
            "https://api.thingspeak.com/channels/2034222/feeds.json?api_key=P7G58EFGWC7MP4EI&results=1"
            );
            const data = await response.json();
            console.log(data);
              setState(data?.feeds);
            } catch (error) {
          console.log(error);
        }
      };
      const  sampleData =  state?.map((val,key) => {
        return<>          
        {val?.field1}
        </>;
    })
    const dataa=sampleData?.[0]?.props?.children
    setData(dataa);
    allCarBrand();
    }, 30000);

const Click=()=>{
    const { field1, field2} = user;
         fetch("https://api.thingspeak.com/update?api_key=YQVCR2JG4XJJO80B&field1="+ JSON.stringify({
          field1,
        }), {
          method: "POST",
          headers: {
            "content-type": "application/json",
          },
        })
          .then((response) => response.json())
          .then((response) => {
            toast.success(response?.toast)
            console.log(response,"casdvas")
            if (!response?.success) {
              throw Error(response.error)
            }
          })
          .catch((err) => {
            console.log(err,"cvdsavs");         
          });
}


const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ postName: user })
};
    return (
      <Background>
         <SafeAreaView style={styles.container}>
          <RNSpeedometer  style={styles.labels} value={data} size={400}/>
        </SafeAreaView>
        {/* <FontAwesome5 name={'comments'} />; */}
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
    input:{
        borderWidth:1,
        borderColor:'black',
        width:300,
        height:50,
        padding:10,
        margin:10
        },
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
        },labels: [
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
        
  })
  