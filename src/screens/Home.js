import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import { SafeAreaView, StyleSheet, TouchableOpacity, TextInput, Alert } from 'react-native';
import { Text, View, Linking } from 'react-native';
import Button from '../components/Button';
import Background from '../components/Background';
import { useDispatch, useSelector } from 'react-redux';

import RNSpeedometer from 'react-native-speedometer'
import { Click, Clicked , EcoMode, ScheduleMode} from '../Redux/Action';
import AsyncStorage from "@react-native-async-storage/async-storage";
import PersonIcon from '../components/PersonIcon';
import Modes from '../components/Modes';
import Modes1 from '../components/Modes1';
// import CircularProgress from 'react-native-circular-progress-indicator';

export default function Home({ navigation }) {
  const dispatch = useDispatch();
  const [state, setState] = useState();
  console.log(state);
  const [datas, setDatas] = useState("Connect your charger");
  const [user, setUserData] = React.useState("Charging Mode: Eco_Mode");
  const [isSwitchOn, setIsSwitchOn] = React.useState(false);
  const [isSwitchOn1, setIsSwitchOn1] = React.useState(false);

  // const onToggleSwitch = () => setIsSwitchOn(!isSwitchOn);
  console.log(user, "harsh authtoken");
  setTimeout(function () {
    setDatas("Charger is connected");
  }, 5000);

  const imagesAllData = useSelector(state => state?.userReducers?.authtoken);
  console.log(imagesAllData);

  useEffect(() => {
    const mEmail = AsyncStorage.getItem('Authtoken');
    console.log(imagesAllData, "here is the token stored");
    setUserData(imagesAllData);
  }, [imagesAllData]);

  const myStorage = {
    setItem: (key, item) => {
      myStorage[key] = item;
    },
    getItem: (key) => myStorage[key],
    removeItem: (key) => {
      delete myStorage[key];
    },
  };

  const Sample = (data) => {
    console.log(data ,"hello");
    console.log("hello here");
    setIsSwitchOn(!isSwitchOn);
    dispatch(Click(imagesAllData));
    // navigation.navigate('Load');
  };
  const Samplee = (data) => {
    console.log(data ,"hello");
    console.log("hello here");
    setIsSwitchOn1(!isSwitchOn1);
    dispatch(Clicked());
  };
  const Sampleed = (data) => {
    console.log(data ,"hello");
    console.log("hello here");
    setIsSwitchOn1(!isSwitchOn1);
    dispatch(EcoMode());
  };
  
  const Sampleeeed = (data) => {
    console.log(data ,"hello");
    console.log("hello here");
    setIsSwitchOn1(!isSwitchOn1);
    dispatch(ScheduleMode());
  };
  
  const Clickk = () => {
    navigation.navigate('Load');
    // dispatch(Click(imagesAllData));
  };


  return (
    <Background>
      <PersonIcon />
      <Header style={styles.header}>{imagesAllData}</Header>
      <SafeAreaView style={styles.container}>
        <RNSpeedometer style={styles.labels} value={"79"} size={400} />
      </SafeAreaView>
      {/* <CircularProgress
  value={97}
  radius={120}
  inActiveStrokeOpacity={0.5}
  activeStrokeWidth={15}
  inActiveStrokeWidth={20}
  progressValueStyle={{ fontWeight: '100', color: 'white' }}
  activeStrokeSecondaryColor="yellow"
  inActiveStrokeColor="black"
  duration={5000}
  dashedStrokeConfig={{
    count: 50,
    width: 4,
  }}
/> */}
      <View style={styles.container}>
        <View style={styles.row}>
          <Modes onToggleSwitch={Sample} isSwitchOn={isSwitchOn}data ={"Slow Mode"}style={styles.mode} />
          <Modes1 style={[styles.mode, styles.lastMode]} onToggleSwitch={Samplee} isSwitchOn={isSwitchOn1}  data ={"Balance Mode"}/>
        </View>
        <View style={styles.row}>
          <Modes style={styles.mode} onToggleSwitch={Sampleed}  data ={"Eco Mode"} />
          <Modes style={[styles.mode, styles.lastMode]} onToggleSwitch={Sampleeeed}  data ={"Schedule Mode"} />
        </View>
      </View>
      <View style={styles.textSample}>
        <View style={styles.textContainer}>
          <Text style={styles.text}>Energy consumed</Text>
          <Header>23k</Header>
        </View>
        <View style={styles.textContainer}>
          <Text style={styles.text}>Cost of Charging</Text>
          <Header>23k</Header>
        </View>
        <View style={styles.textContainer}>
          <Text style={styles.text}>Charging
          <Text> </Text> time</Text>
          <Header>23k</Header>
        </View>
      </View>

      <Button mode="contained" onPress={Clickk}>
        Stop Charging
      </Button>
    </Background>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  textSample: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
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
  row: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  mode: {
    marginLeft: 10,
    paddingLeft:90
  },
  lastMode: {
    marginLeft: 0,
  },
});
