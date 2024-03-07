import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';
import SupportAndRfidHeader from './SupportAndAddRfidHeader';
import { Picker } from '@react-native-picker/picker';

const AddRfid = ({ onPress }) => {
  const [selectedValue, setSelectedValue] = useState("");

  return (
    <View style={styles.container}>
      <SupportAndRfidHeader title={"Add RFID"} />
      <View style={styles.content}>
        <Text style={styles.label}>Tag Number</Text>
        <TextInput 
          style={styles.input} 
          placeholder="Enter Tag Number"
          placeholderTextColor="#999"
        />
        <View style={styles.pickerContainer}>
          <Picker
            style={styles.picker}
            selectedValue={selectedValue}
            onValueChange={(itemValue, itemIndex) => setSelectedValue(itemValue)}
          >
            <Picker.Item label="Option 1" value="option1" />
            <Picker.Item label="Option 2" value="option2" />
            <Picker.Item label="Option 3" value="option3" />
          </Picker>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#fff',
  },
  content: {
    marginTop: 20,
  },
  label: {
    fontWeight: 'bold',
    fontSize: 18,
    marginBottom: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    fontSize: 16,
    width: '100%',
    marginBottom: 10,
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    marginBottom: 10,
    overflow: 'hidden',
  },
  picker: {
    width: '100%',
    height: 40,
    fontSize: 16,
  },
});

export default AddRfid;
