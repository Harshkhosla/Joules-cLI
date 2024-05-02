import AsyncStorage from '@react-native-async-storage/async-storage';

const fetchDataAsyncStorageData = async () => {
  try {
    const storedData = await AsyncStorage.getItem('pid');
    const ChargingStartedValue = await AsyncStorage.getItem('ChargingStarted');
    const Appmid = await AsyncStorage.getItem('mid');
    const Authtoken = await AsyncStorage.getItem('Authtoken');
    console.log('storedDataradhe', storedData);
    console.log('storedDataradhe', Appmid);
    console.log('storedDataradhe', Authtoken);
    console.log('ChargingStartedValue', ChargingStartedValue);
    return { storedData, ChargingStartedValue,Appmid ,Authtoken};
  } catch (error) {
    console.error('Error fetching data:', error);
    // throw error; // Re-throw the error to handle it outside of this function
  }
};



const timeToSeconds = (timeValue) => {
  // Extract numeric value from the time string
  const numericValue = parseInt(timeValue)
  // Check if the time string contains "hr"
  if (timeValue?.includes('hr')) {
    // Convert hours to seconds (1 hour = 3600 seconds)
    return numericValue * 3600
  } else if (timeValue?.includes('min')) {
    // Convert minutes to seconds (1 minute = 60 seconds)
    return numericValue * 60
  } else {
    // If no time unit is specified, assume seconds
    return numericValue
  }
}

export {fetchDataAsyncStorageData}