import React, { useState } from 'react'
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native'
import { Picker } from '@react-native-picker/picker'
import {
  responsiveHeight as hp,
  responsiveWidth as wp,
  responsiveFontSize as fp,
} from 'react-native-responsive-dimensions'

import App_top_Header from '../App_top_Header'

const QuesAddVehicle = ({ navigation }) => {
  const [selectedCar, setSelectedCar] = useState()

  return (
    <View style={styles.container}>
      <App_top_Header
        title={'Questionnaire'}
        navigation={navigation}
        color={'#C1E0C2'}
      />
      <View style={styles.detailscontainer}>
        <View style={styles.QuestiontextContainer}>
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
              2/4
            </Text>
          </Text>
          <View style={styles.imageContainer}>
            <Image
              source={require('../../assets/addcar.png')}
              style={styles.image}
            />
          </View>
          <Text style={styles.text}>Add your Vehicle</Text>
          <View style={styles.pickerContainer}>
            <Picker
              selectedValue={selectedCar}
              onValueChange={(itemValue, itemIndex) =>
                setSelectedCar(itemValue)
              }
              style={styles.picker}
              selectionColor={'red'}
            >
              <Picker.Item label="Tata Motors Nexon EV" value="Nexon EV" />
              <Picker.Item label="Mahindra" value="Mahindra" />
              <Picker.Item label="KIA" value="kia" />
            </Picker>
          </View>
        </View>

        <View style={styles.buttonContainer}>
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
    flex: 1,
    backgroundColor: '#fff',
  },
  detailscontainer: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'space-between',
    padding: 20,
    borderWidth: 1,
    borderColor: '#DAE0E2',
    elevation: 2,
    margin: 20,
    borderRadius: 20,
  },
  imageContainer: {
    marginVertical: 30,
    alignSelf: 'center',
  },
  image: {
    resizeMode: 'contain',
  },
  text: {
    marginVertical: 10,
    fontSize: fp(2.5),
  },
  pickerContainer: {
    backgroundColor: '#fff',
    borderRadius: 8,
    elevation: 2,
    height: 40,
    justifyContent: 'center',
  },
  picker: {
    width: wp(75),
    height: 40,
  },
  buttonContainer: {
    borderRadius: 8,
    width: '100%',
  },
  button: {
    backgroundColor: 'green',
    padding: 10,
    borderRadius: 8,
  },
  buttonText: {
    color: 'white',
    fontSize: fp(2.7),
    textAlign: 'center',
  },
})

export default QuesAddVehicle
