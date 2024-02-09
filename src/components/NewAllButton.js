import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'

const NewAllButton = ({ title, mode, modeColor, action }) => {
  return (
    <View>
      <TouchableOpacity
        onPress={action}
        style={[
          styles.ButtonBox,
          {
            backgroundColor: `${mode ? '#fff' : 'green'}`,
            borderColor: `${mode ? modeColor : 'green'}`,
          },
        ]}
      >
        <Text
          style={[styles.ButtonText, { color: `${mode ? modeColor : '#fff'}` }]}
        >
          {title}
        </Text>
      </TouchableOpacity>
    </View>
  )
}

export default NewAllButton

const styles = StyleSheet.create({
  ButtonBox: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    padding: 10,
    marginTop: 10,
    borderRadius: 8,
    borderWidth: 2,
    backgroundColor: 'green',
    borderColor: 'green',
  },
  ButtonText: {
    fontSize: 20,
    color: '#fff',
  },
})
