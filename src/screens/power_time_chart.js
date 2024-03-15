import React from 'react'
import { Text, Dimensions, StyleSheet } from 'react-native'
import { BarChart } from 'react-native-chart-kit'

const Power_time_chart = () => {
  // Generate data points
  const data = [
    { time: 0 },
    { time: 15 },
    { time: 30 },
    { time: 45 },
    { time: 60 },
  ]

  const powery = [
    { power: 2.0 },
    { power: 14.5 },
    { power: 5.8 },
    { power: 3.0 },
    { power: 9.9 },
  ]
  // Extract labels and data values
  const labels = data.map((point) => point.time.toString())
  const powerData = powery.map((point) => point.power)

  return (
    <>
      <BarChart
        data={{
          labels: labels,
          datasets: [
            {
              data: powerData,
              strokeWidth: 2,
            },
          ],
        }}
        width={Dimensions.get('window').width - 20}
        height={220}
        chartConfig={{
          backgroundColor: '#fff',
          backgroundGradientFrom: '#FFFFFF',
          backgroundGradientTo: '#FFFFFF',
          decimalPlaces: 1, // Display one decimal place for power readings
          color: (opacity = 1) => `rgba(17, 134, 21, ${opacity})`,
          style: {
            borderRadius: 16,
          },
        }}
        yAxisSuffix="kW"
        style={{
          marginVertical: 8,
          //   borderRadius: 16,
          flex: 1,
          overflow: 'hidden',
        }}
      />
    </>
  )
}

const styles = StyleSheet.create({
  //   container: {
  //     flex: 1,
  //     backgroundColor: 'white',
  //     justifyContent: 'center',
  //     alignItems: 'center',
  //     textAlign: 'center',
  //     padding: 10,
  //   },
  //   header: {
  //     textAlign: 'center',
  //     fontSize: 18,
  //     padding: 16,
  //     marginTop: 16,
  //   },
})

export default Power_time_chart
