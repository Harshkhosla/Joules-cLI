import React, { useState } from 'react'
import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  TouchableOpacity,
} from 'react-native'
import {
  responsiveHeight as hp,
  responsiveWidth as wp,
  responsiveFontSize as fp,
} from 'react-native-responsive-dimensions'
import App_top_Header from './App_top_Header'
import ChargingHistoryButton from '../components/ChargingHistoryButton'
import CustomChart from '../components/CustomChart'
import Energy_time_chart from './Energy_time_chart'
import Power_time_chart from './power_time_chart'

const Charging_History = ({ navigation, route }) => {
  // const { newGeneratedHours } = route.params;
  // console.log("newgeneratedhours",newGeneratedHours);
  const [isPowergraph, setisPowergraph] = useState(true)
  const [isEnergygraph, setisisEnergygraph] = useState(false)

  const HandleTouggl = () => {
    setisPowergraph(!isPowergraph)
    setisisEnergygraph(!isEnergygraph)
  }

  const data = [
    {
      statusname: 'Current',
      value: 44,
      statusType: 'Amp',
    },

    {
      statusname: 'Voltage',
      value: 240,
      statusType: 'Volt',
    },
    {
      statusname: 'Power',
      value: 240,
      statusType: 'Watt',
    },
    {
      statusname: 'Energy',
      value: 44,
      statusType: 'KwH',
    },
  ]

  return (
    <View style={styles.container}>
      <App_top_Header
        title={'Charging History'}
        navigation={navigation}
        color={'#C1E0C2'}
      />
      <View style={styles.containerContent}>
        <View style={styles.TopButtons}>
          <ChargingHistoryButton
            title={'Recent'}
            mode={false}
            modeColor={'#797979'}
          />

          <ChargingHistoryButton
            title={'Last 30 days'}
            mode={true}
            modeColor={'#797979'}
          />

          <ChargingHistoryButton
            title={'Last 90 days'}
            mode={true}
            modeColor={'#797979'}
          />
        </View>
        <View style={styles.ChartContainer}>
          <View>{/* <CustomChart xlabels={newGeneratedHours} /> */}</View>
          <View style={{ height: 220 }}>
            {isEnergygraph && <Energy_time_chart />}
            {isPowergraph && <Power_time_chart />}
          </View>
          <View style={styles.toggler}>
            <TouchableOpacity
              onPress={HandleTouggl}
              style={[
                styles.togglerButton,
                { backgroundColor: isPowergraph ? 'green' : 'transparent' },
              ]}
            >
              <Text
                style={[
                  { fontSize: 13, fontWeight: '400' },
                  { color: isPowergraph ? '#FFFFFF' : '#797979' },
                ]}
              >
                Power time graph
              </Text>
            </TouchableOpacity>
            <View
              style={{
                height: '100%',
                backgroundColor: '#fff',
                borderColor: '#DBDBDB',
                borderWidth: 1,
              }}
            ></View>
            <TouchableOpacity
              onPress={HandleTouggl}
              style={[
                styles.togglerButton,
                { backgroundColor: isEnergygraph ? 'green' : 'transparent' },
              ]}
            >
              <Text
                style={[
                  { fontSize: 13, fontWeight: '400' },
                  { color: isEnergygraph ? '#FFFFFF' : '#797979' },
                ]}
              >
                Energy time graph
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.ChargingDetailsBox}>
          <View style={styles.publicChargerTextBox}>
            <Text style={styles.publicChargerText}>Public Charger</Text>
          </View>
          <View style={styles.Vehicle}>
            <Text
              style={{
                fontSize: 16,
              }}
            >
              Vehicle name-
            </Text>
            <Text
              style={{
                fontSize: 16,
                color: '#118615',
              }}
            >
              Tata Nexon
            </Text>
          </View>
          <View style={styles.ChargingTimeCostBox}>
            <View style={styles.ChargingDetailsStyle}>
              <Text style={[styles.text, { color: '#797979' }]}>
                Charging Time
              </Text>
              <Text style={styles.text}>1.5 hrs</Text>
            </View>
            <View style={styles.ChargingDetailsStyle}>
              <Text style={[styles.text, { color: '#797979' }]}>
                Charging Cost
              </Text>
              <Text style={styles.text}> ₹ 50 </Text>
            </View>
          </View>
          <View style={styles.PowerBoxContainer}>
            {data.map((items, Id) => (
              <View key={Id} style={styles.PowerBoxesStyle}>
                <Text
                  style={[styles.text, { color: '#797979', marginBottom: 4 }]}
                >
                  {items.statusname}
                </Text>
                <Text style={styles.text}> {items.value}</Text>
                <Text style={styles.text}> {items.statusType}</Text>
              </View>
            ))}
          </View>
        </View>
      </View>
    </View>
  )
}

export default Charging_History

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  containerContent: {
    flex: 1,
    margin: 10,
    // backgroundColor: 'blue',
  },
  TopButtons: {
    flexDirection: 'row',
    width: '100%',
    // backgroundColor: 'red',
    gap: 5,
    justifyContent: 'space-between',
  },
  ChartContainer: {
    flex: 1,
    justifyContent: 'space-between',
    marginTop: 10,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: '#C7C7C7',
    overflow: 'hidden',
  },
  toggler: {
    marginBottom: 30,
    padding: 2,
    marginHorizontal: 20,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    height: 50,
    backgroundColor: '#fff',
    borderRadius: 10,
    elevation: 2,
  },
  togglerButton: {
    borderRadius: 10,
    padding: 8,
    backgroundColor: '#fff',
    borderColor: '#DBDBDB',
    // borderWidth: 1,
  },
  ChargingDetailsBox: {
    backgroundColor: '#fff',
    marginTop: -20,
    borderRadius: 15,
    borderWidth: 1,
    padding: 10,
    borderColor: '#C7C7C7',
  },
  publicChargerTextBox: {
    marginBottom: 15,
    marginTop: -10,
    width: 120,
  },
  publicChargerText: {
    paddingHorizontal: 6,
    paddingVertical: 4,
    backgroundColor: '#C1E0C2',
    color: '#118615',
    fontSize: 16,
    textAlign: 'center',
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
  },
  Vehicle: {
    flexDirection: 'row',
    justifyContent: 'center',
    backgroundColor: '#fff',
    padding: 4,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#C7C7C7',
  },
  ChargingTimeCostBox: {
    flexDirection: 'row',
    gap: 8,
    backgroundColor: '#fff',
    marginTop: 10,
  },
  ChargingDetailsStyle: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 5,
    gap: 4,
    backgroundColor: '#fff',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#C7C7C7',
  },
  PowerBoxContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
    backgroundColor: '#fff',
  },
  PowerBoxesStyle: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 2,
    width: wp(20),
    backgroundColor: '#fff',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#C7C7C7',
  },
  text: {
    color: '#118615',
    fontSize: fp(2.2),
  },
})
