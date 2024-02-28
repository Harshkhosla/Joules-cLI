import 'react-native-gesture-handler'
import React from 'react'
import { Provider, Text } from 'react-native-paper'
import { createDrawerNavigator } from '@react-navigation/drawer'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import { theme } from './src/core/theme'
import { Store } from './src/Redux/Store'
import { Provider as Sample } from 'react-redux'
import Splash from './src/screens/Splash'
import SceduleDate from './src/screens/SceduleDate'
import Toast from 'react-native-toast-message'
import Questionnaire from './src/screens/Questionnaire'
import QuesAddVhicle from './src/screens/QuesAddVhicle'
import QuesLive from './src/screens/QuesLive'
import QuesVecDetails from './src/screens/QuesVecDetails'
import Quesimg from './src/screens/Quesimg'
import StartScreen from './src/screens/StartScreen'
import RegisterScreen from './src/screens/RegisterScreen'
import LoginScreen from './src/screens/LoginScreen'
import Dashboard from './src/screens/Dashboard'
import ResetPasswordScreen from './src/screens/ResetPasswordScreen'
import HomePage from './src/screens/HomePage'
import Load from './src/screens/Load'
import Eligible from './src/screens/Eligible'
import Car from './src/screens/Car'
import Date from './src/screens/Date'
import Home from './src/screens/Home'
import PublicScanner from './src/screens/PublicScanner'
import Wifi from './src/screens/Wifi'
import Flat from './src/screens/Flat'
import UserDetails from './src/screens/UserDetails'
import Test from './src/screens/Test'
import Datainput from './src/screens/Datainput'
import Clamp from './src/screens/Clamp'
import Navbar from './src/screens/Navbar'
import House from './src/screens/House'
import Meter from './src/screens/Graphs'
import UserProfile from './src/screens/UserProfile'
import EditProfileScreen from './src/screens/EditProfileScreen'
import AddCharger from './src/screens/AddCharger'
import Notifications from './src/screens/Notifications'
import ChargerSettings from './src/screens/ChargerSettings'
import LoginInput from './src/screens/LoginInput'
import SignIn from './src/screens/SignIn'
import Charger_Selection from './src/screens/Charger_Selection'
import Newhome from './src/screens/Newhome'
import Welcomepage from './src/screens/Welcomepage'
import PublicHomePageFinal from './src/screens/PublicHomePageFinal'
import Timer from './radhe'
import ModalRadhe from './radheModal'
import ChartRadhe from './src/screens/Chart'
import WifiSSID from './src/screens/WifiSSID'
import Customdrawer from './Customdrawer'
import Charging_History from './src/screens/Charging_History'
import MobileNoGetOtp from './src/screens/MobileNoGetOtp'
import MobileVerifyOtp from './src/screens/MobailVerifyOtp'
import MessagePage from './src/screens/MessagePage'
import HomeCharging_Homepage from './src/screens/HomeCharging_Homepage'
import Checker from './src/screens/Checker'
import ChargingAnimation from './src/screens/ChargingAnimation'

const Stack = createStackNavigator()

const StackNavigator = () => {
  return (
    <Stack.Navigator
      // initialRouteName="StartScreen"
      screenOptions={{
        headerShown: false,
      }}
    >
      {/* <Stack.Screen
              options={{ headerShown: false }}
              name="Splash"
              component={Splash}
            /> */}

      {/* <Stack.Screen name="animation" component={ChargingAnimation} /> */}
      {/* 
            <Stack.Screen name='wifiold' component={WifiSSID}/>
            <Stack.Screen name='Chart' component={ChartRadhe}/> */}
      {/* <Stack.Screen name="StartScreen" component={StartScreen} /> */}
      {/* <Stack.Screen name="LoginScreen" component={LoginScreen} /> */}
      {/* <Stack.Screen name="RegisterScreen" component={RegisterScreen} /> */}
      {/* <Stack.Screen name="SignIn" component={SignIn} /> */}
      {/* <Stack.Screen name="mobailgetotp" component={MobileNoGetOtp} />
      <Stack.Screen name="mobailverifyotp" component={MobileVerifyOtp} /> */}

      {/* <Stack.Screen name="Welcomepage" component={Welcomepage} />
      <Stack.Screen name="Questionnaire" component={Questionnaire} />
      <Stack.Screen name="Quesimg" component={Quesimg} />
      <Stack.Screen name="QuesAddVhicle" component={QuesAddVhicle} />
      <Stack.Screen name="QuesLive" component={QuesLive} />
      <Stack.Screen name="QuesVecDetails" component={QuesVecDetails} />
      <Stack.Screen name="Message" component={MessagePage} />
      <Stack.Screen
        name="HomechargingHomepage"
        component={HomeCharging_Homepage}
      /> */}

      <Stack.Screen name="finalhomepage" component={PublicHomePageFinal} />
      {/* <Stack.Screen name="countDown" component={CountdownTimer} /> */}

      <Stack.Screen name="chargerSelection" component={Charger_Selection} />
      <Stack.Screen name="Newhome" component={Newhome} />
      <Stack.Screen name="PublicScanner" component={PublicScanner} />
      <Stack.Screen name="chargerHistory" component={Charging_History} />

      {/* 
      <Stack.Screen name="Load" component={Load} />
      <Stack.Screen name="Eligible" component={Eligible} />
      <Stack.Screen name="Car" component={Car} />
      <Stack.Screen name="House" component={House} />
      <Stack.Screen name="Date" component={Date} />
      <Stack.Screen name="Home" component={Home} /> */}
      {/* <Stack.Screen name="HomePage" component={HomePage} /> */}
      {/* <Stack.Screen name="Dashboard" component={Dashboard} /> */}
      {/* <Stack.Screen
              name="ResetPasswordScreen"
              component={ResetPasswordScreen} 
            /> */}
      <Stack.Screen name="Wifi" component={Wifi} />
      <Stack.Screen name="Flat" component={Flat} />
      <Stack.Screen name="SceduleDate" component={SceduleDate} />
      <Stack.Screen name="UserDetails" component={UserDetails} />
      <Stack.Screen name="Test" component={Test} />
      <Stack.Screen name="Datainput" component={Datainput} />
      <Stack.Screen name="Clamp" component={Clamp} />
      {/* <Stack.Screen name="Navbar" component={Navbar} /> */}
      {/* <Stack.Screen name="Graphs" component={Meter} /> */}
      <Stack.Screen name="UserProfile" component={UserProfile} />
      <Stack.Screen name="EditProfileScreen" component={EditProfileScreen} />
      <Stack.Screen name="AddCharger" component={AddCharger} />
      <Stack.Screen name="Notifications" component={Notifications} />
      <Stack.Screen name="ChargerSettings" component={ChargerSettings} />
    </Stack.Navigator>
  )
}

const Drawer = createDrawerNavigator()

function MyDrawer() {
  return (
    <Drawer.Navigator
      screenOptions={{
        headerShown: false,
      }}
      drawerContent={(props) => <Customdrawer {...props} />}
    >
      <Drawer.Screen name="first" component={StackNavigator} />
    </Drawer.Navigator>
  )
}

export default function App() {
  return (
    <Sample store={Store}>
      <Provider theme={theme}>
        <NavigationContainer>
          <MyDrawer />
          <Toast />
          {/* <Toast ref={(ref) => Toast.setRef(ref)} /> */}
        </NavigationContainer>
      </Provider>
    </Sample>
  )
}
