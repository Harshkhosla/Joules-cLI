import React from 'react'
import { Text, Dimensions, StyleSheet } from 'react-native'
import { LineChart } from 'react-native-chart-kit'

const Energy_time_chart = () => {
  // Generate data points
  const data = [
    { time: 0 },
    { time: 15 },
    { time: 30 },
    { time: 45 },
    { time: 60 },
  ]

  const powery = [
    { power: 0 },
    { power: 14.5 },
    { power: 5.8 },
    { power: 3.0 },
    { power: 19.9 },
    { power: 4.3 },
    { power: 20.2 },
    { power: 4.0 },
    { power: 3.5 },
    { power: 30.8 },
    { power: 7.0 },
  ]
  // Extract labels and data values
  const labels = data.map((point) => point.time.toString() + 's')
  const powerData = powery.map((point) => point.power)

  return (
    <>
      {/* <Text style={styles.header}>Line Chart</Text> */}
      <LineChart
        data={{
          labels: labels,
          datasets: [
            {
              data: powerData,
              strokeWidth: 2,
              withOuterLines: false,
              withInnerLines: false,
            },
          ],
        }}
        width={Dimensions.get('window').width - 16}
        height={220}
        chartConfig={{
          backgroundColor: '#1cc910',
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
        }}
      />
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    padding: 10,
  },
  header: {
    textAlign: 'center',
    fontSize: 18,
    padding: 16,
    marginTop: 16,
  },
})

export default Energy_time_chart
