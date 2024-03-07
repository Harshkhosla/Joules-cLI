import {
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
import { publicstopCharging } from '../../Redux/Action'
import HomeScreenCircles from '../HomeScreenCircle'
import App_top_Header from '../App_top_Header'
const Newhome = ({ navigation }) => {
  const dispatch = useDispatch()
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [colorChange, setColorChange] = useState('#DBDBDB')
  const [data, setData] = useState()
  // const [buttonText,setButtonText]=useState("Scan QR")
  const [buttonText, setButtonText] = useState('')
  const [ChargingEnergy, setChargingEnergy] = useState('')
  const [getsample, setGetSampledata] = useState(true)
  const [onstoChargingCost, setOnStopChargingCost] = useState('')

  const [ChargingCost, setChargingCost] = useState('')
  const [startTime, SetstartTime] = useState(1)
  const [EndTime, SetEndTime] = useState(4)
  const [checkStopbuttonClick, setStopButtonClick] = useState(true)
  const [sendDataToChart, setSendDataToChart] = useState([])
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
  // const timeInSe = "59";
  useEffect(() => {
    let interval
    if (isTimerRunning) {
      interval = setInterval(() => {
        setTotalSeconds((prevTotalSeconds) => prevTotalSeconds + 1)
        setTotalTime((prevTotalSeconds) => prevTotalSeconds + 1)
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
      dispatch(publicstopCharging(data, time, SetEndTime))
      handleResetClick()
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

  useEffect(() => {
    if (getsample) {
      setChargingEnergy(SampleDataaa)
      if (SampleDataaa.toString().length > 0) {
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
      dispatch(publicstopCharging(data, totalEnergyTime))
      setGetSampledata(false)
      handleResetClick()
      setButtonText('Scan QR')
      setChargingEnergy('')
      setChargingCost('')
      handleRemoveItem()
      setData('')
    }
    if (SampleOutputCurrent < 0.1) {
      const totalEnergyTime = formatTime(totalSeconds)
      dispatch(publicstopCharging(data, totalEnergyTime, SetEndTime))
      setGetSampledata(false)
      handleResetClick()
      setButtonText('Scan QR')
      setChargingEnergy('')
      setChargingCost('')
      handleRemoveItem()
      setData('')
    }
  }, [SampleDataaa, SampleOutputCurrent])

  const handleCostAndTimeOpen = async (text) => {
    console.log('text', text)
    if (text == 'Stop Charging') {
      console.log('you are in stop in')
      const Product_Key = await AsyncStorage.getItem('pid')
      console.log('productkye in newhome stop', Product_Key)
      const TotalTimeCharge = formatTime(totalTime)
      console.log('Total Time Charge', TotalTimeCharge)
      dispatch(publicstopCharging(Product_Key, TotalTimeCharge, SetEndTime))
      handleResetClick()
      setButtonText('Scan QR')
      setGetSampledata(false)
      setChargingEnergy('')
      setChargingCost('')
      handleRemoveItem()
      setData('')
    } else {
      if (data) {
        setIsModalOpen(true)
        setGetSampledata(true)
        SetTimeinSec('')
        setChargingEnergy('')
        setChargingCost('')
        generateHoursArray()
      } else {
        navigation.navigate('PublicScanner')
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
      // setTimeout(() => {
      //   handleRemoveItem()
      //   Alert.alert("pid deleted")
      // }, 100000);
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
    } catch (error) {
      console.error('Error removing item from AsyncStorage:', error)
    }
  }

  const handleCostAndTimeClose = () => {
    setIsModalOpen(false)
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
  return (
    <View style={styles.container}>
      {/* <Button title="stopChargig" onPress={getSampleData} disabled={isTimerRunning} /> */}
      <Button title="del pid" onPress={handleRemoveItem} />
      <Button title="know length" onPress={generateHoursArray} />
      <Button title="navigate to chargerhistory" onPress={generateHoursArray} />
      <App_top_Header
        title={`Hello Aman!`}
        navigation={navigation}
        color={'#C1E0C2'}
        isHome={true}
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
            {data ? 'Your charger is connected' : 'Not Connected'}
          </Text>
        </View>
        <View style={styles.powerAndCharging}>
          <View style={{ justifyContent: 'center' }}>
            <Text>Power Used</Text>
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
              <Text>Charger- -- kwh</Text>
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
                ₹{ChargingCost ? ChargingCost : '0'}
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
            color: 'green',
            textAlign: 'center',
            fontSize: 12,
            padding: 8,
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
    elevation: 2,
    borderRadius: 8,
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
