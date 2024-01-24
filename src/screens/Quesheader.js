import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const Quesheader = ({ navigation }) => {
  return (
    <View style={styles.container}>
      {/* <Text style={styles.Text} onPress={() => navigation.navigate('Home')}> */}
      <Text style={styles.Text} >
        Questionnaire
      </Text>
    </View>
  )
}

export default Quesheader

const styles = StyleSheet.create({
  container: {
    height: 130,
    width: '100%',
    backgroundColor: '#e6f3ff',
    borderBottomRightRadius: 20,
    borderBottomLeftRadius: 20,
    justifyContent: 'flex-end',
    // opacity: 0.4,
  },
  Text: {
    fontSize: 25,
    color: 'black',
    marginBottom: 20,
    marginLeft: 20,
  },
})
