import AsyncStorage from '@react-native-async-storage/async-storage'
import init from 'react_native_mqtt'
// import { AsyncStorage } from 'react-native';
// import PushNotification from 'react-native-push-notification';
import { useEffect, useState } from 'react'
// import { AsyncStorage } from "react-native";
import { useDispatch, useSelector } from 'react-redux'
export const SET_USER_NAME = 'SET_USER_NAME'
export const SET_USER_EMAIL = 'SET_USER_EMAIL'
export const SET_AUTH_TOKEN = 'SET_AUTH_TOKEN'
export const SET_USER_CAR = 'SET_USER_CAR'
export const SET_USER_FLAT = 'SET_USER_FLAT'
export const SET_MODE_VALUE = 'SET_MODE_VALUE'
export const SET_STATE_VALUE = 'SET_STATE_VALUE'
export const SET_USER_ENERGY = 'SET_USER_ENERGY'
export const SET_USER_POWER = 'SET_USER_POWER'
export const SET_USER_CURRENT = 'SET_USER_CURRENT'
export const SET_USER_PRODUCTKEY = 'SET_USER_PRODUCTKEY'
export const SET_USER_PRODUCT = 'SET_USER_PRODUCT'
export const SET_PUBLIC_CHARGER_TIME = 'SET_PUBLIC_CHARGER_TIME'
import { Client, Message } from 'react-native-paho-mqtt'
import Toast from 'react-native-toast-message'
import { Alert } from 'react-native'

// const [data34, setData34] = useState('')
// const [data123, setData123] = useState('')

const MqqtUrl="ws://34.93.173.35:9001/mqtt"
const ApiURL="https://adminbackendjouls-production.up.railway.app"
// const ApiURL="http://192.168.45.3:5200"

const topic1State = {
  messages: [],
}

const topic2State = {
  messages: [],
}
const topic3State = {
  messages: [],
}

const getCurrenttime=()=>{
  const currentTime = new Date();
  return currentTime.getHours()
}

// const Porduct_Key = useSelector(state => state?.userReducers?.Product)
init({
  size: 10000,
  storageBackend: AsyncStorage,
  defaultExpires: 1000 * 3600 * 24,
  enableCache: true,
  reconnect: true,
  sync: {},
})
const myStorage = {
  setItem: (key, item) => {
    myStorage[key] = item
  },
  getItem: (key) => myStorage[key],
  removeItem: (key) => {
    delete myStorage[key]
  },
}

export const setLoad = (house_voltage) => {
  console.log("house_voltage action",house_voltage)
  return {
    type: SET_USER_NAME,
    payload: house_voltage,
  }
}

export const setProductKey = (Product_Key) => {
  console.log(Product_Key)
  // setPKey(Product_Key);
  return {
    type: SET_USER_PRODUCTKEY,
    payload: Product_Key,
  }
}

export const setPublicChargeTime = (time) => {
  console.log("time",time)
  // setPKey(Product_Key);
  return {
    type: SET_PUBLIC_CHARGER_TIME,
    payload: time,
  }
}

export const setCar = (user_Car) => {
  // console.log(house_voltage);
  return {
    type: SET_USER_CAR,
    payload: user_Car,
  }
}
export const setFlat = (user_Flat) => {
  // console.log(house_voltage);
  return {
    type: SET_USER_FLAT,
    payload: user_Flat,
  }
}
export const setEnergy = (user_Energy) => {
  // console.log(house_voltage);
  return {
    type: SET_USER_ENERGY,
    payload: user_Energy,
  }
}

export const setPower = (user_Energy) => {
  // console.log(house_voltage);
  return {
    type: SET_USER_POWER,
    payload: user_Energy,
  }
}

export const setCurrent = (user_Energy) => {
  // console.log(house_voltage);
  return {
    type: SET_USER_CURRENT,
    payload: user_Energy,
  }
}

export const setEmail = (email) => (dispatch) => {
  dispatch({
    type: SET_USER_EMAIL,
    payload: email,
  })
}

