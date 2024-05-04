import React from 'react'
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native'
import Modal from 'react-native-modal'

const ChargingAlertModal = ({
  visible,
  onClose,
  energyConsumed,
  cost,
  time,
}) => {
  return (
    <Modal
      isVisible={visible}
      onSwipeComplete={onClose}
      //   swipeDirection={['down']}
      onBackdropPress={onClose}
      onBackButtonPress={onClose}
      style={styles.modal}
      animationIn="fadeIn"
      animationOut="fadeOut"
      animationOutTiming={300}
    >
      <TouchableOpacity
        activeOpacity={1}
        onPress={onClose}
        style={styles.modalContainer}
      >
        <View style={styles.contentContainer}>
          <Text style={styles.heading}>Charging Complete</Text>
          <View style={styles.horizontalLine} />
          <View>
            <View style={styles.fieldContainer}>
              <Text style={styles.fieldLabel}>Energy Consumed</Text>
              <Text style={[styles.fieldColon, { marginLeft: 0 }]}>:</Text>
              {/* <Text style={styles.fieldValue}>{energyConsumed}</Text> */}
              <Text style={styles.fieldValue}>{Math.round(energyConsumed * 100) / 100}</Text>
            </View>
            <View style={styles.fieldContainer}>
              <Text style={styles.fieldLabel}>Cost of charging</Text>
              <Text style={[styles.fieldColon, { marginLeft: 11 }]}>:</Text>
              <Text style={styles.fieldValue}>{Math.round(cost * 100) / 100}</Text>
            </View>
            <View style={styles.fieldContainer}>
              <Text style={styles.fieldLabel}>Time taken</Text>
              <Text style={[styles.fieldColon, { marginLeft: 46 }]}>:</Text>
              <Text style={styles.fieldValue}>{time}</Text>
            </View>
          </View>
          <TouchableOpacity onPress={onClose} style={styles.okButton}>
            <Text style={styles.okButtonText}>OK</Text>
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    </Modal>
  )
}

const styles = StyleSheet.create({
  modal: {
    margin: 0,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
  },
  contentContainer: {
    width: '75%',
    backgroundColor: 'white',
    borderRadius: 15,
    padding: 10,
    alignItems: 'center',
    borderColor: 'green',
    borderWidth: 2,
  },
  heading: {
    color: '#717171',
    fontWeight: '600',
    fontSize: 18,
    marginBottom: 5,
  },
  horizontalLine: {
    borderBottomWidth: 1,
    borderBottomColor: '#DBDBDB',
    width: '66%',
    marginBottom: 15,
  },
  fieldContainer: {
    flexDirection: 'row',
    marginBottom: 5,
  },
  fieldLabel: {
    color: '#717171',
    fontWeight: '600',
    marginRight: 10,
  },
  fieldColon: {
    color: '#717171',
    fontWeight: '600',
    marginHorizontal: 5,
  },
  fieldValue: {
    color: '#000',
  },
  okButton: {
    backgroundColor: 'green',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 5,
    marginTop: 10,
  },
  okButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
})

export default ChargingAlertModal
