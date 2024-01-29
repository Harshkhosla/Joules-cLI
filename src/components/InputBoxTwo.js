import { StyleSheet, Text, View, TextInput } from 'react-native'
import React from 'react'

const InputBoxTwo = ({ lable, placeholder }) => {
  console.log(lable)
  return (
    <View style={styles.InputContainer}>
      <View style={styles.lableContainer}>
        <Text style={styles.lable}>{lable}</Text>
      </View>
      <TextInput style={styles.input} placeholder={placeholder} />
    </View>
  )
}

export default InputBoxTwo

const styles = StyleSheet.create({
  InputContainer: {
    width: '100%',
    borderWidth: 1,
    borderColor: '#555454',
    height: 40,
    marginTop: 30,
    borderRadius: 8,
  },
  lableContainer: {
    position: 'absolute',
    backgroundColor: '#fff',
    paddingVertical: 2,
    paddingHorizontal: 2,
    borderRadius: 8,
    top: -15,
    left: 9,
    overflow: 'hidden',
  },
  lable: {
    color: '#118615',
    fontSize: 14,
  },
  input: {
    paddingLeft: 14,
  },
})
