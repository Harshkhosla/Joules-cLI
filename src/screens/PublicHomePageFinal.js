import { StyleSheet, Text, TouchableOpacity, View, Image } from 'react-native'
import React, { useState } from 'react'
import SetCost from './SetCost'
import PublicHomePageHeader from './PublicHomePageHeader'
import NewAllButton from '../components/NewAllButton'

const PublicHomePageFinal = () => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const handleCostAndTimeOpen = () => {
    setIsModalOpen(true)
  }

  const handleCostAndTimeClose = () => {
    setIsModalOpen(false)
  }
  return (
    <View style={styles.container}>
      <PublicHomePageHeader />
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
        <View
          style={{
            height: 40,
            width: '85%',
            alignSelf: 'center',
            flexDirection: 'row',
            // alignItems: 'center',
            justifyContent: 'space-evenly',
            borderWidth: 1,
            borderRadius: 8,
            borderColor: '#EDECEC',
            marginTop: 10,
            marginBottom: -15,
          }}
        >
          <View style={{ justifyContent: 'center' }}>
            <Text>Power Used</Text>
          </View>
          <View style={{ backgroundColor: '#EDECEC', width: 1 }}></View>
          <View style={{ justifyContent: 'center' }}>
            <View
              style={{ flexDirection: 'row', gap: 5, alignItems: 'center' }}
            >
              <Image source={require('../assets/power.png')} />
              <Text>Charger- -- kwh</Text>
            </View>
          </View>
        </View>
        <View style={styles.dashboard}>
          <View>
            <View style={styles.chargingCostMeater}>
              <View
                style={{ flexDirection: 'row', gap: 3, alignItems: 'center' }}
              >
                <Image source={require('../assets/ev_charger.png')} style={{height:15,width:15}}/>
                <Text>Charging Cost</Text>
              </View>
              <Text>₹---</Text>
            </View>
          </View>
          <View style={styles.potIconContainer}>
            <Image
              style={styles.portIcon}
              source={require('../assets/porticon.png')}
            />
          </View>
          <View style={styles.chargingEnergyAndTime}>
            <View style={styles.chargingValueText}>
              <View
                style={{ flexDirection: 'row', gap: 3, alignItems: 'center' }}
              >
                <Image source={require('../assets/charger.png')} style={{height:17,width:17}} />
                <Text>Energy Consumed</Text>
              </View>
              <Text>-- hrs</Text>
            </View>
            <View style={{ backgroundColor: '#C7C7C7', width: 1 }}></View>
            <View style={styles.chargingValueText} >
              <View style={{ flexDirection: 'row', gap: 3}}>
                <Image source={require('../assets/battery_charging_30.png')} style={{height:35,width:22,}} />
                <Text>Charging Time</Text>
              </View>
              <Text>-- kwh</Text>
            </View>
          </View>
        </View>
        <View style={styles.buttonContainer}>
          <NewAllButton
            title={'Start Charging'}
            mode={false}
            modeColor={'#F56D6D'}
            action={handleCostAndTimeOpen}
          />
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
  contents: {
    flex: 1,
    padding: 20,
    // backgroundColor: 'pink',
  },
  statusBox: {
    backgroundColor: '#fff',
    padding: 10,
    flexDirection: 'row',
    alignItems: 'center',
    elevation: 2,
    borderRadius: 8,
  },

  dashboard: {
    marginTop: 10,
    height: 340,
    borderRadius: 20,
    backgroundColor: '#fff',
    borderWidth: 1,
    overflow: 'hidden',
    justifyContent: 'space-between',
    borderColor: '#C7C7C7',
    marginBottom: -14,
    zIndex: 1,
  },
  chargingCostMeater: {
    backgroundColor: '#fff',
    width: '60%',
    elevation: 5,
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
    resizeMode: 'cover',
    marginRight: -90,
    marginBottom: 20,
    resizeMode: 'contain',
  },
  chargingEnergyAndTime: {
    flexDirection: 'row',
    height: 90,
    justifyContent: 'space-evenly',
    backgroundColor: '#fff',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#C7C7C7',
  },
  chargingValueText: {
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
    // width: '100%',
  },

  buttonContainer: {
    height: 85,
    backgroundColor: '#C1E0C2',
    paddingHorizontal: 20,
    elevation: 2,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    justifyContent: 'center',
  },
})
