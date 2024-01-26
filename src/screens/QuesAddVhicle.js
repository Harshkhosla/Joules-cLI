import React from 'react'
import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  TouchableOpacity,
} from 'react-native'
import Quesheader from './Quesheader'

const QuesAddVhicle = ({ navigation }) => {
  return (
    <View>
      <Quesheader />
      <View style={styles.container}>
        <View style={styles.QuestiontextContainer}>
          <Text
            style={{
              marginBottom: 20,
              fontSize: 16,
            }}
          >
            Question{' '}
            <Text
              style={{
                color: 'green',
              }}
            >
              3/4
            </Text>
          </Text>
        </View>
        <View>
          <Image source={require('../assets/Group.png')} style={styles.image} />
          <Text style={styles.text}>Some Text Below Image</Text>
        </View>

        <View style={styles.inputContainer}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate('QuesAddVhicle')}
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
    justifyContent: 'space-around',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#DAE0E2',
    margin: 20,
    borderRadius: 20,
  },
  QuestiontextContainer: {
    // backgroundColor: 'pink',
    alignItems: 'flex-end',
    width: '90%',
    marginBottom: 40,
  },

  image: {
    width: 200,
    height: 200,
    resizeMode: 'contain',
    borderRadius: 10,
  },
  text: {
    marginTop: 10,
    fontSize: 18,
    marginBottom: 40,
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

export default QuesAddVhicle
