import AsyncStorage from "@react-native-async-storage/async-storage";
export const SET_USER_NAME = "SET_USER_NAME";
export const SET_USER_EMAIL = "SET_USER_EMAIL";
export const SET_AUTH_TOKEN = "SET_AUTH_TOKEN";
export const SET_USER_CAR="SET_USER_CAR";
export const SET_USER_FLAT="SET_USER_FLAT";

import { Client, Message } from 'react-native-paho-mqtt';

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


    const client = new Client({ uri: 'ws://192.168.100.111:9001/', clientId: 'JOULS ECOTECH243546578989', storage: myStorage });
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
  }
}






// ------------------------------------------------------SETTING LOAD DATA TO MQTTT AND NODE JS TOO------------------------------------------//



export const setName = (title) => {
  // debugger;
  // console.log(title, "coming hear");
  return (dispatch) => {
    // const { authtoken, field2 } = user;
    // console.log(authtoken,"ekvhjwejh");

    const client = new Client({ uri: 'ws://192.168.100.111:9001/', clientId: 'JOULS ECOTECH243546578989', storage: myStorage });
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
        const message = new Message(title);
        message.destinationName = 'topic_1';
        // const sample = new Message("harsh sexy");
        // sample.destinationName = 'message';
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
  // debugger;
  // console.log(user, "coming hear");
  return (dispatch) => {
    // const { authtoken, field2 } = user;
    // console.log(authtoken,"ekvhjwejh");

    const client = new Client({ uri: 'ws://192.168.100.111:9001/', clientId: 'JOULS ECOTECH243546578989', storage: myStorage });
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
        // const sampleee ={
        //   "Charging Modes": "mode_on", "unit": "Celsius", "sensor": "temperature"
        // }
        const message = new Message(JSON.stringify(user));
        message.destinationName = 'Jouls_Ecotech_User_ID';
        // const sample = new Message("Balanced_Mode");
        // sample.destinationName = 'Jouls_Ecotech_User_Charging Modes';
        client.send(message);
        // client.send(sample);
      }).then(() => {
        onConnect()
      })
      .catch((responseObject) => {
        if (responseObject.errorCode !== 0) {
          console.log('onConnectionLost:' + responseObject.errorMessage);
        }
      })


    //   client.onConnectionLost = onConnectionLost;
    //   client.onMessageArrived = onMessageArrived;
  }
}






// ----------------------------------------CREATING ACCOUNT DATA--------------------------------------------------------------------------------//





export const loginuser = (input, navigation) => {
  // debugger;
  // console.log("harsh", input);
  return async(dispatch) => {
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
        throw new Error(data.error);
      }

      // Navigate to the home screen
      navigation.navigate('Load');
    } catch (err) {
      console.log(err, "cvdsavs");
      // setError(err.message);
      // toast.error(err?.message);
    }

  }
}



// https://backend-production-e1c2.up.railway.app/api/auth/createuser`

// ------------------------------------------------------CREATING LOGIN AUTHTOKEN AND SENDING IT -----------------------------------------//




export const signItUp = (field, navigation) => {
  return async (dispatch) => {
    const { email, password } = field;
    // console.log("harsh", email);
    // const navigation = useNavigation(); // Get the navigation object

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
      const authtoken = JSON.stringify(data.authtoken).replaceAll('"', '');
      await AsyncStorage.setItem("Authtoken", authtoken);
      dispatch(setAuthtoken(authtoken));

      if (!data?.success) {
        throw new Error(data.error);
      }

      // Navigate to the home screen
      navigation.navigate('Home');
    } catch (err) {
      console.log(err, "cvdsavs");
      // setError(err.message);
      // toast.error(err?.message);
    }
  };
};




export const setAuthtoken = (authtoken) => {
  console.log(authtoken, "Harshgg");
  return {
    type: SET_AUTH_TOKEN,
    payload: authtoken
  }
}

// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjQ2NjBjZDU2YzYwOWQ1OGUzZWJhMDdlIn0sImlhdCI6MTY4NDQwOTU1N30.LAPK3tCxMGzKyOru7SQF_fTXh9kEGOaVTLZ_QlqJ61g




// ----------------------------------------------------//



export const Clicked = (user) => {
  // debugger;
  // console.log(user, "coming hear");
  return (dispatch) => {
    // const { authtoken, field2 } = user;
    // console.log(authtoken,"ekvhjwejh");

    const client = new Client({ uri: 'ws://192.168.100.111:9001/', clientId: 'JOULS ECOTECH243546578989', storage: myStorage });
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
        const sampleee ={
          "Charging Mode": "Balanced_Mode"
        }
        // const message = new Message(JSON.stringify(user));
        // message.destinationName = 'Jouls_Ecotech_User_ID';
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


    //   client.onConnectionLost = onConnectionLost;
    //   client.onMessageArrived = onMessageArrived;
  }
}




//----------------------------------------------------------------------------------//

export const EcoMode = (user) => {
  // debugger;
  // console.log(user, "coming hear");
  return (dispatch) => {
    // const { authtoken, field2 } = user;
    // console.log(authtoken,"ekvhjwejh");

    const client = new Client({ uri: 'ws://192.168.100.111:9001/', clientId: 'JOULS ECOTECH243546578989', storage: myStorage });
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
        const sampleee ={
          "Charging Mode": "Eco_Mode"
        }
        // const message = new Message(JSON.stringify(user));
        // message.destinationName = 'Jouls_Ecotech_User_ID';
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


    //   client.onConnectionLost = onConnectionLost;
    //   client.onMessageArrived = onMessageArrived;
  }
}
//---------------------------------------------------------------------------------------------------------------------------//
export const ScheduleMode = (user) => {
  // debugger;
  // console.log(user, "coming hear");
  return (dispatch) => {
    // const { authtoken, field2 } = user;
    // console.log(authtoken,"ekvhjwejh");

    const client = new Client({ uri: 'ws://192.168.100.111:9001/', clientId: 'JOULS ECOTECH243546578989', storage: myStorage });
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
        const sampleee ={
          "Charging Mode": "Schedule_Mode"
        }
        // const message = new Message(JSON.stringify(user));
        // message.destinationName = 'Jouls_Ecotech_User_ID';
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


    //   client.onConnectionLost = onConnectionLost;
    //   client.onMessageArrived = onMessageArrived;
  }
}
