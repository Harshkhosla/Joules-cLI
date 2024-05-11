import {
  StyleSheet,
  Text,
  View,
  // Modal,
  Image,
  TouchableOpacity,
  TextInput,
  Alert,
} from 'react-native'
import {
  responsiveHeight as hp,
  responsiveWidth as wp,
  responsiveFontSize as fp,
} from 'react-native-responsive-dimensions'
import React, { useEffect, useState } from 'react'
import Toast from 'react-native-toast-message'
// import razorpayLogo from "../../assets/mypic.jpg";

import { useDispatch, useSelector } from 'react-redux'
import {
  AddTrasationDetail,
  ChargerHistory,
  SendChargingCost,
  StopChargingMode,
  publicstartCharging,
} from '../../Redux/Action'
import AsyncStorage from '@react-native-async-storage/async-storage'
import TimerSlider from '../TimerSlider'
import ModalRadhe from './radheModal'
// import stripe from '@stripe/stripe-react-native';
import RazorpayCheckout from 'react-native-razorpay'
import Modal from 'react-native-modal'
import CustomModal from '../../components/CustomModal'
import { fetchDataAsyncStorageData } from '../../utility/asyncStorage'
import SetCostRecommend from './SetCostRecommend'
import { Checkbox } from 'react-native-paper'

// const razorpayLogo = require('../../assets/Union.png');
const razorpayLogo =
  'https://res.cloudinary.com/ddvb5pl1p/image/upload/v1715073770/vks1ypuudvmxwqz7ub88.png'

const resizeImage = (source, width, height) => {
  return `${source}?width=${width}&height=${height}`
}

