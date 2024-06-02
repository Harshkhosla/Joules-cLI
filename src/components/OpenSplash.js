import React, { useEffect, useState } from 'react'
import {
  View,
  ActivityIndicator,
  Image,
  StyleSheet,
  Alert,
  TouchableOpacity,
  Platform,
  Linking,
  PermissionsAndroid,
} from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import {
  GetChargerHistory,
  getUserData,
  setChargerHistoryPid,
  setChargingStarted,
  setDeviceToken,
  setMIDValue,
  updateUser,
} from '../Redux/Action'
import { configureNotifications, fetchDataAsyncStorageData, getUserDeviceToken, redirectToApp } from '../utility/asyncStorage'
import CustomModal from './CustomModal'
import messaging from '@react-native-firebase/messaging'
import UpdateRecommend from '../screens/Public_Charging/UpdateRecommend'
import PushNotification from 'react-native-push-notification';
// import PermissionModal from './PermissionModal'

const AuthLoadingScreen = ({ navigation }) => {
  const [isModalVisible, setisModalVisible] = useState(false)
  let versioncode = useSelector((state) => state?.userReducers?.versionName)
  
  const populateChargerHistoryData = true
  const lastchargerhistory = true
  const dispatch = useDispatch()

  const versionFunction = async (mid) => {
    try {
      const data = await dispatch(getUserData(mid))

      console.log('userdataradhe', data?.version)

      console.log(versioncode, 'versioncode true1')
      console.log(data?.version, 'versioncode true2')
      console.log(versioncode !== data?.version, 'versioncode true3')
      if (versioncode !== data?.version) {
        console.log('opening the modal for the update ')
        setisModalVisible(true)
        return false
      } else {
        console.log(mid, 'dskhjsdvb')
        return true
      }
    } catch (error) {
      console.error('Error fetching data:', error)
    }
  }
  useEffect(() => {
    const fetchData = async () => {
      try {
        const { storedData, Appmid, Authtoken } =
          await fetchDataAsyncStorageData()
        console.log(storedData, Appmid, Authtoken)
        console.log('Appmid', Appmid)
        const NotificationPermisssion=await checkApplicationPermission()
        if(NotificationPermisssion){
          const token = await getUserDeviceToken()
          dispatch(setDeviceToken(token))
          configureNotifications()
        }
        console.log(NotificationPermisssion,"NotificationPermisssion");
        if (!Authtoken || !Appmid) {
          navigation.replace('SignIn')
          return
        }

        dispatch(setMIDValue(Appmid))
          
        const versionsame = await versionFunction(Appmid)
        console.log('ddslkvdskjnvds', versionsame)
        if (!versionsame) return

        fetchChargerHistory(Appmid)
      } catch (error) {
        console.error('Error fetching data:', error)
      }
    }

    fetchData() // Call the async function immediately
  }, [])

  const checkApplicationPermission = async () => {
    if (Platform.OS === 'android') {
      try {
        const status = await PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS);
        if (status) {
          console.log("Permission already granted");
          return true; // Permission granted
        } else {
          const result = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS,
          );
          console.log("Result", result);
          if (result === PermissionsAndroid.RESULTS.GRANTED) {
            return true; // Permission granted
          } else if (result === PermissionsAndroid.RESULTS.NEVER_ASK_AGAIN) {
            Alert.alert(
              "Permission Required",
              "Notification permission is required for this app to function correctly. Please enable it in the app settings.",
              [
                { text: "Open Settings", onPress: () => Linking.openSettings() }
              ]
            );
            return false; // Permission denied with "never ask again"
          } else {
            return false; // Permission denied
          }
        }
      } catch (error) {
        console.error("Permission request error", error);
        return false; // Error in permission request
      }
    }
    return false; // Not an Android platform
  }

 
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

  

  return (
    <View style={styles.container}>
      <Image source={require('../assets/jouls.png')} style={styles.image} />
      <ActivityIndicator size="large" color="#118615" />
      <UpdateRecommend
        navigation={navigation}
        open={isModalVisible}
        handleUpdate={redirectToApp}
      />
       {/* <PermissionModal
        visible={modalVisible}
        onRequestPermission={requestPermission}
        onCancel={() => setModalVisible(false)}
      /> */}
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


// useEffect(() => {
  //   checkApplicationPermission();
  // }, []);
  // useEffect(() => {
  //   const checkPermission = async () => {
  //     const authStatus = await messaging().hasPermission();
  //     const enabled =
  //     authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
  //     authStatus === messaging.AuthorizationStatus.PROVISIONAL;
      
  //     console.log("authstatus",authStatus,enabled);
  //     if (!enabled) {
  //       setModalVisible(true);
  //     } else {
  //       // Optionally, get the token immediately if permissions are already granted
  //       const token = await messaging().getToken();
  //       console.log('FCM token:', token);
  //     }
  //   };

  //   checkPermission();
  // }, []);
  // useEffect(() => {
  //   getMsgToken()
  // }, [])

  // const getMsgToken = async () => {
  //   try {
  //     // Register the device for remote messages
  //     await messaging().registerDeviceForRemoteMessages()

  //     // Get the FCM token
  //     const token = await messaging().getToken()
  //     console.log('FCM token:', token)

  //     if (token) {
  //       try {
  //         // Example notification content
  //         const notificationContent = {
  //           title: 'Notification Title',
  //           body: 'Notification Body',
  //           token: token,
  //         }

  //         // Make a POST request to your server with the notification content
  //         const response = await fetch('http://192.168.177.108:5000', {
  //           method: 'POST',
  //           headers: {
  //             'Content-Type': 'application/json',
  //           },
  //           body: JSON.stringify(notificationContent),
  //         })

  //         if (response.ok) {
  //           const data = await response.json()
  //           console.log('Data from server:', data)
  //         } else {
  //           console.log('Server responded with status:', response.status)
  //         }
  //       } catch (error) {
  //         console.log('Fetch error:', error.message)
  //       }
  //     }
  //   } catch (error) {
  //     console.log('FCM error:', error)
  //   }
  // }

  // const getMsgToken = async () => {
  //   try {
  //     await messaging().registerDeviceForRemoteMessages()
  //     const token = await messaging().getToken()
  //     console.log('msg token=====>:', token)
  //     if (token) {
  //       try {
  //         const response = await fetch(`http://192.168.177.108:5000`)
  //         if (response.ok) {
  //           const data = await response.json()
  //           console.log('data=====>', data)
  //         } else {
  //           console.log('Server responded with status=====>:', response.status)
  //         }
  //       } catch (error) {
  //         console.log('Fetch error====>', error.message)
  //       }
  //     }
  //   } catch (error) {
  //     console.log('msg error====>', error)
  //   }
  // }

  // useEffect(()=>{