export const SetDate = (user) => {
  return (dispatch) => {
    const { field1: date, field2: time } = user
    // console.log(field1);
    fetch(
      `https://api.thingspeak.com/update?api_key=YC54O11IV85P4S7O&field1=${'schedule_mode_on'}&field3=` +
        JSON.stringify({
          date,
          time,
        }),
      {
        method: 'POST',
        headers: {
          'content-type': 'application/json',
        },
      }
    )
      .then((response) => response.json())
      .then((response) => {
        toast.success(response?.toast)
        // console.log(response, "casdvas")
        if (!response?.success) {
          throw Error(response.error)
        }
      })
      .catch((err) => {
        console.log(err, 'cvdsavs')
      })
  }
}
// ------------------------------------------------SENDING DATA TO MQTT AND NODE JS BOTH ---------------------------------------------------//
export const CarDetails = (value) => {
  return (dispatch) => {
    // console.log(value);
    const [
      { Battery_Pack: batteryPack },
      { Car: car },
      { House_voltage: house_Ampere },
    ] = value
    // fetch("https://api.thingspeak.com/update?api_key=YC54O11IV85P4S7O&field1=" + JSON.stringify({
    //   batteryPack, car, house_Ampere
    // }), {
    //   method: "POST",
    //   headers: {
    //     "content-type": "application/json",
    //   },
    // })
    //   .then((response) => response.json())
    //   .then((response) => {
    //     toast.success(response?.toast)
    //     console.log(response, "casdvas")
    //     if (!response?.success) {
    //       throw Error(response.error)
    //     }
    //   })
    //   .catch((err) => {
    //     console.log(err, "cvdsavs");
    //   });

    const client = new Client({
      uri: 'ws://34.93.62.206:9001/mqtt',
      clientId: 'clientRadhe',
      storage: myStorage,
    })
    // set event handlers
    client.on('connectionLost', (responseObject) => {
      if (responseObject.errorCode !== 0) {
        console.log(responseObject.errorMessage)
      }
    })
    const onConnect = () => {
      client.on('messageReceived', (message) => {
        console.log(message?.payloadString)
      })
    }

    client
      .connect()
      .then(() => {
        // Once a connection has been made, make a subscription and send a message.
        console.log('onConnect')
        return client.subscribe('topic_1')
      })
      .then(() => {
        const message = new Message(batteryPack)
        message.destinationName = 'topic_1'
        const car_data = new Message(car)
        sample.destinationName = 'message'
        const House_voltage = new Message(house_Ampere)
        sample.destinationName = 'message'
        client.send(message)
        client.send(car_data)
        client.send(House_voltage)
      })
      .then(() => {
        onConnect()
      })
      .catch((responseObject) => {
        if (responseObject.errorCode !== 0) {
          console.log('onConnectionLost:' + responseObject.errorMessage)
        }
      })

    fetch(`https://backend-production-e1c2.up.railway.app/api/notes/addnote`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        // "Authorization": AsyncStorage.getItem('Authtoken').replaceAll('"', ""),
      },

      body: JSON.stringify({
        title,
      }),
    })
      .then((response) => response.json())

      .then((response) => {
        toast.success(response?.sucess)

        if (!response?.sucess) {
          throw Error(response.error)
        }
      })
      .catch((err) => {})
  }
}

// ------------------------------------------------------SETTING LOAD DATA TO MQTTT AND NODE JS TOO------------------------------------------//

export const setName = (title) => {
  return (dispatch) => {
    const client = new Client({
      uri: 'ws://34.93.62.206:9001/mqtt',
      clientId: 'client' + Math.random().toString(36).substring(7),
      storage: myStorage,
    })
    // set event handlers
    client.on('connectionLost', (responseObject) => {
      if (responseObject.errorCode !== 0) {
        console.log(responseObject.errorMessage)
      }
    })
    const onConnect = () => {
      client.on('messageReceived', (message) => {
        console.log(message?.payloadString)
      })
    }

    client
      .connect()
      .then(() => {
        console.log('onConnect')
        return client.subscribe('topic_1')
      })
      .then(() => {
        const message = new Message(title)
        message.destinationName = 'topic_1'
        client.send(message)
        client.send(sample)
      })
      .then(() => {
        onConnect()
      })
      .catch((responseObject) => {
        if (responseObject.errorCode !== 0) {
          console.log('onConnectionLost:' + responseObject.errorMessage)
        }
      })

    fetch(`https://backend-production-e1c2.up.railway.app/api/notes/addnote`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        // "Authorization": AsyncStorage.getItem('Authtoken').replaceAll('"', ""),
      },

      body: JSON.stringify({
        title,
      }),
    })
      .then((response) => response.json())

      .then((response) => {
        //  console.log(response.sucess)
        toast.success(response?.sucess)

        if (!response?.sucess) {
          throw Error(response.error)
        }
        //  console.log(response);
      })
      .catch((err) => {
        // setError(err.message);
        //  toast.error(err);
      })

    //   client.onConnectionLost = onConnectionLost;
    //   client.onMessageArrived = onMessageArrived;
  }
}

// ---------------------------------------------------------SENDING MODE DATA TO MQTT ONLY NOT FOR NODE ----------------------------------//

