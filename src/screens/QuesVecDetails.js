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

const QuesVecDetails = ({ navigation }) => {
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
              4/4
            </Text>
          </Text>
        </View>
        <View style={styles.imageView}>
          <Text style={styles.text}>Some Text Below Image</Text>
          <View style={styles.imageCentering}>
            <Image
              source={require('../assets/Group.png')}
              style={styles.image}
            />
          </View>

          <View style={styles.carDetails}>
            <Text>Vehicle No. </Text>
            <Text>Connector Type-</Text>
          </View>
        </View>

        <View style={styles.inputContainer}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate('QuesVecDetails')}
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
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#DAE0E2',
    paddingVertical: 20,
    margin: 20,
    borderRadius: 20,
  },
  QuestiontextContainer: {
    // backgroundColor: 'pink',
    alignItems: 'flex-end',
    width: '90%',
    // marginBottom: 40,
  },
  imageView: {
    borderWidth: 1,
    borderColor: '#DAE0E2',
    borderRadius: 15,
    width: '90%',
    // alignItems: 'center',
  },
  imageCentering: {
    alignItems: 'center',
  },
  image: {
    width: 120,
    height: 120,
    margin: 10,
    resizeMode: 'contain',
    borderRadius: 10,
    // marginHorizontal: 'auto',
  },
  carDetails: {
    padding: 20,
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
    backgroundColor: '#DAE0E2',
  },
  text: {
    marginTop: 10,
    fontSize: 18,
    paddingLeft: 15,
    marginBottom: 10,
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

export default QuesVecDetails