const SetCost = ({
  open,
  onClose,
  startTimer,
  inputvalue,
  setButtonText,
  SetTimeinSec,
  setOnStopChargingCost,
  SetstartTime,
  setcheckChargingStarted,
  handleStopCharging,
  setinputcostfromsetcost,
  chargingUnitsfromsetCost,
  setchargingUnitsfromsetCost,
  setGetSampledata,
  setisChargingAlertVisible,
  ChargingEnergy,
  setShowPaymentCompleteModal,
  animateNextWord,
}) => {
  const dispatch = useDispatch()
  const [ShowSetCost, SetShowSetCost] = useState(true)
  const [inputCost, setInputCost] = useState('')
  const [Time, settime] = useState('')
  const [isModalVisible, setisModalVisible] = useState(false)
  let findchargingCost = useSelector(
    (state) => state.userReducers.setchargingcost
  )
  let findchargingCostPerHour = useSelector(
    (state) => state.userReducers.setchargingcostperhour
  )
  let findChargingEnergy = useSelector((state) => state.userReducers.SetEnergy)

  if (!findchargingCost || findchargingCost == '0') {
    findchargingCost = 12
  }
  if (!findchargingCostPerHour || findchargingCostPerHour == '0') {
    findchargingCostPerHour = 12
  }
  console.log('findcharingfindcharing', findChargingEnergy)
  // if(!findChargingEnergy){
  //   console.log("findChargingEnergy",findChargingEnergy);
  //   findChargingEnergy="0"
  // }
  useEffect(() => {
    // console.log("openopen",open);
    if (open) {
      setInputCost('')
    }
  }, [open])

  useEffect(() => {
    setDataToParent()
  }, [inputCost, findchargingCost])

  const setDataToParent = () => {
    setinputcostfromsetcost(inputCost)
    // const data= Math.ceil((inputCost / findchargingCost) * 100) / 100
    const data = inputCost / findchargingCost

    console.log('datadatadata', data)
    setchargingUnitsfromsetCost(data)
    setGetSampledata(true)
  }

  const handlePayment = async () => {
    if (inputCost <= 0 || !inputCost) {
      Alert.alert('Please set the cost of charging first')
      return
    }
    const { storedData } = await fetchDataAsyncStorageData()
    if (!storedData) {
      Alert.alert('Scan please')
      return
    }

    // const resizedImage = resizeImage(razorpayLogo, -50, 50);
    const options = {
      description: 'Payment for your order',
      // image: "https://yourwebsite.com/logo.png",
      // image: "https://res.cloudinary.com/ddvb5pl1p/image/upload/v1714063633/cij7inmzke3q8hz88orn.jpg",
      image: razorpayLogo,
      currency: 'INR',
      key: 'rzp_live_V4Palfsx7GsPm3',
      amount: inputCost * 100, // amount in paisa
      name: 'Jouls Ecotech Pvt Ltd',
      prefill: {
        email: 'customer@example.com',
        contact: '9999999999',
        name: 'Customer Name',
      },
      theme: { color: '#118615' },
    }

    try {
      const data = await RazorpayCheckout.open(options)
      if (data && data.razorpay_payment_id) {
        console.log('navigate to start charging')
        onClose()
        const sendData = {
          inputCost,
          Porduct_Key: storedData,
          paymentId: data.razorpay_payment_id,
          findchargingCost,
        }
        setShowPaymentCompleteModal(false)
        setisChargingAlertVisible(true)

        const response = await dispatch(ChargerHistory(sendData))
        console.log('response', response)
        if (response?.message === 'ChargerHistory added successfully') {
          animateNextWord()
          startCharging()
        }
      }
    } catch (error) {
      console.error('Payment Error:', error)
      Alert.alert('Payment Failed', 'Payment failed. Please try again.')
    }
  }

  const startCharging = async (paymentId) => {
    const { storedData } = await fetchDataAsyncStorageData()
    if (!storedData) {
      Alert.alert('scan please')
      return
    }
    // const sendData={
    //   chargingCost:inputCost,
    //   Porduct_Key:storedData,
    //   costofcharging:findchargingCost
    // }

    // dispatch(SendChargingCost(sendData))
    console.log('heklo')
    if (inputCost > 0 || Time) {
      console.log('click hus')
      dispatch(
        publicstartCharging(
          storedData,
          onClose,
          startTimer,
          setButtonText,
          SetstartTime,
          setcheckChargingStarted,
          handleStopCharging,
          inputCost,
          paymentId,
          ChargingEnergy,
          findchargingCost,
          setisChargingAlertVisible,
          setShowPaymentCompleteModal,
          animateNextWord
        )
      )
    } else {
      Alert.alert('Please set the cost of charging first')
    }
  }

  const onclicksetcostSetTime = (text) => {
    if (text == 'setcost') {
      SetShowSetCost(true)
      settime('')
      setInputCost('')
      SetTimeinSec('')
    }
    if (text == 'setTime') {
      setisModalVisible(true)
      // SetShowSetCost(false)
      // setInputCost('')
    }
  }
  return (
    <Modal
      // isVisible={true}
      isVisible={open}
      onSwipeComplete={onClose}
      swipeDirection={'down'}
      onBackdropPress={onClose}
      onBackButtonPress={onClose}
      style={styles.modal}
      animationOut={'slideOutDown'}
    >
      <View style={styles.container}>
        <View style={styles.contents}>
          <View style={styles.cancelButton}>
            <TouchableOpacity onPress={onClose}>
              <Image source={require('../../assets/cancel.png')} />
            </TouchableOpacity>
          </View>
          <View style={styles.contentBox}>
            <View>
              <View style={styles.Toggle_SetCost_SetTime}>
                <TouchableOpacity
                  onPress={() => {
                    onclicksetcostSetTime('setcost')
                  }}
                >
                  <Text
                    style={[
                      styles.TogglerText,
                      { color: ShowSetCost ? '#118615' : '#5B5B5B' },
                    ]}
                  >
                    Set Cost
                  </Text>
                </TouchableOpacity>
                <View
                  style={{
                    height: 40,
                    borderWidth: 1,
                    borderColor: '#DBDBDB',
                  }}
                ></View>
                <TouchableOpacity
                  onPress={() => {
                    onclicksetcostSetTime('setTime')
                    // sendData("11123")
                  }}
                >
                  <Text
                    style={[
                      styles.TogglerText,
                      { color: !ShowSetCost ? '#118615' : '#5B5B5B' },
                    ]}
                  >
                    Set Time
                  </Text>
                </TouchableOpacity>
              </View>
              <View>
                {ShowSetCost ? (
                  <ChargingCost
                    setInputCost={setInputCost}
                    inputCost={inputCost}
                    findchargingCost={findchargingCost}
                    setinputcostfromsetcost={setinputcostfromsetcost}
                    chargingUnitsfromsetCost={chargingUnitsfromsetCost}
                  />
                ) : (
                  <ChargingSetTime
                    settime={settime}
                    SetTimeinSec={SetTimeinSec}
                    setInputCost={setInputCost}
                    findchargingCostPerHour={findchargingCostPerHour}
                  />
                )}
              </View>
            </View>
            <View style={styles.paymentBox}>
              <TouchableOpacity
                style={{
                  width: 110,
                  alignItems: 'center',
                  justifyContent: 'center',
                  // marginTop: 10,
                }}
              >
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    gap: 2,
                  }}
                >
                  <Image source={require('../../assets/paytm.png')} />

                  <Text style={{ color: '#9A9999' }}>Pay Using</Text>
                  <Image source={require('../../assets/arrow_drop_up.png')} />
                </View>
                <Text
                  style={{
                    fontSize: 16,
                    fontFamily: 'sans-serif',
                    marginLeft: -40,
                    color: '#636363',
                  }}
                >
                  Razorpay
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.payButton}
                onPress={handlePayment}
                // onPress={startCharging}
              >
                <View>
                  <Text style={styles.payButtonText}>₹{inputCost}</Text>
                  <Text style={[styles.payButtonText, { fontSize: 11 }]}>
                    TOTAL
                  </Text>
                </View>
                <View>
                  <Text style={[styles.payButtonText, { fontSize: 17 }]}>
                    Pay Charge{' '}
                  </Text>
                  {/* <Text style={styles.payButtonText}>Charge</Text> */}
                </View>
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.bottomColorBox}></View>
        </View>
        <CustomModal
          visible={isModalVisible}
          onClose={() => setisModalVisible(false)}
        >
          <Text>Currently Not Available</Text>
        </CustomModal>
      </View>
    </Modal>
  )
}