export const Click = (user) => {
  return (dispatch) => {
    const client = new Client({
      uri: 'ws://34.93.62.206:9001/mqtt',
      clientId: 'client' + Math.random().toString(36).substring(7),
      storage: myStorage,
    })
    // set event handlers
    client.on('connectionLost', (responseObject) => {
      if (responseObject.errorCode !== 0) {
        console.log(responseObject.errorMessage)
      }
    })
    const onConnect = () => {
      client.on('messageReceived', (message) => {
        console.log(message?.payloadString)
        dispatch(setAuthtoken(message?.payloadString))
      })
    }

    client
      .connect()
      .then(() => {
        // Once a connection has been made, make a subscription and send a message.
        console.log('onConnect')
        return client.subscribe(`${Porduct_Key}_Notifications`)
      })
      .then(() => {
        const sampleee = {
          'Charging Mode': 'Balanced_Mode',
        }
        const message = new Message(JSON.stringify(user))
        message.destinationName = `${Porduct_Key}_User_ID`
        client.send(message)
      })
      .then(() => {
        onConnect()
      })
      .catch((responseObject) => {
        if (responseObject.errorCode !== 0) {
          console.log('onConnectionLost:' + responseObject.errorMessage)
        }
      })
  }
}

// ----------------------------------------CREATING ACCOUNT DATA--------------------------------------------------------------------------------//

export const loginuser = (input, navigation,setLoading) => {
  // debugger;
  // console.log("harsh", input);
  return async (dispatch) => {
    const lowercaseKeysObject = Object.fromEntries(
      Object.entries(input).map(([key, value]) => [key.toLowerCase(), value])
    );
    const { name, email, password } = lowercaseKeysObject
    // console.log(name);
    try {
      const response = await fetch(
        // `https://backend-production-e1c2.up.railway.app/api/auth/createuser`,
        `${ApiURL}/admin/user/register`,
        // "https://adminbackendjouls-production.up.railway.app/admin/user/register",
        // `http://192.168.45.3:5200/admin/user/register`,
        {
          method: 'POST',
          headers: {
            'content-type': 'application/json',
          },
          body: JSON.stringify({
            name,
            email,
            password,
          }),
        }
      )
        console.log("helo in before");
      const data = await response.json()
      console.log(data, 'data in sign up user')
      if(data?.message=="Email already exists"){
        setLoading(false)
        console.log("email already exist")
        Toast.show({
          text2:data.message,
          position:"top",
          text1Style: { color: 'red', fontSize: 14 },
        })
        return 
      }
      if(data?.message){
        Toast.show({
          text2:data.message,
          position:"top",
        text1Style: { color: 'green', fontSize: 14 },
        })
      }
      if(data?.error){
        Toast.show({
          type: 'error',
          text1: data.error,
          text2: data.error,
          position: 'top',
        })
      }
      // const authtoken = JSON.stringify(data.authtoken).replaceAll('"', '')
      if(data?.authtoken){
        console.log("data.authtoken",data.authtoken);
      const authtoken = JSON.stringify(data.authtoken)
      await AsyncStorage.setItem('Authtoken', authtoken)
      dispatch(setAuthtoken(authtoken))
      }
      setLoading(false)
      navigation.navigate('chargerSelection')
    } catch (err) {
      Toast.show({
        type: 'error',
        text1: "Login Failed",
        text2: 'error in catch',
        text1Style: { color: 'red', fontSize: 14 },
        text1:err,
        position: 'top',
      });
      console.log(err, 'catch ke andr sign up action.js')
    }
  }
}

// ------------------------------------------------------CREATING LOGIN AUTHTOKEN AND SENDING IT -----------------------------------------//

export const signItUp = (field, navigation,setLoading) => {
  return async (dispatch) => {

    const lowercaseKeysObject = Object.fromEntries(
      Object.entries(field).map(([key, value]) => [key.toLowerCase(), value])
    );
    const { email, password } = lowercaseKeysObject
    try {
      const response = await fetch(
        // `https://backend-production-e1c2.up.railway.app/api/auth/login`,
        `${ApiURL}/admin/user/signin`,
        {
          method: 'POST',
          headers: {
            'content-type': 'application/json',
          },
          body: JSON.stringify({
            email,
            password,
          }),
        }
      )

      const data = await response.json()
      console.log(data, 'login data ')
      if(data?.message=="Invalid email or password"){
        setLoading(false)
        Toast.show({
          type: 'error',
          text1Style:{color:"red",fontSize:18},
          text1: "Invalid email or password",
          position: 'top',
        })
        return 
      }
      if(data?.message=="Email not verified"){
        setLoading(false)
        Toast.show({
          type: 'error',
          // text1: data,
          text1Style:{color:"red",fontSize:18},
          text1: "Email not verified",
          position: 'top',
        })
        return 
      }
      if(data?.success){
        setLoading(false)
        Toast.show({
          type: 'success',
          text1: "login Successfull",
          text2: data?.toast,
          text1Style:{color:"green"},
          text2Style:{color:"black"},
          position: 'top',
        })
      }
      // const authtoken = JSON.stringify(data.authtoken).replaceAll('"', '')
      if(data?.authToken){
        const authtoken = JSON.stringify(data.authToken)
        console.log('authtoken', authtoken)
        await AsyncStorage.setItem('Authtoken', authtoken)
        dispatch(setAuthtoken(authtoken))
        Toast.show({
          type: 'success',
          text1: "login Successfull",
          text2: data?.toast,
          text1Style:{color:"green"},
          text2Style:{color:"black"},
          position: 'top',
        })
      }
      setLoading(false)
      navigation.navigate('chargerSelection')
    } catch (err) {
      setLoading(false)
      Toast.show({
        type: 'error',
        text1: "Login Failed",
        text2: 'error in catch',
        text1Style: { color: 'red', fontSize: 14 },
        text1:err,
        position: 'top',
      });
      console.log(err, 'err in login')
    }
  }
}

