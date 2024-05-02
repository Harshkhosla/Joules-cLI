import React, { useEffect, useState } from 'react'
import { View, ActivityIndicator, StyleSheet } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useDispatch, useSelector } from 'react-redux'
import { GetChargerHistory, setChargerHistoryPid, setChargingStarted } from '../Redux/Action'
import { fetchDataAsyncStorageData } from '../utility/asyncStorage'

const AuthLoadingScreen = ({ navigation }) => {
  let chargerhistoryData = useSelector((state) => state?.userReducers?.ChargerHistoryData)
  const [mid,setMid]=useState("")
  console.log("midmid",mid);
  const [token,setToken]=useState("")
  const [loading,setLoading]=useState(true)
  const [IsapiCall,setIsapiCall]=useState(false)
  console.log("chargerhistoryDatachargerhistoryData",chargerhistoryData);
  // const mid="MID1714586025767578"
  const populateChargerHistoryData=true
  const lastchargerhistory=true
const dispatch=useDispatch()
useEffect(()=>{
  if(IsapiCall && mid)
  setLoading(true)
  if(mid){
    dispatch(GetChargerHistory(navigation,mid,populateChargerHistoryData,lastchargerhistory))
  }
  setLoading(false)
},[dispatch,mid,IsapiCall])
 

useEffect(() => {
  const fetchData = async () => {
    try {
      const { storedData, ChargingStartedValue, Appmid, Authtoken } = await fetchDataAsyncStorageData();
      console.log(storedData, ChargingStartedValue, Appmid, Authtoken);
      console.log("Appmid",Appmid);
      if(Appmid){
        setMid(Appmid)
      }
      if(Authtoken){
        setToken(Authtoken)
      }
      if(!Authtoken || !Appmid){
        navigation.replace('SignIn')
      }
      setIsapiCall(true)
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  fetchData(); // Call the async function immediately
}, []);


useEffect(()=>{
  setTimeout(() => {
    if(!loading && IsapiCall){
      console.log("chargerhistoryDatachargerhistoryDatachargerhistoryData",chargerhistoryData);
    if(chargerhistoryData.length==0 || chargerhistoryData[0]?.chargerStatus=="Charging Completed" && token){
      dispatch(setChargingStarted(false))
      dispatch(setChargerHistoryPid(""))
      navigation.replace('chargerSelection')
      console.log("navigate to chatger slec");
    }
    else if(chargerhistoryData[0]?.chargerStatus=="Charging Started" && token){
      dispatch(setChargingStarted(true))
      dispatch(setChargerHistoryPid(chargerhistoryData[0]?.pid))
      navigation.replace('Newhome')
    }
  }
  }, 2000);
  
},[chargerhistoryData,navigation,token,loading,IsapiCall])

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
      {/* Add your loading component here */}
      <ActivityIndicator size="large" color="#0000ff" />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
})

export default AuthLoadingScreen
