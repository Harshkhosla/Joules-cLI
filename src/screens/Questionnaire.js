import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Quesheader from './Quesheader'
import Quesimg from './Quesimg'

const Questionnaire = ({navigation}) => {
  return (
    // <View style={styles.container} onPress={() => navigation.navigate('Home')}>
    <View style={styles.container}>
      <Quesheader />
      <Quesimg  navigation={navigation}/>
    </View>
  )
}

export default Questionnaire

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
})