const ChargingCost = ({
  setInputCost,
  inputCost,
  findchargingCost,
  setinputcostfromsetcost,
  chargingUnitsfromsetCost,
}) => {
  const [rememberMe, setRememberMe] = useState(true)

  console.log(findchargingCost, 'chargincost in chargingcost')
  const handleinputchangecost = (text) => {
    setInputCost(text)
    // setinputcostfromsetcost(text)
  }

  const [isModalVisible, setIsModalVisible] = useState(false)

  const toggleModal = () => {
    setIsModalVisible(!isModalVisible)
  }

  return (
    <View style={{ marginVertical: 10 }}>
      <Text
        style={{
          marginTop: 5,
          color: '#6C6C6C',
          fontSize: 19,
          fontWeight: '600',
        }}
      >
        Enter Amount
      </Text>
      <View
        style={{
          height: 50,
          justifyContent: 'center',
          borderWidth: 1,
          borderColor: '#C8C8C8',
          // margin: 3,
          marginTop: 10,
          borderRadius: 10,
          paddingHorizontal: 10,
          width: 290,
          marginLeft: -5,
        }}
      >
        <TextInput
          style={{
            color: 'black',
            fontSize: 20,
          }}
          placeholderTextColor={'#DBDBDB'}
          keyboardType="numeric"
          placeholder="For example ₹50"
          onChangeText={(text) => {
            handleinputchangecost(text)
          }}
          value={inputCost.toString()}
        />
      </View>
      <Text
        style={{
          color: '#6C6C6C',
          fontSize: 15,
          marginVertical: 5,
          fontWeight: '400',
          marginTop: 10,
        }}
      >
        Cost of Charging : ₹{findchargingCost} per Kwh (per Unit)
      </Text>
      <Text
        style={{
          color: '#6C6C6C',
          fontSize: 16,
          fontWeight: 400,
          marginTop: 5,
        }}
      >
        {/* {Math.ceil((inputCost / findchargingCost) * 100) / 100} */}
        {/* Charging Units - {chargingUnitsfromsetCost} kwh */}
        Charging Units - {Math.round(chargingUnitsfromsetCost * 1000) /
          1000}{' '}
        kwh
      </Text>
      <TouchableOpacity onPress={toggleModal}>
        <Text
          style={{
            color: '#118615',
            fontSize: 13,
            fontWeight: '600',
            marginTop: 8,
            textDecorationLine: 'underline',
          }}
        >
          Get Charging Cost
        </Text>
      </TouchableOpacity>

      <View style={styles.checkboxContainer}>
        <Checkbox.Android
          status={rememberMe ? 'checked' : 'unchecked'}
          onPress={() => setRememberMe(!rememberMe)}
          // uncheckedColor={theme.colors.primary}
          color={'#118615'}
          style={{ padding: 0, marginLeft: 0 }}
        />
        <Text style={styles.rememberMeText}>
          Use the credits from your wallet : ₹10
        </Text>
      </View>

      <View>
        <SetCostRecommend
          open={isModalVisible}
          onClose={toggleModal}
          CostofCharging={findchargingCost}
        />
      </View>
    </View>
  )
}

