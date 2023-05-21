import React, { useState ,useEffect } from 'react'
import Header from '../components/Header';
import { SafeAreaView, StyleSheet,  TouchableOpacity, TextInput, Alert } from 'react-native';
import { Text, View, Linking } from 'react-native';
import { Client, Message } from 'react-native-paho-mqtt';
import Button from '../components/Button'
import Background from '../components/Background';
import BackButton from '../components/BackButton'
import RNSpeedometer from 'react-native-speedometer'
// import FontAwesome5 from 'react-native-vector-icons';
// import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
// import { Icon } from 'react-native-paper/lib/typescript/components/Avatar/Avatar';
import Icon from "../components/Icon";
import { useDispatch, useSelector } from 'react-redux';
import { Click } from '../Redux/Action';
import AsyncStorage from "@react-native-async-storage/async-storage";
import Ecomode from "../components/Ecomode"
import Normal from "../components/Normal"
import Steady from "../components/Steady"
import Scedule from "../components/Scedule"

export default function Home({ navigation }) {
  const dispatch = useDispatch()
  const [state, setState] = useState()
  console.log(state);
  const [datas, setDatas] = useState("Connect you charger")
  const [data, setData] = useState(9);
  const [user, setUserData] = React.useState("");
  console.log(user,"harsh authtoken");
  setTimeout(function(){
    setDatas("Charger is connected")
   
  }, 5000);
  const imagesAllData=useSelector(state=>state?.userReducers)  

  useEffect(()=>{
    const mEmail =  AsyncStorage.getItem('Authtoken');
    console.log(mEmail,"here is the token stored");
    setUserData(imagesAllData?.authtoken)
  },[imagesAllData])


  // setTimeout(function(){
  //   setDatas("Charging Status ON")
   
  // }, 13000);
  const myStorage = {
    setItem: (key, item) => {
      myStorage[key] = item;
    },
    getItem: (key) => myStorage[key],
    removeItem: (key) => {
      delete myStorage[key];
    },
  };

  useEffect(() => {


    const client = new Client({ uri: 'ws://192.168.100.111:9001/', clientId: 'JOULS ECOTECH243546578989', storage: myStorage});


    const onConnect = () => {
      console.log("Connected to MQTT broker");

      // Subscribe to a topic
      client.subscribe("Message");

      // Publish a message to a topic
      const message = new Message('your-message');
      message.destinationName = 'Message';
      client.send(message);
    };

    const onConnectionLost = (responseObject) => {
      if (responseObject.errorCode !== 0) {
        console.log("Disconnected from MQTT broker");
      }
    };

    const onMessageArrived = (message) => {
      console.log("Received message:", message.payloadString);
    };

    client.onConnectionLost = onConnectionLost;
    client.onMessageArrived = onMessageArrived;

    client.connect()
      .then(onConnect)
      .catch((error) => {
        console.log("Failed to connect:", error);
      });

    // Cleanup function
    return () => {
      client.disconnect();
    };




  }, []);






  const Sample=()=>{
    
    navigation.navigate('Date')
  }
  // setInterval(() => {
  //   const allCarBrand = async () => {
  //     try {
  //       const response = await fetch(
  //         "https://api.thingspeak.com/channels/2053997/feeds.json?api_key=1KDB6MPTULJSH4I1&results=2 "
  //       );
  //       const data = await response.json();
  //       // console.log(data);
  //       setState(data?.feeds);
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   };
  //   const sampleData = state?.map((val, key) => {
  //     return <>
  //       {val?.field8}
  //     </>;
  //   })
  //   const dataa = sampleData?.[0]?.props?.children
  //   // console.log(dataa,"ekcheb");
  //   setData(dataa);
  //   allCarBrand();
  // }, 35000);

  const Clickk = () => {
    dispatch(Click(user))
  }


 
  return (
    <Background>
      <Header style={styles.header}>{datas}</Header>
      <SafeAreaView style={styles.container}>
        <RNSpeedometer style={styles.labels} value={data} size={400} />
      </SafeAreaView>
      <View style={styles.containerr}>
      <TouchableOpacity onPress={Sample}>
        <Ecomode  style={styles.button}></Ecomode>
        </TouchableOpacity>
        <TouchableOpacity onPress={"Sample"}>
        <Scedule  style={styles.button}></Scedule>
        </TouchableOpacity>
        <TouchableOpacity onPress={"Sample"}>
        <Steady  style={styles.button}></Steady>
        </TouchableOpacity>
        <TouchableOpacity onPress={"Sample"}>
        <Normal  style={styles.button}></Normal>
        </TouchableOpacity>

      </View>


      <Button
        mode="contained"
        onPress={Clickk}
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
      labelColor: '#ff2900',
      activeBarColor: '#ff2900',
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
  header: {
    fontSize: 20,
    fontWeight: 'bold',
    paddingVertical: 3,
  },
  containerr: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    width: '80%',
    alignSelf: 'center',
  },
  button: {
    width: '48%',
    aspectRatio: 1, // Set the width and height to be equal to create a square
    borderRadius: 8,
    backgroundColor: '#eee',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },

})


