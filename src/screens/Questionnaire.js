import React from 'react'
import { StyleSheet, View, KeyboardAvoidingView, Platform } from 'react-native'
import Quesheader from './Quesheader'
import Quesimg from './Quesimg'
import { ScrollView } from 'react-native-gesture-handler'

const Questionnaire = ({ navigation }) => {
  const behavior = Platform.OS === 'ios' ? 'padding' : '100'

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={behavior}
      onPress={() => Keyboard.dismiss()}
    >
      <ScrollView>
        <View style={styles.container}>
          <Quesheader title={'Questionnaire'} navigation={navigation} />
          <Quesimg navigation={navigation} />
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  )
}

export default Questionnaire

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
})