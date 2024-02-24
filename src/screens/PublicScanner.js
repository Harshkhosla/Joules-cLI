import Background from '../components/Background'
import Logo from '../components/Logo'
import Header from '../components/Header'
import Paragraph from '../components/Paragraph'
import React, { useState, useEffect } from 'react'
import Button from '../components/Button'
import {
  Text,
  View,
  StyleSheet,
  Linking,
  AppRegistry,
  TouchableOpacity,
  Image,
} from 'react-native'
import { PermissionsAndroid } from 'react-native'
import QRCodeScanner from 'react-native-qrcode-scanner'
import { RNCamera } from 'react-native-camera'
import WifiManager from 'react-native-wifi-reborn'
import RNAndroidLocationEnabler from 'react-native-android-location-enabler'
import { ToastAndroid } from 'react-native'
import { DoorOpening, UpdatName, setProductKey } from '../Redux/Action'
import { useDispatch, useSelector } from 'react-redux'
import AsyncStorage from '@react-native-async-storage/async-storage'
import EvCharging from '../components/EvCharging'
import {
  responsiveHeight as hp,
  responsiveWidth as wp,
  responsiveFontSize as fp,
} from 'react-native-responsive-dimensions'
import PublicHomePageHeader from './PublicHomePageHeader'

export default function Dashboard({ navigation }) {
  const dispatch = useDispatch()
  const [hasPermission, setHasPermission] = useState(null)
  const [scanned, setScanned] = useState(false)
  const [text, setText] = useState('Not yet scanned')
  const [Data, setData] = useState('HGHG')
  console.log(Data)

  const id = useSelector((state) => state?.userReducers?.Product?._id)
  const onSuccess = async (e) => {
    // console.log("sdfasdfasdf");
    console.log(e.data, 'product key in onsucces publicScanner')
    const parsedWifiFields = {
      s: '',
      t: '',
      p: '',
      h: '',
    }

    const cleanedWifiString = e.data
    console.log('cleanedWifiString', cleanedWifiString)
    // .replace(/(\r\n\t|\n|\r\t)/gm, "")
    // .replace("WIFI:", "")
    // .replace(";;", "");
    // console.log("cleanedWifiString",cleanedWifiString)
    //   dispatch(UpdatName(cleanedWifiString,id))
    await AsyncStorage.setItem('pid', cleanedWifiString)
    if (cleanedWifiString) {
      dispatch(DoorOpening(cleanedWifiString))
      navigation.navigate('Newhome')
    }
    // const scannedWifiValues = cleanedWifiString.split(";");
    // scannedWifiValues.forEach((value) => {
    //   const keyValue = value.split(":");
    //   parsedWifiFields[keyValue[0].toLocaleLowerCase()] = keyValue[1] || "";
    // });

    // // console.log(parsedWifiFields.h,"kimmo");
    // // const ProductDetails = JSON.stringify(parsedWifiFields.h).replaceAll('"', '');
    // // if(parsedWifiFields.h!=""){

    // // }

    // dispatch(UpdatName(parsedWifiFields.h,id))

    // let fields = [
    //   {
    //     title: "SSID",
    //     value: parsedWifiFields.s,
    //   },
    //   {
    //     title: "encryption",
    //     value: parsedWifiFields.t,
    //   },
    //   {
    //     title: "password",
    //     value: parsedWifiFields.p,
    //   }
    // ];
    // console.log(fields);

    // const granted = await PermissionsAndroid.request(
    //   PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
    //   {
    //     title: 'Location permission is required for WiFi connections',
    //     message:
    //       'This app needs location permission as this is required ' +
    //       'to scan for WiFi networks.',
    //     buttonNegative: 'DENY',
    //     buttonPositive: 'ALLOW',
    //   }
    // );

    // if (granted === PermissionsAndroid.RESULTS.GRANTED) {
    //   WifiManager.setEnabled(true);
    //   WifiManager.disconnect();

    //   PermissionsAndroid.request(
    //     PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
    //     {
    //       title: "",
    //       message: "",
    //       buttonNegative: "",
    //       buttonPositive: "",
    //     },
    //   ).then((granted) => {
    //     console.log(granted);
    //     if (granted === PermissionsAndroid.RESULTS.GRANTED) {
    //       RNAndroidLocationEnabler.promptForEnableLocationIfNeeded({
    //         interval: 10000,
    //         fastInterval: 5000,
    //       })
    //       .catch((err) => {
    //         console.log("not permitted to enable location");
    //       });
    //     } else {
    //       console.log("not granted");
    //     }
    //   });

    //   WifiManager.connectToProtectedSSID(parsedWifiFields.s, parsedWifiFields.p,  false).then(
    //     () => {
    //       console.log(parsedWifiFields.s);
    //       console.warn("Connected successfully!");
    //       navigation.navigate('UserDetails');
    //     },
    //     () => {
    //       console.warn("Connection failed!");
    //     }
    //   );

    //   WifiManager.getCurrentWifiSSID().then(
    //     (ssid) => {
    //       console.warn("Your current connected WiFi SSID is " + ssid);
    //     },
    //     () => {
    //       console.warn("Cannot get current SSID!");
    //     }
    //   );
    // } else {
    //   // Permission denied
    // }
    // navigation.navigate('Newhome');
  }

  return (
    <View style={styles.container}>
      <PublicHomePageHeader navigation={navigation} />
      <View style={styles.containerContentBox}>
        <Text style={{ fontSize: 20, fontWeight: '400' }}>
          To start charging, please scan the
          <Text style={{ color: 'green' }}> Qr Code </Text>
        </Text>
        <View style={styles.barcodebox}>
          <QRCodeScanner
            onRead={onSuccess}
            topContent={
              <Text style={styles.centerText}>
                Go to
                <Text style={styles.textBold}>wikipedia.org/wiki/QR_code</Text>
                on your computer and scan the QR code.
              </Text>
            }
            bottomContent={
              <TouchableOpacity style={styles.buttonTouchable}>
                <Text style={styles.buttonText}>OK. Got it!</Text>
              </TouchableOpacity>
            }
          />
          <Text
            style={{
              fontSize: 15,
              color: '#FFFFFF',
              position: 'absolute',
              bottom: 20,
            }}
          >
            Scan any Qr Code
          </Text>
        </View>
        <View
          style={{
            gap: 10,
            justifyContent: 'center',
            flexDirection: 'row',
          }}
        >
          <Image
            style={{
              height: 30,
              width: 30,
              resizeMode: 'contain',
            }}
            source={require('../assets/picimg.png')}
          />
          <Image
            style={{ height: 30, width: 30, resizeMode: 'contain' }}
            source={require('../assets/torch.png')}
          />
        </View>
        <View style={styles.statusBox}>
          <View
            style={{
              height: 10,
              backgroundColor: 'green',
              width: 10,
              borderRadius: 10 / 2,
              marginRight: 10,
            }}
          ></View>
          <Text style={{ color: '#848484' }}>Status:</Text>
          <Text style={{ paddingLeft: 10, color: '#606060' }}>
            Scanning QR Code
          </Text>
        </View>
        {/* <EvCharging /> */}
      </View>
      <View style={styles.bottomColorBox}></View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  containerContentBox: {
    flex: 1,
    backgroundColor: '#fff',
    gap: 10,
    margin: 20,
    padding: 15,
    borderWidth: 1,
    borderColor: '#D4D4D4',
    borderRadius: 20,
    overflow: 'hidden',
  },
  barcodebox: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    overflow: 'hidden',
    borderRadius: 8,
    backgroundColor: 'tomato',
    position: 'relative',
  },
  centerText: {
    flex: 1,
    fontSize: 18,
    padding: 32,
    color: '#777',
  },
  textBold: {
    fontWeight: '500',
    color: '#000',
  },
  buttonText: {
    fontSize: 21,
    color: 'rgb(0,122,255)',
  },
  statusBox: {
    backgroundColor: '#fff',
    padding: 15,
    marginHorizontal: 5,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#D4D4D4',
    borderRadius: 8,
  },
  buttonTouchable: {
    padding: 16,
  },
  bottomColorBox: {
    position: 'absolute',
    backgroundColor: '#C1E0C2',
    bottom: 0,
    height: hp(40),
    borderTopLeftRadius: 40,
    borderTopRightRadius: 50,
    width: wp(100),
    zIndex: -1,
  },
})