const ChargingSetTime = ({
  SetTimeinSec,
  settime,
  setInputCost,
  findchargingCostPerHour,
}) => {
  const [activeButton, setActiveButton] = useState(null)
  const [chargingCost, setChargingCost] = useState()
  const buttonClick = (buttonName) => {
    settime(buttonName)
    // SetTimeinSec(buttonName)
    setActiveButton(buttonName)
    console.log('buttonName')
    if (buttonName == '30min') {
      setChargingCost(findchargingCostPerHour / 2)
      setInputCost(findchargingCostPerHour / 2)
      SetTimeinSec(1800)
    } else if (buttonName == '1hr') {
      setChargingCost(findchargingCostPerHour)
      setInputCost(findchargingCostPerHour)
      SetTimeinSec(3600)
    } else if (buttonName == '2hrs') {
      setChargingCost(findchargingCostPerHour * 2)
      setInputCost(findchargingCostPerHour * 2)
      SetTimeinSec(7200)
    }
    // Add your additional functionality here
  }
  return (
    <View style={{ marginVertical: 10 }}>
      <Text
        style={{
          marginTop: 5,
          color: '#6C6C6C',
          fontSize: 18,
          fontWeight: '600',
        }}
      >
        Set Charging Hours
      </Text>
      <View style={styles.setTimeContainer}>
        <TouchableOpacity
          style={[
            styles.button,
            activeButton === '30min' && styles.activeButton,
          ]}
          onPress={() => buttonClick('30min')}
        >
          <Text style={{ marginLeft: 7, color: '#5B5B5B', fontWeight: '500' }}>
            30 Min.
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, activeButton === '1hr' && styles.activeButton]}
          onPress={() => buttonClick('1hr')}
        >
          <Text style={{ marginLeft: 15, color: '#5B5B5B', fontWeight: '500' }}>
            1 Hr
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.button,
            activeButton === '2hrs' && styles.activeButton,
          ]}
          onPress={() => buttonClick('2hrs')}
        >
          <Text style={{ marginLeft: 12, color: '#5B5B5B', fontWeight: '500' }}>
            2 Hrs
          </Text>
        </TouchableOpacity>
      </View>
      <View
        style={{
          // backgroundColor: 'pink',
          margin: 10,
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {/* <TimerSlider /> */}
        <ModalRadhe
          setActiveButton={setActiveButton}
          SetTimeinSec={SetTimeinSec}
          activeButton={activeButton}
          setChargingCost={setChargingCost}
          settime={settime}
          setInputCost={setInputCost}
          findchargingCostPerHour={findchargingCostPerHour}
        />
      </View>
      <Text
        style={{
          color: '#6C6C6C',
          fontSize: 15,
          marginVertical: 5,
          fontWeight: '400',
        }}
      >
        Cost of Charging- ₹{findchargingCostPerHour} per hour
      </Text>
      <Text
        style={{
          color: '#6C6C6C',
          fontSize: 15,
          fontWeight: '400',
        }}
      >
        Charging Cost- ₹{chargingCost || '0'}
      </Text>
    </View>
  )
}

export default SetCost

const styles = StyleSheet.create({
  modal: {
    margin: 0,
  },
  container: {
    flex: 1,
    // backgroundColor: 'rgba(0, 0, 0, 0.76)',
  },
  setTimeContainer: {
    marginTop: 25,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  contents: {
    position: 'absolute',
    bottom: 0,
    backgroundColor: '#fff',
    padding: 20,
    height: hp(70),
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    width: '100%',
  },
  cancelButton: {
    alignSelf: 'flex-end',
  },
  contentBox: {
    marginVertical: 20,
    padding: 20,
    backgroundColor: '#fff',
    height: hp(55),
    elevation: 2,
    borderRadius: 10,
    justifyContent: 'space-between',
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: -10,
    marginTop: 5,
  },
  rememberMeText: {
    fontSize: 14,
    color: '#6C6C6C',
  },
  Toggle_SetCost_SetTime: {
    flexDirection: 'row',
    height: 40,
    paddingHorizontal: 5,
    elevation: 1,
    backgroundColor: '#fff',
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  TogglerText: {
    color: '#5B5B5B',
    fontSize: fp(2.7),
  },
  paymentBox: {
    flexDirection: 'row',
    alignContent: 'center',
    marginTop: 10,
    // backgroundColor: 'red',
  },
  payButton: {
    flex: 1,
    flexDirection: 'row',
    borderRadius: 15,
    width: 40,
    justifyContent: 'space-between',
    alignItems: 'center',
    // backgroundColor: 'red',
    // alignItems: 'center',
    // borderRadius: 8,
    // marginTop: 30,
    padding: 10,
    height: 60,
    // marginTop: 20,
    backgroundColor: 'green',
  },
  payButtonText: {
    fontSize: fp(2.6),
    color: '#fff',
  },
  bottomColorBox: {
    position: 'absolute',
    backgroundColor: '#C1E0C2',
    bottom: 0,
    height: hp(40),
    borderTopLeftRadius: 40,
    borderTopRightRadius: 50,
    width: wp(100),
    zIndex: -1,
  },
  button: {
    backgroundColor: '#FFFFFF', // White background color
    padding: 8,
    borderRadius: 8,
    alignItems: 'flex-start', // Align text to the left
    borderWidth: 1, // Add black border
    borderColor: '#9B9B9B', // Black border color
    width: 80,
    justifyContent: 'center',
    // paddingHorizontal: 8,
    // height: 50,
  },
  activeButton: {
    borderColor: 'green',
    borderWidth: 2,
    backgroundColor: '#C1E0C2',
    color: 'white',
  },
})
