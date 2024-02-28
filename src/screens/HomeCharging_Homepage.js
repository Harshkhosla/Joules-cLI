import { Alert, Image, StyleSheet, Text, View, Dimensions } from 'react-native'
import {
  responsiveHeight as hp,
  responsiveWidth as wp,
  responsiveFontSize as fp,
} from 'react-native-responsive-dimensions'
import HomeCharging_pageHeader from './HomeCharging_pageHeader'
import React, { useState, useEffect } from 'react'
import ChargingHomepage_Buttons from '../components/ChargingHomepage_Buttons'
import Set_ScheduleMode from './Set_ScheduleMode'
import HomeChargincModeButtons from '../components/HomeChargincModeButtons'
import BalanceMode from './BalanceMode'
import EcoMode from './EcoMode'

const HomeCharging_Homepage = ({ navigation }) => {
  const [isSchedule, setisSchedule] = useState(false)
  const [isBalanced, setisBalanced] = useState(false)
  const [isEco, setisEco] = useState(false)

  const windowWidth = Dimensions.get('window').width
  const windowHeight = Dimensions.get('window').height
  console.log(windowHeight, windowWidth)

  return (
    <View style={styles.container}>
      <HomeCharging_pageHeader
        navigation={navigation}
        title={'Hello Aman!'}
        color={'#C1E0C2'}
      />
      <View style={styles.contents}>
        <View style={styles.statusBox}>
          <View
            style={{
              height: 10,
              backgroundColor: '#118615',
              width: 10,
              borderRadius: 10 / 2,
              marginRight: 10,
            }}
          ></View>
          <Text>Status:</Text>
          <Text style={styles.status}>Off</Text>
        </View>
        <View style={styles.dashboard}>
          <View style={styles.meaterBox}>
            <View
              style={{
                alignItems: 'center',
                width: '60%',
                justifyContent: 'center',
                // backgroundColor: 'orange',
              }}
            >
              <Text>Balance Mode</Text>

              <View
                style={{
                  marginTop: 10,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              ></View>
            </View>
            <View>
              <View style={styles.powerUsed}>
                <Text style={styles.powerUsedTextGreen}>Power Used</Text>
                <Image
                  style={styles.imgicon}
                  source={require('../assets/powerhouse.png')}
                />
                <Text style={{ fontSize: 14, color: '#777272' }}>House</Text>
                <Text style={styles.powerUsedTextGreen}>0 KW</Text>
              </View>
              <View
                style={[
                  styles.powerUsed,
                  {
                    paddingTop: 17,
                    marginTop: -14,
                    justifyContent: 'center',
                    zIndex: -1,
                  },
                ]}
              >
                <Image
                  style={styles.imgicon}
                  source={require('../assets/bolt.png')}
                />
                <Text style={styles.powerUsedText}>Charger</Text>
                <Text style={styles.powerUsedTextGreen}>0 KW</Text>
                <Text style={{ padding: 2, fontSize: 12 }}>More Details</Text>
              </View>
            </View>
          </View>
          <View style={styles.chargingMods}>
            <Text style={[styles.powerUsedTextGreen, { fontSize: 20 }]}>
              Choose Charging Mode
            </Text>
            <View style={styles.ModeBoxContainer}>
              <HomeChargincModeButtons
                img={require('../assets/balance.png')}
                ModeName={'Balance'}
                action={() => {
                  setisBalanced(true)
                }}
              />
              <HomeChargincModeButtons
                img={require('../assets/history.png')}
                ModeName={'Schedule'}
                action={() => {
                  setisSchedule(true)
                }}
              />
              <HomeChargincModeButtons
                img={require('../assets/eco.png')}
                ModeName={'Eco'}
                action={() => {
                  setisEco(true)
                }}
              />
              <HomeChargincModeButtons
                img={require('../assets/power.png')}
                ModeName={'Slow'}
              />
            </View>
            <View style={styles.EnergyAnd_Cost_Time_Container}>
              <View
                style={[
                  styles.EnergyAnd_Cost_Time_Box,
                  { borderRightWidth: 2, borderColor: '#EEECEC' },
                ]}
              >
                <Text style={[styles.text, { color: '#797979' }]}>Energy</Text>
                <Text
                  style={[styles.text, { color: '#797979', marginBottom: 5 }]}
                >
                  Consumed
                </Text>
                <Text style={[styles.text]}>- - - -</Text>
              </View>
              <View
                style={[
                  styles.EnergyAnd_Cost_Time_Box,
                  { borderRightWidth: 2, borderColor: '#EEECEC' },
                ]}
              >
                <Text style={[styles.text, { color: '#797979' }]}>Cost of</Text>
                <Text
                  style={[styles.text, { color: '#797979', marginBottom: 5 }]}
                >
                  Charging
                </Text>
                <Text style={[styles.text]}>- - - -</Text>
              </View>
              <View style={styles.EnergyAnd_Cost_Time_Box}>
                <Text style={[styles.text, { color: '#797979' }]}>
                  Charging
                </Text>
                <Text
                  style={[styles.text, { color: '#797979', marginBottom: 5 }]}
                >
                  Time
                </Text>
                <Text style={[styles.text]}>- - - -</Text>
              </View>
            </View>
          </View>
        </View>
        <Text style={styles.tagTest}>
          Start Charging and Contribute for your mother earth
        </Text>
        <ChargingHomepage_Buttons
          action={() => {
            Alert.alert('perform hear which you wanted')
          }}
          title={'Start Charging'}
          modeColor={'#118615'}
        />
      </View>
      <View
        style={[styles.bottomColorBox, { backgroundColor: '#C1E0C2' }]}
      ></View>
      <Set_ScheduleMode open={isSchedule} setisSchedule={setisSchedule} />
      <BalanceMode open={isBalanced} setisBalanced={setisBalanced} />
      <EcoMode open={isEco} setisEco={setisEco} />
    </View>
  )
}

export default HomeCharging_Homepage

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  contents: {
    flex: 1,
    padding: 15,
  },
  statusBox: {
    backgroundColor: '#fff',
    padding: 10,
    flexDirection: 'row',
    alignItems: 'center',
    elevation: 2,
    borderRadius: 8,
  },
  status: { paddingLeft: 10, color: 'green' },
  dashboard: {
    flex: 1,
    marginTop: 10,
    borderRadius: 8,
    backgroundColor: '#fff',
    borderWidth: 1,
    overflow: 'hidden',
    borderColor: '#E5E1E1',
    zIndex: 1,
  },
  meaterBox: {
    padding: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#fff',
  },
  powerUsed: {
    padding: 1,
    borderRadius: 8,
    backgroundColor: '#fff',
    borderWidth: 1,
    alignItems: 'center',
    gap: 1,
    borderColor: '#E5E1E1',
  },
  powerUsedTextGreen: { fontSize: 14, color: '#118615' },
  powerUsedText: { fontSize: 14, color: '#777272' },
  imgicon: {
    height: 30,
    resizeMode: 'contain',
  },
  chargingMods: {
    flex: 1,
    paddingHorizontal: 10,
  },
  ModeBoxContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 5,
    backgroundColor: '#fff',
  },
  ModeBoxesStyle: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 8,
    width: wp(20),
    backgroundColor: '#fff',
    borderRadius: 8,
    elevation: 2,
  },
  text: {
    color: '#118615',
    fontSize: fp(2),
  },
  EnergyAnd_Cost_Time_Container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 10,
    backgroundColor: '#fff',
  },
  EnergyAnd_Cost_Time_Box: {
    justifyContent: 'center',
    width: wp(25),
    // paddingVertical: 8,
    backgroundColor: '#fff',
  },
  tagTest: {
    margin: 2,
    fontSize: 12,
    alignSelf: 'center',
    color: 'green',
  },
  bottomColorBox: {
    position: 'absolute',
    bottom: 0,
    height: hp(40),
    borderTopLeftRadius: 15,
    borderTopRightRadius: 60,
    width: wp(100),
    zIndex: -1,
  },
})
