import {
  StyleSheet,
  Text,
  View,
  Modal,
  Image,
  TouchableOpacity,
  TextInput,
  Alert,
  Button,
} from 'react-native'
import {
  responsiveHeight as hp,
  responsiveWidth as wp,
  responsiveFontSize as fp,
} from 'react-native-responsive-dimensions'
import React, { useState } from 'react'
import Toast from 'react-native-toast-message'
import { useDispatch } from 'react-redux'
import { StopChargingMode, publicstartCharging } from '../Redux/Action'
import AsyncStorage from '@react-native-async-storage/async-storage'
import TimerSlider from './TimerSlider'
import ModalRadhe from '../../radheModal'
// import stripe from '@stripe/stripe-react-native';
import RazorpayCheckout from 'react-native-razorpay';

const SetCost = ({ open, onClose,startTimer}) => {
  const dispatch=useDispatch()
  const [ShowSetCost, SetShowSetCost] = useState(true)
  const [inputCost,setInputCost]=useState("")


const handlePayment = () => {
  const options = {
    description: 'Payment for your order',
    image: 'https://yourwebsite.com/logo.png',
    currency: 'INR',
    key: 'YOUR_RAZORPAY_API_KEY',
    amount: '100', // amount in paisa
    name: 'Your Company Name',
    prefill: {
      email: 'customer@example.com',
      contact: '9999999999',
      name: 'Customer Name',
    },
    theme: { color: '#F37254' },
  };

  RazorpayCheckout.open(options)
    .then((data) => {
      console.log('Payment success:', data);
      Alert.alert('Payment Success', 'Payment was successful.');
    })
    .catch((error) => {
      console.error('Payment Error:', error);
      Alert.alert('Payment Failed', 'Payment failed. Please try again.');
    });
};

 const startCharging=async()=>{
    console.log("heklo");
    if(inputCost){
      console.log("click hus");
   const publicProductKey= await AsyncStorage.getItem("pid")
console.log("publicProductKey",publicProductKey)
dispatch(publicstartCharging(publicProductKey,onClose,startTimer))
    }
    else{
      // Toast.show({
      //   type:"error",
      //   text1:"Please set the cost of charging"
      // })
      Alert.alert("Please set the cost of charging first")
    }
  }
  return (
    <Modal visible={open} animationType="slide"   
    onRequestClose={onClose}
      transparent={true}
    >
      <View style={styles.container}>
        <View style={styles.contents}>
          <View style={styles.cancelButton}>
            <TouchableOpacity onPress={onClose}>
              <Image source={require('../assets/cancel.png')} />
            </TouchableOpacity>
          </View>
          <View style={styles.contentBox}>
            <View>
              <View style={styles.Toggle_SetCost_SetTime}>
                <TouchableOpacity>
                  <Text
                    style={[
                      styles.TogglerText,
                      { color: ShowSetCost ? '#118615' : '#5B5B5B' },
                    ]}
                    onPress={() => SetShowSetCost(true)}
                  >
                    Set Cost
                  </Text>
                </TouchableOpacity>
                <Text style={[{ fontSize: fp(4) ,color:"#DBDBDB"}]}>|</Text>
                <TouchableOpacity>
                  <Text
                    style={[
                      styles.TogglerText,
                      { color: !ShowSetCost ? '#118615' : '#5B5B5B' },
                    ]}
                    onPress={() => SetShowSetCost(false)}
                  >
                    Set Time
                  </Text>
                </TouchableOpacity>
              </View>
              <View>
                {ShowSetCost ? <ChargingCost setInputCost={setInputCost}/> : <ChargingSetTime />}
              </View>
            </View>
            <View style={styles.paymentBox}>
              <TouchableOpacity
                style={{
                  width: 110,
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginTop:10
                }}
              >
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    gap: 2,
                  }}
                >
                  <Image source={require('../assets/paytm.png')} />
                  <Text>Pay Using</Text>
                  <Image source={require('../assets/arrow_drop_up.png')} />
                </View>
                <Text style={{ fontSize: 16,fontFamily:"sans-serif" ,marginLeft:-40}}>Paytm UPI</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.payButton} onPress={startCharging}>
                <View>
                  <Text style={styles.payButtonText}>₹{inputCost}</Text>
                  <Text style={[styles.payButtonText, { fontSize: 11 }]}>
                    TOTAL
                  </Text>
                </View>
                <View>
                  <Text style={[styles.payButtonText,{fontSize:17}]}>Pay Charge </Text>
                  {/* <Text style={styles.payButtonText}>Charge</Text> */}
                </View>
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.bottomColorBox}></View>
        </View>
      </View>
    </Modal>
  )
}

const ChargingCost = ({setInputCost}) => {
  return (
    <View style={{ marginVertical: 10 }}>
      <Text style={{ fontSize: 22, color: '#6C6C6C' }}>Enter Amount</Text>
      <View
        style={{
          height: 50,
          justifyContent: 'center',
          borderWidth: 1,
          borderColor: '#C8C8C8',
          margin: 3,
          borderRadius: 10,
          paddingHorizontal: 10,
        }}
      >
        <TextInput
          style={{
            color: 'black',
            fontSize: 20,
          }}
          keyboardType='numeric'
          placeholder="For ex ₹444"
        onChangeText={(text)=>{setInputCost(text)}}
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
        Est. Time to Charge- 1 hr
      </Text>
      <Text
        style={{
          color: '#6C6C6C',
          fontSize: 15,
          fontWeight: '400',
        }}
      >
        Estimated Units - 88 kwh
      </Text>
    </View>
  )
}


const ChargingSetTime = () => {
  const [activeButton, setActiveButton] = useState(null);
  const buttonClick = (buttonName) => {
    setActiveButton(buttonName);
    // Add your additional functionality here
  };
  return (
    <View style={{ marginVertical: 10 }}>
         <View style={styles.setTimeContainer}>
      <TouchableOpacity
        style={[styles.button, activeButton === '30min' && styles.activeButton]}
        onPress={() => buttonClick('30min')}
      >
        <Text>30 min.</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.button, activeButton === '1hr' && styles.activeButton]}
        onPress={() => buttonClick('1hr')}
      >
        <Text>1 hr</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.button, activeButton === '2hrs' && styles.activeButton]}
        onPress={() => buttonClick('2hrs')}
      >
        <Text>2 hrs</Text>
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
        <ModalRadhe setActiveButton={setActiveButton} activeButton={activeButton}/>
      </View>
      <Text
        style={{
          color: '#6C6C6C',
          fontSize: 15,
          marginVertical: 5,
          fontWeight: '400',
        }}
      >
        Est. Cost of Charge- ₹444
      </Text>
      <Text
        style={{
          color: '#6C6C6C',
          fontSize: 15,
          fontWeight: '400',
        }}
      >
        Estimated Units- 88 kwh
      </Text>
    </View>
  )
}


export default SetCost

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.76)',
  },
  setTimeContainer:{
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
  Toggle_SetCost_SetTime: {
    flexDirection: 'row',
    elevation: 1,
    backgroundColor: '#fff',
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  TogglerText: {
    padding: 10,
    color: '#5B5B5B',
    fontSize: fp(2.7),
  },
  paymentBox: {
    flexDirection: 'row',
    height: 80,
    // backgroundColor: 'pink',
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
    height:60,
    marginTop:20,
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
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderRadius: 5,
    alignItems: 'flex-start', // Align text to the left
    borderWidth: 1, // Add black border
    borderColor: '#000000', // Black border color
    width:80,
    // height:50
  },
  activeButton: {
    borderColor: 'green',
    backgroundColor:"#C1E0C2",
    color:"white"
  },
})
