import React, { useEffect, useState } from 'react'
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  TextInput,
} from 'react-native'
import {
  responsiveHeight as hp,
  responsiveWidth as wp,
} from 'react-native-responsive-dimensions'
import Modal from 'react-native-modal'
import { Picker } from '@react-native-picker/picker'

const SetCostRecommend = ({ open, onClose ,CostofCharging}) => {
  const [selectedCar, setSelectedCar] = useState('')
  const [paycost,setPaycost]=useState("")
  const [batteryPercentage,setBatteryPercentage]=useState("")

  const handleBatteryPercentage = (percentage) => {

    if (percentage > 100) {
        console.log("Percentage value cannot exceed 100.");
        return;
    }

    setBatteryPercentage(`${percentage}`);
}

useEffect(()=>{
  if (!batteryPercentage || !selectedCar) {
    setPaycost(0);
    return;
}

if (batteryPercentage > 100) {
    console.error("Percentage value cannot exceed 100.");
    return;
}

const payCostInWh = (selectedCar * 1000 * (100 - batteryPercentage)) / 100;
const payCostInRupees = Math.ceil((CostofCharging / 1000) * payCostInWh);
console.log("payCostInWh", payCostInWh,payCostInRupees,CostofCharging,selectedCar);
setPaycost(payCostInRupees);
},[batteryPercentage,selectedCar])


  

  return (
    <Modal
      //   isVisible={true}
      isVisible={open}
      onSwipeComplete={onClose}
      swipeDirection={['down']}
      onBackdropPress={onClose}
      onBackButtonPress={onClose}
      style={styles.modal}
    >
      <View style={styles.container}>
        <View style={styles.contents}>
          <View style={styles.cancelButton}>
            <TouchableOpacity onPress={onClose}>
              <Image source={require('../../assets/cancel.png')} />
            </TouchableOpacity>
          </View>
          <View style={styles.contentBox}>
            <Text style={styles.text}>
              Please choose your vehicle & enter your current battery percentage
              (%) in the vehicle
            </Text>

            <View style={styles.pickerContainer}>
              <Picker
                selectedValue={selectedCar}
                onValueChange={(itemValue) => setSelectedCar(itemValue)}
                style={styles.picker}
                prompt="Select Your Vehicle"
              >
                <Picker.Item label="OLA S1X +" value="3" />
                <Picker.Item label="Ather" value="2.97" />
                <Picker.Item label="Tvs" value="3.4" />
                <Picker.Item label="Jetter" value="5.1" />
                <Picker.Item label="Bajaj Chetak" value="3.2" />
                <Picker.Item label="Jetter" value="2.08" />
              </Picker>
            </View>

            <View>
              <TextInput
                style={styles.inputbox}
                placeholder="Enter Your Battery Percentage (%)"
                placeholderTextColor={"#7D7B7B"}
                keyboardType='numeric'
                value={batteryPercentage}
                onChangeText={handleBatteryPercentage}
              />
            </View>
            {/* <Text style={styles.text}>Cost of Charging - </Text> */}
            <Text style={styles.text}>Amount of Full Charge - </Text>
            {/* <Text style={styles.text}>Amount of charing units - </Text> */}
            <TouchableOpacity
              style={{
                flex: 1,
                alignItems: 'center',
                justifyContent: 'flex-end',
              }}
            >
              <Text style={styles.payButton}>Pay ₹ {paycost}</Text>
            </TouchableOpacity>
          </View>

          <View
            style={[styles.bottomColorBox, { backgroundColor: '#C1E0C2' }]}
          />
        </View>
      </View>
    </Modal>
  )
}

export default SetCostRecommend

const styles = StyleSheet.create({
  modal: {
    margin: 0,
  },
  container: {
    flex: 1,
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
    gap: 20,
    marginVertical: 10,
    padding: 20,
    backgroundColor: '#fff',
    flex: 1,
    borderRadius: 14,
    borderColor: '#B7B7B7',
    borderWidth: 1,
  },
  text: {
    color:"#6C6C6C",
    fontSize: 16,
    marginBottom: 10,
  },
  payButton: {
    padding: 10,
    borderWidth: 1,
    color: '#fff',
    borderColor: '#118615',
    borderRadius: 8,
    backgroundColor: '#118615',
    alignItems: 'center',
    justifyContent: 'center',
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: '#464444',
    borderRadius: 8,
    backgroundColor: '#fff',
    height: 45,
    justifyContent: 'center',
  },
  picker: {
    color: '#8A8989',
  },
  inputbox: {
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: '#464444',
    borderRadius: 8,
    backgroundColor: '#fff',
    height: 45,
    marginBottom: hp(3),
    color:"#000000"
  },
  bottomColorBox: {
    position: 'absolute',
    bottom: 0,
    height: hp(40),
    borderTopLeftRadius: 15,
    borderTopRightRadius: 60,
    width: wp(100),
    zIndex: -1,
  },
})
