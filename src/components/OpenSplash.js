import React, { useEffect, useState } from 'react'
import { View, ActivityIndicator, Image, StyleSheet, Alert } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useDispatch, useSelector } from 'react-redux'
import {
  GetChargerHistory,
  getUserData,
  setChargerHistoryPid,
  setChargingStarted,
  updateUser,
} from '../Redux/Action'
import { fetchDataAsyncStorageData } from '../utility/asyncStorage'
import CustomModal from './CustomModal'
import { Text } from 'react-native-paper'


const AuthLoadingScreen = ({ navigation }) => {
  const [isModalVisible, setisModalVisible] = useState(false)

const [version,SetVersioncode]=useState("")
  let versioncode  = useSelector((state) => state?.userReducers?.versionName)
  console.log(versioncode,"sdkhjdsvbvhjbdsvj");

  // const fetchData = async () => {
  //   try {
  //     const storedMid = await AsyncStorage.getItem('mid')
  //     const data = await dispatch(getUserData(storedMid))
  //     SetVersioncode(data?.version)
  //     console.log('userdataradhe', data?.version)
  //   } catch (error) {
  //     console.error('Error fetching data:', error)
  //   }
  // }
  // useEffect(()=>{
  //   fetchData();
  // },[])
  const [mid, setMid] = useState('')
  console.log('midmid', mid)
  const [token, setToken] = useState('')
  const [loading, setLoading] = useState(true)
  const [IsapiCall, setIsapiCall] = useState(false)
  // console.log("chargerhistoryDatachargerhistoryData",chargerhistoryData);
  // const mid="MID1714586025767578"
  const populateChargerHistoryData = true
  const lastchargerhistory = true
  const dispatch = useDispatch()
  // useEffect(()=>{
  //   if(IsapiCall && mid)
  //   setLoading(true)
  //   if(mid){
  //     dispatch(GetChargerHistory(navigation,mid,populateChargerHistoryData,lastchargerhistory))
  //   }
  //   setLoading(false)
  // },[dispatch,mid,IsapiCall])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { storedData, ChargingStartedValue, Appmid, Authtoken } =
          await fetchDataAsyncStorageData()
        console.log(storedData, ChargingStartedValue, Appmid, Authtoken)
        console.log('Appmid', Appmid)
        if (Appmid) {
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
        // if (versioncode!==version) {
        //   // dispatch(updateUser(updatedData))
        //   navigation.replace('chargerSelection')
        //   return ;
        // }

        // const storedMid = await AsyncStorage.getItem('mid')
        // console.log(storedMid,"dskhjsdvb");
        // const updatedData = {
        //   version: versioncode,
        //   mid: mid,
        // }
        // dispatch(updateUser(updatedData,navigation))
        console.log("ddslkvdskjnvds",versioncode!==version);
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

  return (
    <View style={styles.container}>
      <Image source={require('../assets/jouls.png')} style={styles.image} />
      <ActivityIndicator size="large" color="#118615" />
      <CustomModal
        visible={isModalVisible}
        onClose={() => setisModalVisible(false)}
      >
        <Text>Currently Not Available</Text>
      </CustomModal>
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
})

export default AuthLoadingScreen
