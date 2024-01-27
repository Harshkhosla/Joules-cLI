import React, { useState } from 'react'
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native'
import Quesheader from './Quesheader'
import Toast from 'react-native-toast-message';

const QuesLive = ({ navigation }) => {
  const [borderedImage, setBorderedImage] = useState(null);
  const handleImagePress = (imageId) => {
    setBorderedImage(imageId);
  };

  const nextButtonClick=()=>{
    if(borderedImage){
      navigation.navigate('QuesAddVhicle')
    }
    else{
      Toast.show({
        type:"error",
        text1:"please select You live",
        position:"bottom",
        visibilityTime: 1000
      })
    }
  }
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
                <TouchableOpacity onPress={() => handleImagePress(1)}>
                <View
                 style={[borderedImage === 1 && styles.imageClick]}
                >
                  <Image
                    source={require('../assets/Group.png')}
                    style={styles.image}
                  />
                </View>
                </TouchableOpacity>
                <Text>Individual House</Text>
              </View>
              <View
                style={{
                  alignItems: 'center',
                }}
              >
                <TouchableOpacity onPress={() => handleImagePress(2)}>
                <View
                style={[borderedImage === 2 && styles.imageClick]}
                >
                  <Image
                    source={require('../assets/Group.png')}
                    style={styles.image}
                  />
                </View>
                </TouchableOpacity>
                <Text>Apartment</Text>
              </View>
            </View>
          </View>
        </View>

        <View style={styles.inputContainer}>
          <TouchableOpacity
            style={styles.button}
            onPress={nextButtonClick}
          >
            <Text style={styles.buttonText}>Next</Text>
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
imageClick:{
  borderWidth: 8,
  borderRadius: 20,
  marginBottom: 10,
  borderColor: 'green'
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
