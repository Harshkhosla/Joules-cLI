import React, { useState, useEffect, useRef } from 'react';
import Header from '../components/Header';
import { SafeAreaView, StyleSheet, TouchableOpacity, Image, TextInput, Alert ,Dimensions} from 'react-native';
import { getStatusBarHeight } from 'react-native-status-bar-height'
import { Text, View, Linking } from 'react-native';
import Button from '../components/Button';
import Background from '../components/Background';
import {  Menu, Divider, PaperProvider } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import { Click, Clicked, EcoMode, ScheduleMode, BalanceMode, ResolveMode,StopChargingMode, setStateValue, notesDataforproduct, SubcribingtoTopic } from '../Redux/Action';
import PersonIcon from '../components/PersonIcon';
// import { useDispatch, useSelector } from 'react-redux';
import AsyncStorage from "@react-native-async-storage/async-storage";


const { width, height } = Dimensions.get('window');
const aspectRatio = width / height;

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

export default function Home({ navigation }) { 
  const dispatch = useDispatch(); 
  const [datas, setDatas] = useState("Connect your charger");
  const [user, setUserData] = React.useState("");
  const [isSwitchOn, setIsSwitchOn] = React.useState(false);
  const [isSwitchOn1, setIsSwitchOn1] = React.useState(false);
  const [button1, setButton1] = React.useState("false");
  const [button2, setButton2] = React.useState("false");
  const [button3, setButton3] = React.useState("false");
  const [button4, setButton4] = React.useState("false");
  const [stateValue, SetStateValue] = useState("")
  const [stateMode, SetStateMode] = useState("23")
  const [stateEnergy, SetStateEnergy] = useState("23")

  const Porduct_Key = useSelector(state => state?.userReducers?.Product?.ProductId)
  console.log(Porduct_Key);
  const UserData = useSelector(state => state?.userReducers?.Product);
  console.log(UserData,"hera is every data");

  setTimeout(function () {
    setDatas("Charger is connected");
  }, 5000);

  // const Porduct_Key = AsyncStorage.getItem('Porduct_Key');
  // console.log(Porduct_Key,"hululul");
  
  const imagesAllData = useSelector(state => state?.userReducers?.StateValue);
  const SampleData = useSelector(state => state?.userReducers?.modeValue);
  const SampleDataaa = useSelector(state => state?.userReducers?.SetEnergy);
  useEffect(() => {

    SetStateValue(imagesAllData);
    console.log(imagesAllData,"CHARGING POWER");
  }, [imagesAllData]);

  useEffect(() => {
    
    SetStateMode(SampleData)
  }, [SampleData]);
  // useEffect(() => {
    
  //   SetStateMode(SampleData)
  // }, [SampleData]);
  useEffect(() => {
    console.log("harsheeheuhheddhe", SampleData);
    console.log("hhhhhh", imagesAllData);
    SetStateEnergy(SampleDataaa)
  }, [SampleDataaa]);

  const myStorage = {
    setItem: (key, item) => {
      myStorage[key] = item;
    },
    getItem: (key) => myStorage[key],
    removeItem: (key) => {
      delete myStorage[key];
    },
  };
  useEffect(()=>{
    dispatch(notesDataforproduct())
  },[])
  useEffect(() => {
    // Retrieve data from AsyncStorage when the component mounts
    retrieveData();
    
  }, []);

  const retrieveData = async () => {
    try {
      const storedData = await AsyncStorage.getItem('Product_Key');
      if (storedData !== null) {
        setUserData(storedData);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const Sample = (data) => {
    console.log(data, "hello");
    if (button1 == "true") {
      setButton1("false")
    } else {
      setButton1("true")
      setButton2("false")
      setButton3("false")
      setButton4("false")
      // SetStateValue("Charging Started")
    }
    setIsSwitchOn(!isSwitchOn);
    
    dispatch(SubcribingtoTopic(Porduct_Key));
    dispatch(BalanceMode(Porduct_Key));
    // navigation.navigate('Load');
  };
  const Samplee = (data) => {
    console.log(data, "hello");
    console.log("hello here");
    if (button2 == "true") {

      setButton2("false")
    } else {
      setButton2("true")
      setButton1("false")
      setButton3("false")
      setButton4("false")
    }
    setIsSwitchOn1(!isSwitchOn1);
    dispatch(EcoMode(Porduct_Key));
    dispatch(SubcribingtoTopic(Porduct_Key));
  };
  const Sampleed = (data) => {
    console.log(data, "hello");
    console.log("hello here");
    if (button3 == "true") {

      setButton3("false")
    } else {
      setButton3("true")
      setButton1("false")
      setButton2("false")
      setButton4("false")
    }
    setIsSwitchOn1(!isSwitchOn1);
    navigation.navigate('Date');
    // dispatch(ScheduleMode());
  };

  const Sampleeeed = (data) => {
    console.log(data, "hello");
    console.log("hello here");
    if (button4 == "true") {
      setButton4("false")
    } else {
      setButton4("true")
      setButton1("false")
      setButton2("false")
      setButton3("false")
    }
    setIsSwitchOn1(!isSwitchOn1);
    navigation.navigate('SceduleDate');
    
    //
  };

  const Clickk = () => {
    // navigation.navigate('Load');
    dispatch(StopChargingMode(Porduct_Key));
    // dispatch(SubcribingtoTopic(Porduct_Key));
    setButton2("false")
      setButton1("false")
      setButton3("false")
      setButton4("false")
    SetStateValue("Charging Stopped")
  };
  const Resolve = () => {
    // navigation.navigate('Test');
    // dispatch(Clicked(Porduct_Key))
    dispatch(ResolveMode(Porduct_Key));
    SetStateValue("Resolving Issue")
    setButton2("false")
      setButton1("false")
      setButton3("false")
      setButton4("false")
  };

const clickheehpd=()=>{
  navigation.navigate('LoginScreen');
}

  return (
    
    <Background>      
      <TouchableOpacity  >
  <PersonIcon clickheehpd={clickheehpd}/>
</TouchableOpacity>
     
      
<Header style={styles.header}>{stateValue==""?"Charging Status":"stateValue"}</Header>
      <SafeAreaView style={styles.container}>

        {/* <RNSpeedometer style={styles.labels} value={"23"} size={400} /> */}

        {/* <View style={styles.containerefdf}> */}
        {/* </View> */}
      </SafeAreaView>


      <View style={styles.modesContainer}>

      <TouchableOpacity style={styles.modeContainered}>

<Header>Power Used</Header>
<Text style={styles.sample}>House  : 0 kW</Text>
<Text style={styles.sample}>Charger  : {stateMode==""?"0 kW":stateMode}</Text>
{/* <View style={styles.modesContainer}>
  <Header>rgjng</Header>
</View> */}
{/* <TouchableOpacity style={styles.powerCon}> */}
{/* <Text>Power Used</Text> */}
{/* </TouchableOpacity> */}

      </TouchableOpacity>
      <TouchableOpacity style={styles.modeContainered}>

      <Image
            source={require('../assets/loading.gif')}
            style={{ width: 200, height: 250 }}
          />
      </TouchableOpacity>




      </View>
      <Header></Header>


      <View style={styles.modesContainer}>
        <TouchableOpacity onPress={Sample} style={button1 == "true" ? styles.modeContainer : styles.modeContainer2}>
          <View style={styles.modeInnerContainer}>
            <Text style={button1 == "true" ? styles.modeText : styles.modeText1}>Balanced Mode</Text>
            {/* <Text style={styles.modeText}> Mode</Text> */}
            <Text style={button1 == "true" ? styles.modeStatus : styles.modeStatus1}>{button1 == "true" ? "ON" : "OFF"}</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={Samplee} style={button2 == "true" ? styles.modeContainer : styles.modeContainer2}>
          <View style={styles.modeInnerContainer}>
            <Text style={button2 == "true" ? styles.modeText : styles.modeText1}>Eco{'\n'}Mode</Text>
            {/* <Text style={styles.modeText}> Mode</Text> */}
            <Text style={button2 == "true" ? styles.modeStatus : styles.modeStatus1}>{button2 == "true" ? "ON" : "OFF"}</Text>
          </View>
        </TouchableOpacity>
        {/* </View> */}

        {/* <View style={styles.modesContainer}> */}
        <TouchableOpacity onPress={Sampleed} style={button3 == "true" ? styles.modeContainer : styles.modeContainer2}>
          <View style={styles.modeInnerContainer}>
            <Text style={button3 == "true" ? styles.modeText : styles.modeText1}>Schedule Mode </Text>
            {/* <Text style={styles.modeText}> Mode</Text> */}
            <Text style={button3 == "true" ? styles.modeStatus : styles.modeStatus1}>{button3 == "true" ? "ON" : "OFF"}</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={Sampleeeed} style={button4 == "true" ? styles.modeContainer : styles.modeContainer2}>
          <View style={styles.modeInnerContainer}>
            <Text style={button4 == "true" ? styles.modeText : styles.modeText1}>Slow Mode</Text>
            {/* <Text style={styles.modeText}>Mode</Text> */}
            <Text style={button4 == "true" ? styles.modeStatus : styles.modeStatus1}>{button4 == "true" ? "ON" : "OFF"}</Text>
          </View>
        </TouchableOpacity>
      </View>



      <View style={styles.textSample}>
        <View style={styles.textContainer}>
          <Text style={styles.text}>Energy consumed</Text>
          <Header style={styles.energy}>{stateEnergy==""?"0 Wh":stateEnergy}</Header>
        </View>
        <View style={styles.textContainer}>
          <Text style={styles.text}>Cost of Charging</Text>
          <Header style={styles.energy}>0</Header>
        </View>
        <View style={styles.textContainer}>
          <Text style={styles.text}>Charging
            <Text> </Text> time</Text>
          <Header style={styles.energy}>0 Min</Header>
        </View>
      </View>

      <Button mode="contained" onPress={Clickk}>
        Stop Charging
      </Button>
      <Button style={styles.redButton} mode="contained" onPress={Resolve}>
        RESOLVE
      </Button>
    </Background>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  textSample: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: screenHeight * 0.06,
    marginBottom: screenHeight * 0.02,
  },
  textContainer: {
    flex: 1,
    
    alignItems: 'center',
  },
  text: {
    color: 'green',
  },
  header: {
    fontSize: 20,
    fontWeight: 'bold',
    paddingVertical: 3,
    top: -80 + getStatusBarHeight(),
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
    // marginBottom: screenHeight * 0.16,
    
  },
  row: {
    flexDirection: 'row',
    marginBottom: screenHeight * 0.04,
  },
  mode: {
    marginLeft: screenWidth * 0.8,
    paddingLeft: screenWidth * 0.8
  },
  lastMode: {
    marginLeft: screenWidth * 0.8,
  },
  modesContainer: {

    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: -screenHeight * 0.03,
    // borderRadius: 10, // Add border radius for rounded corners
    // overflow: 'hidden',
  }, 
  modeContainer: {
    flexDirection: 'row',
    paddingHorizontal: 10,
    backgroundColor: 'green',
    borderRadius: 25,
    overflow: 'hidden',
    height: screenHeight * 0.17,
    width: screenWidth * 0.22,
    marginHorizontal: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modeContainer2: {
    flexDirection: 'row',
    paddingHorizontal: 10,
    // backgroundColor: 'red',
    borderRadius: 25,
    overflow: 'hidden',
    height: screenHeight * 0.17,
    width: screenWidth * 0.22,
    marginHorizontal: 5,
    borderWidth: 1,
    borderColor: "#118615",
    justifyContent: 'center',
    alignItems: 'center',

  },
  modeInnerContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    // paddingHorizontal: 10,

  },
  modeText: {
    color: 'white',
    fontSize: 14,
    marginBottom: 0,
    textAlign: 'center',
    // paddingHorizontal: 10,
    lineHeight: 20,
  },
  modeText1: {
    color: 'black',
    fontSize: 14,
    marginBottom:0,
    textAlign: 'center',

    // paddingHorizontal: 10,
    lineHeight: 20,
  },
  modeStatus: {
    color: 'white',
    marginTop: screenHeight * 0.01,
    fontSize: 15,
  },
  modeStatus1: {
    color: 'black',
    marginTop: screenHeight * 0.01,
    fontSize: 15,
  },
  energy: {
    marginBottom: screenHeight * 0.01,
    marginTop:screenHeight * 0.01
  }

  // , image: {
  //   width: screenWidth * 0.12,
  //   height: screenHeight * 0.01,
  //   marginBottom: screenHeight * 0.21,
  //   marginTop: screenHeight * 0.21,
  // }
  ,
  // containerefdf: {
  //   flex: 1,
  //   alignItems: 'center',
  //   justifyContent: 'center',
  // },
  gif: {
    width: screenWidth * 0.02,
    height: screenHeight * 0.01,
  }, 
  modeContainered: {
    flexDirection: 'column',
    // paddingHorizontal: 10,
    marginLeft:screenWidth * 0.07,
    // marginRight:20,
    // backgroundColor: 'green',
    // borderRadius: 25,
    height:screenHeight * 0.26,
    overflow: 'hidden',
    // height: 290,
    // width: 190,
    // marginHorizontal: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  powerCon:{
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: screenHeight * 0.22,
  },
  sample:{
    color:"black",
  },
  redButton:{
    borderRadius: 18,
    backgroundColor:"red",
    marginVertical: screenHeight * 0.03,
    paddingVertical: 2,
    width:screenHeight * 0.27,
    // padding: 40,
  }
  // ,Icon:{
  //   position: 'absolute',
  //   // top: 10 + getStatusBarHeight(),
  //   right:50,
  // }
});