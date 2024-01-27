// import React, { useState } from 'react'
// import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native'
// import { Picker } from '@react-native-picker/picker'
// import {
//   responsiveHeight as hp,
//   responsiveWidth as wp,
//   responsiveFontSize as fp,
// } from 'react-native-responsive-dimensions'

// import Quesheader from './Quesheader'

// const QuesAddVhicle = ({ navigation }) => {
//   const [selectedCar, setSelectedCar] = useState()

//   return (
//     <View style={styles.container}>
//       <Quesheader navigation={navigation} />
//       <View style={styles.detailscontainer}>
//         <View style={styles.QuestiontextContainer}>
//           <Text
//             style={{
//               marginBottom: 20,
//               fontSize: fp(2),
//               textAlign: 'right',
//             }}
//           >
//             Question{' '}
//             <Text
//               style={{
//                 color: 'green',
//               }}
//             >
//               3/4
//             </Text>
//           </Text>
//           <View style={styles.imageContainer}>
//             <Image
//               source={require('../assets/addcar.png')}
//               style={styles.image}
//             />
//             <Text style={styles.text}>Add your Vehicle</Text>
//           </View>
//           <View style={styles.pickerContainer}>
//             <Picker
//               selectedValue={selectedCar}
//               onValueChange={(itemValue, itemIndex) =>
//                 setSelectedCar(itemValue)
//               }
//               style={styles.picker}
//               selectionColor={'red'}
//             >
//               <Picker.Item label="Tata Motors Nexon EV" value="Nexon EV" />
//               <Picker.Item label="Mahindra" value="Mahindra" />
//               <Picker.Item label="KIA" value="kia" />
//             </Picker>
//           </View>
//         </View>

//         <View style={styles.buttonContainer}>
//           <TouchableOpacity
//             style={styles.button}
//             onPress={() => navigation.navigate('QuesVecDetails')}
//           >
//             <Text style={styles.buttonText}>Add Vehicle</Text>
//           </TouchableOpacity>
//         </View>
//       </View>
//     </View>
//   )
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//   },
//   detailscontainer: {
//     flex: 1,
//     backgroundColor: '#fff',
//     justifyContent: 'space-between',
//     paddingVertical: 20,
//     alignItems: 'center',
//     borderWidth: 1,
//     borderColor: '#DAE0E2',
//     elevation: 3,
//     margin: 20,
//     borderRadius: 20,
//   },
//   QuestiontextContainer: {
//     // alignItems: 'flex-end',
//   },
//   imageContainer: {
//     marginVertical: 20,
//   },
//   image: {
//     // width: wp(50),
//     // height: hp(20),
//     resizeMode: 'contain',
//     borderRadius: 10,
//     // backgroundColor: 'pink',
//   },
//   text: {
//     marginTop: 10,
//     fontSize: fp(2.5),
//     // marginBottom: 40,
//   },
//   pickerContainer: {
//     backgroundColor: '#fff',
//     // borderWidth: 1,
//     borderRadius: 10,
//     // borderColor: '#555454',
//     elevation: 2,
//     height: 40,
//     justifyContent: 'center',
//   },

//   picker: {
//     // width: wp(75),
//     // height: 40,
//   },
//   buttonContainer: {
//     marginHorizontal: 10,
//     marginTop: 20,
//     borderRadius: 20,
//     width: '100%',
//   },

//   button: {
//     backgroundColor: 'green',
//     marginHorizontal: 20,
//     paddingVertical: 10,
//     paddingHorizontal: 20,
//     borderRadius: 15,
//     marginTop: 10,
//   },
//   buttonText: {
//     color: 'white',
//     fontSize: fp(2.7),
//     textAlign: 'center',
//   },
// })

// export default QuesAddVhicle
