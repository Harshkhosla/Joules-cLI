import React, { useEffect, useState } from 'react'
import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
} from 'react-native'
import {
  responsiveHeight as hp,
  responsiveWidth as wp,
  responsiveFontSize as fp,
} from 'react-native-responsive-dimensions'
import App_top_Header from './App_top_Header'
import { useDispatch, useSelector } from 'react-redux'
import { GetChargerHistory } from '../Redux/Action'
import { calculateTimeDifferenceStartTimeEndTime } from '../utility/asyncStorage'

const ChargingCard_History = ({ navigation, route }) => {
  const [loading, setloading] = useState(true)
  const dispatch = useDispatch()
  const mid = useSelector((state) => state.userReducers.UserMid)
  const AllChargingHistoryData = useSelector(
    (state) => state.userReducers.AllChargerHistoryData
  )

  const populateChargerHistoryData = true
  const lastchargerhistory = false
  const getallchargerhistory = true
  console.log('midmidmidmidmidmidmidmid', mid)
  console.log(
    'AllChargingHistoryData ==  ==  =  == = == = = =  =>',
    AllChargingHistoryData
  )

  useEffect(() => {
    dispatch(
      GetChargerHistory(
        '',
        mid,
        populateChargerHistoryData,
        lastchargerhistory,
        getallchargerhistory
      )
    )
    setloading(false)
  }, [])

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

      {loading ? (
        <View
          style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
        >
          <ActivityIndicator size="large" color="#118615" />
        </View>
      ) : (
        <>
          {Array.isArray(AllChargingHistoryData) &&
          AllChargingHistoryData.length <= 0 ? (
            <View
              style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <View
                style={{
                  flex: 1,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                <Text style={styles.nullHistory}>
                  You are missing your first charging session 🙁
                </Text>
              </View>
              <TouchableOpacity style={styles.ButtonBox}>
                <Text style={styles.ButtonText}>Scan QR</Text>
              </TouchableOpacity>
            </View>
          ) : (
            <View style={styles.containerContent}>
              <FlatList
                data={AllChargingHistoryData}
                renderItem={({ item }) => (
                  <View style={styles.card}>
                    <View style={styles.rupeeBox}>
                      <Text style={styles.rupeeText}>₹{item.inputCost}</Text>
                    </View>
                    <View style={styles.detailsBox}>
                      {/* <Text style={styles.DateText}>04 May, 2024</Text> */}
                      <Text style={styles.DateText}>{item.Date}</Text>
                      <View style={styles.ChDetails}>
                        <View style={styles.ChNameEnergy}>
                          <View style={styles.detailRow}>
                            <View style={styles.styleBox}></View>
                            <Text style={styles.detailsText}>
                              {item?.ChargerName}
                            </Text>
                          </View>
                          <View style={styles.detailRow}>
                            <View style={styles.styleBox}></View>
                            {/* <Text style={styles.detailsText}>Energy</Text> */}
                            <Text style={styles.detailsText}>
                              {isNaN(item.EnergyUsed)
                                ? '0.000 Wh'
                                : (
                                    Math.floor(item.EnergyUsed * 10) / 10
                                  ).toFixed(1) + ' Wh'}
                            </Text>
                          </View>
                        </View>
                        <View
                          style={[styles.ChNameEnergy, { marginLeft: -wp(10) }]}
                        >
                          <View style={styles.detailRow}>
                            <View style={styles.styleBox}></View>
                            <Text style={styles.detailsText}>
                              {/* Start Time - 12:10 am */}
                              {item.StartTime}
                            </Text>
                          </View>
                          <View style={styles.detailRow}>
                            <View style={styles.styleBox}></View>
                            {/* <Text style={styles.detailsText}>Time Taken</Text> */}
                            <Text style={styles.detailsText}>
                              {calculateTimeDifferenceStartTimeEndTime(
                                item.StartTime,
                                item.EndTime
                              )}
                            </Text>
                          </View>
                        </View>
                      </View>
                    </View>
                  </View>
                )}
                keyExtractor={(item, index) => index.toString()}
              />
              {/* 
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
        </View> */}

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
          )}
        </>
      )}

      <View style={[styles.poweredbyBox]}>
        <Text style={{ fontSize: 12, color: '#118615' }}>
          Powered by Jouls Ecotech Pvt. Ltd.
        </Text>
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
  nullHistory: {
    marginBottom: 4,
    color: '#000000',
    fontWeight: '600',
  },
  ButtonBox: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '90%',
    padding: 8,
    marginBottom: 35,
    borderRadius: 8,
    borderWidth: 2,
    backgroundColor: 'green',
    borderColor: 'green',
  },
  ButtonText: {
    fontSize: 20,
    color: '#fff',
  },
  containerContent: {
    // flex: 1,
    padding: 10,
    // backgroundColor: 'pink',
    marginBottom: 120,
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
  poweredbyBox: {
    position: 'absolute',
    bottom: 0,
    height: hp(5),
    width: wp(100),
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
  },
})
