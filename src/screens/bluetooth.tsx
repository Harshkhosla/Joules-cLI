/* eslint-disable no-bitwise */
import {useState} from 'react';
import {PermissionsAndroid, Platform} from 'react-native';
import {
  BleError,
  BleManager,
  Characteristic,
  Device,
} from 'react-native-ble-plx';
import {PERMISSIONS, requestMultiple} from 'react-native-permissions';
import DeviceInfo from 'react-native-device-info';
import AsyncStorage from '@react-native-async-storage/async-storage'
import {atob, btoa} from 'react-native-quick-base64';

const HEART_RATE_UUID = '6e400001-b5a3-f393-e0a9-e50e24dcca9e';
const HEART_RATE_CHARACTERISTIC = '6E400003-B5A3-F393-E0A9-E50E24DCCA9E';
const HEART_RATE_CHARACTERISTIC1 = '6E400002-B5A3-F393-E0A9-E50E24DCCA9E';

const bleManager = new BleManager();

type VoidCallback = (result: boolean) => void;

interface BluetoothLowEnergyApi {
  requestPermissions(cb: VoidCallback): Promise<void>;
  scanForPeripherals(): void;
  connectToDevice: (deviceId: Device) => Promise<void>;
  disconnectFromDevice: () => void;
  connectedDevice: Device | null;
  allDevices: Device[];
  heartRate: number;
   sendToDevice: (jsonData: any) => Promise<void>; // Add this line
   isModalVisible1: boolean; // Add the isModalVisible1 variable
   setIsModalVisible1: React.Dispatch<React.SetStateAction<boolean>>;
}

function useBLE(): BluetoothLowEnergyApi {
  const [isModalVisible1, setIsModalVisible1] = useState(false);
  const [allDevices, setAllDevices] = useState<Device[]>([]);
  const [connectedDevice, setConnectedDevice] = useState<Device | null>(null);
  const [heartRate, setHeartRate] = useState<number>(0);
  const [staticData, setStaticData] = useState<string>('helllo ji ');

  const requestPermissions = async (cb: VoidCallback) => {
    if (Platform.OS === 'android') {
      const apiLevel = await DeviceInfo.getApiLevel();
// console.log(apiLevel);

      if (apiLevel < 31) {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
          {
            title: 'Location Permission',
            message: 'Bluetooth Low Energy requires Location',
            buttonNeutral: 'Ask Later',
            buttonNegative: 'Cancel',
            buttonPositive: 'OK',
          },
        );
        cb(granted === PermissionsAndroid.RESULTS.GRANTED);
      } else {
        const result = await requestMultiple([
          PERMISSIONS.ANDROID.BLUETOOTH_SCAN,
          PERMISSIONS.ANDROID.BLUETOOTH_CONNECT,
          PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION,
        ]);

        const isGranted =
          result['android.permission.BLUETOOTH_CONNECT'] ===
            PermissionsAndroid.RESULTS.GRANTED &&
          result['android.permission.BLUETOOTH_SCAN'] ===
            PermissionsAndroid.RESULTS.GRANTED &&
          result['android.permission.ACCESS_FINE_LOCATION'] ===
            PermissionsAndroid.RESULTS.GRANTED;

        cb(isGranted);
      }
    } else {
      cb(true);
    }
  };

  const isDuplicteDevice = (devices: Device[], nextDevice: Device) =>
    devices.findIndex(device => nextDevice.id === device.id) > -1;

  const scanForPeripherals = () =>
    bleManager.startDeviceScan(null, null, async(error, device) => {
      if (error) {
        console.log(error,"dsjnvn");
        setIsModalVisible1(true);
      }
      // if (device) {
      if (device && device.name?.includes('PEL00001')) {
        try {
          const connectedDevice = await bleManager.connectToDevice(device.id);
          setConnectedDevice(connectedDevice);
          const authtoken = JSON.stringify(connectedDevice)
          console.log(authtoken,"harsh");
        await AsyncStorage.setItem('DevicesConnected', authtoken)
          await connectedDevice.discoverAllServicesAndCharacteristics();
          bleManager.stopDeviceScan();
          startStreamingData(connectedDevice);
          console.log('Connected to device:', connectedDevice.name);
        
        } catch (e) {
          console.log('Failed to connect to device:', e);
        }
        setAllDevices((prevState: Device[]) => {
          if (!isDuplicteDevice(prevState, device)) {
            return [...prevState, device];
          }
          return prevState;
        });
      }
     
    });

  const connectToDevice = async (device: Device) => {
    try {
      const deviceConnection = await bleManager.connectToDevice(device.id);
      setConnectedDevice(deviceConnection);
      await deviceConnection.discoverAllServicesAndCharacteristics();
      bleManager.stopDeviceScan();
      startStreamingData(deviceConnection);
    } catch (e) {
      console.log('FAILED TO CONNECT', e);
    }
  };

  const disconnectFromDevice = async() => {
    if (connectedDevice) {
      bleManager.cancelDeviceConnection(connectedDevice.id);
      setConnectedDevice(null);
      await AsyncStorage.removeItem('DevicesConnected')
      setHeartRate(0);
    }
  };

  const onHeartRateUpdate = (
    error: BleError | null,
    characteristic: Characteristic | null,
  ) => {
    if (error) {
      console.log(error,"dskjdsnvj");
      return -1;
    } else if (!characteristic?.value) {
      console.log('No Data was recieved');
      return -1;
    }

    const rawData = atob(characteristic.value);
    console.log(rawData,"dhndvbhradhe",characteristic.value);
    
    let innerHeartRate: number = -1;

    const firstBitValue: number = Number(rawData) & 0x01;

    if (firstBitValue === 0) {
      innerHeartRate = rawData[1].charCodeAt(0);
    } else {
      innerHeartRate =
        Number(rawData[1].charCodeAt(0) << 8) +
        Number(rawData[2].charCodeAt(2));
    }

    setHeartRate(innerHeartRate);
  };

  const startStreamingData = async (device: Device) => {
    if (device) {
      device.monitorCharacteristicForService(
        HEART_RATE_UUID,
        HEART_RATE_CHARACTERISTIC,
        (error, characteristic) => onHeartRateUpdate(error, characteristic),
      );
    } else {
      console.log('No Device Connected');
    }
  };


  const sendToDevice = async (jsonData: any) => {
    try {
      console.log(jsonData);
      
      if (connectedDevice) {
        const serviceUUID = HEART_RATE_UUID; // Replace with your service UUID
        const characteristicUUID = HEART_RATE_CHARACTERISTIC1; // Replace with your characteristic UUID
        // const jsonString = JSON.stringify(jsonData);

        const jsonString = btoa(jsonData);
        await bleManager.writeCharacteristicWithResponseForDevice(
          connectedDevice.id,
          serviceUUID,
          characteristicUUID,
          jsonString,
        );
        console.log('Data sent successfully:', jsonString);
        bleManager.cancelDeviceConnection(connectedDevice.id);
        setConnectedDevice(null);
        await AsyncStorage.removeItem('DevicesConnected')
      } else {
        console.log('No device connected.');
      }
    } catch (error) {
      console.error('Error sending data:', error);
    }
  };
  
  return {
    scanForPeripherals,
    requestPermissions,
    connectToDevice,
    sendToDevice,
    allDevices,
    connectedDevice,
    disconnectFromDevice,
    heartRate,   
     isModalVisible1,
    setIsModalVisible1,
  };
}

export default useBLE;