import React from 'react'
import { StyleSheet } from 'react-native'
import { Button as PaperButton } from 'react-native-paper'
import { theme } from '../core/theme'

export default function Button({ mode, style, ...props }) {
  return (
    <PaperButton
      style={[
        styles.button,
        mode === 'outlined' && { backgroundColor: theme.colors.surface },
        style,
      ]}
      labelStyle={styles.text}
      mode={mode}
      {...props}
    />
  )
}

const styles = StyleSheet.create({
  button: {
    width: '50%',
    marginVertical: 10,
    paddingVertical: 2,
    borderRadius: 38,
    height:'6%',
    marginTop: '4%',
    color: '#419E44',
  },
  text: {
    // fontWeight: 'bold',
    fontSize: 20,
    lineHeight: 26,
  },
})