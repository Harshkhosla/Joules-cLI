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
import { ScrollView } from 'react-native-gesture-handler'



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
        <ScrollView>
          <Quesheader navigation={navigation} />
          <Quesimg navigation={navigation} />
        </ScrollView>
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