import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'

const ChargingHistoryButton = ({ title, mode, modeColor, action }) => {
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

export default ChargingHistoryButton

const styles = StyleSheet.create({
  ButtonBox: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    padding: 8,
    borderRadius: 15,
    borderWidth: 1,
    backgroundColor: 'green',
    borderColor: 'green',
  },
  ButtonText: {
    fontSize: 16,
    fontWeight: 400,
    color: '#fff',
  },
})
