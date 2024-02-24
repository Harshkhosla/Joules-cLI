import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Icon from 'react-native-vector-icons/AntDesign'
import {
  responsiveHeight as hp,
  responsiveWidth as wp,
  responsiveFontSize as fp,
} from 'react-native-responsive-dimensions'
import { TouchableOpacity } from 'react-native-gesture-handler'

const App_top_Header = ({ navigation, title }) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity>
        <View style={styles.Icon}>
          <Icon name="arrowleft" size={25} color="#118615" />
          <Text style={styles.Text} onPress={() => navigation.navigate('Home')}>
            {title}
          </Text>
        </View>
      </TouchableOpacity>
    </View>
  )
}

export default App_top_Header

const styles = StyleSheet.create({
  container: {
    height: hp(15),
    backgroundColor: '#C1E0C2',
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

import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Icon from 'react-native-vector-icons/AntDesign'
import {
  responsiveHeight as hp,
  responsiveWidth as wp,
  responsiveFontSize as fp,
} from 'react-native-responsive-dimensions'
import { TouchableOpacity } from 'react-native-gesture-handler'

const App_top_Header = ({ navigation, title }) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity>
        <View style={styles.Icon}>
          <Icon name="arrowleft" size={25} color="#118615" />
          <Text style={styles.Text} onPress={() => navigation.navigate('Home')}>
            {title}
          </Text>
        </View>
      </TouchableOpacity>
    </View>
  )
}

export default App_top_Header

const styles = StyleSheet.create({
  container: {
    height: hp(15),
    backgroundColor: '#C1E0C2',
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