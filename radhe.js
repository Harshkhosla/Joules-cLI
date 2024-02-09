// // // // // // // // const myObject = {
// // // // // // // //     variableKey: 'The value associated with the variable key',
// // // // // // // //   };
  
// // // // // // // //   const dynamicKey = 'variableKey';
  
// // // // // // // //   // Access the value using the variable as the key
// // // // // // // //   const desiredValue = myObject[dynamicKey];
  
// // // // // // // //   console.log(myObject[dynamicKey]); // Outputs: The value associated with the variable key
// // // // // // // const originalObject = {
// // // // // // //   Key1: 'Value1',
// // // // // // //   Key2: 'Value2',
// // // // // // //   Key3: 'Value3',
// // // // // // // };

// // // // // // // // Convert keys to lowercase
// // // // // // // const lowercaseKeysObject = Object.fromEntries(
// // // // // // //   Object.entries(originalObject).map(([key, value]) => [key.toLowerCase(), value])
// // // // // // // );

// // // // // // // console.log(lowercaseKeysObject);

// // // // // // // const validateEmail = (email) => {
// // // // // // //   // General email format regex
// // // // // // //   const generalEmailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// // // // // // //   // Check if the email matches both the general format and contains "@gmail.com"
// // // // // // //   const isValid = generalEmailRegex.test(email) && email.toLowerCase().includes('@gmail.com');

// // // // // // //   return isValid;
// // // // // // // };

// // // // // // // // Example usage:
// // // // // // // const userEmail = 'example@gmail.com';

// // // // // // // if (validateEmail(userEmail)) {
// // // // // // //   console.log('Valid email:', userEmail);
// // // // // // // } else {
// // // // // // //   console.log('Invalid email:', userEmail);
// // // // // // // }

// // // // // // const validateEmail = (email) => {
// // // // // //   // General email format regex
// // // // // //   const generalEmailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// // // // // //   // Check if the email matches both the general format, contains "@gmail.com", and has at least one number
// // // // // //   const hasNumber = /\d/.test(email);
// // // // // //   const isValid = generalEmailRegex.test(email) && email.toLowerCase().includes('@gmail.com') && hasNumber;
// // // // // // console.log(isValid,"a");
// // // // // //   return isValid;
// // // // // // };

// // // // // // // Example usage:
// // // // // // const userEmail = 'examp76l@gmail.com';

// // // // // // if (validateEmail(userEmail)) {
// // // // // //   console.log('Valid email:', userEmail);
// // // // // // } else {
// // // // // //   console.log('Invalid email:', userEmail);
// // // // // // }

// // // // // function updateClock() {
// // // // //   var now = new Date();
// // // // //   var hours=0
// // // // //   var minutes=0
// // // // //   var seconds=0
// // // // //   var hours = hours+1
// // // // //   var minutes =minutes+1;
// // // // //   var seconds = seconds+1;

// // // // //   // Add leading zero if the number is less than 10
// // // // //   hours = hours < 10 ? "0" + hours : hours;
// // // // //   minutes = minutes < 10 ? "0" + minutes : minutes;
// // // // //   seconds = seconds < 10 ? "0" + seconds : seconds;

// // // // //   var timeString = hours + ":" + minutes + ":" + seconds;
// // // // //   console.log(timeString)
// // // // //   return timeString
// // // // // }

// // // // // // Update the clock every second (1000 milliseconds)
// // // // // setInterval(updateClock, 1000);

// // // // // // setInterval(() => {
  


// // // // // // }, interval);

// // // // // // Initial call to display the clock immediately 
// // // // //    const a= updateClock();
// // // // //    console.log("a",a);


// // // // var timer;
// // // // var minutes = 0;
// // // // var seconds = 0;

// // // // function updateTimerDisplay() {
// // // //   var minutesStr = minutes < 10 ? "0" + minutes : minutes;
// // // //   var secondsStr = seconds < 10 ? "0" + seconds : seconds;
// // // //   const result = minutesStr + ":" + secondsStr;
// // // //   console.log("result",result)
// // // // }

// // // // function startTimer() {
// // // //   timer = setInterval(function() {
// // // //     seconds++;
// // // //     if (seconds === 60) {
// // // //       minutes++;
// // // //       seconds = 0;
// // // //     }
// // // //     updateTimerDisplay();
// // // //   }, 1000);
// // // // }

// // // // function stopTimer() {
// // // //   clearInterval(timer);
// // // // }

// // // // function resetTimer() {
// // // //   clearInterval(timer);
// // // //   minutes = 0;
// // // //   seconds = 0;
// // // //   updateTimerDisplay();
// // // // }
// // // // startTimer()



// // // var timer;
// // // var hours = 0;
// // // var minutes = 0;
// // // var seconds = 0;

// // // function updateTimerDisplay() {
// // //   var hoursStr = hours < 10 ? "0" + hours : hours;
// // //   var minutesStr = minutes < 10 ? "0" + minutes : minutes;
// // //   var secondsStr = seconds < 10 ? "0" + seconds : seconds;
// // //   const result = hoursStr + ":" + minutesStr + ":" + secondsStr;
// // //   console.log("reslult",result)
// // // }

// // // function startTimer() {
// // //   timer = setInterval(function() {
// // //     seconds++;
// // //     if (seconds === 60) {
// // //       minutes++;
// // //       seconds = 0;
// // //     }
// // //     if (minutes === 60) {
// // //       hours++;
// // //       minutes = 0;
// // //     }
// // //     updateTimerDisplay();
// // //   }, 1000);
// // // }

