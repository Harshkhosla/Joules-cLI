import React, { useState } from 'react'
import { SafeAreaView, Button, StyleSheet, Text, TextInput } from 'react-native'
import DateTimePicker from '@react-native-community/datetimepicker'
import { green100 } from 'react-native-paper/lib/typescript/styles/colors'

const Checker = () => {
  const [date, setDate] = useState(new Date(1598051730000))
  const [showDatePicker, setShowDatePicker] = useState(false)
  const [showTimePicker, setShowTimePicker] = useState(false)

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date
    console.log(event)
    setShowDatePicker(false)
    setShowTimePicker(false)
    setDate(currentDate)
  }

  const showDatePickerModal = () => {
    setShowDatePicker(true)
  }

  const showTimePickerModal = () => {
    setShowTimePicker(true)
  }

  return (
    <SafeAreaView>
      {/* <Button onPress={showDatePickerModal} title="Show date picker!" /> */}
      <Button onPress={showTimePickerModal} title="Show time picker!" />

      {/* {showDatePicker && (
        <DateTimePicker
          value={date}
          mode="date"
          is24Hour={true}
          display="default"
          onChange={onChange}
        />
      )} */}

      {showTimePicker && (
        <DateTimePicker
          value={date}
          mode="time"
          //   minuteInterval={true}
          is24Hour={true}
          display="spinner"
          onChange={onChange}
        />
      )}
      <TextInput
        value={date.toLocaleTimeString([], {
          hour: '2-digit',
          minute: '2-digit',
        })}
        style={{
          height: 80,
          fontSize: 40,
          color: 'green',
          alignSelf: 'center',
        }}
      />

      <Text onPress={showTimePickerModal}>
        Selected: {date.toLocaleString()}
      </Text>
    </SafeAreaView>
  )
}

export default Checker

const styles = StyleSheet.create({})
