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

function calculateTimeDifferenceStartTimeEndTime(startTime, endTime) {
  // Ensure both startTime and endTime are provided
  if (!startTime || !endTime) {
    return "0 sec";
  }

  // Parse the start and end times
  const [startHours, startMinutes, startSeconds] = startTime.split(':').map(Number);
  const [endHours, endMinutes, endSeconds] = endTime.split(':').map(Number);

  // Create Date objects for both times on the same arbitrary date
  const startDate = new Date(2024, 0, 1, startHours, startMinutes, startSeconds);
  const endDate = new Date(2024, 0, 1, endHours, endMinutes, endSeconds);

  // If start time is greater than or equal to end time, return "0 sec"
  if (startDate >= endDate) {
    return "0 sec";
  }

  // Calculate the difference in milliseconds
  const diffMilliseconds = endDate - startDate;

  // Convert the difference to hours, minutes, and seconds
  const diffSeconds = Math.floor((diffMilliseconds / 1000) % 60);
  const diffMinutes = Math.floor((diffMilliseconds / (1000 * 60)) % 60);
  const diffHours = Math.floor(diffMilliseconds / (1000 * 60 * 60));

  // Construct the time difference string
  let timeDifference = "";

  if (diffHours > 0) {
    timeDifference += `${diffHours} hr `;
  }

  if (diffMinutes > 0) {
    timeDifference += `${diffMinutes} min `;
  }

  if (diffSeconds > 0) {
    timeDifference += `${diffSeconds} sec`;
  }

  // If both hours, minutes, and seconds are 0, return "0 sec"
  if (diffHours === 0 && diffMinutes === 0 && diffSeconds === 0) {
    return "0 sec";
  }

  return timeDifference.trim();
}


export {fetchDataAsyncStorageData,calculateTimeDifferenceStartTimeEndTime}