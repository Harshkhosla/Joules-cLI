import React from 'react'
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native'
import Quesheader from './Quesheader'

const QuesLive = ({ navigation }) => {
  return (
    <View>
      <Quesheader />
      <View style={styles.container}>
        <View>
          <View style={styles.QuestiontextContainer}>
            <Text
              style={{
                fontSize: 16,
              }}
            >
              Question{' '}
              <Text
                style={{
                  color: 'green',
                }}
              >
                2/4
              </Text>
            </Text>
          </View>
          <View
            style={{
              //   backgroundColor: 'red',
              width: '100%',
              // alignItems: 'center',
            }}
          >
            <Text style={styles.text}>Where Do You Live ?</Text>
            <View style={styles.ImageView}>
              <View
                style={{
                  alignItems: 'center',
                }}
              >
                <View
                  style={{
                    borderWidth: 8,
                    borderRadius: 20,
                    marginBottom: 10,
                    borderColor: 'green',
                  }}
                >
                  <Image
                    source={require('../assets/Group.png')}
                    style={styles.image}
                  />
                </View>
                <Text>Individual House</Text>
              </View>
              <View
                style={{
                  alignItems: 'center',
                }}
              >
                <View
                  style={{
                    borderWidth: 8,
                    borderRadius: 20,
                    marginBottom: 10,
                    borderColor: 'green',
                  }}
                >
                  <Image
                    source={require('../assets/Group.png')}
                    style={styles.image}
                  />
                </View>
                <Text>Apartment</Text>
              </View>
            </View>
          </View>
        </View>

        <View style={styles.inputContainer}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate('QuesLive')}
          >
            <Text style={styles.buttonText}>Add Vehicle</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    height: 500,
    justifyContent: 'space-between',
    paddingVertical: 20,
    // alignItems: 'center',
    borderWidth: 1,
    borderColor: '#DAE0E2',
    margin: 20,
    borderRadius: 20,
  },
  QuestiontextContainer: {
    // backgroundColor: 'pink',
    padding: 10,
    alignItems: 'flex-end',
  },
  text: {
    padding: 10,
    fontSize: 18,
  },
  ImageView: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 8,
    // width: '90%',
    // borderWidth: 1,
  },

  image: {
    width: 120,
    height: 120,
    resizeMode: 'contain',
    borderRadius: 10,
  },

  inputContainer: {
    marginHorizontal: 10,
    marginTop: 20,
    borderRadius: 20,
    width: '100%',
  },

  button: {
    backgroundColor: 'green',
    marginHorizontal: 20,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 15,
    marginTop: 10,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    textAlign: 'center',
  },
})

export default QuesLive
