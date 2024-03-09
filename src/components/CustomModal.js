import React from 'react'
import { StyleSheet, Image, View, BackHandler, Text } from 'react-native'
import Modal from 'react-native-modal'

const CustomModal = ({ visible, onClose, children }) => {
  React.useEffect(() => {
    const handleBackPress = () => {
      if (visible) {
        onClose()
        return true // Return true to prevent default back button action
      }
      return false // Allow default back button action if modal is not visible
    }

    // Add event listener for back button press
    BackHandler.addEventListener('hardwareBackPress', handleBackPress)

    // Clean up the event listener when the component unmounts
    return () => {
      BackHandler.removeEventListener('hardwareBackPress', handleBackPress)
    }
  }, [visible, onClose])

  return (
    <Modal
      isVisible={visible}
      onSwipeComplete={onClose}
      swipeDirection={['down']}
      onBackdropPress={onClose}
      onBackButtonPress={onClose} // This will close the modal on back button press
      style={styles.modal}
      animationIn="slideInUp"
      animationOut="slideOutDown"
    >
      <View style={styles.modalContainer}>
        <View style={styles.contentContainer}>
          <Text style={{color:"#717171",fontWeight:"800",fontSize:30}}>{children}</Text>
          <Image
            source={require('../assets/Union.png')}
            style={styles.imageStyle}
          />
        </View>
      </View>
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
    height: 200,
    width: '70%',
    backgroundColor: 'white',
    borderRadius: 15,
    padding: 20,
    borderColor: 'green',
    borderWidth: 3,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.5,
    shadowRadius: 19,
    elevation: 5,
    position: 'relative',
  },
  imageStyle: {
    width: 70,
    height: 70,
    position: 'absolute',
    bottom: 10,
    right: 16,
  },
})

export default CustomModal
