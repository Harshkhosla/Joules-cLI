import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Icon from 'react-native-vector-icons/AntDesign'
import {
  responsiveHeight as hp,
  responsiveWidth as wp,
  responsiveFontSize as fp,
} from 'react-native-responsive-dimensions'
import { TouchableOpacity } from 'react-native-gesture-handler'

const Quesheader = ({ navigation }) => {
  return (
    <View style={styles.container}>

      {/* <Text style={styles.Text} onPress={() => navigation.navigate('Home')}> */}
      <Text style={styles.Text} >
        Questionnaire
      </Text>

      <TouchableOpacity>
        <View style={styles.Icon}>
          <Icon name="arrowleft" size={25} color="#118615" />
          <Text style={styles.Text} onPress={() => navigation.navigate('Home')}>
            Questionnaire
          </Text>
        </View>
      </TouchableOpacity>

    </View>
  )
}

export default Quesheader

const styles = StyleSheet.create({
  container: {
    height: hp(20),
    backgroundColor: '#c1e0c2',
    borderBottomRightRadius: 20,
    borderBottomLeftRadius: 20,
    justifyContent: 'flex-end',
  },
  Icon: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 10,
    marginBottom: 10,
  },
  Text: {
    fontSize: fp(3),
    color: '#5A5A5A',
    marginLeft: 8,
  },
})
