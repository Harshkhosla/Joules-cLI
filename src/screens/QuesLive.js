// import React, { useState } from 'react'
// import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native'
// import Quesheader from './Quesheader'
// import Toast from 'react-native-toast-message'

// const QuesLive = ({ navigation }) => {
//   const [borderedImage, setBorderedImage] = useState(null)
//   const handleImagePress = (imageId) => {
//     setBorderedImage(imageId)
//   }

//   const nextButtonClick = () => {
//     if (borderedImage) {
//       navigation.navigate('QuesAddVhicle')
//     } else {
//       Toast.show({
//         type: 'error',
//         text1: 'please select You live',
//         position: 'bottom',
//         visibilityTime: 1000,
//       })
//     }
//   }
//   return (
//     <View>
//       <Quesheader />
//       <View style={styles.container}>
//         <View>
//           <View>
//             <Text
//               style={{
//                 fontSize: fp(2),
//                 textAlign: 'right',
//               }}
//             >
//               Question{' '}
//               <Text
//                 style={{
//                   color: 'green',
//                 }}
//               >
//                 2/4
//               </Text>
//             </Text>
//           </View>
//           <View
//             style={{
//               //   backgroundColor: 'red',
//               width: '100%',
//               // alignItems: 'center',
//             }}
//           >
//             <Text style={styles.text}>Where Do You Live ?</Text>
//             <View style={styles.ImageView}>
//               <View
//                 style={{
//                   alignItems: 'center',
//                 }}
//               >
//                 <TouchableOpacity onPress={() => handleImagePress(1)}>
//                   <View style={[borderedImage === 1 && styles.imageClick]}>
//                     <Image
//                       source={require('../assets/Group.png')}
//                       style={styles.image}
//                     />
//                   </View>
//                 </TouchableOpacity>
//                 <Text>Individual House</Text>
//               </View>
//               <View
//                 style={{
//                   alignItems: 'center',
//                 }}
//               >
//                 <TouchableOpacity onPress={() => handleImagePress(2)}>
//                   <View style={[borderedImage === 2 && styles.imageClick]}>
//                     <Image
//                       source={require('../assets/Group.png')}
//                       style={styles.image}
//                     />
//                   </View>
//                 </TouchableOpacity>
//                 <Text>Apartment</Text>
//               </View>
//             </View>
//           </View>
//         </View>

//         <View style={styles.inputContainer}>
//           <TouchableOpacity style={styles.button} onPress={nextButtonClick}>
//             <Text style={styles.buttonText}>Next</Text>
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
//     // borderColor: 'white',
//     // borderColor: '#DAE0E2',
//   },
//   detailscontainer: {
//     flex: 1,
//     backgroundColor: '#fff',
//     justifyContent: 'space-between',
//     padding: 20,
//     borderWidth: 1,
//     borderColor: '#DAE0E2',
//     elevation: 2,
//     margin: 20,
//     borderRadius: 20,
//   },
//   text: {
//     paddingVertical: 10,
//     // fontSize: fp(2.5)
//   },
//   ImageView: {
//     flexDirection: 'row',
//     justifyContent: 'center',
//     gap: 14,
//   },
//   imageContainer: {
//     width: wp(36),
//     height: hp(20),
//     backgroundColor: '#fff',
//     alignItems: 'center',
//     justifyContent: 'center',
//     marginBottom: 10,
//     borderRadius: 20,
//     borderWidth: 4,
//     borderColor: '#fff',
//     elevation: 2,
//   },

//   image: {
//     width: 120,
//     height: 120,
//     resizeMode: 'contain',
//     borderRadius: 10,
//   },
//   imageClick: {
//     borderWidth: 8,
//     borderRadius: 20,
//     marginBottom: 10,
//     borderColor: 'green',
//   },
//   inputContainer: {
//     marginHorizontal: 10,
//     marginTop: 20,
//     borderRadius: 20,
//     width: '100%',
//   },

//   button: {
//     backgroundColor: '#118615',
//     borderRadius: 15,
//   },
//   buttonText: {
//     color: 'white',
//     fontSize: 18,
//     textAlign: 'center',
//     padding: 10,
//   },
// })

// export default QuesLive
