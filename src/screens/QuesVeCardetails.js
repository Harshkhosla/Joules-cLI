import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import {
  responsiveHeight as hp,
  responsiveWidth as wp,
  responsiveFontSize as fp,
} from 'react-native-responsive-dimensions'
import React from 'react'

const QuesVeCardetails = () => {
  return (
    <View style={styles.imageView}>
      <View style={styles.ActionContainer}>
        <View>
          <Text style={styles.text}>Tata Motors Nexon EV</Text>
        </View>
        <View style={styles.ActionIcons}>
          <TouchableOpacity>
            <Icon name="square-edit-outline" size={21} color="#7E7E7E" />
          </TouchableOpacity>
          <TouchableOpacity>
            <Icon name="trash-can-outline" size={21} color="#7E7E7E" />
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.imageCentering}>
        <Image
          source={require('../assets/detailscar.png')}
          style={styles.image}
        />
      </View>
      <View style={styles.carDetails}>
        <Text>Connector Type - </Text>
        {/* <Text>Connector Type-</Text> */}
      </View>
    </View>
  )
}

export default QuesVeCardetails

const styles = StyleSheet.create({
  imageView: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#DAE0E2',
    elevation: 2,
    borderRadius: 8,
    marginBottom: 15,
    overflow: 'hidden',
  },
  ActionContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginHorizontal: 15,
  },
  text: {
    marginTop: 10,
    fontSize: fp(2.3),
  },
  ActionIcons: {
    flexDirection: 'row',
    gap: 4,
  },
  imageCentering: {
    alignItems: 'center',
  },
  image: {
    margin: 10,
    resizeMode: 'contain',
  },
  carDetails: {
    padding: 20,
    backgroundColor: '#C1E0C2',
  },
})
