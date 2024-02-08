import React, { useState } from 'react';
import { View, Button, Modal, StyleSheet, TextInput, TouchableOpacity, Text } from 'react-native';
import Timer from './radhe';

const ModalRadhe = () => {
  const [modalVisible, setModalVisible] = useState(false);

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
            <Timer />
            <Button title="Close" onPress={() => setModalVisible(false)} />
          </View>
        </View>
      </Modal>
      <TouchableOpacity onPress={() => setModalVisible(true)} style={styles.button}>
      <Text style={styles.buttonText}>Set Time</Text>
    </TouchableOpacity>
      {/* <Button title="Open Timer" onPress={() => setModalVisible(true)}  /> */}
      {/* <TextInput onFocus={() => setModalVisible(true)} style={{color:"white",backgroundColor:"black",width:150}}/> */}
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
  buttonText: {
    color: '#000000', // Black text color
    fontSize: 16,
    textAlign: 'left', // Align text to the left
  },
});

export default ModalRadhe;
