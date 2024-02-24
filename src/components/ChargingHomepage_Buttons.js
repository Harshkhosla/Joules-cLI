import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'

const ChargingHomepage_Buttons = ({ title, modeColor, action }) => {
  return (
    <View>
      <TouchableOpacity
        onPress={action}
        style={[
          styles.ButtonBox,
          {
            backgroundColor: '#fff',
            borderColor: modeColor,
          },
        ]}
      >
        <Text style={[styles.ButtonText, { color: modeColor }]}>{title}</Text>
      </TouchableOpacity>
    </View>
  )
}

export default ChargingHomepage_Buttons

const styles = StyleSheet.create({
  ButtonBox: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    padding: 10,
    marginTop: 5,
    borderRadius: 8,
    borderWidth: 1,
  },
  ButtonText: {
    fontSize: 20,
  },
})
