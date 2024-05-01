import React, { useState, useEffect } from 'react'
import {
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
} from 'react-native'
import {
  responsiveHeight as hp,
  responsiveWidth as wp,
} from 'react-native-responsive-dimensions'

import CircularProgress from 'react-native-circular-progress-indicator'

import App_top_Header from './App_top_Header'

import DeviceModal from './DeviceConnectionModal'
// import PulseIndicator from './PulseIndicator';
import useBLE from './bluetooth'

const App = ({ navigation }) => {
  const {
    requestPermissions,
    scanForPeripherals,
    allDevices,
    connectToDevice,
    connectedDevice,
    heartRate,
    sendToDevice,
    disconnectFromDevice,
  } = useBLE()
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false)
  const [progress, setProgress] = useState(0)
  const [timer, setTimer] = useState(null)

  useEffect(() => {
    if (timer !== null) {
      const interval = setInterval(() => {
        if (progress < 100) {
          setProgress((prevProgress) => prevProgress + 1)
          if (isModalVisible) {
            clearInterval(timer)
            setProgress(0)
            setTimer(null)
          }
        } else {
          clearInterval(timer)
          setIsModalVisible(true)
          setTimer(null)
        }
      }, 1000)

      return () => clearInterval(interval)
    }
  }, [timer, progress])

  const handleScanAgain = () => {

    requestPermissions(isGranted => {
      if (isGranted) {
        scanForPeripherals();
      }
    });
    setProgress(0)
    setTimer(
      setTimeout(() => {
        setIsModalVisible(true);
      }, 15000)
    )
  }

  const scanForDevices = () => {
    requestPermissions((isGranted) => {
      if (isGranted) {
        scanForPeripherals()
      }
    })
  }
  const handleSendData = () => {
    sendToDevice(
      'SSID=lajdkalsjdklasretrryttuyjd&PSK=dskjjfadkfdlsjertyukfadskfh&'
    ) // Call sendToDevice with your static data
  }
  const hideModal = () => {
    setIsModalVisible(false)
  }

  const openModal = async () => {
    scanForDevices()
    setIsModalVisible(true)
  }

  const handleConnect = () => {
    console.log('press')
  }

  return (
    <View style={styles.container}>
      <App_top_Header
        title={'Connect via Bluetooth'}
        navigation={navigation}
        color={'#C1E0C2'}
      />

      <View style={styles.formcontent}>
        <View style={{ flex: 1 }}>
          <Text style={styles.Text}>
            We need to connect your device with your charger via Bluetooth to
            send Wi-Fi credentials.
          </Text>
          <View style={styles.progressWindow}>
            <CircularProgress
              value={progress}
              radius={115}
              duration={1000}
              progressValueColor={'#000000'}
              title={'Searching for '}
              titleFontSize={16}
              titleColor={'black'}
              titleStyle={{ fontWeight: 'bold' }}
              subtitle={'"EcoLite"'}
              subtitleColor={'black'}
              subtitleFontSize={16}
              subtitleStyle={{ fontWeight: 'bold' }}
              activeStrokeColor={'#FDDD0000'}
              activeStrokeSecondaryColor={'#7AE27EE5'}
              inActiveStrokeColor={'#FDDD001A'}
              activeStrokeWidth={18}
              inActiveStrokeWidth={15}
              progressFormatter={(value: number) => {
                'worklet'
                return value.toFixed(1) + 's' // 2 decimal places
              }}
              progressValueStyle={{
                fontSize: 35,
                color: 'black',
                fontWeight: 'bold',
              }}
            />
          </View>
        </View>
        <TouchableOpacity
          style={styles.ConnectButton}
          onPress={handleScanAgain}
        >
          <Text style={styles.ConnectText}>Scan Again</Text>
        </TouchableOpacity>
        <View style={styles.tagNote}>
          <Image
            style={styles.tagNoteImg}
            source={require('../assets/energy_savings_leaf.png')}
          />
          <Text style={{ color: '#118615' }}>
            Charging an electric vehicle is equivalent to giving a car a breath
            of fresh air
          </Text>
        </View>
      </View>
      <DeviceModal
        closeModal={hideModal}
        visible={isModalVisible}
        navigation={navigation}
        connectToPeripheral={connectToDevice}
        devices={allDevices}
      />
    </View>

    // <SafeAreaView style={styles.container}>
    //   <View style={styles.heartRateTitleWrapper}>
    //     {connectedDevice ? (
    //       <>
    //         {/* <PulseIndicator /> */}
    //         <Text style={styles.heartRateTitleText}>Your Heart Rate Is:</Text>
    //         <Text style={styles.heartRateText}>{heartRate} bpm</Text>
    //       </>
    //     ) : (
    //       <Text style={styles.heartRateTitleText}>
    //         Please Connect to a Heart Rate Monitor
    //       </Text>
    //     )}
    //   </View>
    //   <TouchableOpacity
    //     onPress={connectedDevice ? disconnectFromDevice : openModal}
    //     style={styles.ctaButton}
    //   >
    //     <Text style={styles.ctaButtonText}>
    //       {connectedDevice ? 'Disconnect' : 'Connect'}
    //     </Text>
    //   </TouchableOpacity>
    //   <TouchableOpacity
    //     onPress={handleSendData} // Call handleSendData when the button is pressed
    //     style={styles.ctaButton}
    //   >
    //     <Text style={styles.ctaButtonText}>Send Data</Text>
    //   </TouchableOpacity>
    //   <DeviceModal
    //     closeModal={hideModal}
    //     visible={isModalVisible}
    //     connectToPeripheral={connectToDevice}
    //     devices={allDevices}
    //   />
    // </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  formcontent: {
    flex: 1,
    paddingHorizontal: 20,
    justifyContent: 'space-between',
  },

  Text: {
    color: 'black',
    fontSize: 18,
    fontFamily: 'Poppins',
    fontWeight: '500',
    textAlign: 'justify',
    marginVertical: hp(4),
  },

  progressWindow: {
    flex: 1,
    // backgroundColor: 'pink',
    alignItems: 'center',
    justifyContent: 'center',
  },

  ConnectButton: {
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    width: wp(40),
    padding: 10,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: 'green',
    marginTop: hp(1),
  },
  ConnectText: {
    fontSize: 16,
    color: '#0D0D0D',
  },

  tagNote: {
    height: 60,
    marginHorizontal: 20,
    paddingHorizontal: 10,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  tagNoteImg: {
    height: 40,
    marginRight: 6,
  },
})