// // // function stopTimer() {
// // //   clearInterval(timer);
// // // }

// // // function resetTimer() {
// // //   clearInterval(timer);
// // //   hours = 0;
// // //   minutes = 0;
// // //   seconds = 0;
// // //   updateTimerDisplay();
// // // }

// // // startTimer()
// // // setTimeout(() => {
// // //   stopTimer()
// // // }, 3000);

// // // const [v,a]=[1,2,3,4,5,6]
// // // console.log(v,a)


// // let b=2
// // function a(x){
// //     console.log(x,"x")
// //     console.log("a")
// //     if(b==2){
// //         b=b+1
// //         a(709)
// //     }
// // }
// // a(1)

// import React, { useState } from 'react';
// import { View, Button, Platform } from 'react-native';
// import Picker from "@react-native-picker/picker"
// const MyCustomTimePicker = () => {
//   const [hours, setHours] = useState(0);
//   const [minutes, setMinutes] = useState(0);
//   const [showPicker, setShowPicker] = useState(false);

//   const handleTimeChange = () => {
//     // Calculate the total time in minutes
//     const totalTime = hours * 60 + minutes;
//     // Here you can use totalTime as needed
//     console.log(`Selected Time: ${totalTime} minutes`);
//     setShowPicker(false);
//   };

//   return (
//     <View>
//       <Button
//         title="Show Time Picker"
//         onPress={() => setShowPicker(true)}
//       />
//       {showPicker && (
//         <View>
//           <View style={{ flexDirection: 'row', alignItems: 'center' }}>
//             <Picker
//               style={{ flex: 1 }}
//               selectedValue={hours}
//               onValueChange={(itemValue) => setHours(itemValue)}
//             >
//               {Array.from({ length: 24 }, (_, i) => (
//                 <Picker.Item key={i} label={`${i} hours`} value={i} />
//               ))}
//             </Picker>
//             <Picker
//               style={{ flex: 1 }}
//               selectedValue={minutes}
//               onValueChange={(itemValue) => setMinutes(itemValue)}
//             >
//               {Array.from({ length: 60 }, (_, i) => (
//                 <Picker.Item key={i} label={`${i} mins`} value={i} />
//               ))}
//             </Picker>
//           </View>
//           <Button title="Set Time" onPress={handleTimeChange} />
//         </View>
//       )}
//     </View>
//   );
// };

// export default MyCustomTimePicker;



import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';

const Timer = ({setuserTimeHours,userTimeHours,userTimeMinutes,setuserTimeMinutes}) => {
  // const [hours, setHours] = useState("");
  // const [minutes, setMinutes] = useState("");
  const [seconds, setSeconds] = useState("");
  const [isActive, setIsActive] = useState(false);
const [showWarring,setShowWarring]=useState(false)
  // useEffect(() => {
  //   let interval;
  //   if (isActive && (hours > 0 || minutes > 0 || seconds > 0)) {
  //     interval = setInterval(() => {
  //       if (seconds > 0) {
  //         setSeconds(seconds => seconds - 1);
  //       } else if (minutes > 0) {
  //         setMinutes(minutes => minutes - 1);
  //         setSeconds(59);
  //       } else if (hours > 0) {
  //         setHours(hours => hours - 1);
  //         setMinutes(59);
  //         setSeconds(59);
  //       }
  //     }, 1000);
  //   } 
  //   else if (!isActive && (hours !== 0 || minutes !== 0 || seconds !== 0)) {
  //     clearInterval(interval);
  //   }
  //   return () => clearInterval(interval);
  // }, [isActive, hours,  minutes,seconds]);

  // const handleStartStop = () => {
  //   setIsActive(!isActive);
  // };

  // const handleReset = () => {
  //   setHours(0);
  //   setMinutes(0);
  //   setSeconds(0);
  //   setIsActive(false);
  // };

  const minutesSET=(text)=>{
    if(parseInt(text)<=59){
    setuserTimeMinutes(parseInt(text))
    setShowWarring(false)
    } 
    else{
      setuserTimeMinutes(parseInt(0))
        if(parseInt(text)>59){
            setShowWarring(true)
        }
    }
}
const HoursSET=(text)=>{
  if(parseInt(text)<=12){
    setuserTimeHours(parseInt(text))
  setShowWarring(false)
  } 
  else{
      setuserTimeHours(parseInt(0))
      if(parseInt(text)>12){
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
       {showWarring&& <Text style={styles.inputColor}>please input correct time</Text>}
      <View style={styles.buttonsContainer}>
        {/* <Button title={isActive ? 'Stop' : 'Start'} onPress={handleStartStop} />
        <Button title="Reset" onPress={handleReset} /> */}
        {/* <Button title='Set Time' onPress={}/> */}
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
    alignItems: 'center',
    marginBottom: 20,
  },
  input: {
    width: 50,
    height: 40,
    borderWidth: 1,
    borderColor: 'gray',
    paddingHorizontal: 10,
    marginRight: 10,
  },
  separator: {
    fontSize: 20,
    marginHorizontal: 5,
  },
  inputColor:{
    color:"red",
    marginTop:-1
  },
  buttonsContainer: {
    flexDirection: 'row',
  },
});

export default Timer;

