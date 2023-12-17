import React from 'react'
import { StyleSheet } from 'react-native'
import { Text } from 'react-native-paper'
import { theme } from '../core/theme'

export default function Header2(props) {
  return <Text style={styles.header} {...props} />
}

const styles = StyleSheet.create({
  header: {
    fontSize: 21,
    // color: theme.colors.primary,
    marginTop: 0,
    textAlign: 'center',
    fontWeight: 'bold',
    paddingVertical: 12,
    
  },
})
