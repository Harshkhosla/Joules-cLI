import React, { useState } from 'react'
import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  TouchableOpacity,
  Alert,
  KeyboardAvoidingView,
} from 'react-native'
import { useDispatch } from 'react-redux';
import { setLoad } from '../Redux/Action';
import { ScrollView } from 'react-native-gesture-handler';
import {
  responsiveHeight as hp,
  responsiveWidth as wp,
  responsiveFontSize as fp,
} from 'react-native-responsive-dimensions'


const Quesimg = ({ navigation }) => {
  const [value, setValue] = useState('');
  // const navigation = useNavigation();
  const dispatch = useDispatch()

  const handleChangeText = (text) => {
    console.log(text,"Quesimg");
    setValue(text);
  };

  const handleButtonClick = () => {
    const sample  = value / 0.22;
    // console.log(sample);
    const house_voltage=Math.floor(sample)
    console.log("house_voltage",house_voltage);
    {
      value < "10" ? Alert.alert('Alert Title', 'Connect to the nearest Discom', [
        {
          value: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        { value: 'OK', onPress: () => console.log('OK Pressed quesimg') },
      ]) :
        dispatch(setLoad(house_voltage))
      navigation.navigate('QuesLive')
    }
    // navigation.navigate('Eligible');
  };
  return (
    <ScrollView contentContainerStyle={styles.keyContainer}>
    <KeyboardAvoidingView   behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.innerkey}>
    <View style={styles.container}>
      <View style={styles.QuestionPageContainer}>
        <Text
          style={{

            marginBottom: 200,
            // fontSize: 16
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
      </View>
      <View style={styles.containerForView}>
      <Image source={require('../assets/VectorHome.png')} style={styles.image} />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.text}>
        What is the Maximum electrical sanctioned load of your home?
        </Text> 

      <View style={styles.imageContainer}>
        <Image source={require('../assets/house.png')} style={styles.image} />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.text}>
          What is the Maximum electrical sanctioned load of your home?
        </Text>

        <TextInput
          style={styles.input}
          placeholder="Enter text Enter textEnter text Quesimg"
          onChangeText={handleChangeText}
        />
        <TouchableOpacity
          style={styles.button}

          onPress={() => {handleButtonClick()}}
        >
          <Text style={styles.buttonText}>Next</Text>
        </TouchableOpacity>
      </View>
    </View>
    </KeyboardAvoidingView>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  keyContainer:{
    flex: 1,
    justifyContent: 'center'
  },
  innerkey: {
    padding: 24,
    flex: 1,
    justifyContent: 'center',
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    // justifyContent: 'center',
    // alignItems: 'center',
    borderWidth: 1,
    borderColor: '#D4D4D4',
    borderRadius: 20,
    elevation: 2,
    margin: 20,
    padding: 20,
  },
  QuestionPageContainer: {
    marginBottom: 20,
  },
  imageContainer: {
    flex: 1,
    // backgroundColor: 'pink',
  },

  containerForView: {
    width:180,
    height:120,
    overflow:"hidden",
    marginBottom:20,
    borderWidth:1,
    // position:"relative"
  },
  image: {
    width: "100%",
    height: "100%",
    resizeMode: 'contain',
    borderRadius: 10,
    marginBottom: 40

//   image: {
//     resizeMode: 'contain',
//     marginVertical: 40,

  },
  inputContainer: {
    // marginHorizontal: 10,
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
    borderRadius: 15,
    marginTop: 10,
    padding: 8,
  },
  button: {
    backgroundColor: 'green',
    paddingVertical: 10,
    borderRadius: 15,
    marginTop: 10,
  },
  buttonText: {
    color: 'white',
    fontSize: fp(2.6),
    textAlign: 'center',
  },
})

export default Quesimg
