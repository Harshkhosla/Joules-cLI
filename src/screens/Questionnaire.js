import React from 'react'
import {
  StyleSheet,
  Text,
  View,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Platform,
} from 'react-native'
import Quesheader from './Quesheader'
import Quesimg from './Quesimg'


const Questionnaire = ({navigation}) => {
  return (
    // <View style={styles.container} onPress={() => navigation.navigate('Home')}>
    <View style={styles.container}>
      <Quesheader />
      <Quesimg  navigation={navigation}/>

const Questionnaire = ({ navigation }) => {
  const behavior = Platform.OS === 'ios' ? 'padding' : '100'

  return (
    // <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
    <View style={styles.container}>
      <KeyboardAvoidingView
        style={styles.container}
        behavior={behavior}
        onPress={() => Keyboard.dismiss()}
      >
        <Quesheader navigation={navigation} />
        <Quesimg navigation={navigation} />
      </KeyboardAvoidingView>

    </View>
    // </TouchableWithoutFeedback>
  )
}

export default Questionnaire

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
})
