import { Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Circle from '../Circle'

const MessagePage = ({ navigation }) => {
  setTimeout(() => {
    navigation.navigate('HomechargingHomepage')
  }, 3000)

  return (
    <View style={styles.container}>
      <View style={styles.imgContainer}>
        <Image style={styles.leafimg} source={require('../../assets/leaf.png')} />
        <Image style={styles.handimg} source={require('../../assets/hand.png')} />
        <View
          style={{
            position: 'absolute',
            top: 150,
            bottom: 0,
            left: -290,
            right: 0,
          }}
        >
          <Circle />
        </View>
      </View>
      <View style={styles.messageSection}>
        <View style={{ flexDirection: 'row' }}>
          <Text
            style={{
              padding: 8,
              backgroundColor: 'green',
              borderRadius: 10,
              fontSize: 18,
              color: '#fff',
            }}
          >
            Ignited gratitude
          </Text>
          <Text
            style={{
              //   fontSize: 20,
              marginLeft: 8,
              alignSelf: 'flex-end',
            }}
          >
            for your
          </Text>
        </View>
        <Text style={{ fontSize: 29, fontWeight: '400', color: '#808080' }}>
          commitment to a
          <Text style={{ color: '#118615' }}> greener, sustainable </Text>
          tomorrow
        </Text>
      </View>
    </View>
  )
}

export default MessagePage

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  imgContainer: {
    flex: 1,
    // backgroundColor: 'red',
    alignItems: 'flex-end',
    // position: 'absolute',
    // top: 0,
    // bottom: 0,
    // left: 0,
    // right: 0,
  },
  leafimg: {
    position: 'absolute',
    width: '75%',
    resizeMode: 'contain',
    top: -260,
  },
  handimg: {
    width: '70%',
    resizeMode: 'contain',
    position: 'absolute',
  },
  messageSection: {
    padding: 20,
  },
})
