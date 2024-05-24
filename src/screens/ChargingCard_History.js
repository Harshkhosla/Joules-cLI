import React, { useEffect, useState } from 'react'
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
import { useDispatch, useSelector } from 'react-redux'
import { GetChargerHistory } from '../Redux/Action'
import { calculateTimeDifferenceStartTimeEndTime } from '../utility/asyncStorage'

const ChargingCard_History = ({ navigation, route }) => {
  

  const [loading,setLoading]=useState(true)
  const dispatch=useDispatch()
  const mid=useSelector((state)=>state.userReducers.UserMid)
  const AllChargingHistoryData=useSelector((state)=>state.userReducers.AllChargerHistoryData)
  const populateChargerHistoryData = true
  const lastchargerhistory = false
  const getallchargerhistory=true
  console.log("midmidmidmidmidmidmidmid",mid);
  console.log("AllChargingHistoryData",AllChargingHistoryData);
  useEffect(()=>{
    dispatch(GetChargerHistory("",mid,populateChargerHistoryData,lastchargerhistory,getallchargerhistory))
  },[])
  

  return (
    <View style={styles.container}>
      <App_top_Header
        title={'Charging History'}
        navigation={navigation}
        color={'#C1E0C2'}
      />
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
                      <Text style={styles.detailsText}>{item?.ChargerName}</Text>
                    </View>
                    <View style={styles.detailRow}>
                      <View style={styles.styleBox}></View>
                      {/* <Text style={styles.detailsText}>Energy</Text> */}
                      <Text style={styles.detailsText}>{isNaN(item.EnergyUsed) 
                          ? '0.000 Wh' 
                        : (Math.floor(item.EnergyUsed * 10) / 10).toFixed(1)+" Wh" }</Text>
                    </View>
                  </View>
                  <View style={[styles.ChNameEnergy, { marginLeft: -wp(10) }]}>
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
                      <Text style={styles.detailsText}>{calculateTimeDifferenceStartTimeEndTime(item.StartTime,item.EndTime)}</Text>
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
