// PermissionModal.js
import React from 'react';
import { Modal, View, Text, Button, StyleSheet } from 'react-native';

const PermissionModal = ({ visible, onRequestPermission, onCancel }) => {
  return (
    <Modal visible={visible} transparent={true} animationType="slide">
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>Enable Notifications</Text>
          <Text style={styles.modalMessage}>
            We would like to send you notifications to keep you updated.
          </Text>
          <Button title="Allow" onPress={onRequestPermission} />
          <Button title="Cancel" onPress={onCancel} />
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: 300,
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    alignItems: 'center',
  },
  modalTitle: {
    color:"black",
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  modalMessage: {
    color:"black",
    fontSize: 16,
    marginBottom: 20,
    textAlign: 'center',
  },
});

export default PermissionModal;
