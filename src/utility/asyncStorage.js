import AsyncStorage from '@react-native-async-storage/async-storage';
import messaging from '@react-native-firebase/messaging';
import { initializeFirebase } from '../../firebase';
import PushNotification from 'react-native-push-notification';
import { Platform, Linking } from 'react-native';

const fetchDataAsyncStorageData = async () => {
  try {
    const storedData = await AsyncStorage.getItem('pid');
    const Appmid = await AsyncStorage.getItem('mid');
    const Authtoken = await AsyncStorage.getItem('Authtoken');
   
    return { storedData,Appmid ,Authtoken};
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


const getUserDeviceToken = async () => {
  try {
    // Initialize Firebase app and wait for it to complete
    const isFirebaseInitialized = await initializeFirebase();

    if (!isFirebaseInitialized) {
      throw new Error('Firebase initialization failed');
    }

    // Register the device for remote messages
    await messaging().registerDeviceForRemoteMessages();

    // Get the FCM token
    const token = await messaging().getToken();
    console.log('FCM token:', token);

    // Return the token if it exists
    return token ? token : '';
  } catch (error) {
    console.log('FCM error:', error.message);
    // Return an empty string in case of an error
    return '';
  }
};

// permission 
const configureNotifications = () => {
  try {
    // Configure push notifications
    PushNotification.configure({
      onNotification: function (notification) {
        console.log('NOTIFICATION:', notification);
      },
      requestPermissions: Platform.OS === 'ios',
    });

    // Create a notification channel for Android
    PushNotification.createChannel(
      {
        channelId: 'default-channel-id', // (required)
        channelName: 'Default channel', // (required)
      },
      (created) => console.log(`createChannel returned '${created}'`)
    );

    // Handle foreground messages
    const unsubscribeForeground = messaging().onMessage(async remoteMessage => {
      try {
        console.log("remoteMessage", remoteMessage);
        PushNotification.localNotification({
          channelId: 'default-channel-id',
          title: remoteMessage.notification?.title,
          message: remoteMessage.notification?.body,
        });
      } catch (error) {
        console.error('Error handling foreground message:', error);
      }
    });

    // Handle background messages
    messaging().setBackgroundMessageHandler(async remoteMessage => {
      try {
        console.log("remoteMessageremoteMessage", remoteMessage);
        console.log('Message handled in the background!', remoteMessage);
        PushNotification.localNotification({
          channelId: 'default-channel-id',
          title: remoteMessage.notification?.title,
          message: remoteMessage.notification?.body,
        });
      } catch (error) {
        console.error('Error handling background message:', error);
      }
    });

    // Cleanup on unmount
    if (module.hot) {
      module.hot.accept();
      module.hot.dispose(() => {
        unsubscribeForeground();
      });
    }
  } catch (error) {
    console.error('Error configuring notifications:', error);
  }
};



// send notification
const handleSendNotification = (title, message) => {
  try {
    // Send local notification
    PushNotification.localNotification({
      channelId: 'default-channel-id', 
      channelName: 'Default channel', 
      soundName: 'default', 
      vibrate: true,
      title: title || 'Button Clicked',
      message: message || 'Notification triggered by button click',
    });
    
    console.log('Notification sent successfully');
  } catch (error) {
    console.error('Error sending notification:', error);
  }
};

// navigate to play store


const redirectToApp = () => {
  const packageName = 'com.Jouls';
  
  let appUrl;
  if (Platform.OS === 'ios') {
    // iOS app store URL
    appUrl = `https://apps.apple.com/app/id<YOUR_APP_ID>`;
  } else if (Platform.OS === 'android') {
    // Android Play Store URL
    appUrl = `https://play.google.com/store/apps/details?id=${packageName}`;
  } else {
    // If platform is neither iOS nor Android, return an error or handle accordingly
    console.error('Unsupported platform');
    return;
  }

  // Open the URL
  Linking.openURL(appUrl).catch((err) =>
    console.error('An error occurred', err)
  );
}



const ShowMessageModalData = [
  { subheading: "Connecting", message: "Don't worry your charging session won't get hurt" },
  { subheading: "Check the Charging WiFi", message: "Don't worry your charging session won't get hurt" },
  { subheading: "It Seems the Charger is Disconnected", message: "Don't worry your charging session won't get hurt" },
  { subheading: "Charging is Interrupted", message: "Please check your charging cable and connection" },
  { subheading: "Charger Connected", message: "Please check your charging cable and connection" }
];

export {fetchDataAsyncStorageData,calculateTimeDifferenceStartTimeEndTime,getUserDeviceToken,configureNotifications,handleSendNotification,ShowMessageModalData,redirectToApp}