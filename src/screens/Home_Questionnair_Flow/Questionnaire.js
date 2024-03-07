import React from 'react'
import { StyleSheet, View, KeyboardAvoidingView, Platform } from 'react-native'
import Quesimg from './Quesimg'
import { ScrollView } from 'react-native-gesture-handler'
import App_top_Header from '../App_top_Header'

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
          <App_top_Header
            title={'Questionnaire'}
            navigation={navigation}
            color={'#C1E0C2'}
          />
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
