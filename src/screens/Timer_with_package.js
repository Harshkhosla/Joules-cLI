import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TextInput, Button } from 'react-native';
import PushNotification from 'react-native-push-notification';
import BackgroundService from 'react-native-background-actions';

const Timer_with_packagekage = () => {
  const [hours, setHours] = useState('');
  const [minutes, setMinutes] = useState('');
  const [seconds, setSeconds] = useState('');
  const [totalSeconds, setTotalSeconds] = useState(0);
  const [timerActive, setTimerActive] = useState(false);

  const sleep = (time) => new Promise((resolve) => setTimeout(() => resolve(), time));

  const veryIntensiveTask = async (taskDataArguments) => {
    const { delay } = taskDataArguments;

    await new Promise(async (resolve) => {
      const timer = setInterval(() => {
        if (timerActive && totalSeconds > 0) {
          setTotalSeconds((prevTotalSeconds) => prevTotalSeconds - 1);
        }
      }, 1000);

      await sleep(delay);
      clearInterval(timer);
      resolve();
    });
  };

  const handleStartTimer = async () => {
    try {
      if (!BackgroundService) {
        throw new Error('BackgroundService is null or undefined');
      }
  
      const totalHours = parseInt(hours) || 0;
      const totalMinutes = parseInt(minutes) || 0;
      const totalSecondsInput = parseInt(seconds) || 0;
      const totalSeconds = totalHours * 3600 + totalMinutes * 60 + totalSecondsInput;
      setTotalSeconds(totalSeconds);
      setTimerActive(true);
  
      const options = {
        taskName: 'check timer',
        taskTitle: 'check timer',
        taskDesc: 'ExampleTask description',
        taskIcon: {
          name: 'ic_launcher',
          type: 'mipmap',
        },
        color: '#FF3E4D',
        linkingURI: 'yourSchemeHere://chat/jane',
        parameters: {
          delay: totalSeconds * 1000,
        },
      };
  
      await BackgroundService.start(veryIntensiveTask, options);
    } catch (error) {
      console.error('Error starting background service:', error);
    }
  };
  

  useEffect(() => {
    // Stop background task when the component unmounts or the timer reaches 0
    return () => {
      if (timerActive && totalSeconds === 0) {
        BackgroundService.stop();
      }
    };
  }, [timerActive, totalSeconds]);

  const formatTime = (seconds) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = seconds % 60;
    return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(
      2,
      '0'
    )}:${String(remainingSeconds).padStart(2, '0')}`;
  };

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Hours"
          keyboardType="numeric"
          value={hours}
          onChangeText={setHours}
        />
        <TextInput
          style={styles.input}
          placeholder="Minutes"
          keyboardType="numeric"
          value={minutes}
          onChangeText={setMinutes}
        />
        <TextInput
          style={styles.input}
          placeholder="Seconds"
          keyboardType="numeric"
          value={seconds}
          onChangeText={setSeconds}
        />
      </View>
      <Button title="Start Timer" color={'red'} onPress={handleStartTimer} />
      <View style={styles.timerContainer}>
        <Text style={styles.timerText}>{formatTime(totalSeconds)}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  inputContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    paddingHorizontal: 10,
    paddingVertical: 8,
    width: 80,
  },
  timerContainer: {
    marginTop: 20,
  },
  timerText: {
    fontSize: 24,
  },
});

export default Timer_with_packagekage;
