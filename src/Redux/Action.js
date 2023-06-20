import AsyncStorage from "@react-native-async-storage/async-storage";
import init from 'react_native_mqtt';
// import { AsyncStorage } from 'react-native';
// import PushNotification from 'react-native-push-notification';
import { useState } from "react";
export const SET_USER_NAME = "SET_USER_NAME";
export const SET_USER_EMAIL = "SET_USER_EMAIL";
export const SET_AUTH_TOKEN = "SET_AUTH_TOKEN";
export const SET_USER_CAR = "SET_USER_CAR";
export const SET_USER_FLAT = "SET_USER_FLAT";
export const SET_MODE_VALUE = "SET_MODE_VALUE";
export const SET_STATE_VALUE = "SET_STATE_VALUE";
export const SET_USER_ENERGY = "SET_USER_ENERGY";
import { Client, Message } from 'react-native-paho-mqtt';
import Toast from 'react-native-toast-message';

const [data34, setData34] = useState("")
const [data123, setData123] = useState("")


const topic1State = {
  messages: [],
};

const topic2State = {
  messages: [],
};
const topic3State = {
  messages: [],
};


init({
  size: 10000,
  storageBackend: AsyncStorage,
  defaultExpires: 1000 * 3600 * 24,
  enableCache: true,
  reconnect: true,
  sync : {
  }
});
const myStorage = {
  setItem: (key, item) => {
    myStorage[key] = item;
  },
  getItem: (key) => myStorage[key],
  removeItem: (key) => {
    delete myStorage[key];
  },
};



export const setLoad = (house_voltage) => {
  console.log(house_voltage);
  return {
    type: SET_USER_NAME,
    payload: house_voltage
  }
}
export const setCar = (user_Car) => {
  // console.log(house_voltage);
  return {
    type: SET_USER_CAR,
    payload: user_Car
  }
}
export const setFlat = (user_Flat) => {
  // console.log(house_voltage);
  return {
    type: SET_USER_FLAT,
    payload: user_Flat
  }
}
export const setEnergy = (user_Energy) => {
  // console.log(house_voltage);
  return {
    type: SET_USER_ENERGY,
    payload: user_Energy
  }
}

export const setEmail = email => dispatch => {
  dispatch({
    type: SET_USER_EMAIL,
    payload: email
  })
}

