import { initializeApp, getApp, getApps } from '@react-native-firebase/app';

const firebaseConfig = {
  apiKey: 'AIzaSyAN7nqxM_uxsbuCmVO6PbaO44QxC85ewTA',
  authDomain: 'sylvan-epoch-414511.firebaseapp.com',
  databaseURL: 'https://sylvan-epoch-414511.firebaseio.com',
  projectId: 'sylvan-epoch-414511',
  storageBucket: 'sylvan-epoch-414511.appspot.com',
  messagingSenderId: '156987578910',
  appId: '1:156987578910:android:eb43ee753f55cf064e6c0f',
}

// if (!firebase.apps.length) {
//   firebase.initializeApp(firebaseConfig)
// console.log("in firebase ");
// }
export const initializeFirebase = async () => {
  try {
    if (getApps().length === 0) {
      initializeApp(firebaseConfig);
      console.log('Firebase initialized successfully');
    } else {
      console.log('Firebase app already initialized');
    }
    return true;
  } catch (error) {
    console.error('Firebase initialization error:', error.message);
    return false;
  }
};


