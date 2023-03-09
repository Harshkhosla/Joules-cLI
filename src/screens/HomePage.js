import Background from '../components/Background'
import Logo from '../components/Logo'
import Header from '../components/Header'
import Paragraph from '../components/Paragraph'
import React, { useState, useEffect } from 'react';
import {
  Text, View, StyleSheet, Button, Linking,
  AppRegistry,
  TouchableOpacity,
} from 'react-native';
import { PermissionsAndroid } from 'react-native';

import QRCodeScanner from 'react-native-qrcode-scanner';
import { RNCamera } from 'react-native-camera';
import WifiManager from "react-native-wifi-reborn";
// import wifi from 'react-native-android-wifi';

export default function Dashboard({ navigation }) {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [text, setText] = useState('Not yet scanned')
  const [Data, setData] = useState("HGHG");
  // useEffect(()=>{
  //   console.log(Data?.channel);

  // },[sampleHit])


  const handleBarCodeScanned = ({ type, data }) => {
    setScanned(true);
    setText(data)
    connetToWifi()
    // alert( `barecode ${type}and data ${Linking.openURL(`${data}`)}has been done`)
    console.log('Type: ' + type + '\nData: ' + data)

    //   onPressChangeWifi = async() => {
    //     const checkpermission = await PermissionsAndroid.check(
    //         PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
    //     )
    //     if(!checkpermission){
    //         const granted = await PermissionsAndroid.request(
    //             PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
    //             {
    //                 title: 'Location permission is required for WiFi connections',
    //                 message:
    //                     'This app needs location permission as this is required  ' +
    //                     'to scan for wifi networks.',
    //                 buttonNegative: 'DENY',
    //                 buttonPositive: 'ALLOW',
    //             },
    //         );
    //         if (granted === PermissionsAndroid.RESULTS.GRANTED) {
    //             // You can now use react-native-wifi-reborn
    //             connectToWifi()
    //         } else {
    //             // Permission denied
    //         }
    //     }else{
    //         connectToWifi()
    //     }
    // }


  };
  const connetToWifi = (SSID, password) => {
    WifiManager.setEnabled(true);
    WifiManager.disconnect();
    // WifiManager.forceWifiUsage(true);
    PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      {
        title: "",
        message: "",
        buttonNegative: "",
        buttonPositive: "",
      },
    ).then((granted) => {
      //console.log(granted);
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        //console.log("granted");
        RNAndroidLocationEnabler.promptForEnableLocationIfNeeded({
          interval: 10000,
          fastInterval: 5000,
        })
          .catch((err) => {
            //console.log("not permitted to enable location");
          });
      } else {
        //console.log("not granted");
        // Permission denied
      }
      // expected output: "Success!"
    });

    WifiManager.connectToProtectedSSID(SSID, password, false).then(
      () => {
        console.log(SSID);
        console.warn("Connected successfully!");
      },
      () => {
        console.warn("Connection failed!");
      }
    );
    WifiManager.getCurrentWifiSSID().then(
      ssid => {
        console.warn("Your current connected wifi SSID is " + ssid);
      },
      () => {
        console.warn("Cannot get current SSID!");
      }
    );
  }

  // Check permissions and return the screens
  onSuccess = e => {
    console.log(e.data);
    const parsedWifiFields = {
      s: "",
      t: "",
      p: "",
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
      },
    ];
    console.log(fields);
    connetToWifi(parsedWifiFields.s, parsedWifiFields.p)
  };

  return (
    <View style={styles.container}>
      <View style={styles.barcodebox}>
        <QRCodeScanner
          onRead={this.onSuccess}
          // flashMode={RNCamera.Constants.FlashMode.torch}
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
      <Text style={styles.maintext}>{text}</Text>

      <Header>{Data}</Header>
      {/* {scanned && <Button title={'Scan again?'} onPress={() => setScanned(false)} color='tomato' />} */}
      <Button
        onPress={connetToWifi}
        title='Connect to Wifi'
        color='#841584'
      />
    </View>
  )
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
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
  maintext: {
    fontSize: 16,
    margin: 20,
  },
  barcodebox: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 300,
    width: 300,
    overflow: 'hidden',
    borderRadius: 30,
    backgroundColor: 'tomato'
  }
});