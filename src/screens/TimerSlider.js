import React, { useState } from 'react'
import { View, StyleSheet, Text } from 'react-native'
import DateTimePicker from '@react-native-community/datetimepicker'
import { useDispatch } from 'react-redux'
import { setPublicChargeTime } from '../Redux/Action'

const TimerSlider = () => {
  const dispatch = useDispatch()
  const [date, setDate] = useState(new Date(1598051730000))
  const [showTimePicker, setShowTimePicker] = useState(false)
  const [showSetTime, setShowsetTime] = useState(false)

  function parseTime(timeString) {
    const [hours, minutes, seconds, period] = timeString.split(/[:\s]/)

    let totalSeconds =
      parseInt(hours) * 3600 + parseInt(minutes) * 60 + parseInt(seconds)

    // Adjust for AM/PM period
    if (period === 'PM') {
      totalSeconds += 12 * 3600
    }
    console.log('totoalseconds', totalSeconds)
    return totalSeconds
  }

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date
    setShowTimePicker(false)
    setShowsetTime(true)
    console.log('currentDate', currentDate.toLocaleTimeString())
    setDate(currentDate)
    const passData = parseTime(currentDate.toLocaleTimeString())
    console.log('passData', passData)
    dispatch(setPublicChargeTime(passData))
  }
  const showTimePickerModal = () => {
    setShowTimePicker(true)
  }
  return (
    <View>
      {showTimePicker && (
        <DateTimePicker
          // value={date}
          // mode="time"
          // is24Hour={false}
          // display="spinner"
          // onChange={onChange}
          // minuteInterval={10}
          // locale='fr-FR'
          value={date}
          mode="time"
          is24Hour={true}
          display="spinner"
          onChange={onChange}
          minuteInterval={15}
        />
      )}
      <View style={{ flexDirection: 'row', gap: 13, alignSelf: 'center' }}>
        <Text
          style={{
            fontSize: 20,
          }}
        >
          Hrs
        </Text>
        <Text
          style={{
            fontSize: 20,
          }}
        >
          Mins
        </Text>
      </View>
      <Text
        onPress={showTimePickerModal}
        style={{
          fontSize: 35,
          color: 'green',
          alignSelf: 'center',
          marginLeft: 40,
        }}
      >
        {showSetTime
          ? date.toLocaleTimeString([], {
              hour: '2-digit',
              minute: '2-digit',
            })
          : 'set time'}
      </Text>
    </View>
  )
}

export default TimerSlider

const styles = StyleSheet.create({})

// import React, { useState } from 'react'
// import { View, Text, ScrollView, StyleSheet } from 'react-native'

// const TimerSlider = () => {
//   const [hours, setHours] = useState(0)
//   const [minutes, setMinutes] = useState(0)

//   const handleScroll = (event, part) => {
//     console.log(event.nativeEvent.contentOffset.y)
//     console.log(hours, ':', minutes)
//     // const value = Math.floor(event.nativeEvent.contentOffset.y / 45.5) // Use Math.floor to get the correct index
//     const value = Math.min(
//       59,
//       Math.floor(event.nativeEvent.contentOffset.y / 42)
//     )
//     if (part === 'hours') {
//       setHours(value)
//     } else {
//       setMinutes(value)
//     }
//   }

//   return (
//     <View style={styles.container}>
//       <View
//         style={{
//           //   backgroundColor: 'red',
//           alignSelf: 'center',
//           alignItems: 'center',
//         }}
//       >
//         <Text
//           style={{
//             fontSize: 20,
//           }}
//         >
//           Hrs
//         </Text>
//         <ScrollView
//           style={styles.scrollContainer}
//           onScroll={(event) => handleScroll(event, 'hours')}
//           showsVerticalScrollIndicator={false}
//         >
//           {Array.from({ length: 24 }).map((_, index) => (
//             <Text key={index} style={styles.scrollItem}>
//               {index.toString().padStart(2, '0')}
//             </Text>
//           ))}
//         </ScrollView>
//       </View>
//       <View
//         style={{
//           //   backgroundColor: 'red',
//           marginTop: 23,
//           alignSelf: 'center',
//           alignItems: 'center',
//         }}
//       >
//         <Text
//           style={{
//             fontSize: 30,
//             color: 'green',
//           }}
//         >
//           :
//         </Text>
//       </View>
//       <View
//         style={{
//           //   backgroundColor: 'red',
//           alignSelf: 'center',
//           alignItems: 'center',
//         }}
//       >
//         <Text
//           style={{
//             fontSize: 20,
//           }}
//         >
//           Mins
//         </Text>

