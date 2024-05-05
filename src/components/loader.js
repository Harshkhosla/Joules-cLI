import React from 'react'
import { Image, View, ActivityIndicator, StyleSheet, Text } from 'react-native'
import Modal from 'react-native-modal'
import LoaderKit from 'react-native-loader-kit'

const LoaderComponent = ({ loading }) => {
  return (
    <Modal
      isVisible={loading}
      style={styles.modal}
      animationIn="fadeIn"
      animationOut="fadeOut"
      backdropOpacity={0.5}
    >
      <View style={styles.container}>
        <Image source={require('../assets/jouls.png')} style={styles.image} />
        <View style={styles.modalContainer}>
          <View style={styles.contentContainer}>
            <Text style={styles.text}>Connecting</Text>
            <LoaderKit
              style={{
                width: 20,
                height: 20,
                marginTop: 16,
              }}
              name={'BallPulse'}
              color={'#118615'}
            />
          </View>
          <ActivityIndicator
            // animating={loading}
            size="large"
            color="#118615"
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
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
    alignItems: 'center',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  contentContainer: {
    flexDirection: 'row',
  },
  image: {
    width: 180,
    height: 60,
    resizeMode: 'cover',
  },
  text: {
    color: '#118615',
    fontWeight: '500',
    fontSize: 24,
    alignItems: 'center',
  },
})

export default LoaderComponent
