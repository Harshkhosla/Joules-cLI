import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, TextInput } from 'react-native';
import CircularProgress from 'react-native-circular-progress-indicator';
import { responsiveHeight as hp, responsiveWidth as wp } from 'react-native-responsive-dimensions';
import AppTopHeader from './App_top_Header'; // Renamed to follow naming convention
import AsyncStorage from '@react-native-async-storage/async-storage'
import DeviceModal from './DeviceConnectionModal';
import useBLE from './bluetooth';
import App_top_Header from './App_top_Header';

const App = ({ navigation }) => {
  const {
    requestPermissions,
    scanForPeripherals,
    allDevices,
    connectToDevice,
    connectedDevice,
    heartRate,
    sendToDevice,
    disconnectFromDevice,
  } = useBLE();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [progress, setProgress] = useState(0);
  const [timer, setTimer] = useState(null);
  const [DevicesConnected, setDevicesConnected] = useState<string>("");
  useEffect(()=>{
    const data23 = async()=>{
    const data = await AsyncStorage.getItem('DevicesConnected')
    console.log(data,"skdjvbdsvjbsdhvsbdn");
    setDevicesConnected(data);
  }
  data23();
  },[])
  useEffect(() => {
    if (timer !== null) {
      const interval = setInterval(() => {
        if (progress < 100) {
          setProgress((prevProgress) => prevProgress + 1);
          if (isModalVisible) {
            clearInterval(timer);
            setProgress(0);
            setTimer(null);
          }
        } else {
          clearInterval(timer);
          setIsModalVisible(true);
          setTimer(null);
        }
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [timer, progress, isModalVisible]);

  const handleScanAgain = () => {
    requestPermissions((isGranted) => {
      if (isGranted) {
        scanForPeripherals();
      }
    });
    setProgress(0);
    setTimer(
      setTimeout(() => {
        setIsModalVisible(true);
      }, 15000)
    );
  };
  const [charger1, setCharger1] = useState('');
  const [charger2, setCharger2] = useState('');
  const [charger3, setCharger3] = useState('');

  const handleSendData =async () => {
  //  await AsyncStorage.removeItem('DevicesConnected')
    sendToDevice(
     `SSID=${charger1}&PSK=${charger2}&`
    ) // Call sendToDevice with your static data
  }
  const hideModal = () => {
    setIsModalVisible(false);
  };

  // const openModal = async () => {
  //   scanForDevices();
  //   setIsModalVisible(true);
  // };
  console.log(connectedDevice,":sdkjdsndshbhdj");
  

  return (
    <View style={styles.container}>
      { !connectedDevice  ? (
        <>
          <AppTopHeader
            title={'Connect via Bluetooth'}
            navigation={navigation}
            color={'#C1E0C2'}
          />
          <View style={styles.formcontent}>
            <View style={{ flex: 1 }}>
              <Text style={styles.text}>
                We need to connect your device with your charger via Bluetooth to send Wi-Fi
                credentials.
              </Text>
              <View style={styles.progressWindow}>
                <CircularProgress
                  value={progress}
                  radius={115}
                  duration={1000}
                  progressValueColor={'#000000'}
                  title={'Searching for '}
                  titleFontSize={16}
                  titleColor={'black'}
                  titleStyle={{ fontWeight: 'bold' }}
                  subtitle={'"EcoLite"'}
                  subtitleColor={'black'}
                  subtitleFontSize={16}
                  subtitleStyle={{ fontWeight: 'bold' }}
                  activeStrokeColor={'#FDDD0000'}
                  activeStrokeSecondaryColor={'#7AE27EE5'}
                  inActiveStrokeColor={'#FDDD001A'}
                  activeStrokeWidth={18}
                  inActiveStrokeWidth={15}
                  progressFormatter={(value: number) => {
                    'worklet';
                    return value.toFixed(1) + 's'; // 2 decimal places
                  }}
                  progressValueStyle={{
                    fontSize: 35,
                    color: 'black',
                    fontWeight: 'bold',
                  }}
                />
              </View>
            </View>
            <TouchableOpacity style={styles.connectButton} onPress={handleScanAgain}>
              <Text style={styles.connectText}>Scan Again</Text>
            </TouchableOpacity>
            <View style={styles.tagNote}>
              <Image
                style={styles.tagNoteImg}
                source={require('../assets/energy_savings_leaf.png')}
              />
              <Text style={{ color: '#118615' }}>
                Charging an electric vehicle is equivalent to giving a car a breath of fresh air
              </Text>
            </View>
          </View>
        </>
      ) : (
        // Your other view content
        <>
     <View style={styles1.container}>
        <App_top_Header
          title={'Nearby Chargers'}
          navigation={navigation}
          color={'#C1E0C2'}
        />

        <View style={styles1.formcontent}>
          <View style={{ flex: 1 }}>
            <Text style={styles1.Text}>
              Please tap the charger name to connect to your device via
              Bluetooth.
            </Text>
            <TextInput
              style={styles1.input}
              // secureTextEntry={true}
              placeholder="Chagrer 1"
              value={charger1}
              onChangeText={setCharger1}
            />
            <TextInput
              style={styles1.input}
              placeholder="Chagrer 2"
              // secureTextEntry={true}
              value={charger2}
              onChangeText={setCharger2}
            />
            <TextInput
              style={styles1.input}
              placeholder="Chagrer 3"
              // secureTextEntry={true}
              value={charger3}
              onChangeText={setCharger3}
            />
             <TouchableOpacity
          style={styles1.ConnectButton}
          onPress={handleSendData}
        >
          <Text style={styles1.ConnectText}>Scan Again</Text>
        </TouchableOpacity>

         
            <View style={styles.progressWindow} />
          </View>
          <View style={styles.tagNote}>
            <Image
              style={styles.tagNoteImg}
              source={require('../assets/energy_savings_leaf.png')}
            />
            <Text style={{ color: '#118615' }}>
              Charging an electric vehicle is equivalent to giving a car a
              breath of fresh air
            </Text>
          </View>
        </View>
      </View>
        </>
      )}
      {/* Your DeviceModal component */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  formcontent: {
    flex: 1,
    paddingHorizontal: 20,
    justifyContent: 'space-between',
  },
  text: {
    color: 'black',
    fontSize: 18,
    fontFamily: 'Poppins',
    fontWeight: '500',
    textAlign: 'justify',
    marginVertical: hp(4),
  },
  progressWindow: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  connectButton: {
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    width: wp(40),
    padding: 10,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: 'green',
    marginTop: hp(1),
  },
  connectText: {
    fontSize: 16,
    color: '#0D0D0D',
  },
  tagNote: {
    height: 60,
    marginHorizontal: 20,
    paddingHorizontal: 10,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  tagNoteImg: {
    height: 40,
    marginRight: 6,
  },
});



const styles1 = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  formcontent: {
    flex: 1,
    paddingHorizontal: 20,
    justifyContent: 'space-between',
  },

  Text: {
    color: 'black',
    fontSize: 18,
    fontFamily: 'Poppins',
    fontWeight: '500',
    textAlign: 'justify',
    marginVertical: hp(4),
  },

  input: {
    height: 45,
    borderColor: '#838284',
    borderWidth: 1,
    borderRadius: 15,
    marginVertical: hp(1),
    paddingHorizontal: 20,
    color: '#838284',
  },
  progressWindow: {
    flex: 1,
    // backgroundColor: 'pink',
    alignItems: 'center',
    justifyContent: 'center',
  },

  ConnectButton: {
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    width: wp(40),
    padding: 10,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: 'green',
    marginTop: hp(1),
  },
  ConnectText: {
    fontSize: 16,
    color: '#0D0D0D',
  },

  tagNote: {
    height: 60,
    marginHorizontal: 20,
    paddingHorizontal: 10,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  tagNoteImg: {
    height: 40,
    marginRight: 6,
  },
})

export default App;
