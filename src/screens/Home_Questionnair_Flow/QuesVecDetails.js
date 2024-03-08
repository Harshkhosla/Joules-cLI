import React from 'react'
import QuesVeCardetails from './QuesVeCardetails'
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import {
  responsiveHeight as hp,
  responsiveWidth as wp,
  responsiveFontSize as fp,
} from 'react-native-responsive-dimensions'
import { ScrollView } from 'react-native-gesture-handler'
import App_top_Header from '../App_top_Header'

const QuesVecDetails = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <App_top_Header
        title={'Cars Added'}
        navigation={navigation}
        color={'#C1E0C2'}
      />
      <View style={styles.detailsContainer}>
        <View style={styles.CarContainer}>
          <ScrollView showsVerticalScrollIndicator={false}>
            <QuesVeCardetails />
            {/* <QuesVeCardetails />
            <QuesVeCardetails />
            <QuesVeCardetails /> */}
          </ScrollView>
        </View>

        <View>
          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate('MessagePage')}
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
    flex: 1,
    backgroundColor: '#fff',
  },

  detailsContainer: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: '#DAE0E2',
    elevation: 2,
    padding: 20,
    margin: 20,
    borderRadius: 15,
    overflow: 'hidden',
  },
  CarContainer: {
    flex: 1,
    marginTop: 30,
    gap: 10,
    overflow: 'hidden',
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

export default QuesVecDetails