export const setAuthtoken = (authtoken) => {
  return {
    type: SET_AUTH_TOKEN,
    payload: authtoken,
  }
}
export const setStateValue = (data) => {
  return {
    type: SET_STATE_VALUE,
    payload: data,
  }
}
export const setModeValue = (data) => {
  return {
    type: SET_MODE_VALUE,
    payload: data,
  }
}

// ---------------------------------------------------------------------------------//

export const Clicked = (storingTime, Porduct_Key) => {
  // const Porduct_Key = "D1xL5R7b0pNf6QmK2yP9"; // Replace with your desired value or uncomment the line to use `Product_Key` parameter
  console.log(storingTime, 'this is this')
  return (dispatch) => {
    const client = new Client({
      uri: 'ws://34.93.62.206:9001/mqtt',
      clientId: 'client' + Math.random().toString(36).substring(7),
      storage: myStorage,
    })

    client.on('connectionLost', (responseObject) => {
      if (responseObject.errorCode !== 0) {
        console.log('Connection lost:', responseObject.errorMessage)
      }
    })

    const onConnect = () => {
      client.on('messageReceived', (message) => {
        console.log('Message received:', message?.payloadString)
        dispatch(setAuthtoken(message?.payloadString))
      })
    }

    client
      .connect()
      .then(() => {
        console.log('Connected')
        return client.subscribe(`${Porduct_Key}_Notifications`)
      })
      .then(() => {
        const sampleee = {
          'Charging Mode': 'Eco_Mode',
        }
        const sample = new Message(JSON.stringify(storingTime))
        // const sample = new Message(JSON.stringify(sampleee));
        sample.destinationName = `${Porduct_Key}_Charging Modes`
        client.send(sample)
      })
      .then(() => {
        onConnect()
      })
      .catch((error) => {
        console.log('Error:', error)
      })
  }
}

//----------------------------------------------------------------------------------//

