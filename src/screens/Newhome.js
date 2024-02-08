import { Button, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import SetCost from './SetCost'
import PublicHomePageHeader from './PublicHomePageHeader'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useDispatch, useSelector } from 'react-redux'
import { publicstopCharging } from '../Redux/Action'

const Newhome = ({navigation}) => {
  const dispatch=useDispatch()
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [colorChange,setColorChange]=useState("#DBDBDB")
  const [data, setData]= useState();
  // const [buttonText,setButtonText]=useState("Scan QR") 
  const [buttonText,setButtonText]=useState("") 
  const [ChargingEnergy,setChargingEnergy]=useState("")
  const [getsample,setGetSampledata]=useState(true)
  const SampleDataaa = useSelector((state) => state?.userReducers?.SetEnergy)
  const SamplePowerData = useSelector((state) => state?.userReducers?.SetPower)
  const publicChargerTime = useSelector((state) => state.userReducers.setTimePubCharger)
  console.log("publicChargerTime",publicChargerTime)

  // console.log("SamplePowerData",SamplePowerData)

  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [totalSeconds, setTotalSeconds] = useState(0);
  const [totalTime, setTotalTime] = useState(0);
  console.log(totalTime,"totalTime")
// timer useeffect
  useEffect(() => {
    let interval;
    if (isTimerRunning) {
      interval = setInterval(() => {
        setTotalSeconds(prevTotalSeconds => prevTotalSeconds + 1);
        setTotalTime(prevTotalSeconds => prevTotalSeconds + 1);
      }, 1000);
    } else {
      clearInterval(interval);
    }
    return () => clearInterval(interval); // Cleanup interval on component unmount
  }, [isTimerRunning]);

  const formatTime = (timeInSeconds) => {
    const hours = Math.floor(timeInSeconds / 3600);
    const minutes = Math.floor((timeInSeconds % 3600) / 60);
    const seconds = timeInSeconds % 60;

    return `${hours}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
  };
  const handleStartClick = () => {
    setIsTimerRunning(true);
  };

  const handleStopClick = () => {
    setIsTimerRunning(false);
  };

  const handleResetClick = () => {
    setIsTimerRunning(false);
    setTotalSeconds(0);
  }; 
useEffect(()=>{
if(getsample){
getSampleData()
}
},[SampleDataaa])


const getSampleData=()=>{
  console.log("SampleDataaa",SampleDataaa)
  setChargingEnergy(SampleDataaa)
  if(ChargingEnergy || SampleDataaa>=0){
    console.log("charginenery if keander");
    setButtonText("Stop Charging")
  }
}


  const handleCostAndTimeOpen = async(text) => {
    console.log("text",text)
    if(text=="Stop Charging"){
      console.log("you are in stop in")
      const Product_Key=await AsyncStorage.getItem("pid")
      console.log("productkye in newhome stop",Product_Key)
      const TotalTimeCharge=formatTime(totalTime)
      console.log("Total Time Charge",TotalTimeCharge);
      dispatch(publicstopCharging(Product_Key,TotalTimeCharge))
      handleResetClick()
      setButtonText("Scan QR")
      setGetSampledata(false)
      setChargingEnergy("")
      handleRemoveItem()
      setData("")
    }
    else{
      if(data){
        setIsModalOpen(true)
        setGetSampledata(true)
      }else{
        navigation.navigate('PublicScanner')
        setData(true);
        setTotalTime(0)
      }
    }
   
  }
  // console.log(AsyncStorage.getItem("pid"));
  useEffect(() => {
    // Use AsyncStorage.getItem with then to handle the Promise
    AsyncStorage.getItem("pid")
      .then((storedData) => {
        // Handle the retrieved data, it might be null if not found
        console.log("Data from AsyncStorage:", storedData);
        setData(storedData);
        if(storedData){
          setButtonText("Start Charging")
        }
      })
      .catch((error) => {
        console.error("Error retrieving data from AsyncStorage:", error);
      });
  }, []);
  const datatest=()=>{
    AsyncStorage.getItem("pid")
    .then((storedData) => {
      // Handle the retrieved data, it might be null if not found
      console.log("Data from AsyncStorage:", storedData);
      setData(storedData);
      if(storedData){
        setButtonText("Start Charging")
      }
    })
    .catch((error) => {
      console.error("Error retrieving data from AsyncStorage:", error);
    });
  }

useEffect(()=>{
  if(data){
    setColorChange("#118615")
    setButtonText("Start Charging")
    // setTimeout(() => {
    //   handleRemoveItem()
    // }, 100000);
 }
 else{
  setColorChange("#DBDBDB")
  setButtonText("Scan QR")
 }
},[data])



  const handleRemoveItem = async () => {
    try {
      // Use AsyncStorage.removeItem to remove the "pid" item
      await AsyncStorage.removeItem("pid");
      console.log("Item removed from AsyncStorage");
      setData(null); // Reset the data state
      setColorChange("#DBDBDB")
      setButtonText("Scan QR")
    } catch (error) {
      console.error("Error removing item from AsyncStorage:", error);
    }
  }
  const handleCostAndTimeClose = () => {
    setIsModalOpen(false)
  }
  return (
    <View style={styles.container}>
   <Button title="Startdd" onPress={datatest} disabled={isTimerRunning} />
   <Button title="Start" onPress={handleStartClick} disabled={isTimerRunning} />
      {/* <Button title="Stop" onPress={handleResetClick} disabled={!isTimerRunning} /> */}
      {/* <Button title='delte pid' onPress={handleRemoveItem}/> */}
      <PublicHomePageHeader navigation={navigation}/>
      <View style={styles.contents}>
        <View style={styles.statusBox}>
          <View
            style={{
              height: 10,
              backgroundColor:colorChange,
              width: 10,
              borderRadius: 10 / 2,
              marginRight: 10,
            }}
          ></View>
          <Text style={{ color:"#717171"}}>Status:</Text>
          <Text style={{ paddingLeft: 10, color: colorChange }}>
          {data? "Your charger is connected":"Not Connected"}
          </Text>
        </View>
        <View style={styles.dashboard}>
          <View>
            <View style={styles.chargingCostMeater}>
              <Text style={{ color:"#717171"}}>Charging Cost</Text>
              <Text style={{ color:"#717171"}}>₹---</Text>
            </View>
          </View>
          <View style={styles.chargingEnergyAndTime}>
            <View style={styles.chargingValueText}>
              <Text style={{ color:"#717171"}}>Charging Time</Text>
              <Text style={{ color:"#717171"}}>{formatTime(totalSeconds)} hrs</Text>
            </View>
            <View style={styles.chargingValueText}>
              <Text style={{ color:"#717171"}}>Charging Energy</Text>
              <Text style={{ color:"#717171"}}>{ChargingEnergy!=""?Math.round(ChargingEnergy * 100) / 100:"0"} Wh</Text>
            </View>
          </View>
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            onPress={()=>{handleCostAndTimeOpen(buttonText)}}
            // onPress={()=>{handleCostAndTimeOpen("Stop Charging")}}
            style={styles.ButtonBox}
          >
            {/* <Text style={styles.ButtonText}>{data?"Start Charging":"Scan QR"}</Text> */}
            <Text style={styles.ButtonText}>{buttonText}</Text>
          </TouchableOpacity>
        </View>
        <Text
          style={{
            color: 'green',
            textAlign: 'center',
            fontSize: 12,
            padding: 8,
          }}
        >
          Start Charging and Contribute for your mother earth!
        </Text>
      </View>
      <SetCost open={isModalOpen} onClose={handleCostAndTimeClose} startTimer={handleStartClick}/>
    </View>
  )
}

export default Newhome

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  contents: {
    flex: 1,
    padding: 20,
    // backgroundColor: 'pink',
  },
  statusBox: {
    backgroundColor: '#fff',
    padding: 10,
    flexDirection: 'row',
    alignItems: 'center',
    elevation: 2,

    borderRadius: 8,
  },

  dashboard: {
    marginTop: 10,
    height: 420,
    borderRadius: 20,
    backgroundColor: '#fff',
    borderWidth: 1,
    justifyContent: 'space-between',
    borderColor: '#C7C7C7',
    marginBottom: -10,
    zIndex: 1,
  },
  chargingCostMeater: {
    backgroundColor: '#fff',
    width: '60%',
    elevation: 5,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    gap: 10,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    height: 80,
   
  },
  chargingEnergyAndTime: {
    flexDirection: 'row',
    color:"black",
    height: 100,
    // alignItems: 'center',
    // justifyContent: 'center',
    // // gap: 10,
    justifyContent: 'space-evenly',
    // backgroundColor: 'pink',

    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  chargingValueText: {
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
    // width: '100%',
  },

  buttonContainer: {
    height: 110,
    backgroundColor: '#C1E0C2',
    alignItems: 'center',
    elevation: 1,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    justifyContent: 'center',
  },
  ButtonBox: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '90%',
    padding: 10,
    borderRadius: 8,
    backgroundColor: 'green',
  },
  ButtonText: {
    fontSize: 20,
    color: '#fff',
  },
})
