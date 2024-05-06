import React, { useState } from 'react'
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

const SetCostRecommend = ({ open, onClose }) => {
  const [selectedCar, setSelectedCar] = useState('')

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
                <Picker.Item label="Select Your Vehicle" value="" />
                <Picker.Item label="Nexon EV" value="Nexon EV" />
                <Picker.Item label="Mahindra" value="Mahindra" />
                <Picker.Item label="KIA" value="KIA" />
              </Picker>
            </View>

            <View>
              <TextInput
                style={styles.inputbox}
                placeholder="Enter Your Battery Percentage (%)"
              />
            </View>
            <Text style={styles.text}>Amount to Full Charge -</Text>
            <TouchableOpacity
              style={{
                flex: 1,
                alignItems: 'center',
                justifyContent: 'flex-end',
              }}
            >
              <Text style={styles.payButton}>Pay ₹10</Text>
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
