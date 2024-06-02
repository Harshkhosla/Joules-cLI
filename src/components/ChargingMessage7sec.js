import React, { useState, useEffect } from 'react';
import { Modal, View, Text, StyleSheet, Button } from 'react-native';

const CustomModal7Sec = ({ visible, onClose, heading, data, index }) => {
  const [countdown, setCountdown] = useState(60); // Set the countdown starting from 60 seconds

  useEffect(() => {
    let timer;
    if (visible) {
      setCountdown(60); // Reset the countdown whenever the modal becomes visible
      timer = setInterval(() => {
        setCountdown(prevCountdown => {
          if (prevCountdown <= 1) {
            clearInterval(timer);
            onClose(); // Automatically close the modal when the countdown reaches 0
            return 0;
          }
          return prevCountdown - 1;
        });
      }, 1000);
    }

    return () => clearInterval(timer); // Clean up the timer on unmount or when visible changes
  }, [visible]);

  const item = data[index]; // Get the item from data using the index

  return (
    <Modal
      transparent={true}
      animationType="slide"
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <Text style={styles.heading}>{heading}</Text>
          {item && (
            <>
              <Text style={styles.subheading}>{item.subheading}</Text>
              <Text style={styles.bodyText}>{item.message}</Text>
            </>
          )}
          <Text style={styles.countdown}>Time remaining: {countdown}s</Text>
          <Button title="Close" onPress={onClose} color="#BB86FC" />
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.8)', // Darker overlay
  },
  modalContent: {
    width: 300,
    padding: 20,
    backgroundColor: '#121212', // Dark background color
    borderRadius: 10,
    alignItems: 'center',
  },
  heading: {
    fontSize: 20,
    marginBottom: 20,
    color: '#BB86FC', // Light purple color for heading
  },
  subheading: {
    fontSize: 18,
    marginBottom: 10,
    color: '#BB86FC', // Light purple color for subheading
  },
  bodyText: {
    fontSize: 16,
    marginBottom: 20,
    color: '#E0E0E0', // Light gray color for body text
  },
  countdown: {
    fontSize: 16,
    marginBottom: 20,
    color: '#FF6F61', // Light gray color for countdown text
  },
});

export default CustomModal7Sec;