export const EcoMode = (Porduct_Key) => {
  return (dispatch) => {
    const client = new Client({
      uri: 'ws://34.93.62.206:9001/mqtt',
      clientId: 'client' + Math.random().toString(36).substring(7),
      storage: myStorage,
    })
    client.on('connectionLost', (responseObject) => {
      if (responseObject.errorCode !== 0) {
        console.log(responseObject.errorMessage)
      }
    })
    const onConnect = () => {
      client.on('messageReceived', (message) => {
        if (message.destinationName === `${Porduct_Key}_Notifications`) {
          const updatedMessages = [
            ...topic1State.messages,
            message.payloadString,
          ]
          topic1State.messages = updatedMessages
          const sample = message.payloadString
          dispatch(setStateValue(message.payloadString))
          console.log(`${Porduct_Key}_Notifications:`, message.payloadString)
        } else if (message.destinationName === `${Porduct_Key}_Output`) {
          const updatedMessages = [
            ...topic2State.messages,
            message.payloadString,
          ]
          topic2State.messages = updatedMessages
          dispatch(setModeValue(message?.payloadString))
          console.log(`${Porduct_Key}_Output:`, message.payloadString)
        } else if (message.destinationName === `${Porduct_Key}_Energy`) {
          const updatedMessages = [
            ...topic3State.messages,
            message.payloadString,
          ]
          topic3State.messages = updatedMessages
          dispatch(setEnergy(message?.payloadString))
          console.log(`${Porduct_Key}_Energy:`, message.payloadString)
        }
      })
    }

    client
      .connect()
      .then(() => {
        console.log('onConnect')
        return Promise.all([
          client.subscribe(`${Porduct_Key}_Notifications`), // Topic 1
          client.subscribe(`${Porduct_Key}_Output`), // Topic 2
          client.subscribe(`${Porduct_Key}_Energy`), // Topic 3
        ])
      })
      .then(() => {
        const sampleee = {
          'Charging Mode': 'Eco_Mode',
        }
        const sample = new Message(JSON.stringify(sampleee))
        sample.destinationName = `${Porduct_Key}_Charging Modes`
        client.send(sample)
      })
      .then(() => {
        onConnect()
      })
      .catch((responseObject) => {
        if (responseObject.errorCode !== 0) {
          console.log('onConnectionLost:' + responseObject.errorMessage)
        }
      })
  }
}
//---------------------------------------------------------------------------------------------------------------------------//
export const ScheduleMode = (scheduleData, Porduct_Key) => {
  // debugger;
  // const Porduct_Key = Porduct_Keye?.Porduct_Key?.replaceAll('"', '');
  console.log(Porduct_Key, 'coming hear')
  return (dispatch) => {
    const client = new Client({
      uri: 'ws://34.93.62.206:9001/mqtt',
      clientId: 'client' + Math.random().toString(36).substring(7),
      storage: myStorage,
    })
    client.on('connectionLost', (responseObject) => {
      if (responseObject.errorCode !== 0) {
        console.log(responseObject.errorMessage)
      }
    })
    const onConnect = () => {
      client.on('messageReceived', (message) => {
        if (message.destinationName === `${Porduct_Key}_Notifications`) {
          const updatedMessages = [
            ...topic1State.messages,
            message.payloadString,
          ]
          topic1State.messages = updatedMessages
          const sample = message.payloadString
          dispatch(setStateValue(message.payloadString))
          console.log(`${Porduct_Key}_Notifications:`, message.payloadString)
        } else if (message.destinationName === `${Porduct_Key}_Output`) {
          const updatedMessages = [
            ...topic2State.messages,
            message.payloadString,
          ]
          topic2State.messages = updatedMessages
          dispatch(setModeValue(message?.payloadString))
          console.log(`${Porduct_Key}_Output:`, message.payloadString)
        } else if (message.destinationName === `${Porduct_Key}_Energy`) {
          const updatedMessages = [
            ...topic3State.messages,
            message.payloadString,
          ]
          topic3State.messages = updatedMessages
          dispatch(setEnergy(message?.payloadString))
          console.log(`${Porduct_Key}_Energy:`, message.payloadString)
        }
      })
    }

    client
      .connect()
      .then(() => {
        // Once a connection has been made, make a subscription and send a message.
        console.log('onConnect')
        return Promise.all([
          client.subscribe(`${Porduct_Key}_Notifications`), // Topic 1
          client.subscribe(`${Porduct_Key}_Output`), // Topic 2
          client.subscribe(`${Porduct_Key}_Energy`), // Topic 3
        ])
      })
      .then(() => {
        const sample = new Message(JSON.stringify(scheduleData))
        sample.destinationName = `${Porduct_Key}_Charging Modes`
        client.send(sample)
      })
      .then(() => {
        onConnect()
      })
      .catch((responseObject) => {
        if (responseObject.errorCode !== 0) {
          console.log('onConnectionLost:' + responseObject.errorMessage)
        }
      })
  }
}

//-------------------------------------------------------------------------------------------------------------------//

export const BalanceMode = (Porduct_Key) => {
  console.log(Porduct_Key, 'suiii')
  return (dispatch) => {
    const client = new Client({
      uri: 'ws://34.93.62.206:9001/mqtt',
      clientId: 'client' + Math.random().toString(36).substring(7),
      storage: myStorage,
    })
    client.on('connectionLost', (responseObject) => {
      if (responseObject.errorCode !== 0) {
        console.log(responseObject.errorMessage)
      }
    })
    const onConnect = () => {
      client.on('messageReceived', (message) => {
        if (message.destinationName === `${Porduct_Key}_Notifications`) {
          const updatedMessages = [
            ...topic1State.messages,
            message.payloadString,
          ]
          topic1State.messages = updatedMessages
          dispatch(setStateValue(message.payloadString))
          console.log(`${Porduct_Key}_Notifications:`, message.payloadString)
        } else if (message.destinationName === `${Porduct_Key}_Output`) {
          const updatedMessages = [
            ...topic2State.messages,
            message.payloadString,
          ]
          topic2State.messages = updatedMessages
          dispatch(setModeValue(message?.payloadString))
          console.log(`${Porduct_Key}_Output:`, message.payloadString)
        } else if (message.destinationName === `${Porduct_Key}_Energy`) {
          const updatedMessages = [
            ...topic3State.messages,
            message.payloadString,
          ]
          topic3State.messages = updatedMessages
          dispatch(setEnergy(message?.payloadString))
          console.log(`${Porduct_Key}_Energy:`, message.payloadString)
        }
      })
    }

    client
      .connect()
      .then(() => {
        console.log('onConnect')
        return Promise.all([
          client.subscribe(`${Porduct_Key}_Notifications`), // Topic 1
          client.subscribe(`${Porduct_Key}_Output`), // Topic 2
          client.subscribe(`${Porduct_Key}_Energy`), // Topic 3
        ])
      })
      .then(() => {
        const sampleee = {
          'Charging Mode': 'Balanced_Mode',
        }
        const sample = new Message(JSON.stringify(sampleee))
        sample.destinationName = `${Porduct_Key}_Charging Modes`
        client.send(sample)
      })
      .then(() => {
        onConnect()
      })
      .catch((responseObject) => {
        if (responseObject.errorCode !== 0) {
          console.log('onConnectionLost:' + responseObject.errorMessage)
        }
      })
  }
}

