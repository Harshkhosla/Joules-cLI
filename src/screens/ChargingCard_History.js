import React, { useState } from 'react'
import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  TouchableOpacity,
  FlatList,
} from 'react-native'
import {
  responsiveHeight as hp,
  responsiveWidth as wp,
  responsiveFontSize as fp,
} from 'react-native-responsive-dimensions'
import App_top_Header from './App_top_Header'

const ChargingCard_History = ({ navigation, route }) => {
  const data = [
    {
      rupee: '₹ 20',
      date: '04 May, 2024',
      chargerName: 'Charger Name 1',
      energy: 'Energy 1',
      startTime: 'Start Time - 12:10 am',
      timeTaken: 'Time Taken 1',
    },
    {
      rupee: '₹ 25',
      date: '05 May, 2024',
      chargerName: 'Charger Name 2',
      energy: 'Energy 2',
      startTime: 'Start Time - 12:20 am',
      timeTaken: 'Time Taken 2',
    },
    {
      rupee: '₹ 30',
      date: '06 May, 2024',
      chargerName: 'Charger Name 3',
      energy: 'Energy 3',
      startTime: 'Start Time - 12:30 am',
      timeTaken: 'Time Taken 3',
    },
    {
      rupee: '₹ 35',
      date: '07 May, 2024',
      chargerName: 'Charger Name 4',
      energy: 'Energy 4',
      startTime: 'Start Time - 12:40 am',
      timeTaken: 'Time Taken 4',
    },
    {
      rupee: '₹ 40',
      date: '08 May, 2024',
      chargerName: 'Charger Name 5',
      energy: 'Energy 5',
      startTime: 'Start Time - 12:50 am',
      timeTaken: 'Time Taken 5',
    },
    {
      rupee: '₹ 45',
      date: '09 May, 2024',
      chargerName: 'Charger Name 6',
      energy: 'Energy 6',
      startTime: 'Start Time - 01:00 am',
      timeTaken: 'Time Taken 6',
    },
    {
      rupee: '₹ 50',
      date: '10 May, 2024',
      chargerName: 'Charger Name 7',
      energy: 'Energy 7',
      startTime: 'Start Time - 01:10 am',
      timeTaken: 'Time Taken 7',
    },
    {
      rupee: '₹ 55',
      date: '11 May, 2024',
      chargerName: 'Charger Name 8',
      energy: 'Energy 8',
      startTime: 'Start Time - 01:20 am',
      timeTaken: 'Time Taken 8',
    },
    {
      rupee: '₹ 60',
      date: '12 May, 2024',
      chargerName: 'Charger Name 9',
      energy: 'Energy 9',
      startTime: 'Start Time - 01:30 am',
      timeTaken: 'Time Taken 9',
    },
    {
      rupee: '₹ 65',
      date: '13 May, 2024',
      chargerName: 'Charger Name 10',
      energy: 'Energy 10',
      startTime: 'Start Time - 01:40 am',
      timeTaken: 'Time Taken 10',
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
        <FlatList
          data={data}
          renderItem={({ item }) => (
            <View style={styles.card}>
              <View style={styles.rupeeBox}>
                <Text style={styles.rupeeText}>{item.rupee}</Text>
              </View>
              <View style={styles.detailsBox}>
                <Text style={styles.DateText}>04 May, 2024</Text>
                <View style={styles.ChDetails}>
                  <View style={styles.ChNameEnergy}>
                    <View style={styles.detailRow}>
                      <View style={styles.styleBox}></View>
                      <Text style={styles.detailsText}>Chager Name</Text>
                    </View>
                    <View style={styles.detailRow}>
                      <View style={styles.styleBox}></View>
                      <Text style={styles.detailsText}>Energy</Text>
                    </View>
                  </View>
                  <View style={[styles.ChNameEnergy, { marginLeft: -wp(10) }]}>
                    <View style={styles.detailRow}>
                      <View style={styles.styleBox}></View>
                      <Text style={styles.detailsText}>
                        Start Time - 12:10 am
                      </Text>
                    </View>
                    <View style={styles.detailRow}>
                      <View style={styles.styleBox}></View>
                      <Text style={styles.detailsText}>Time Taken</Text>
                    </View>
                  </View>
                </View>
              </View>
            </View>
          )}
          keyExtractor={(item, index) => index.toString()}
        />

        <View style={styles.card}>
          <View style={styles.rupeeBox}>
            <Text style={styles.rupeeText}>₹ 20</Text>
          </View>
          <View style={styles.detailsBox}>
            <Text style={styles.DateText}>04 May, 2024</Text>
            <View style={styles.ChDetails}>
              <View style={styles.ChNameEnergy}>
                <View style={styles.detailRow}>
                  <View style={styles.styleBox}></View>
                  <Text style={styles.detailsText}>Chager Name</Text>
                </View>
                <View style={styles.detailRow}>
                  <View style={styles.styleBox}></View>
                  <Text style={styles.detailsText}>Energy</Text>
                </View>
              </View>
              <View style={[styles.ChNameEnergy, { marginLeft: -wp(10) }]}>
                <View style={styles.detailRow}>
                  <View style={styles.styleBox}></View>
                  <Text style={styles.detailsText}>Start Time - 12:10 am</Text>
                </View>
                <View style={styles.detailRow}>
                  <View style={styles.styleBox}></View>
                  <Text style={styles.detailsText}>Time Taken</Text>
                </View>
              </View>
            </View>
          </View>
        </View>

        {/* <View style={styles.card}>
          <View style={styles.rupeeBox}>
            <Text style={styles.rupeeText}>₹ 20</Text>
          </View>
          <View style={styles.detailsBox}>
            <Text style={styles.DateText}>04 May, 2024</Text>
            <View style={styles.ChDetails}>
              <View style={styles.ChNameEnergy}>
                <View style={styles.detailRow}>
                  <View style={styles.styleBox}></View>
                  <Text style={styles.detailsText}>Chager Name</Text>
                </View>
                <View style={styles.detailRow}>
                  <View style={styles.styleBox}></View>
                  <Text style={styles.detailsText}>Energy</Text>
                </View>
              </View>
              <View style={[styles.ChNameEnergy, { marginLeft: -wp(10) }]}>
                <View style={styles.detailRow}>
                  <View style={styles.styleBox}></View>
                  <Text style={styles.detailsText}>Start Time - 12:10 am</Text>
                </View>
                <View style={styles.detailRow}>
                  <View style={styles.styleBox}></View>
                  <Text style={styles.detailsText}>Time Taken</Text>
                </View>
              </View>
            </View>
          </View>
        </View> */}
      </View>
    </View>
  )
}

export default ChargingCard_History

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  containerContent: {
    // flex: 1,
    padding: 10,
    // backgroundColor: 'pink',
    marginBottom: 65,
  },
  card: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#C1E0C2',
    marginBottom: 10,
    padding: 10,
    borderRadius: 15,
    borderColor: '#C7C7C7',
  },
  rupeeBox: {
    width: wp(18),
    height: hp(10),
    backgroundColor: '#118615',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 15,
  },
  rupeeText: {
    fontSize: 20,
    color: '#fff',
    fontWeight: 'bold',
  },
  detailsBox: {
    flex: 1,
    marginLeft: 8,
    marginBottom: 5,
    // backgroundColor: 'blue',
  },
  DateText: {
    marginBottom: 4,
    color: '#000000',
    fontWeight: '600',
  },
  ChDetails: {
    flexDirection: 'row',
    flex: 1,
    // width: wp(100),
  },
  ChNameEnergy: {
    flex: 1,
    justifyContent: 'space-between',
    // backgroundColor: 'red',
    overflow: 'scroll',
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  detailsText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#000000',
  },
  styleBox: {
    height: 15,
    width: 15,
    borderRadius: 3,
    marginRight: 5,
    backgroundColor: '#424242',
  },
})
