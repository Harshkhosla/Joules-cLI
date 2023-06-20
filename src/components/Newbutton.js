import React from 'react';
import { StyleSheet } from 'react-native';
import { Button as PaperButton } from 'react-native-paper';
import { theme } from '../core/theme';

export default function Button({ mode, style, ...props }) {
  return (
    <PaperButton
      style={[
        styles.button,
        mode === 'outlined' && { borderColor: 'green' },
        style,
      ]}
      labelStyle={styles.text}
      mode={mode}
      {...props}
    />
  );
}

const styles = StyleSheet.create({
  button: {
    width: 150,
    height: 45,
    marginVertical: 10,
    paddingVertical: 2,
    borderRadius: 30,
    backgroundColor: 'white',
    borderWidth: 2,
    borderColor: '#419E44',
    marginLeft: 150,
  },
  text: {
    // fontWeight: 'bold',
    fontSize: 15,
    lineHeight: 20,
    color: 'black',
  },
});