// =-------------------------------------------------------------------------------------Stop charging-------------------//

export const StopChargingMode = (Porduct_Key) => {
  return (dispatch) => {
    const client = new Client({
      uri: 'ws://34.93.32.239:9001/mqtt',
      clientId: 'client' + Math.random().toString(36).substring(7),
      storage: myStorage,
    })
    client.on('connectionLost', (responseObject) => {
      if (responseObject.errorCode !== 0) {
        console.log(responseObject.errorMessage)
      }
    })
    client.on('messageReceived', (message) => {
      console.log(message.payloadString)
    })
    const onConnect = () => {
      client.on('messageReceived', (message) => {
        if (message.destinationName === `${Porduct_Key}_Notifications`) {
          const updatedMessages = [
            ...topic1State.messages,
            message.payloadString,
          ]
          topic1State.messages = updatedMessages
          // const sample=message.payloadString
          dispatch(setStateValue(message.payloadString))
          console.log(`${Porduct_Key}_Notifications:`, message.payloadString)
        } else if (message.destinationName === `${Porduct_Key}_Output`) {
          const updatedMessages = [
            ...topic2State.messages,
            message.payloadString,
          ]
          topic2State.messages = updatedMessages
          dispatch(setModeValue(message?.payloadString))
          console.log(`${Porduct_Key}_Output:`, message.payloadString)
        } else if (message.destinationName === `${Porduct_Key}_Energy`) {
          const updatedMessages = [
            ...topic3State.messages,
            message.payloadString,
          ]
          topic3State.messages = updatedMessages
          dispatch(setEnergy(message?.payloadString))
          console.log(`${Porduct_Key}_Energy:`, message.payloadString)
        }
      })
    }

    client
      .connect()
      .then(() => {
        console.log('onConnect')
        return Promise.all([
          client.subscribe(`${Porduct_Key}_Notifications`), // Topic 1
          client.subscribe(`${Porduct_Key}_Output`), // Topic 2
          client.subscribe(`${Porduct_Key}_Energy`), // Topic 3
        ])
      })
      .then(() => {
        const sampleee = {
          'Charging Mode': 'Stop Charging',
        }
        const sample = new Message(JSON.stringify(sampleee))
        sample.destinationName = `${Porduct_Key}_Charging Modes`
        client.send(sample)
      })
      .then(() => {
        onConnect()
      })
      .catch((responseObject) => {
        if (responseObject.errorCode !== 0) {
          console.log('onConnectionLost:' + responseObject)
          StopChargingMode()
        }
      })
  }
}


// ------------------------------------------------------------------- resolve the changes in the py code----------------------------.//

export const ResolveMode = (Porduct_Key) => {
  return (dispatch) => {
    const client = new Client({
      uri: 'ws://34.93.32.239:9001/mqtt',
      clientId: 'client' + Math.random().toString(36).substring(7),
      storage: myStorage,
    })
    // set event handlers
    client.on('connectionLost', (responseObject) => {
      if (responseObject.errorCode !== 0) {
        console.log(responseObject)
      }
    })
    const onConnect = () => {
      client.on('messageReceived', (message) => {
        console.log(message?.payloadString)
        dispatch(setAuthtoken(message?.payloadString))
      })
    }

    client
      .connect()
      .then(() => {
        console.log('onConnect')
        return client.subscribe(`${Porduct_Key}_Notifications`)
      })
      .then(() => {
        const sampleee = {
          'Charging Mode': 'Resolve',
        }
        const sample = new Message(JSON.stringify(sampleee))
        sample.destinationName = `${Porduct_Key}_Charging Modes`
        // client.send(message);
        client.send(sample)
      })
      .then(() => {
        onConnect()
      })
      .catch((responseObject) => {
        if (responseObject.errorCode !== 0) {
          console.log('onConnectionLost:' + responseObject.errorMessage)
        }
      })
  }
}

// ====-----------------------------------------------------------------updatinga--------------------------------------------------------//
export const UpdatName = (ProductId, _id) => {
  return (dispatch) => {
    // debugger;
    AsyncStorage.getItem('Authtoken')
      .then((token) => {
        if (_id !== null) {
          // Check if _id is not null
          fetch(
            `https://backend-production-e1c2.up.railway.app/api/auth/UserInformation/${_id}`,
            {
              method: 'PUT',
              headers: {
                'Content-Type': 'application/json',
                Authorization: token,
              },
              body: JSON.stringify({
                ProductId,
              }),
            }
          )
            .then((response) => response.json())
            .then((response) => {
              console.log(response)
              // dispatch(setProductKey(response))
            })
            .catch((error) => {
              console.error(error)
            })
        }
      })
      .catch((error) => {
        console.error(error)
      })
  }
}

