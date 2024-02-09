import React, { useState } from 'react';
import { View, Button, Modal, StyleSheet, TextInput, TouchableOpacity, Text } from 'react-native';
import Timer from './radhe';
import Toast from 'react-native-toast-message';

const ModalRadhe = ({setActiveButton,activeButton}) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [userTimeHours,setuserTimeHours]=useState("")
  const [userTimeMinutes,setuserTimeMinutes]=useState("")
  const [showtime,setShowTime]=useState(true)
  const [showError,setshowError]=useState("#000000")
  console.log("userTimeHours",userTimeHours,"userTimeMinutes",userTimeMinutes);
  const onSetclick=()=>{
    if(userTimeHours==0 && userTimeMinutes==0){
      console.log("error in doono zero");
      return  setshowError("red")
    }
     if(userTimeHours>=0 && userTimeMinutes>=0){
    setModalVisible(false)
    setShowTime(false)
    setshowError("#000000")
    }
    else{

    }
  }

  const onSetTimeClick=()=>{
    setModalVisible(true)
    setActiveButton("setTime")
  }
  return (
    <View style={styles.container}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(false);
        }}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Timer setuserTimeHours={setuserTimeHours} userTimeHours={userTimeHours} userTimeMinutes={userTimeMinutes} setuserTimeMinutes={setuserTimeMinutes}/>
            {/* <Button title="set time" onPress={onSetclick}  style={styles.button}/> */}
            <TouchableOpacity onPress={onSetclick} style={styles.buttoninModal}>
      <Text style={{color:showError}}>Set Time</Text>
    </TouchableOpacity>
          </View>
        </View>
      </Modal>
      <TouchableOpacity onPress={onSetTimeClick} style={[styles.button, activeButton === 'setTime' && styles.activeButton]}>
      <Text style={styles.buttonText}>{showtime?"Set Time":`${userTimeHours}:${userTimeMinutes}`}</Text>
    </TouchableOpacity>
         </View>
  );
};

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
    height:250,
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
    borderColor: '#000000', // Black border color
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
    color: '#000000', // Black text color
    fontSize: 16,
    textAlign: 'left', // Align text to the left
  },
  activeButton: {
    borderColor: 'green',
    backgroundColor:"#C1E0C2",
    color:"white"
  },
});

export default ModalRadhe;
