import React, { useState } from 'react';
import { View, StyleSheet, TextInput, TouchableOpacity ,Alert } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { setLoad } from '../Redux/Action';

export default function NumericInput() {
  const [isFocused, setIsFocused] = useState(false);
  const [value, setValue] = useState('');
  const navigation = useNavigation();
  const dispatch = useDispatch()
  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    setIsFocused(false);
  };

  const handleChangeText = (text) => {
    console.log(text,"lllll");
    setValue(text);
  };

  const handleButtonClick = () => {
    const sample  = value / 0.22;
    // console.log(sample);
    const house_voltage=Math.floor(sample)
    {
      value < "10" ? Alert.alert('Alert Title', 'Connect to the nearest Discom', [
        {
          value: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        { value: 'OK', onPress: () => console.log('OK Pressed') },
      ]) :
        dispatch(setLoad(house_voltage))
      navigation.navigate('Eligible')
    }
    // navigation.navigate('Eligible');
  };

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder={isFocused ? '' : 'Enter electrical sanctioned load'}
          keyboardType="numeric"
          onFocus={handleFocus}
          onBlur={handleBlur}
          onChangeText={handleChangeText}
          value={value}
        />
        <TouchableOpacity style={styles.button} onPress={handleButtonClick}>
          <Icon name="angle-right" size={30} color="grey" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 12,
    borderRadius: 25,
    overflow: 'hidden',
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
    width: 265,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  input: {
    flex: 1,
    height: 50,
    fontSize: 16,
    paddingHorizontal: 8, // Adjust the padding value as needed
    color: 'black',
  },
  button: {
    marginLeft: 8, // Adjust the margin value as needed
  },
});