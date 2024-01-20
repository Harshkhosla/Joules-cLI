import React from 'react'
import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  TouchableOpacity,
} from 'react-native'

const Quesimg = ({ navigation }) => {
  return (
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
            1/4
          </Text>
        </Text>
      </View>

      <Image source={require('../assets/icon89.png')} style={styles.image} />
      <View style={styles.inputContainer}>
        <Text style={styles.text}>
          Some Text Below Image Some Text Below Image
        </Text>
        <TextInput
          style={styles.input}
          placeholder="Enter text Enter textEnter text"
        />
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('QuesAddVhicle')}
        >
          <Text style={styles.buttonText}>Next</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
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
  },

  image: {
    width: 200,
    height: 200,
    resizeMode: 'cover',
    borderRadius: 10,
    marginBottom: 40,
  },
  inputContainer: {
    marginHorizontal: 10,
    marginTop: 20,
    borderRadius: 20,
  },
  text: {
    marginTop: 10,
    fontSize: 18,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 15,
    marginTop: 10,
    marginBottom: 10,
    padding: 8,
  },
  button: {
    backgroundColor: 'green',
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

export default Quesimg
