import React from 'react'
import QuesVeCardetails from './QuesVeCardetails'
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

import Quesheader from './Quesheader'
import { ScrollView } from 'react-native-gesture-handler'

const QuesVecDetails = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Quesheader navigation={navigation} />
      <View style={styles.detailscontainer}>
        <View>
          <View>
            <View>
              <Text
                style={{
                  marginBottom: 20,
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
                  4/4
                </Text>
              </Text>
            </View>
            <View style={styles.CarContainer}>
              <QuesVeCardetails />
            </View>
          </View>
        </View>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('Charger_Selection')}
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
  },
  detailscontainer: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'space-between',
    padding: 20,
    borderWidth: 1,
    borderColor: '#DAE0E2',
    elevation: 3,
    margin: 20,
    borderRadius: 20,
  },
  CarContainer: {
    // alignItems: 'center',
    // gap: 20,
  },
  button: {
    backgroundColor: '#118615',
    borderRadius: 15,
  },
  buttonText: {
    color: 'white',
    fontSize: fp(2.7),
    textAlign: 'center',
    padding: 10,
  },
})

export default QuesVecDetails