export const notesDataforproduct = () => {
  return (dispatch) => {
    AsyncStorage.getItem('Authtoken')
      .then((token) => {
        fetch(
          `https://backend-production-e1c2.up.railway.app/api/auth/getuser`,
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              Authorization: token,
            },
          }
        )
          .then((response) => response.json())
          .then((response) => {
            dispatch(setProduct(response))
            // setSettingsData(response);
          })
          .catch((error) => {
            console.error(error)
          })
      })
      .catch((error) => {
        console.error(error)
      })
  }
}

export const setProduct = (Product_Key) => {
  console.log(Product_Key)
  // setPKey(Product_Key);
  return {
    type: SET_USER_PRODUCT,
    payload: Product_Key,
  }
}

export const UpdatEverything = (data, _id) => {
  const { state, city, PhoneNo, ProductId, name } = data
  return (dispatch) => {
    AsyncStorage.getItem('Authtoken')
      .then((token) => {
        if (_id !== null) {
          // Check if _id is not null
          fetch(
            `https://backend-production-e1c2.up.railway.app/api/auth/UserInformation/${_id}`,
            {
              method: 'PUT',
              headers: {
                'Content-Type': 'application/json',
                Authorization: token,
              },
              body: JSON.stringify({
                name,
                state,
                city,
                PhoneNo,
                ProductId,
              }),
            }
          )
            .then((response) => response.json())
            .then((response) => {
              console.log(response)
              // dispatch(setProductKey(response))
            })
            .catch((error) => {
              console.error(error)
            })
        }
      })
      .catch((error) => {
        console.error(error)
      })
  }
}

export const SubcribingtoTopic = (topic) => {
  console.log(topic)
  return (dispatch) => {
    if (topic !== null) {
      fetch(`https://backend-production-e1c2.up.railway.app/api/subscriber`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          topic,
        }),
      })
        .then((response) => response.json())
        .then((response) => {
          console.log(response)
          // Handle the response as needed
        })
        .catch((error) => {
          console.error(error)
        })
    }
  }
}

const allClients = [];
// =-------------------------------------------------------------------------------------Start  charging for public-------------------//

export const publicstartCharging = (Porduct_Key,onClose,startTimer,setButtonText,SetstartTime,setcheckChargingStarted,handleStopCharging) => {
// Porduct_Key=publicProductKey
  console.log("Porduct_Key in publick start charging",Porduct_Key)

  return (dispatch) => {
    const client = new Client({
      uri: MqqtUrl,
      clientId: 'client' + Math.random().toString(36).substring(7),
      storage: myStorage,
    })
    client.on('connectionLost', (responseObject) => {
      if (responseObject.errorCode !== 0) {
        console.log(responseObject.errorMessage,"publick start chariging in connect lost in try",responseObject)
        // publicstartCharging(Porduct_Key)
        client
        .connect()
        .then(() => {
          console.log('ReConnect in start charging')
          return Promise.all([
            client.subscribe(`${Porduct_Key}_Updates`), // Topic 1
            client.subscribe(`${Porduct_Key}_Charging_Data`), // Topic 2
          ])
        })
        .then(() => {
          const sample = new Message("Start Charging")
          sample.destinationName = `${Porduct_Key}_Notifications`
          client.send(sample)
        })
        .then(() => {
          onConnect()
        })
      }
    })
    client.on('messageReceived', (message) => {
      console.log("message in on client",message.payloadString)
    })
    const onConnect = () => {
      client.on('messageReceived', (message) => {
        if (message.destinationName === `${Porduct_Key}_Updates`) {
          const updatedMessages = [
            ...topic1State.messages,
            message.payloadString,
          ]
          topic1State.messages = updatedMessages
          console.log("topic1State",topic1State);
          // const sample=message.payloadString
          dispatch(setStateValue(message.payloadString))
          console.log(`${Porduct_Key}_Updates:`, message.payloadString)
           if(message.payloadString=="Charging Started"){
             Alert.alert("charging started")
             setcheckChargingStarted(true)
            const response= getCurrenttime()
            SetstartTime(response)
             setButtonText("Stop Charging")
             startTimer()
             onClose()
          }
          if(message.payloadString=="Charging Completed"){
            Alert.alert("Automatic Disconnect by Device")
            handleStopCharging("Stop Charging","StoppedByDevice")
            disconnectAllClients()

         }
        }
        
        
        else if (message.destinationName === `${Porduct_Key}_Charging_Data`) {
          const updatedMessages = [
            ...topic2State.messages,
            message.payloadString,
          ]
          topic2State.messages = updatedMessages
          // console.log("topic2State",topic2State);
          const dataObject=JSON.parse(message.payloadString)

          dispatch(setEnergy(dataObject.Output_Energy))
          dispatch(setPower(dataObject.Output_Power))
          dispatch(setCurrent(dataObject.Output_Current))
          console.log(`${Porduct_Key}_Charging_Data:`, message.payloadString)
          console.log("message?.payloadString?.Output_Energy",dataObject.Output_Energy);
          console.log("message?.payloadString?.Output_Power",dataObject.Output_Power);
        } 
      })
    }

    client
      .connect()
      .then(() => {
        allClients.push(client);
        console.log('onConnect in start charging')
        return Promise.all([
          client.subscribe(`${Porduct_Key}_Updates`), // Topic 1
          client.subscribe(`${Porduct_Key}_Charging_Data`), // Topic 2
        ])
      })
      .then(() => {
        const sample = new Message("Start Charging")
        sample.destinationName = `${Porduct_Key}_Notifications`
        client.send(sample)
      })
      .then(() => {
        onConnect()
      })
      .catch((responseObject) => {
        if (responseObject.errorCode !== 0) {
          console.log('onConnectionLost: in public start Charging' + responseObject)
          publicstartCharging()
        }
      })
  }
}