//         <ScrollView
//           style={styles.scrollContainer}
//           onScroll={(event) => handleScroll(event, 'minutes')}
//           showsVerticalScrollIndicator={false}
//         >
//           {Array.from({ length: 60 }).map((_, index) => (
//             <Text key={index} style={styles.scrollItem}>
//               {index.toString().padStart(2, '0')}
//             </Text>
//           ))}
//         </ScrollView>
//       </View>

//       {/* <Text style={styles.timerText}>
//         {`${hours.toString().padStart(2, '0')}:${minutes
//           .toString()
//           .padStart(2, '0')}`}
//       </Text> */}
//     </View>
//   )
// }

// const styles = StyleSheet.create({
//   container: {
//     flexDirection: 'row',
//   },
//   scrollContainer: {
//     height: 40,
//     marginHorizontal: 10,
//   },
//   scrollItem: {
//     fontSize: 25,
//     fontWeight: '400',
//     color: 'green',
//     textAlign: 'center',
//     paddingVertical: 5,
//   },
//   timerText: {
//     fontSize: 30,
//     fontWeight: 'bold',
//     color: 'green',
//   },
// })

// export default TimerSlider

// import React, { useState } from 'react'
// import { View, Text, ScrollView, StyleSheet } from 'react-native'

// const TimerSlider = () => {
//   const [hours, setHours] = useState(0)
//   const [minutes, setMinutes] = useState(0)

//   const handleScroll = (event, part) => {
//     console.log(hours, ':', minutes)
//     const value = Math.min(
//       59,
//       Math.floor(event.nativeEvent.contentOffset.y / 46)
//     ) // Adjust the divisor based on your preference
//     console.log(value)
//     if (part === 'hours') {
//       setHours(value)
//     } else {
//       setMinutes(value)
//     }
//   }

//   const renderScrollItems = (length) => {
//     return Array.from({ length }).map((_, index) => (
//       <Text key={index} style={styles.scrollItem}>
//         {index.toString().padStart(2, '0')}
//       </Text>
//     ))
//   }

//   return (
//     <View style={styles.container}>
//       <View>
//         <Text style={{}}>Hrs</Text>
//         <ScrollView
//           style={styles.scrollContainer}
//           onScroll={(event) => handleScroll(event, 'hours')}
//           showsVerticalScrollIndicator={false}
//         >
//           {renderScrollItems(24)}
//         </ScrollView>
//       </View>
//       <View>
//         <Text>:</Text>
//       </View>
//       <View>
//         <Text>Mins</Text>
//         <ScrollView
//           style={styles.scrollContainer}
//           onScroll={(event) => handleScroll(event, 'minutes')}
//           showsVerticalScrollIndicator={false}
//         >
//           {renderScrollItems(60)}
//         </ScrollView>
//       </View>
//       {/* <Text style={styles.timerText}>{`${String(hours).padStart(
//         2,
//         '0'
//       )}:${String(minutes).padStart(2, '0')}`}</Text> */}
//     </View>
//   )
// }

// const styles = StyleSheet.create({
//   container: {
//     flexDirection: 'row',
//     justifyContent: 'center',
//     alignItems: 'center',
//     // backgroundColor: 'red',
//   },
//   scrollContainer: {
//     height: 50,
//     marginHorizontal: 10,
//   },
//   scrollItem: {
//     fontSize: 20,
//     textAlign: 'center',
//     paddingVertical: 10,
//   },
//   timerText: {
//     fontSize: 30,
//     fontWeight: 'bold',
//     color: 'green',
//   },
// })

// export default TimerSlider
