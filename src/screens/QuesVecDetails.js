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
      <ScrollView>
        <View style={styles.detailsContainer}>
          <View>
            <View style={styles.QuestiontextContainer}>
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
              {/* <QuesVeCardetails />
              <QuesVeCardetails />
              <QuesVeCardetails /> */}
            </View>
          </View>
          <View>
            <TouchableOpacity
              style={styles.button}
              onPress={() => navigation.navigate('QuesVecDetails')}
            >
              <Text style={styles.buttonText}>Next</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  detailsContainer: {
    flex: 1,
    backgroundColor: '#fff',
    minHeight: hp(64),
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: '#DAE0E2',
    elevation: 2,
    padding: 20,
    margin: 20,
    borderRadius: 20,
    // overflow: 'hidden',
  },
  QuestiontextContainer: {
    // backgroundColor: 'pink',
    // alignItems: 'flex-end',
    // width: '90%',
  },
  CarContainer: {
    // alignItems: 'center',
    // gap: 20,
  },
  button: {
    backgroundColor: 'green',
    paddingVertical: 10,
    borderRadius: 15,
  },
  buttonText: {
    color: 'white',
    fontSize: fp(2.5),
    textAlign: 'center',
  },
})

export default QuesVecDetails