// mqtt code for door opening after scan Qr in public charging

export const DoorOpening = (Porduct_Key) => {
  console.log("Porduct_Key door ",Porduct_Key);
  return (dispatch) => {
    const client = new Client({
      uri: MqqtUrl,
      clientId: 'client' + Math.random().toString(36).substring(7),
      storage: myStorage,
    })
    client.on('connectionLost', (responseObject) => {
      if (responseObject.errorCode !== 0) {
        console.log(responseObject.errorMessage,"dooropening in try")
        // DoorOpening(Porduct_Key)
        client
        .connect()
        .then(() => {
          console.log("mqtt reconnect in door opening");
          const sample = new Message("Door is open")
          sample.destinationName = `${Porduct_Key}_Notifications`
          client.send(sample)
        })
      }
    })
    client.on('messageReceived', (message) => {
      console.log("message in on client",message.payloadString)
    })
    client
      .connect()
      .then(() => {
        allClients.push(client);
        console.log("mqtt connect in door opening");
        const sample = new Message("Door is open")
        sample.destinationName = `${Porduct_Key}_Notifications`
        client.send(sample)
      })
      .catch((responseObject) => {
        if (responseObject.errorCode !== 0) {
          console.log('onConnectionLost: door Opening' + responseObject)
          DoorOpening(Porduct_Key)
        }
      })
  }
}

// stop chargin for public

export const publicstopCharging = (Porduct_Key,totalTime,SetEndTime) => {
  // Porduct_Key=publicProductKey
    console.log("Porduct_Key in publickstop charging",Porduct_Key,totalTime)
    return (dispatch) => {
      const client = new Client({
        uri: MqqtUrl,
        clientId: 'client' + Math.random().toString(36).substring(7),
        storage: myStorage,
      })
      client.on('connectionLost', (responseObject) => {
        if (responseObject.errorCode !== 0) {
          console.log(responseObject.errorMessage,"public in stop chargin stop button",responseObject)
          publicstopCharging(Porduct_Key)
        }
      })
      client.on('messageReceived', (message) => {
        console.log("message in on client",message.payloadString)
      })
      const onConnect = () => {
        client.on('messageReceived', (message) => {
          if (message.destinationName === `${Porduct_Key}_Updates`) {
            const updatedMessages = [
              ...topic1State.messages,
              message.payloadString,
            ]
            topic1State.messages = updatedMessages
            console.log("topic1State",topic1State);
            // const sample=message.payloadString
            dispatch(setStateValue(message.payloadString))
            console.log(`${Porduct_Key}_Updates:`, message.payloadString)
             if(message.payloadString=="Charging Completed"){
              const response=getCurrenttime()
              Alert.alert(`Charging Completed ${totalTime}`)
              SetEndTime(response)
               disconnectAllClients();
            }
            client.disconnect();
          console.log('Disconnected from MQTT broker');
          }
        })
      }
      client
        .connect()
        .then(() => {
          console.log('onConnect in stop charging')
          return Promise.all([
            client.subscribe(`${Porduct_Key}_Updates`), // Topic 1
          ])  
        })
        .then(() => {
          const sample = new Message("Stop Charging")
          sample.destinationName = `${Porduct_Key}_Notifications`
          client.send(sample)
        })
        .then(() => {
          onConnect()
        })
        .catch((responseObject) => {
          if (responseObject.errorCode !== 0) {
            console.log('onConnectionLost:' + responseObject)
            publicstopCharging(Porduct_Key)
          }
        })
    }
  }


  function disconnectAllClients() {
    allClients.forEach((client) => {
      if (client.isConnected()) {
        client.disconnect();
        console.log("disconeect function all client disconnected");
      }
    });
    // Clear the list of clients
    allClients.length = 0;
  }