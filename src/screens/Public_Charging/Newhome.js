import {
  ActivityIndicator,
  Alert,
  Button,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native'
import React, { useEffect, useState } from 'react'
import SetCost from './SetCost'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useDispatch, useSelector } from 'react-redux'
import { getUserData, publicstopCharging } from '../../Redux/Action'
import HomeScreenCircles from '../HomeScreenCircle'
import Wave from '../../components/wave'
import App_top_Header from '../App_top_Header'
const Newhome = ({ navigation }) => {
  const dispatch = useDispatch()
  // for 10 min not click start charging
  const [buttonPressed, setButtonPressed] = useState(false)
  const [timerExpired, setTimerExpired] = useState(false)
  const [inputcostfromsetcost,setinputcostfromsetcost]=useState("")
  const [ShowChargingCostPerSecond,SetShowChargingCostPerSecond]=useState("")
  console.log("inputcostfromsetcostradhekinagkjamer",inputcostfromsetcost);
  const [isLoading, setIsLoading] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [colorChange, setColorChange] = useState('#DBDBDB')
  const [data, setData] = useState()
  // const [buttonText,setButtonText]=useState("Scan QR")
  const [buttonText, setButtonText] = useState('')
  const [ChargingEnergy, setChargingEnergy] = useState('')
  const [getsample, setGetSampledata] = useState(true)
  const [onstoChargingCost, setOnStopChargingCost] = useState('')
  const [checkChargingStarted, setcheckChargingStarted] = useState(false)
  const [ChargingCost, setChargingCost] = useState('')
  const [startTime, SetstartTime] = useState(1)
  const [EndTime, SetEndTime] = useState(4)
  const [checkStopbuttonClick, setStopButtonClick] = useState(true)
  const [sendDataToChart, setSendDataToChart] = useState([])
  const [name, setName] = useState('User')
  let SampleDataaa = useSelector((state) => state?.userReducers?.SetEnergy)
  const SamplePowerData = useSelector((state) => state?.userReducers?.SetPower)
  const SampleOutputCurrent = useSelector(
    (state) => state?.userReducers?.SetCurrent
  )
  const publicChargerTime = useSelector(
    (state) => state.userReducers.setTimePubCharger
  )
  const [isTimerRunning, setIsTimerRunning] = useState(false)
  const [totalSeconds, setTotalSeconds] = useState(0)
  const [totalTime, setTotalTime] = useState(0)
  
  const [timeInSec, SetTimeinSec] = useState('')
  console.log("timeInSectimeInSectimeInSec.length",timeInSec.length);
  console.log("timeInSectimeInSectimeInSec.length",!timeInSec);
  console.log(
    'EndTime,startTime,sendDataToChart',
    EndTime,
    startTime,
    sendDataToChart
  )
  console.log(ChargingCost, 'ChargingCost')

  const timeToSeconds = (timeValue) => {
    // Extract numeric value from the time string
    const numericValue = parseInt(timeValue)
    // Check if the time string contains "hr"
    if (timeValue?.includes('hr')) {
      // Convert hours to seconds (1 hour = 3600 seconds)
      return numericValue * 3600
    } else if (timeValue?.includes('min')) {
      // Convert minutes to seconds (1 minute = 60 seconds)
      return numericValue * 60
    } else {
      // If no time unit is specified, assume seconds
      return numericValue
    }
  }
  const timeInSe = timeToSeconds(timeInSec)
  const prevdata = parseInt(ShowChargingCostPerSecond) + (inputcostfromsetcost / timeInSe);
  // console.log("prevdata",prevdata)

  console.log("timeInSetimeInSe",timeInSe);
  // const timeInSe = "59";
  useEffect(() => {
    let interval
    if (isTimerRunning) {
      interval = setInterval(() => {
        setTotalSeconds((prevTotalSeconds) => prevTotalSeconds + 1)
        setTotalTime((prevTotalSeconds) => prevTotalSeconds + 1)
        if(timeInSec && inputcostfromsetcost){
          const timeinseconds = timeToSeconds(timeInSec);
          // const prevdata = parseInt(ShowChargingCostPerSecond) + (inputcostfromsetcost / timeinseconds);
          const prevdata = parseInt(ShowChargingCostPerSecond) || 0 + 1;
          console.log("prevdataprevdataprevdataprevdata",prevdata)
          SetShowChargingCostPerSecond(prevdata.toString());
          console.log("ShowChargingCostPerSecondShowChargingCostPerSecond",ShowChargingCostPerSecond);
        }
      }, 1000)
    } else {
      clearInterval(interval)
    }
    return () => clearInterval(interval) // Cleanup interval on component unmount
  }, [isTimerRunning])
  // const [product,setProduct ]=useState("")
  //   useEffect(()=>{
  //     const pid = async()=>{
  //       const Product_Key=await AsyncStorage.getItem("pid")
  //       setProduct(Product_Key);
  //     }

  //   },[])

  const formatTime = (timeInSeconds) => {
    console.log(timeInSeconds, 'timeinSeconds')
    console.log('timeinsec76', timeInSec)
    console.log(timeInSe, 'timein sec')
    const hours = Math.floor(timeInSeconds / 3600)
    const minutes = Math.floor((timeInSeconds % 3600) / 60)
    const seconds = timeInSeconds % 60
    const time = `${hours}:${String(minutes).padStart(2, '0')}:${String(
      seconds
    ).padStart(2, '0')}`
    if (timeInSeconds == timeInSe) {
      // const Product_Key=await AsyncStorage.getItem("pid")
      console.log('productkye in newhome stop', time)
      console.log('Total Time Charge', data)
      dispatch(publicstopCharging(data, time, SetEndTime,SampleDataaa))
      handleResetClick()
      setcheckChargingStarted(false)
      setButtonText('Scan QR')
      setGetSampledata(false)
      setChargingEnergy('')
      setChargingCost('')
      handleRemoveItem()
      setData('')
      return `0`
    }
    return `${hours}:${String(minutes).padStart(2, '0')}:${String(
      seconds
    ).padStart(2, '0')}`
  }

  const handleStartClick = () => {
    setIsTimerRunning(true)
  }

  const handleStopClick = () => {
    setIsTimerRunning(false)
  }

  const handleResetClick = () => {
    setIsTimerRunning(false)
    setTotalSeconds(0)
  }

useEffect(()=>{
if(timeInSec.length<=0 || !timeInSec){
  if(parseInt(inputcostfromsetcost)<=parseInt(ChargingCost)){
    console.log("stop charging onn set cost in newhome.js");
    const totalEnergyTime = formatTime(totalSeconds)
      dispatch(publicstopCharging(data, totalEnergyTime,SetEndTime,SampleDataaa))
      setGetSampledata(false)
      setcheckChargingStarted(false)
      handleResetClick()
      setButtonText('Scan QR')
      setChargingEnergy('')
      setChargingCost('')
      handleRemoveItem()
      setData('')
  }
}
  if(timeInSec.length>0 && timeInSec){
  if(parseInt(inputcostfromsetcost)<=parseInt(ShowChargingCostPerSecond)){
    console.log("stop charging onn set time in newhome.js");
    const totalEnergyTime = formatTime(totalSeconds)
      dispatch(publicstopCharging(data, totalEnergyTime,SetEndTime,SampleDataaa))
      setGetSampledata(false)
      setcheckChargingStarted(false)  
      handleResetClick()
      setButtonText('Scan QR')
      setChargingEnergy('')
      setChargingCost('')
      handleRemoveItem()
      setData('')
  }
}
},[ChargingCost,ShowChargingCostPerSecond])


  useEffect(() => {
    if (getsample) {
      setChargingEnergy(SampleDataaa)
      if (SampleDataaa.toString().length > 0 && timeInSec.length<=0) {
        let a = (parseInt(SampleDataaa) * 15) / 1000
        a = Math.floor(a * 100) / 100
        console.log('abcdefghi', a)
        setChargingCost(a)
      }
    }
    if (parseInt(onstoChargingCost) <= parseInt(SampleDataaa)) {
      console.log(
        'onstopchargincost in useeffect',
        onstoChargingCost,
        SampleDataaa
      )
      const totalEnergyTime = formatTime(totalSeconds)
      dispatch(publicstopCharging(data, totalEnergyTime,SetEndTime,SampleDataaa))
      setGetSampledata(false)
      setcheckChargingStarted(false)
      handleResetClick()
      setButtonText('Scan QR')
      setChargingEnergy('')
      setChargingCost('')
      handleRemoveItem()
      setData('')
    }

    // if (SampleOutputCurrent < 0.1) {
    //   const totalEnergyTime = formatTime(totalSeconds)
    //   dispatch(publicstopCharging(data, totalEnergyTime, SetEndTime,SampleDataaa))
    //   setcheckChargingStarted(false)
    //   setGetSampledata(false)
    //   handleResetClick()
    //   setButtonText('Scan QR')
    //   setChargingEnergy('')
    //   setChargingCost('')
    //   handleRemoveItem()
    //   setData('')
    // }

  }, [SampleDataaa, SampleOutputCurrent])

  const handleCostAndTimeOpen = async (text, unique) => {
    console.log('text', text, unique)
    if (text == 'Stop Charging') {
      console.log('you are in stop in')
      const Product_Key = await AsyncStorage.getItem('pid')
      console.log('productkye in newhome stop', Product_Key)
      const TotalTimeCharge = formatTime(totalTime)
      console.log('Total Time Charge', TotalTimeCharge)
      if (!unique) {
        console.log('in unique condition pulicstopchargin call')
        dispatch(publicstopCharging(Product_Key, TotalTimeCharge, SetEndTime,SampleDataaa))
      }
      setcheckChargingStarted(false)
      handleResetClick()
      setButtonText('Scan QR')
      setGetSampledata(false)
      setChargingEnergy('')
      setChargingCost('')
      handleRemoveItem()
      setData('')
    } else {
      if (data) {
        console.log('click start charging')
        setIsModalOpen(true)
        setGetSampledata(true)
        SetTimeinSec('')
        setChargingEnergy('')
        setChargingCost('')
        // for click start charging
        // setButtonPressed(true)
      } else {
        navigation.navigate('PublicScanner', { name: name })
        // setData(true);
        setTotalTime(0)
      }
    }
  }
  // console.log(AsyncStorage.getItem("pid"));
  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      async function fetchData() {
        const storedData = await AsyncStorage.getItem('pid')
        console.log('storedData', storedData)
        setData(storedData)
        if (storedData) {
          setButtonText('Start Charging')
        }
      }
      fetchData()
    })
  }, [])

  useEffect(() => {
    if (data) {
      setColorChange('#118615')
      setButtonText('Start Charging')
    } else {
      setColorChange('#DBDBDB')
      setButtonText('Scan QR')
    }
  }, [data])

  const handleRemoveItem = async () => {
    try {
      // Use AsyncStorage.removeItem to remove the "pid" item
      await AsyncStorage.removeItem('pid')
      console.log('Item removed from AsyncStorage')
      setData(null) // Reset the data state
      setColorChange('#DBDBDB')
      setButtonText('Scan QR')
      setButtonPressed(false)
    } catch (error) {
      console.error('Error removing item from AsyncStorage:', error)
    }
  }

  const handleCostAndTimeClose = () => {
    setIsModalOpen(false)
    // SetTimeinSec("")
  }

  const generateHoursArray = () => {
    if (EndTime < 0 || EndTime > 23) {
      console.error('Invalid end time')
      return
    }

    const newGeneratedHours = []

    for (let hour = startTime; true; hour = (hour % 24) + 1) {
      const ampm = hour < 12 ? 'AM' : 'PM'
      const formattedHour = hour % 12 === 0 ? 12 : hour % 12 // Convert to 12-hour format
      const timeString = `${formattedHour} ${ampm}`
      newGeneratedHours.push(timeString)

      if (hour === EndTime) {
        break
      }
    }
    navigation.navigate('Charging_History', {
      newGeneratedHours: newGeneratedHours,
    })
    // Update the state with the new array
    console.log('newGeneratedHours', newGeneratedHours)
    setSendDataToChart(newGeneratedHours)
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Get the stored MID from AsyncStorage
        const storedMid = await AsyncStorage.getItem('mid');
        
        // Dispatch action to get user data using the retrieved MID
        const data = await dispatch(getUserData(storedMid));
        // Set the retrieved MID and user data in state
        const userdata = await data;
        setName(userdata.name);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  // for not click startcharing 10 min
  useEffect(() => {
    let timer
    if (!buttonPressed && data) {
      timer = setTimeout(() => {
        setTimerExpired(true)
      }, 120000)
    }
    console.log(timer, 'timer')
    return () => {
      clearTimeout(timer)
    }
  }, [buttonPressed, data, buttonText])

  useEffect(() => {
    const clearAsyncStorage = async () => {
      if (timerExpired) {
        // await AsyncStorage.removeItem('pid');
        handleRemoveItem()
        console.log('AsyncStorage remove!')
        Alert.alert('automatic remove')
      }
      setTimerExpired(false)
    }
    clearAsyncStorage()
  }, [timerExpired])

  useEffect(() => {
    if (checkChargingStarted && data) {
      setButtonPressed(true)
    }
  }, [checkChargingStarted])
  // const handleButtonClick = () => {
  //   setButtonPressed(true);
  //   // Yahaan par aap kuch aur kaam kar sakte hain agar button press ho gaya hai.
  //   console.log('Button clicked!');
  // };
  return (
    <View style={styles.container}>
      {/* <Button title="stopChargig" onPress={getSampleData} disabled={isTimerRunning} /> */}
      {/* <Button title="del pid" onPress={handleRemoveItem} /> */}
      {/* <Button title="know length" onPress={generateHoursArray} />
      <Button title="navigate to chargerhistory" onPress={generateHoursArray} /> */}
      <App_top_Header
        title={`Hello ${name}!`}
        navigation={navigation}
        color={'#C1E0C2'}
        isHome={true}
        name={name}
      />
      <View style={styles.contents}>
        <View style={styles.statusBox}>
          <View
            style={{
              height: 10,
              backgroundColor: colorChange,
              width: 10,
              borderRadius: 10 / 2,
              marginRight: 10,
            }}
          ></View>
          <Text style={{ color: '#717171' }}>Status:</Text>
          <Text style={{ paddingLeft: 10, color: colorChange }}>
            {data && checkChargingStarted
              ? // Condition: Both AsyncStorage data and charging started
                'Charging'
              : data
              ? // Condition 1: Only AsyncStorage data is available
                'Your charger is connected'
              : // Default case: No data available
                'Not Connected To Your Any Charger'}
          </Text>
        </View>
        <View style={styles.powerAndCharging}>
          <View style={{ justifyContent: 'center' }}>
            <Text style={{ color: '#9A9A9A' }}>Power Used</Text>
          </View>
          <View style={{ backgroundColor: '#EDECEC', width: 1 }}></View>
          <View style={{ justifyContent: 'center' }}>
            <View
              style={{ flexDirection: 'row', gap: 5, alignItems: 'center' }}
            >
              <Image
                style={[styles.Icons, { height: 20 }]}
                source={require('../../assets/power.png')}
              />
              <Text style={{ color: '#9A9A9A' }}>
                Charger- {SamplePowerData ? SamplePowerData : '0'} w
              </Text>
            </View>
          </View>
        </View>
        <View style={styles.dashboard}>
          <View>
            <View style={styles.chargingCostMeater}>
              <View style={styles.dashboardIconsView}>
                <Image
                  style={styles.Icons}
                  source={require('../../assets/ev_charger.png')}
                />
                <Text style={{ color: '#717171' }}>Charging Cost</Text>
              </View>
              <Text style={{ color: '#717171' }}>
              ₹{timeInSec && timeInSec.length > 0 ? ShowChargingCostPerSecond || "0" : ChargingCost || "0"}
              </Text>
              <View
                style={{
                  position: 'absolute',
                  flexDirection: 'row',
                  gap: 88,
                  marginBottom: -100,
                  bottom: 0,
                }}
              >
                <HomeScreenCircles />
                <HomeScreenCircles />
              </View>
            </View>
          </View>
          <View style={{ alignSelf: 'center', paddingVertical: 5 }}>
            {data && checkChargingStarted ? (
              // Condition: Both AsyncStorage data and charging started
              // <Text>{ShowChargingCostPerSecond}</Text>
              // {ShowChargingCostPerSecond}
              <Wave size={150} progress={40} />
            ) : data ? (
              // Condition 1: Only AsyncStorage data is available
              <Image
                source={require('../../assets/GreenWavesPhoto.png')}
                style={{ height: 190, width: 190 }}
              />
            ) : (
              // Default case: No data available
              <Image
                source={require('../../assets/pidNotAvailable.png')}
                style={{ height: 190, width: 190 }}
              />
            )}
          </View>

          <View style={styles.potIconContainer}>
            <Image
              style={styles.portIcon}
              source={require('../../assets/porticon.png')}
            />
          </View>
          <View style={styles.chargingEnergyAndTime}>
            <View style={styles.chargingValueText}>
              <View style={styles.dashboardIconsView}>
                <Image
                  style={styles.Icons}
                  source={require('../../assets/battery_charging_30.png')}
                />
                <Text style={{ color: '#717171' }}>Charging Time</Text>
              </View>
              <Text style={{ color: '#717171' }}>
                {formatTime(totalSeconds)} hrs
              </Text>
            </View>
            <View style={{ backgroundColor: '#C7C7C7', width: 1 }}></View>

            <View style={styles.chargingValueText}>
              <View style={styles.dashboardIconsView}>
                <Image
                  style={styles.Icons}
                  source={require('../../assets/charger.png')}
                />
                <Text style={{ color: '#717171' }}>Charging Energy</Text>
              </View>
              <Text style={{ color: '#717171' }}>
                {ChargingEnergy != ''
                  ? Math.round(ChargingEnergy * 100) / 100
                  : '0'}{' '}
                Wh
              </Text>
            </View>
          </View>
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            onPress={() => {
              handleCostAndTimeOpen(buttonText)
            }}
            // onPress={()=>{handleCostAndTimeOpen("Stop Charging")}}
            style={styles.ButtonBox}
          >
            {/* <Text style={styles.ButtonText}>{data?"Start Charging":"Scan QR"}</Text> */}
            <Text style={styles.ButtonText}>{buttonText}</Text>
          </TouchableOpacity>
        </View>
        <Text
          style={{
            color: '#118615',
            textAlign: 'center',
            fontSize: 12,
            paddingTop: 8,
          }}
        >
          Start Charging and Contribute for your mother earth!
        </Text>
      </View>
      <SetCost
        open={isModalOpen}
        onClose={handleCostAndTimeClose}
        startTimer={handleStartClick}
        inputvalue={''}
        setButtonText={setButtonText}
        SetTimeinSec={SetTimeinSec}
        setOnStopChargingCost={setOnStopChargingCost}
        SetstartTime={SetstartTime}
        setcheckChargingStarted={setcheckChargingStarted}
        handleStopCharging={handleCostAndTimeOpen}
        setButtonPressed={setButtonPressed}
        setinputcostfromsetcost={setinputcostfromsetcost}
      />
    </View>
  )
}

