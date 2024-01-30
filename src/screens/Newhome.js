import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import SetCost from './SetCost'
import PublicHomePageHeader from './PublicHomePageHeader'
import AsyncStorage from '@react-native-async-storage/async-storage'

const Newhome = ({navigation}) => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [data, setData]= useState(); 
  const handleCostAndTimeOpen = () => {
    if(data){
      setIsModalOpen(true)
    }else{

      navigation.navigate('PublicScanner')
      setData(true);
    }
  }
  // console.log(AsyncStorage.getItem("pid"));
  useEffect(() => {
    // Use AsyncStorage.getItem with then to handle the Promise
    AsyncStorage.getItem("pid")
      .then((storedData) => {
        // Handle the retrieved data, it might be null if not found
        console.log("Data from AsyncStorage:", storedData);
        setData(storedData);
      })
      .catch((error) => {
        console.error("Error retrieving data from AsyncStorage:", error);
      });
  }, []);



  const handleRemoveItem = async () => {
    try {
      // Use AsyncStorage.removeItem to remove the "pid" item
      await AsyncStorage.removeItem("pid");
      console.log("Item removed from AsyncStorage");
      setData(null); // Reset the data state
    } catch (error) {
      console.error("Error removing item from AsyncStorage:", error);
    }
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
          <Text style={{ color:"#717171"}}>Status:</Text>
          <Text style={{ paddingLeft: 10, color: 'green' }}>
            Your charger is connected
          </Text>
        </View>
        <View style={styles.dashboard}>
          <View>
            <View style={styles.chargingCostMeater}>
              <Text style={{ color:"#717171"}}>Charging Cost</Text>
              <Text style={{ color:"#717171"}}>₹---</Text>
            </View>
          </View>
          <View style={styles.chargingEnergyAndTime}>
            <View style={styles.chargingValueText}>
              <Text style={{ color:"#717171"}}>Charging Time</Text>
              <Text style={{ color:"#717171"}}>-- hrs</Text>
            </View>
            <View style={styles.chargingValueText}>
              <Text style={{ color:"#717171"}}>Charging Energy</Text>
              <Text style={{ color:"#717171"}}>-- kwh</Text>
            </View>
          </View>
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            onPress={handleCostAndTimeOpen}
            style={styles.ButtonBox}
          >
            <Text style={styles.ButtonText}>{data?"Start Charging":"Scan QR"}</Text>
          </TouchableOpacity>
        </View>
        <Text
          style={{
            color: 'green',
            textAlign: 'center',
            fontSize: 12,
            padding: 8,
          }}
        >
          Start Charging and Contribute for your mother earth!
        </Text>
      </View>

      <SetCost open={isModalOpen} onClose={handleCostAndTimeClose} />
    </View>
  )
}

export default Newhome

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
    height: 420,
    borderRadius: 20,
    backgroundColor: '#fff',
    borderWidth: 1,
    justifyContent: 'space-between',
    borderColor: '#C7C7C7',
    marginBottom: -10,
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
  chargingEnergyAndTime: {
    flexDirection: 'row',
    color:"black",
    height: 100,
    // alignItems: 'center',
    // justifyContent: 'center',
    // // gap: 10,
    justifyContent: 'space-evenly',
    // backgroundColor: 'pink',

    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  chargingValueText: {
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
    // width: '100%',
  },

  buttonContainer: {
    height: 110,
    backgroundColor: '#C1E0C2',
    alignItems: 'center',
    elevation: 1,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    justifyContent: 'center',
  },
  ButtonBox: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '90%',
    padding: 10,
    borderRadius: 8,
    backgroundColor: 'green',
  },
  ButtonText: {
    fontSize: 20,
    color: '#fff',
  },
})
