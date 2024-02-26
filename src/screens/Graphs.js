import React, { Component } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  TextInput,
  Text,
  View
} from 'react-native';
import { useState, useEffect } from 'react';
import {
    LineChart,
    BarChart,
    PieChart,
    ProgressChart,
    ContributionGraph,
    StackedBarChart
  } from "react-native-chart-kit";
  import { Dimensions } from "react-native";
import { ProgressBar } from 'react-native-paper';
// import ProgressBar from '../components/ProgressBar';

const screenWidth = Dimensions.get('window').width
// console.log("screenWidth",screenWidth)
export default function Meter({ navigation }) {
    const chartConfig = {
        backgroundGradientFrom: "#1E2923",
        backgroundGradientFromOpacity: 0,
        backgroundGradientTo: "#08130D",
        backgroundGradientToOpacity: 0.5,
        color: (opacity = 1) => `rgba(0, 0, 146, ${opacity})`,
        strokeWidth: 2, // optional, default 3
        barPercentage: 0.5,
        useShadowColorFromDataset: false // optional
      };
  const data = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June'],
    datasets: [
      {
        data: [20, 45, 28, 80, 99, 43],
      },
    ],
  }
  return (
    <>
      <View>
        <Text>Bezier Line Chart</Text>
        <LineChart
          data={{
            labels: ['January', 'February', 'March', 'April', 'May', 'June'],
            datasets: [
              {
                data: [
                   100,
                  200,
                300,
                //   Math.random() * 100,
                //   4 * 100,
                //   2 * 100,
                //   4 * 100,
                //   2 * 100,
                //   4 * 100,
                //   2 * 100,
                ],
              },
            ],
          }}
          width={Dimensions.get('window').width} // from react-native
          height={340}
          yAxisLabel="$"
          yAxisSuffix="k"
          yAxisInterval={10} // optional, defaults to 1
          chartConfig={{
            backgroundColor: '#e26a00',
            backgroundGradientFrom: '#fb8c00',
            backgroundGradientTo: '#ffa726',
            decimalPlaces: 2, // optional, defaults to 2dp
            color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
            labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
            style: {
              borderRadius: 16,
            },
            propsForDots: {
              r: '6',
              strokeWidth: '2',
              stroke: '#ffa726',
            },
          }}
          bezier
          style={{
            // marginVertical: 8,
            borderRadius: 16,
          }}
        />

{/* <LineChart
  data={data}
  width={screenWidth}
  height={256}
  verticalLabelRotation={30}
  chartConfig={chartConfig}
  bezier
/> */}
         {/* <ProgressBar></ProgressBar> */}
       </View>
     </>
   )
 }

// // const styles = StyleSheet.create({
// //   container: {
// //     flex: 1
// //   }
// // })


