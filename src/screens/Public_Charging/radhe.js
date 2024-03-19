import React, { useState, useEffect } from 'react'
import { View, Text, TextInput, Button, StyleSheet } from 'react-native'

const Timer = ({
  setuserTimeHours,
  userTimeHours,
  userTimeMinutes,
  setuserTimeMinutes,
}) => {
  // const [hours, setHours] = useState("");
  // const [minutes, setMinutes] = useState("");
  const [seconds, setSeconds] = useState('')
  const [isActive, setIsActive] = useState(false)
  const [showWarring, setShowWarring] = useState(false)

  const minutesSET = (text) => {
    if (parseInt(text) <= 59) {
      setuserTimeMinutes(parseInt(text))
      setShowWarring(false)
    } else {
      setuserTimeMinutes(parseInt(0))
      if (parseInt(text) > 59) {
        setShowWarring(true)
      }
    }
  }
  const HoursSET = (text) => {
    if (parseInt(text) <= 12) {
      setuserTimeHours(parseInt(text))
      setShowWarring(false)
    } else {
      setuserTimeHours(parseInt(0))
      if (parseInt(text) > 12) {
        setShowWarring(true)
      }
    }
  }
  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          keyboardType="numeric"
          placeholder="Hours"
          value={userTimeHours.toString()}
          onChangeText={HoursSET}
        />
        <Text style={styles.separator}>:</Text>
        <TextInput
          style={styles.input}
          keyboardType="numeric"
          placeholder="Minutes"
          value={userTimeMinutes.toString()}
          onChangeText={minutesSET}
        />

        {/* <Text style={styles.separator}>:</Text> */}
        {/* <TextInput
          style={styles.input}
          keyboardType="numeric"
          placeholder="Seconds"
          value={seconds.toString()}
          onChangeText={text => setSeconds(parseInt(text) || 0)}
        /> */}
      </View>
      {showWarring && (
        <Text style={styles.inputColor}>please input correct time</Text>
      )}
      <View style={styles.buttonsContainer}>
        {/* <Button title={isActive ? 'Stop' : 'Start'} onPress={handleStartStop} />
        <Button title="Reset" onPress={handleReset} /> */}
        {/* <Button title='Set Time' onPress={}/> */}
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  input: {
    padding: 2,
    borderWidth: 1,
    borderColor: 'gray',
    paddingHorizontal: 10,
    borderRadius: 5,
    // marginRight: 10,
    color: 'black',
  },
  separator: {
    fontSize: 20,
    marginHorizontal: 10,
  },
  inputColor: {
    color: 'red',
    marginTop: 5,
  },
  buttonsContainer: {
    flexDirection: 'row',
  },
})

export default Timer