export default App

// import React, { useState, useEffect } from 'react'
// import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native'
// import CircularProgress from 'react-native-circular-progress-indicator'
// import DeviceModal from './DeviceConnectionModal'
// import useBLE from './bluetooth'

// const App = ({ navigation }) => {
//   const {
//     requestPermissions,
//     scanForPeripherals,
//     allDevices,
//     connectToDevice,
//     disconnectFromDevice,
//   } = useBLE()
//   const [isModalVisible, setIsModalVisible] = useState(false)
//   const [progress, setProgress] = useState(0)
//   const [timer, setTimer] = useState(null)

//   useEffect(() => {
//     if (timer !== null) {
//       const interval = setInterval(() => {
//         if (progress < 100) {
//           setProgress((prevProgress) => prevProgress + 1)
//           // if (progress === 5) {
//           //   clearInterval(timer)
//           //   setTimer(null)
//           // }
//         } else {
//           clearInterval(timer)
//           setIsModalVisible(true)
//           setTimer(null)
//         }
//       }, 1000)

//       return () => clearInterval(interval)
//     }
//   }, [timer, progress])

//   const handleScanAgain = () => {
//     setProgress(0)
//     setTimer(
//       setTimeout(() => {
//         // setIsModalVisible(true)
//       }, 9000)
//     ) // Set the timeout to 20 seconds (20000 milliseconds) // Set your desired time in milliseconds (5000 = 5 seconds)
//   }

//   return (
//     <View style={styles.container}>
//       <View style={styles.formcontent}>
//         <Text style={styles.Text}>
//           We need to connect your device with your charger via Bluetooth to send
//           Wi-Fi credentials.
//         </Text>
//         <View style={styles.progressWindow}>
//           <CircularProgress
//             value={progress}
//             radius={115}
//             duration={1000}
//             progressValueColor={'#000000'}
//             title={'Searching for '}
//             titleFontSize={16}
//             titleColor={'black'}
//             titleStyle={{ fontWeight: 'bold' }}
//             subtitle={'"EcoLite"'}
//             subtitleColor={'black'}
//             subtitleFontSize={16}
//             subtitleStyle={{ fontWeight: 'bold' }}
//             activeStrokeColor={'#FDDD0000'}
//             activeStrokeSecondaryColor={'#7AE27EE5'}
//             inActiveStrokeColor={'#FDDD001A'}
//             activeStrokeWidth={18}
//             inActiveStrokeWidth={15}
//             progressFormatter={(value: number) => {
//               'worklet'
//               return value.toFixed(1) // 2 decimal places
//             }}
//             progressValueStyle={{
//               fontSize: 35,
//               color: 'black',
//               fontWeight: 'bold',
//             }}
//           />
//         </View>
//         <TouchableOpacity
//           style={styles.ConnectButton}
//           onPress={handleScanAgain}
//         >
//           <Text style={styles.ConnectText}>Scan Again</Text>
//         </TouchableOpacity>
//         <View style={styles.tagNote}>
//           <Image
//             style={styles.tagNoteImg}
//             source={require('../assets/energy_savings_leaf.png')}
//           />
//           <Text style={{ color: '#118615' }}>
//             Charging an electric vehicle is equivalent to giving a car a breath
//             of fresh air
//           </Text>
//         </View>
//       </View>
//       <DeviceModal
//         closeModal={() => setIsModalVisible(false)}
//         visible={isModalVisible}
//         connectToPeripheral={connectToDevice}
//         devices={allDevices}
//       />
//     </View>
//   )
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//   },
//   formcontent: {
//     flex: 1,
//     paddingHorizontal: 20,
//     justifyContent: 'space-between',
//   },
//   Text: {
//     color: 'black',
//     fontSize: 18,
//     fontWeight: '500',
//     textAlign: 'justify',
//     marginVertical: 20,
//   },
//   progressWindow: {
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   ConnectButton: {
//     alignItems: 'center',
//     justifyContent: 'center',
//     alignSelf: 'center',
//     width: 150,
//     paddingVertical: 10,
//     borderRadius: 20,
//     borderWidth: 2,
//     borderColor: 'green',
//   },
//   ConnectText: {
//     fontSize: 16,
//     color: '#0D0D0D',
//   },
//   tagNote: {
//     height: 60,
//     marginHorizontal: 20,
//     paddingHorizontal: 10,
//     flexDirection: 'row',
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   tagNoteImg: {
//     height: 40,
//     marginRight: 6,
//   },
// })

// export default App
