import Background from '../components/Background'
import Logo from '../components/Logo'
import Header from '../components/Header'
import Paragraph from '../components/Paragraph'
import React, { useState, useEffect } from 'react';
import Button from '../components/Button';
import {
  Text, View, StyleSheet, Linking,
  AppRegistry,
  TouchableOpacity,
} from 'react-native';
import { PermissionsAndroid } from 'react-native';
import QRCodeScanner from 'react-native-qrcode-scanner';
import { RNCamera } from 'react-native-camera';
import WifiManager from "react-native-wifi-reborn";
import RNAndroidLocationEnabler from 'react-native-android-location-enabler';
import {  ToastAndroid } from 'react-native';
import { UpdatName, setProductKey } from '../Redux/Action';
import { useDispatch, useSelector } from 'react-redux';
import AsyncStorage from "@react-native-async-storage/async-storage";
import EvCharging from '../components/EvCharging';

export default function Dashboard({ navigation }) {
  const dispatch = useDispatch()
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [text, setText] = useState('Not yet scanned')
  const [Data, setData] = useState("HGHG");
  console.log(Data);

  const id = useSelector(state => state?.userReducers?.Product?._id)
  const onSuccess = async (e) => {
    console.log("sdfasdfasdf");
    console.log(e.data ,'HEHEHEHE');
    const parsedWifiFields = {
      s: "",
      t: "",
      p: "",
      h:"",
    };
    
    const cleanedWifiString = e.data
      .replace(/(\r\n\t|\n|\r\t)/gm, "")
      .replace("WIFI:", "")
      .replace(";;", "");
    const scannedWifiValues = cleanedWifiString.split(";");
    scannedWifiValues.forEach((value) => {
      const keyValue = value.split(":");
      parsedWifiFields[keyValue[0].toLocaleLowerCase()] = keyValue[1] || "";
    });

    // console.log(parsedWifiFields.h,"kimmo");
    // const ProductDetails = JSON.stringify(parsedWifiFields.h).replaceAll('"', '');
    // if(parsedWifiFields.h!=""){
     
    // }
      
    dispatch(UpdatName(parsedWifiFields.h,id))

    let fields = [
      {
        title: "SSID",
        value: parsedWifiFields.s,
      },
      {
        title: "encryption",
        value: parsedWifiFields.t,
      },
      {
        title: "password",
        value: parsedWifiFields.p,
      }
    ];
    console.log(fields);
  
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      {
        title: 'Location permission is required for WiFi connections',
        message:
          'This app needs location permission as this is required ' +
          'to scan for WiFi networks.',
        buttonNegative: 'DENY',
        buttonPositive: 'ALLOW',
      }
    );
  
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      WifiManager.setEnabled(true);
      WifiManager.disconnect();
  
      PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: "",
          message: "",
          buttonNegative: "",
          buttonPositive: "",
        },
      ).then((granted) => {
        console.log(granted);
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          RNAndroidLocationEnabler.promptForEnableLocationIfNeeded({
            interval: 10000,
            fastInterval: 5000,
          })
          .catch((err) => {
            console.log("not permitted to enable location");
          });
        } else {
          console.log("not granted");
        }
      });
  
      WifiManager.connectToProtectedSSID(parsedWifiFields.s, parsedWifiFields.p,  false).then(
        () => {
          console.log(parsedWifiFields.s);
          console.warn("Connected successfully!");
          navigation.navigate('UserDetails');
        },
        () => {
          console.warn("Connection failed!");
        }
      );
  
      WifiManager.getCurrentWifiSSID().then(
        (ssid) => {
          console.warn("Your current connected WiFi SSID is " + ssid);
        },
        () => {
          console.warn("Cannot get current SSID!");
        }
      );
    } else {
      // Permission denied
    }
    navigation.navigate('UserDetails');
  };

  return (
    <Background>
      <View style={styles.container}>
        <Header>
          Connect with your charger
        </Header>
        <View style={styles.gap} />
        <View style={styles.barcodebox}>
          <QRCodeScanner
            onRead={onSuccess}
            topContent={
              <Text style={styles.centerText}>
                Go to{' '}
                <Text style={styles.textBold}>wikipedia.org/wiki/QR_code</Text> on
                your computer and scan the QR code.
              </Text>
            }
            bottomContent={
              <TouchableOpacity style={styles.buttonTouchable}>
                <Text style={styles.buttonText}>OK. Got it!</Text>
              </TouchableOpacity>
            }
          />
        </View>
        <EvCharging/>
      </View>
    </Background>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'flex-start', // Align content at the top
    paddingTop: 30, // Add top padding to create space between Header and the content
  },
  centerText: {
    flex: 1,
    fontSize: 18,
    padding: 32,
    color: '#777'
  },
  textBold: {
    fontWeight: '500',
    color: '#000'
  },
  buttonText: {
    fontSize: 21,
    color: 'rgb(0,122,255)'
  },
  buttonTouchable: {
    padding: 16
  },
  barcodebox: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 300,
    width: 300,
    overflow: 'hidden',
    borderRadius: 30,
    backgroundColor: 'tomato'
  },
  gap: {
    height: 140, // Adjust the height as needed
  },
});
