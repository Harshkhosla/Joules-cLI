import React, { useEffect, useState } from 'react'
import {
  View,
  Button,
  Modal,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Text,
  Image,
} from 'react-native'
import Toast from 'react-native-toast-message'
import Timer from './radhe'

const ModalRadhe = ({
  setActiveButton,
  activeButton,
  setChargingCost,
  SetTimeinSec,
  settime,
  setInputCost,
  findchargingCostPerHour
}) => {
  const [modalVisible, setModalVisible] = useState(false)
  const [userTimeHours, setuserTimeHours] = useState('')
  const [userTimeMinutes, setuserTimeMinutes] = useState('')
  const [showtime, setShowTime] = useState(true)
  const [showError, setshowError] = useState('#000000')
  const [showhrText, setShowhrText] = useState('')
  console.log(
    'userTimeHours',
    userTimeHours,
    'userTimeMinutes',
    userTimeMinutes
  )
  const onSetclick = () => {
    let a = ((userTimeHours * 60 + userTimeMinutes) / 60) * findchargingCostPerHour
    a = a.toFixed(2)
    setChargingCost(a)
    setInputCost(a)
    if (userTimeHours == 0 && userTimeMinutes > 0) {
      setShowhrText(userTimeMinutes + 'min')
      SetTimeinSec(userTimeMinutes*60)
      settime(userTimeMinutes)
    }
    else  if (userTimeMinutes == 0 && userTimeHours == 1) {
      setShowhrText(userTimeHours + 'hr')
      SetTimeinSec(userTimeHours*3600)
      settime(userTimeHours)
    }
   else if (userTimeMinutes == 0 && userTimeHours > 0) {
      setShowhrText(userTimeHours + 'hr')
      SetTimeinSec(userTimeHours*3600)
      settime(userTimeHours)
    }
  
   else if (userTimeHours > 0 && userTimeMinutes > 0) {
      setShowhrText(`${userTimeHours} hr ${userTimeMinutes} min`)
      const data = userTimeHours * 3600 + userTimeMinutes * 60
      SetTimeinSec(data.toString())
      settime(`${userTimeHours} hr ${userTimeMinutes} min`)
    }
    if (userTimeHours == 0 && userTimeMinutes == 0) {
      console.log('error in doono zero')
      return setshowError('red')
    }
    if (userTimeHours >= 0 && userTimeMinutes >= 0) {
      setModalVisible(false)
      setShowTime(false)
      setshowError('#000000')
    } else {
    }
  }

  useEffect(() => {
    if (activeButton != 'setTime') {
      setShowTime(true)
    }
  }, [activeButton])

  const onSetTimeClick = () => {
    setModalVisible(true)
    setActiveButton('setTime')
  }
  return (
    <View style={styles.container}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(false)
        }}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            {/* <Image source={require("../../assets/Union.png")} style={styles.image} /> */}
            <Timer
              setuserTimeHours={setuserTimeHours}
              userTimeHours={userTimeHours}
              userTimeMinutes={userTimeMinutes}
              setuserTimeMinutes={setuserTimeMinutes}
            />
            {/* <Button title="set time" onPress={onSetclick}  style={styles.button}/> */}
            <TouchableOpacity onPress={onSetclick} style={styles.buttoninModal}>
              <Text style={{ color: showError }}>Set Time</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      <TouchableOpacity
        onPress={onSetTimeClick}
        style={[
          styles.button,
          activeButton === 'setTime' && styles.activeButton,
        ]}
      >
        <Text style={styles.buttonText}>
          {showtime ? 'Select Other Time' : `${showhrText}`}
        </Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    // justifyContent: 'center',
    // alignItems: 'center',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: '#fff',
    padding: 10,
    height: 250,
    borderRadius: 10,
    elevation: 5,
    width: '80%', // Adjust the width of the modal content
  },
  button: {
    backgroundColor: '#FFFFFF', // White background color
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    alignItems: 'flex-start', // Align text to the left
    borderWidth: 1, // Add black border
    borderColor: '#7B7B7B', // Black border color
    width: 279,
    marginTop: 10,
  },
  buttoninModal: {
    backgroundColor: '#FFFFFF', // White background color
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    alignItems: 'center', // Align text to the left
    borderWidth: 1, // Add black border
    borderColor: '#000000', // Black border color
  },
  buttonText: {
    color: '#9B9B9B', // Black text color
    fontSize: 16,
    textAlign: 'left', // Align text to the left
    marginLeft: -10,
  },
  activeButton: {
    borderColor: 'green',
    backgroundColor: '#C1E0C2',
    color: 'white',
  },
  image: {
    width: 20, // Adjust the width of the image
    height: 20, // Adjust the height of the image
    marginRight: 10, // Adjust the margin if needed
  },
})

export default ModalRadhe
