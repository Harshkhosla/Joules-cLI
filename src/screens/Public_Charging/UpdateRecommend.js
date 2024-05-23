import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native'
import {
  responsiveHeight as hp,
  responsiveWidth as wp,
} from 'react-native-responsive-dimensions'
import Modal from 'react-native-modal'

const UpdateRecommend = ({ open, onClose }) => {
  return (
    <Modal
      // isVisible={true}
      isVisible={open}
      onSwipeComplete={onClose}
      swipeDirection={['down']}
      onBackdropPress={onClose}
      onBackButtonPress={onClose}
      style={styles.modal}
    >
      <View style={styles.container}>
        <View style={styles.contents}>
          {/* <View style={styles.cancelButton}>
            <TouchableOpacity onPress={onClose}>
              <Image source={require('../../assets/cancel.png')} />
            </TouchableOpacity>
          </View> */}
          <View style={styles.contentBox}>
            <View style={styles.cancelButton}>
              <TouchableOpacity onPress={onClose}>
                <Image
                  style={{
                    resizeMode: 'contain',
                    height: 60,
                    width: 120,
                  }}
                  source={require('../../assets/jouls.png')}
                />
              </TouchableOpacity>
            </View>

            <Text style={styles.text}>Hey there,</Text>
            <Text style={styles.text}>Electric Explorer !! </Text>

            <View
              style={{
                marginTop: 30,
              }}
            >
              <Text style={styles.text}>
                We've supercharged Jouls
                <Text style={{ color: '#118615' }}>Connect</Text> app with the
                latest and greatest features
              </Text>
            </View>

            <TouchableOpacity>
              <Text
                style={{
                  color: '#118615',
                  fontSize: 13,
                  fontWeight: '600',
                  marginTop: 50,
                  textDecorationLine: 'underline',
                }}
              >
                See what’s new
              </Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.UpdateButtonContainer}>
              <View style={styles.UpdateButton}>
                <Text style={styles.UpdateText}>Update Now</Text>
              </View>
              <Text style={{ marginTop: 2 }}>
                Please Update the App before Charging
              </Text>
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

export default UpdateRecommend

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
    marginVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: '#fff',
    flex: 1,
    borderRadius: 14,
    borderColor: '#B7B7B7',
    borderWidth: 1,
  },
  text: {
    color: '#000000',
    fontSize: 20,
    fontWeight: 400,
  },

  UpdateButtonContainer: {
    flex: 1,
    position: 'absolute',
    bottom: 10,
    left: 0,
    right: 0,
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  UpdateButton: {
    flexDirection: 'row',
    gap: 6,
    padding: 8,
    paddingHorizontal: 10,
    borderWidth: 1,
    color: '#fff',
    borderColor: '#118615',
    borderRadius: 8,
    backgroundColor: '#118615',
    alignItems: 'center',
    justifyContent: 'center',
    width: 280,
  },
  UpdateText: {
    color: '#fff',
    fontSize: 16,
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
