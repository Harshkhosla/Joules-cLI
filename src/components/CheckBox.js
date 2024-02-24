import React from 'react'
import { TouchableOpacity, View, Text, StyleSheet } from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons' // Import an icon library for the checkbox

const CheckBox = ({ label, checked, onChange, color }) => {
  return (
    <TouchableOpacity style={styles.checkboxContainer} onPress={onChange}>
      <View style={styles.checkbox}>
        {checked ? (
          <Icon name="checkbox-outline" size={20} color={color} />
        ) : (
          <Icon name="square-outline" size={20} color={color} />
        )}
      </View>
      <Text style={styles.label}>{label}</Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    // marginBottom: 16,
  },
  checkbox: {
    width: 24,
    height: 24,
    marginRight: 4,
  },
  label: {
    fontSize: 14,
  },
})

export default CheckBox