export const SetDate = (user) => {
  return (dispatch) => {

    const { field1: date, field2: time } = user;
    // console.log(field1);
    fetch(`https://api.thingspeak.com/update?api_key=YC54O11IV85P4S7O&field1=${"schedule_mode_on"}&field3=` + JSON.stringify({
      date, time
    }), {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((response) => {
        toast.success(response?.toast)
        // console.log(response, "casdvas")
        if (!response?.success) {
          throw Error(response.error)
        }
      })
      .catch((err) => {
        console.log(err, "cvdsavs");
      });
  }
}
// ------------------------------------------------SENDING DATA TO MQTT AND NODE JS BOTH ---------------------------------------------------//
export const CarDetails = (value) => {
  return (dispatch) => {
    // console.log(value);
    const [{ Battery_Pack: batteryPack }, { Car: car }, { House_voltage: house_Ampere }] = value;
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


    const client = new Client({ uri:  'ws://34.93.62.206:9001/mqtt', clientId: "client" + Math.random().toString(36).substring(7), storage: myStorage });
    // set event handlers
    client.on('connectionLost', (responseObject) => {
      if (responseObject.errorCode !== 0) {
        console.log(responseObject.errorMessage);
      }
    });
    const onConnect = () => {

      client.on('messageReceived', (message) => {
        console.log(message?.payloadString);
      });
    }

    client.connect()
      .then(() => {
        // Once a connection has been made, make a subscription and send a message.
        console.log('onConnect');
        return client.subscribe('topic_1');
      })
      .then(() => {
        const message = new Message(batteryPack);
        message.destinationName = 'topic_1';
        const car_data = new Message(car);
        sample.destinationName = 'message';
        const House_voltage = new Message(house_Ampere);
        sample.destinationName = 'message';
        client.send(message);
        client.send(car_data);
        client.send(House_voltage);
      }).then(() => {
        onConnect()
      })
      .catch((responseObject) => {
        if (responseObject.errorCode !== 0) {
          console.log('onConnectionLost:' + responseObject.errorMessage);
        }
      })

    fetch(`https://backend-production-e1c2.up.railway.app/api/notes/addnote`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
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
      .catch((err) => {

      })
  }
}






// ------------------------------------------------------SETTING LOAD DATA TO MQTTT AND NODE JS TOO------------------------------------------//



export const setName = (title) => {
  return (dispatch) => {

    const client = new Client({ uri:  'ws://34.93.62.206:9001/mqtt', clientId: "client" + Math.random().toString(36).substring(7), storage: myStorage });
    // set event handlers
    client.on('connectionLost', (responseObject) => {
      if (responseObject.errorCode !== 0) {
        console.log(responseObject.errorMessage);
      }
    });
    const onConnect = () => {

      client.on('messageReceived', (message) => {
        console.log(message?.payloadString);
      });
    }

    client.connect()
      .then(() => {
        console.log('onConnect');
        return client.subscribe('topic_1');
      })
      .then(() => {
        const message = new Message(title);
        message.destinationName = 'topic_1';
        client.send(message);
        client.send(sample);
      }).then(() => {
        onConnect()
      })
      .catch((responseObject) => {
        if (responseObject.errorCode !== 0) {
          console.log('onConnectionLost:' + responseObject.errorMessage);
        }
      })

    fetch(`https://backend-production-e1c2.up.railway.app/api/notes/addnote`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
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

    const client = new Client({ uri:  'ws://34.93.62.206:9001/mqtt', clientId: "client" + Math.random().toString(36).substring(7), storage: myStorage });
    // set event handlers
    client.on('connectionLost', (responseObject) => {
      if (responseObject.errorCode !== 0) {
        console.log(responseObject.errorMessage);
      }
    });
    const onConnect = () => {

      client.on('messageReceived', (message) => {
        console.log(message?.payloadString);
        dispatch(setAuthtoken(message?.payloadString));
      });
    }

    client.connect()
      .then(() => {
        // Once a connection has been made, make a subscription and send a message.
        console.log('onConnect');
        return client.subscribe('Jouls_Ecotech_User_Notifications');
      })
      .then(() => {
        const sampleee = {
          "Charging Mode": "Balanced_Mode"
        }
        const message = new Message(JSON.stringify(user));
        message.destinationName = 'Jouls_Ecotech_User_ID';
        client.send(message);
      }).then(() => {
        onConnect()
      })
      .catch((responseObject) => {
        if (responseObject.errorCode !== 0) {
          console.log('onConnectionLost:' + responseObject.errorMessage);
        }
      })
  }
}






// ----------------------------------------CREATING ACCOUNT DATA--------------------------------------------------------------------------------//





export const loginuser = (input, navigation) => {
  // debugger;
  // console.log("harsh", input);
  return async (dispatch) => {
    const { name, email, password } = input;
    try {
      const response = await fetch(`https://backend-production-e1c2.up.railway.app/api/auth/createuser`, {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          password,
        }),
      });



      const data = await response.json();
      console.log(data, "casdvas");
      const authtoken = JSON.stringify(data.authtoken).replaceAll('"', '');
      await AsyncStorage.setItem("Authtoken", authtoken);
      dispatch(setAuthtoken(authtoken));
      if (!data?.success) {
        Toast.show({
          type: 'success',
          text1: data.error,
          text2:  data.error,
          position: 'bottom',
        });
        throw new Error(data.error);
      }
      navigation.navigate('Datainput');
    } catch (err) {
      // Toast.show({
      //   type: 'success',
      //   // text1: err,
      //   text2: 'jutblly!',
      //   position: 'bottom',
      // });
      console.log(err, "cvdsavs");
    }

  }
}


// ------------------------------------------------------CREATING LOGIN AUTHTOKEN AND SENDING IT -----------------------------------------//




export const signItUp = (field, navigation) => {
  return async (dispatch) => {
    const { email, password } = field;

    try {
      const response = await fetch(`https://backend-production-e1c2.up.railway.app/api/auth/login`, {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      const data = await response.json();
      console.log(data, "casdvas");
      Toast.show({
        type: 'success',
        // text1: data,
        text2: 'Operation completed successfully!',
        position: 'bottom',
      });
      const authtoken = JSON.stringify(data.authtoken).replaceAll('"', '');
      await AsyncStorage.setItem("Authtoken", authtoken);
      dispatch(setAuthtoken(authtoken));

      if (!data?.success) {
        throw new Error(data.error);
      }
      navigation.navigate('Home');
    } catch (err) {
      Toast.show({
        type: 'success',
        // text1: err,
        text2: 'Operation completed successfully!',
        position: 'bottom',
      });
      console.log(err, "cvdsavs");
    }
  };
};




export const setAuthtoken = (authtoken) => {
  return {
    type: SET_AUTH_TOKEN,
    payload: authtoken
  }
}
export const setStateValue = (data) => {
  return {
    type: SET_STATE_VALUE,
    payload: data
  }
}
export const setModeValue = (data) => {
  return {
    type: SET_MODE_VALUE,
    payload: data
  }
}



// ---------------------------------------------------------------------------------//



export const Clicked = (user) => {
  return (dispatch) => {
    const client = new Client({ uri:  'ws://34.93.62.206:9001/mqtt', clientId: "client" + Math.random().toString(36).substring(7), storage: myStorage });
    client.on('connectionLost', (responseObject) => {
      if (responseObject.errorCode !== 0) {
        console.log(responseObject.errorMessage);
      }
    });
    const onConnect = () => {

      client.on('messageReceived', (message) => {
        console.log(message?.payloadString);
        dispatch(setAuthtoken(message?.payloadString));
      });
    }

    client.connect()
      .then(() => {
        console.log('onConnect');
        return client.subscribe('Jouls_Ecotech_User_Notifications');
      })
      .then(() => {
        const sample = new Message(JSON.stringify(user));
        sample.destinationName = 'Jouls_Ecotech_User_Charging Modes';
        client.send(sample);
      }).then(() => {
        onConnect()
      })
      .catch((responseObject) => {
        if (responseObject.errorCode !== 0) {
          console.log('onConnectionLost:' + responseObject.errorMessage);
        }
      })
  }
}




//----------------------------------------------------------------------------------//

export const EcoMode = (user) => {
  return (dispatch) => {
    const client = new Client({ uri:  'ws://34.93.62.206:9001/mqtt', clientId: "client" + Math.random().toString(36).substring(7), storage: myStorage });
    client.on('connectionLost', (responseObject) => {
      if (responseObject.errorCode !== 0) {
        console.log(responseObject.errorMessage);
      }
    });
    const onConnect = () => {

      client.on('messageReceived', (message) => {
        if (message.destinationName === 'Jouls_Ecotech_User_Notifications') {
          const updatedMessages = [...topic1State.messages, message.payloadString];
          topic1State.messages = updatedMessages;
          const sample = message.payloadString
          dispatch(setStateValue(message.payloadString));
          console.log('Jouls_Ecotech_User_Notifications:', message.payloadString);
        } else if (message.destinationName === 'Jouls_Ecotech_User_Output') {
          const updatedMessages = [...topic2State.messages, message.payloadString];
          topic2State.messages = updatedMessages;
          dispatch(setModeValue(message?.payloadString));
          console.log('Jouls_Ecotech_User_Output:', message.payloadString);
        } else if (message.destinationName === 'Jouls_Ecotech_User_Energy') {
          const updatedMessages = [...topic3State.messages, message.payloadString];
          topic3State.messages = updatedMessages;
          dispatch(setEnergy(message?.payloadString));
          console.log('Jouls_Ecotech_User_Energy:', message.payloadString);
        }
      });
    }

    client.connect()
      .then(() => {
        console.log('onConnect');
        return Promise.all([
          client.subscribe('Jouls_Ecotech_User_Notifications'), // Topic 1
          client.subscribe('Jouls_Ecotech_User_Output'), // Topic 2
          client.subscribe('Jouls_Ecotech_User_Energy') // Topic 3
        ]);
      })
      .then(() => {
        const sampleee = {
          "Charging Mode": "Eco_Mode"
        }
        const sample = new Message(JSON.stringify(sampleee));
        sample.destinationName = 'Jouls_Ecotech_User_Charging Modes';
        client.send(sample);
      }).then(() => {
        onConnect()
      })
      .catch((responseObject) => {
        if (responseObject.errorCode !== 0) {
          console.log('onConnectionLost:' + responseObject.errorMessage);
        }
      })
  }
}
//---------------------------------------------------------------------------------------------------------------------------//
export const ScheduleMode = (user) => {
  // debugger;
  console.log(user, "coming hear");
  return (dispatch) => {

    const client = new Client({ uri:  'ws://34.93.62.206:9001/mqtt', clientId: "client" + Math.random().toString(36).substring(7), storage: myStorage });
    client.on('connectionLost', (responseObject) => {
      if (responseObject.errorCode !== 0) {
        console.log(responseObject.errorMessage);
      }
    });
    const onConnect = () => {

      client.on('messageReceived', (message) => {
        if (message.destinationName === 'Jouls_Ecotech_User_Notifications') {
          const updatedMessages = [...topic1State.messages, message.payloadString];
          topic1State.messages = updatedMessages;
          const sample = message.payloadString
          dispatch(setStateValue(message.payloadString));
          console.log('Jouls_Ecotech_User_Notifications:', message.payloadString);
        } else if (message.destinationName === 'Jouls_Ecotech_User_Output') {
          const updatedMessages = [...topic2State.messages, message.payloadString];
          topic2State.messages = updatedMessages;
          dispatch(setModeValue(message?.payloadString));
          console.log('Jouls_Ecotech_User_Output:', message.payloadString);
        } else if (message.destinationName === 'Jouls_Ecotech_User_Energy') {
          const updatedMessages = [...topic3State.messages, message.payloadString];
          topic3State.messages = updatedMessages;
          dispatch(setEnergy(message?.payloadString));
          console.log('Jouls_Ecotech_User_Energy:', message.payloadString);
        }
      });
    }

    client.connect()
      .then(() => {
        // Once a connection has been made, make a subscription and send a message.
        console.log('onConnect');
        return Promise.all([
          client.subscribe('Jouls_Ecotech_User_Notifications'), // Topic 1
          client.subscribe('Jouls_Ecotech_User_Output'), // Topic 2
          client.subscribe('Jouls_Ecotech_User_Energy') // Topic 3
        ]);
      })
      .then(() => {
        const sample = new Message(JSON.stringify(user));
        sample.destinationName = 'Jouls_Ecotech_User_Charging Modes';
        client.send(sample);
      }).then(() => {
        onConnect()
      })
      .catch((responseObject) => {
        if (responseObject.errorCode !== 0) {
          console.log('onConnectionLost:' + responseObject.errorMessage);
        }
      })
  }
}



//-------------------------------------------------------------------------------------------------------------------//

export const BalanceMode = (user) => {
  return (dispatch) => {
    const client = new Client({ uri:  'ws://34.93.62.206:9001/mqtt', clientId: "client" + Math.random().toString(36).substring(7), storage: myStorage });
    client.on('connectionLost', (responseObject) => {
      if (responseObject.errorCode !== 0) {
        console.log(responseObject.errorMessage);
      }
    });
    const onConnect = () => {

      client.on('messageReceived', (message) => {
        if (message.destinationName === 'Jouls_Ecotech_User_Notifications') {
          const updatedMessages = [...topic1State.messages, message.payloadString];
          topic1State.messages = updatedMessages;
          dispatch(setStateValue(message.payloadString));
          console.log('Jouls_Ecotech_User_Notifications:', message.payloadString);
        } else if (message.destinationName === 'Jouls_Ecotech_User_Output') {
          const updatedMessages = [...topic2State.messages, message.payloadString];
          topic2State.messages = updatedMessages;
          dispatch(setModeValue(message?.payloadString));
          console.log('Jouls_Ecotech_User_Output:', message.payloadString);
        } else if (message.destinationName === 'Jouls_Ecotech_User_Energy') {
          const updatedMessages = [...topic3State.messages, message.payloadString];
          topic3State.messages = updatedMessages;
          dispatch(setEnergy(message?.payloadString));
          console.log('Jouls_Ecotech_User_Energy:', message.payloadString);
        }
      });
    }

    client.connect()
      .then(() => {
        console.log('onConnect');
        return Promise.all([
          client.subscribe('Jouls_Ecotech_User_Notifications'), // Topic 1
          client.subscribe('Jouls_Ecotech_User_Output'), // Topic 2
          client.subscribe('Jouls_Ecotech_User_Energy') // Topic 3
        ]);
      })
      .then(() => {
        const sampleee = {
          "Charging Mode": "Balanced_Mode"
        }
        const sample = new Message(JSON.stringify(sampleee));
        sample.destinationName = 'Jouls_Ecotech_User_Charging Modes';
        client.send(sample);
      }).then(() => {
        onConnect()
      })
      .catch((responseObject) => {
        if (responseObject.errorCode !== 0) {
          console.log('onConnectionLost:' + responseObject.errorMessage);
        }
      })
  }
}

// =-------------------------------------------------------------------------------------Stop charging-------------------//

export const StopChargingMode = (user) => {
  return (dispatch) => {

    const client = new Client({ uri:  'ws://34.93.62.206:9001/mqtt', clientId: "client" + Math.random().toString(36).substring(7), storage: myStorage });
    client.on('connectionLost', (responseObject) => {
      if (responseObject.errorCode !== 0) {
        console.log(responseObject.errorMessage);
      }
    });
    client.on('messageReceived', (message) => {
      console.log(message.payloadString);
    });
    const onConnect = () => {

      client.on('messageReceived', (message) => {
        if (message.destinationName === 'Jouls_Ecotech_User_Notifications') {
          const updatedMessages = [...topic1State.messages, message.payloadString];
          topic1State.messages = updatedMessages;
          // const sample=message.payloadString
          dispatch(setStateValue(message.payloadString));
          console.log('Jouls_Ecotech_User_Notifications:', message.payloadString);
        } else if (message.destinationName === 'Jouls_Ecotech_User_Output') {
          const updatedMessages = [...topic2State.messages, message.payloadString];
          topic2State.messages = updatedMessages;
          dispatch(setModeValue(message?.payloadString));
          console.log('Jouls_Ecotech_User_Output:', message.payloadString);
        } else if (message.destinationName === 'Jouls_Ecotech_User_Energy') {
          const updatedMessages = [...topic3State.messages, message.payloadString];
          topic3State.messages = updatedMessages;
          dispatch(setEnergy(message?.payloadString));
          console.log('Jouls_Ecotech_User_Energy:', message.payloadString);
        }
      });
    }

    client.connect()
      .then(() => {
        console.log('onConnect');
        return Promise.all([
          client.subscribe('Jouls_Ecotech_User_Notifications'), // Topic 1
          client.subscribe('Jouls_Ecotech_User_Output'), // Topic 2
          client.subscribe('Jouls_Ecotech_User_Energy') // Topic 3
        ]);
      })
      .then(() => {
        const sampleee = {
          "Charging Mode": "Stop Charging"
        }
        const sample = new Message(JSON.stringify(sampleee));
        sample.destinationName = 'Jouls_Ecotech_User_Charging Modes';
        client.send(sample);
      }).then(() => {
        onConnect()
      })
      .catch((responseObject) => {
        if (responseObject.errorCode !== 0) {
          console.log('onConnectionLost:' + responseObject);
          StopChargingMode()
        }
      })
  }
}







// ------------------------------------------------------------------- resolve the changes in the py code----------------------------.//

export const ResolveMode = (user) => {
  return (dispatch) => {
    const client = new Client({ uri:  'ws://34.93.62.206:9001/mqtt', clientId: "client" + Math.random().toString(36).substring(7), storage: myStorage });
    // set event handlers
    client.on('connectionLost', (responseObject) => {
      if (responseObject.errorCode !== 0) {
        console.log(responseObject);
      }
    });
    const onConnect = () => {

      client.on('messageReceived', (message) => {
        console.log(message?.payloadString);
        dispatch(setAuthtoken(message?.payloadString));
      });
    }

    client.connect()
      .then(() => {
        console.log('onConnect');
        return client.subscribe('Jouls_Ecotech_User_Notifications');
      })
      .then(() => {
        const sampleee = {
          "Charging Mode": "Resolve"
        }
        const sample = new Message(JSON.stringify(sampleee));
        sample.destinationName = 'Jouls_Ecotech_User_Charging Modes';
        // client.send(message);
        client.send(sample);
      }).then(() => {
        onConnect()
      })
      .catch((responseObject) => {
        if (responseObject.errorCode !== 0) {
          console.log('onConnectionLost:' + responseObject.errorMessage);
        }
      })
  }
}