export default Newhome

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  modalopen: {
    backgroundColor: 'rgba(0, 0, 0, 0.76)',
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    top: 0,
    zIndex: 2,
  },
  contents: {
    flex: 1,
    padding: 20,
  },
  statusBox: {
    backgroundColor: '#fff',
    padding: 10,
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 8,
    // Android
    elevation: 5,
    // iOS
    shadowColor: 'green',
    shadowOffset: { width: 10, height: 6 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  powerAndCharging: {
    height: 40,
    width: '85%',
    alignSelf: 'center',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    borderWidth: 1,
    borderRadius: 8,
    borderColor: '#EDECEC',
    marginTop: 10,
    marginBottom: -15,
  },
  dashboard: {
    flex: 1,
    marginTop: 10,
    borderRadius: 10,
    backgroundColor: '#fff',
    borderWidth: 1,
    overflow: 'hidden',
    justifyContent: 'space-between',
    borderColor: '#C7C7C7',
    zIndex: 1,
  },
  dashboardIconsView: {
    flexDirection: 'row',
    gap: 3,
    alignItems: 'center',
  },
  Icons: {
    height: 25,
    resizeMode: 'contain',
    width: 30,
  },
  chargingCostMeater: {
    backgroundColor: '#fff',
    width: '70%',
    elevation: 5,
    overflow: 'hidden',
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    gap: 10,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    height: 80,
  },
  potIconContainer: {
    opacity: 0.2,
    position: 'absolute',
    alignSelf: 'flex-end',
    bottom: 0,
    zIndex: 0,
    transform: [{ rotate: '-15deg' }],
  },
  portIcon: {
    height: 180,
    overflow: 'hidden',
    width: 180,
    marginRight: -90,
    marginBottom: 20,
    resizeMode: 'contain',
  },
  chargingEnergyAndTime: {
    flexDirection: 'row',
    height: 90,
    justifyContent: 'space-evenly',
    backgroundColor: '#fff',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#C7C7C7',
  },
  chargingValueText: {
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
  },
  buttonContainer: {
    marginTop: -20,
    height: 100,
    backgroundColor: '#C1E0C2',
    paddingHorizontal: 20,
    elevation: 2,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    justifyContent: 'center',
  },
  //add
  ButtonBox: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    padding: 10,
    marginTop: 10,
    borderRadius: 8,
    borderWidth: 2,
    backgroundColor: 'green',
    borderColor: 'green',
  },
  ButtonText: {
    fontSize: 20,
    color: '#fff',
  },
})
