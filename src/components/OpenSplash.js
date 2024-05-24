import React, { useEffect, useState } from 'react'
import { View, ActivityIndicator, Image, StyleSheet, Alert, TouchableOpacity, Platform, Linking } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useDispatch, useSelector } from 'react-redux'
import {
  GetChargerHistory,
  getUserData,
  setChargerHistoryPid,
  setChargingStarted,
  setMIDValue,
  updateUser,
} from '../Redux/Action'
import { fetchDataAsyncStorageData } from '../utility/asyncStorage'
import CustomModal from './CustomModal'
import { Text } from 'react-native-paper'
import UpdateRecommend from '../screens/Public_Charging/UpdateRecommend'


const AuthLoadingScreen = ({ navigation }) => {
  const [isModalVisible, setisModalVisible] = useState(false)

const [version, SetVersioncode]=useState("")
  let versioncode  = useSelector((state) => state?.userReducers?.versionName)
  console.log(versioncode,"sdkhjdsvbvhjbdsvj");

  
  const [mid, setMid] = useState('')
  console.log('midmid', mid)
  const [token, setToken] = useState('')

  // console.log("chargerhistoryDatachargerhistoryData",chargerhistoryData);
  // const mid="MID1714586025767578"
  const populateChargerHistoryData = true
  const lastchargerhistory = true
  const dispatch = useDispatch()
 
const versionFunction =async (mid)=>{
  try {
    const data = await dispatch(getUserData(mid))
    // SetVersioncode(data?.version)
    console.log('userdataradhe', data?.version)
    
  console.log(versioncode,"versioncode true1");
  console.log(data?.version,"versioncode true2");
  console.log(versioncode!==data?.version,"versioncode true3");
  if (versioncode !== data?.version) {
  console.log("opening the modal for the update ");
  setisModalVisible(true)
    return false ;
} else {
  console.log(mid, "dskhjsdvb");
  // const updatedData = {
  //     version: versioncode,
  //     mid: storedMid,
  // };
  // dispatch(updateUser(updatedData, navigation));
    return true;
}
  } catch (error) {
    console.error('Error fetching data:', error)
  }
   
}


  useEffect(() => {
    const fetchData = async () => {
      try {
        const { storedData, ChargingStartedValue, Appmid, Authtoken } =
          await fetchDataAsyncStorageData()
        console.log(storedData, ChargingStartedValue, Appmid, Authtoken)
        console.log('Appmid', Appmid)
        
        if (Appmid) {
          dispatch(setMIDValue(Appmid))
          setMid(Appmid)
        }
        if (Authtoken) {
          setToken(Authtoken)
        }
        if (!Authtoken || !Appmid) {
          navigation.replace('SignIn')
          return
        }

        // console.log("versioncode",versioncode,version);
      
        const versionsame =await versionFunction(Appmid);
        console.log("ddslkvdskjnvds",versionsame);
        if(!versionsame) return

        fetchChargerHistory(Appmid)
        
      } catch (error) {
        console.error('Error fetching data:', error)
      }
    }

    fetchData() // Call the async function immediately
  }, [])

  // useEffect(()=>{
  //   setTimeout(() => {
  //     if(!loading && IsapiCall){
  //       console.log("chargerhistoryDatachargerhistoryDatachargerhistoryData",chargerhistoryData);
  //     if(chargerhistoryData.length==0 || chargerhistoryData[0]?.chargerStatus=="Charging Completed" && token){
  //       dispatch(setChargingStarted(false))
  //       dispatch(setChargerHistoryPid(""))
  //       navigation.replace('chargerSelection')
  //       console.log("navigate to chatger slec");
  //     }
  //     else if(chargerhistoryData[0]?.chargerStatus=="Charging Started" && token){
  //       dispatch(setChargingStarted(true))
  //       dispatch(setChargerHistoryPid(chargerhistoryData[0]?.pid))
  //       navigation.replace('Newhome')
  //     }
  //   }
  //   }, 2000);

  // },[chargerhistoryData,navigation,token,loading,IsapiCall])

  const fetchChargerHistory = async (Appmid) => {
    const response = await dispatch(
      GetChargerHistory(
        navigation,
        Appmid,
        populateChargerHistoryData,
        lastchargerhistory
      )
    )
    console.log('response', response)
    if (response) {
      navigateto(response)
    }
  }

  const navigateto = (chargerhistoryData) => {
    // if(!loadi){
    console.log(
      'chargerhistoryDatachargerhistoryDatachargerhistoryData',
      chargerhistoryData,
      chargerhistoryData[0]?.chargerStatus
    )
    if (
      chargerhistoryData.length == 0 ||
      chargerhistoryData[0]?.chargerStatus == 'Charging Completed'
    ) {
      dispatch(setChargingStarted(false))
      dispatch(setChargerHistoryPid(''))
      navigation.replace('chargerSelection') //stop by nv
      console.log('navigate to chatger slec')
    } else if (chargerhistoryData[0]?.chargerStatus == 'Charging Started') {
      dispatch(setChargingStarted(true))
      dispatch(setChargerHistoryPid(chargerhistoryData[0]?.pid))
      navigation.replace('Newhome')
    }
    // }
  }

  // useEffect(() => {
  //   const checkSignInStatus = async () => {
  //     try {
  //       const [[, userToken], [, IsChargingStarted]] = await AsyncStorage.multiGet(['Authtoken', 'ChargingStarted']);

  //       // Check if user is signed in and charging has started
  //       const isSignedIn = userToken && IsChargingStarted === 'true';
  //       console.log("userToken",userToken,IsChargingStarted);
  //       if (isSignedIn) {
  //         navigation.replace('Newhome');
  //       } else if (userToken) {
  //         navigation.replace('chargerSelection');
  //       } else {
  //         navigation.replace('SignIn');
  //       }
  //     } catch (error) {
  //       console.error('Error fetching userToken:', error);
  //     }
  //   };

  //   checkSignInStatus();
  // }, [navigation]);
  
  const redirectToApp = () => {
    // Seedha app ka package name ko scheme ke roop mein daalein.
    const packageName = 'com.Jouls';

    // Package name ko seedha URL ke saath jodein.
    const appUrl = 'market://details?id=' + packageName;

    // URL ko open karein.
    Linking.openURL(appUrl)
      .catch((err) => console.error('An error occurred', err));
  };

  // useEffect(() => {
  //   const unsubscribe = navigation.addListener('focus', () => {
  //     // Call your function to refresh here
  //     // For example, fetchData();
  //     console.log("in vapis playstore in opensplash");
  //   });

  //   return unsubscribe;
  // }, [navigation]);
  
  return (
    <View style={styles.container}>
    <Image source={require('../assets/jouls.png')} style={styles.image} />
    <ActivityIndicator size="large" color="#118615" />
   <UpdateRecommend 
   navigation={navigation}
   open={isModalVisible}
   handleUpdate={redirectToApp}
   />
  </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: 200,
    height: 80,
    resizeMode: 'cover',
  },
  buttonContainer: {
    marginTop: 20,
  },
  button: {
    backgroundColor: '#6C6C6C',
    padding: 10,
    borderRadius: 10,
  },
  text: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: 'bold',
  },
})

export default AuthLoadingScreen
