import { StyleSheet, Text, View, Image } from 'react-native'
import React, { useState } from 'react'
import SetCost from './SetCost'
import PublicHomePageHeader from './PublicHomePageHeader'
import NewAllButton from '../../components/NewAllButton'
import HomeScreenCircles from '../HomeScreenCircle'
import {
  responsiveHeight as hp,
  responsiveWidth as wp,
  responsiveFontSize as fp,
} from 'react-native-responsive-dimensions'
import Checker from '../Checker'

const PublicHomePageFinal = ({ navigation }) => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const handleCostAndTimeOpen = () => {
    setIsModalOpen(true)
  }

  const handleCostAndTimeClose = () => {
    setIsModalOpen(false)
  }
  return (
    <View style={styles.container}>
      {isModalOpen ? <View style={styles.modalopen}></View> : ''}

      <PublicHomePageHeader navigation={navigation} />
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
          <Text style={{ paddingLeft: 10, color: 'green' }}>
            Your charger is connected
          </Text>
        </View>
        <View style={styles.powerAndCharging}>
          <View style={{ justifyContent: 'center' }}>
            <Text>Power Used</Text>
          </View>
          <View style={{ backgroundColor: '#EDECEC', width: 1 }}></View>
          <View style={{ justifyContent: 'center' }}>
            <View
              style={{ flexDirection: 'row', gap: 5, alignItems: 'center' }}
            >
              <Image
                style={[styles.Icons, { height: 20 }]}
                source={require('../../assets/power.png')}
              />
              <Text>Charger- -- kwh</Text>
            </View>
          </View>
        </View>
        <View style={styles.dashboard}>
          <View>
            <View style={styles.chargingCostMeater}>
              <View style={styles.dashboardIconsView}>
                <Image
                  style={styles.Icons}
                  source={require('../../assets/ev_charger.png')}
                />
                <Text>Charging Cost</Text>
              </View>
              <Text>₹---</Text>
              <View
                style={{
                  position: 'absolute',
                  flexDirection: 'row',
                  gap: 88,
                  marginBottom: -100,
                  bottom: 0,
                }}
              >
                <HomeScreenCircles />
                <HomeScreenCircles />
              </View>
            </View>
          </View>
          {/* <Checker /> */}
          <View style={styles.potIconContainer}>
            <Image
              style={styles.portIcon}
              source={require('../../assets/porticon.png')}
            />
          </View>
          <View style={styles.chargingEnergyAndTime}>
            <View style={styles.chargingValueText}>
              <View style={styles.dashboardIconsView}>
                <Image
                  style={styles.Icons}
                  source={require('../../assets/battery_charging_30.png')}
                />
                <Text>Charging Time</Text>
              </View>
              <Text>-- kwh</Text>
            </View>

            <View style={{ backgroundColor: '#C7C7C7', width: 1 }}></View>
            <View style={styles.chargingValueText}>
              <View style={styles.dashboardIconsView}>
                <Image
                  style={styles.Icons}
                  source={require('../../assets/charger.png')}
                />
                <Text>Energy Consumed</Text>
              </View>
              <Text>-- hrs</Text>
            </View>
          </View>
        </View>
        <View style={styles.buttonContainer}>
          <View style={{ marginTop: 20 }}>
            <NewAllButton
              title={'Start Charging'}
              mode={false}
              modeColor={'#F56D6D'}
              action={handleCostAndTimeOpen}
            />
          </View>
        </View>
        <Text
          style={{
            color: '#118615',
            textAlign: 'center',
            fontSize: 12,
            padding: 8,
          }}
        >
          Thanks For Using an EV ! Your Contribution Matters
        </Text>
      </View>

      <SetCost open={isModalOpen} onClose={handleCostAndTimeClose} />
    </View>
  )
}

export default PublicHomePageFinal

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  modalopen: {
    backgroundColor: 'rgba(0, 0, 0, 0.76)',
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    top: 0,
    zIndex: 2,
  },
  contents: {
    flex: 1,
    padding: 20,
  },
  statusBox: {
    backgroundColor: '#fff',
    padding: 10,
    flexDirection: 'row',
    alignItems: 'center',
    elevation: 2,
    borderRadius: 8,
  },
  powerAndCharging: {
    height: 40,
    width: '85%',
    alignSelf: 'center',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    borderWidth: 1,
    borderRadius: 8,
    borderColor: '#EDECEC',
    marginTop: 10,
    marginBottom: -15,
  },
  dashboard: {
    flex: 1,
    marginTop: 10,
    borderRadius: 10,
    backgroundColor: '#fff',
    borderWidth: 1,
    overflow: 'hidden',
    justifyContent: 'space-between',
    borderColor: '#C7C7C7',
    zIndex: 1,
  },
  dashboardIconsView: {
    flexDirection: 'row',
    gap: 3,
    alignItems: 'center',
  },
  Icons: {
    height: 25,
    resizeMode: 'contain',
    width: 30,
  },
  chargingCostMeater: {
    backgroundColor: '#fff',
    width: '70%',
    elevation: 5,
    overflow: 'hidden',
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    gap: 10,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    height: 80,
  },
  potIconContainer: {
    opacity: 0.2,
    position: 'absolute',
    alignSelf: 'flex-end',
    bottom: 0,
    zIndex: 0,
    transform: [{ rotate: '-15deg' }],
  },
  portIcon: {
    height: 180,
    overflow: 'hidden',
    width: 180,
    marginRight: -90,
    marginBottom: 20,
    resizeMode: 'contain',
  },
  chargingEnergyAndTime: {
    flexDirection: 'row',
    height: 90,
    justifyContent: 'space-evenly',
    backgroundColor: '#fff',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#C7C7C7',
  },
  chargingValueText: {
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
  },
  buttonContainer: {
    marginTop: -20,
    height: 100,
    backgroundColor: '#C1E0C2',
    paddingHorizontal: 20,
    elevation: 2,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    justifyContent: 'center',
  },
})
