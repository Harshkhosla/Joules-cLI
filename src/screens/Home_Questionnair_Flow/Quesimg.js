import React from 'react'
import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  TouchableOpacity,
} from 'react-native'
import {
  responsiveHeight as hp,
  responsiveWidth as wp,
  responsiveFontSize as fp,
} from 'react-native-responsive-dimensions'

const Quesimg = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <View style={styles.QuestionPageContainer}>
        <Text
          style={{
            fontSize: fp(2),
            textAlign: 'right',
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
      <View style={styles.imageContainer}>
        <Image source={require('../../assets/house.png')} style={styles.image} />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.text}>
          What is the Maximum electrical sanctioned load of your home?
        </Text>
        <TextInput
          style={styles.input}
          placeholder="Enter text Enter textEnter text"
        />
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('QuesLive')}
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
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#D4D4D4',
    borderRadius: 20,
    elevation: 1,
    margin: 20,
    padding: 20,
  },
  QuestionPageContainer: {
    marginBottom: 20,
  },
  imageContainer: {
    flex: 1,
  },
  image: {
    resizeMode: 'contain',
    alignSelf: 'center',
    marginVertical: 40,
  },
  inputContainer: {
    marginTop: 20,
    borderRadius: 20,
  },
  text: {
    marginTop: 10,
    fontSize: fp(2.5),
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 8,
    marginTop: 10,
    padding: 8,
  },
  button: {
    backgroundColor: 'green',
    paddingVertical: 10,
    borderRadius: 8,
    marginTop: 10,
  },
  buttonText: {
    color: 'white',
    fontSize: fp(2.6),
    textAlign: 'center',
  },
})

export default Quesimg