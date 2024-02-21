// // import React, { Component } from 'react';
// // import {
// //   SafeAreaView,
// //   StyleSheet,
// //   TextInput,
// //   Text,
// //   View
// // } from 'react-native';
// // import { useState, useEffect } from 'react';
// // import {
// //     LineChart,
// //     BarChart,
// //     PieChart,
// //     ProgressChart,
// //     ContributionGraph,
// //     StackedBarChart
// //   } from "react-native-chart-kit";
//   import { Dimensions } from "react-native";
// // // import { ProgressBar } from 'react-native-paper';
// // // import ProgressBar from '../components/ProgressBar';

// const screenWidth = Dimensions.get('window').width
// console.log("screenWidth",screenWidth)
// export default function Meter({ navigation }) {
//   const data = {
//     labels: ['January', 'February', 'March', 'April', 'May', 'June'],
//     datasets: [
//       {
//         data: [20, 45, 28, 80, 99, 43],
//       },
//     ],
//   }
//   return (
//     <>
//       <View>
//         <Text>Bezier Line Chart</Text>
//         <LineChart
//           data={{
//             labels: ['January', 'February', 'March', 'April', 'May', 'June'],
//             datasets: [
//               {
//                 data: [
//                   8 * 100,
//                   Math.random() * 100,
//                   6 * 100,
//                   Math.random() * 100,
//                   4 * 100,
//                   2 * 100,
//                   4 * 100,
//                   2 * 100,
//                   4 * 100,
//                   2 * 100,
//                 ],
//               },
//             ],
//           }}
//           width={Dimensions.get('window').width} // from react-native
//           height={340}
//           yAxisLabel="$"
//           yAxisSuffix="k"
//           yAxisInterval={1} // optional, defaults to 1
//           chartConfig={{
//             backgroundColor: '#e26a00',
//             backgroundGradientFrom: '#fb8c00',
//             backgroundGradientTo: '#ffa726',
//             decimalPlaces: 2, // optional, defaults to 2dp
//             color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
//             labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
//             style: {
//               borderRadius: 16,
//             },
//             propsForDots: {
//               r: '6',
//               strokeWidth: '2',
//               stroke: '#ffa726',
//             },
//           }}
//           bezier
//           // style={{
//           //   // marginVertical: 8,
//           //   borderRadius: 16,
//           // }}
//         />

// //         {/* <BarChart
// // //   style={graphStyle}
// //   data={data}
// //   width={screenWidth}
// //   height={220}
// //   yAxisLabel="$"
// //   chartConfig={chartConfig}
// //   verticalLabelRotation={30}
// // /> */}
// //         {/* <ProgressBar></ProgressBar> */}
// //       </View>
// //     </>
// //   )
// // }

// // const styles = StyleSheet.create({
// //   container: {
// //     flex: 1
// //   }
// // })


