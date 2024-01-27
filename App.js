import React from 'react'
import { Provider } from 'react-native-paper'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import { theme } from './src/core/theme'
import { Store } from './src/Redux/Store'
import { Provider as Sample } from 'react-redux'
import {
  StartScreen,
  LoginScreen,
  RegisterScreen,
  ResetPasswordScreen,
  Dashboard,
  HomePage,
  Load,
  Eligible,
  Car,
  House,
  Date,
  Wifi,
  Home,
  Flat,
  UserDetails,
  Test,
  Datainput,
  Clamp,
  Navbar,
  EditProfileScreen,
  UserProfile,
  AddCharger,
  Notifications,
  ChargerSettings,
  Graphs,
} from './src/screens'
import Splash from './src/screens/Splash'
import SceduleDate from './src/screens/SceduleDate'
import Toast from 'react-native-toast-message'
import Questionnaire from './src/screens/Questionnaire'
import QuesAddVhicle from './src/screens/QuesAddVhicle'
import QuesLive from './src/screens/QuesLive'
import QuesVecDetails from './src/screens/QuesVecDetails'
import Welcomepage from './src/screens/Welcomepage'
import SignIn from './src/screens/SignIn'

const Stack = createStackNavigator()

export default function App() {
  return (
    // ------------------redux provider -------------
    <Sample store={Store}>
      {/*------------ paper provider-------------- */}
      <Provider theme={theme}>
        <NavigationContainer>
          <Stack.Navigator
            initialRouteName="StartScreen"
            screenOptions={{
              headerShown: false,
            }}
          >
            <Stack.Screen
              options={{ headerShown: false }}
              name="Splash"
              component={Splash}
            />
            {/* <Stack.Screen name="StartScreen" component={StartScreen} /> */}
            <Stack.Screen name="RegisterScreen" component={RegisterScreen} />

            <Stack.Screen name="SignIn" component={SignIn} />
            <Stack.Screen name="Welcomepage" component={Welcomepage} />

            <Stack.Screen name="LoginScreen" component={LoginScreen} />
            <Stack.Screen name="Dashboard" component={Dashboard} />
            <Stack.Screen
              name="ResetPasswordScreen"
              component={ResetPasswordScreen}
            />
            <Stack.Screen name="HomePage" component={HomePage} />
            <Stack.Screen name="Load" component={Load} />
            <Stack.Screen name="Eligible" component={Eligible} />
            <Stack.Screen name="Car" component={Car} />
            <Stack.Screen name="House" component={House} />
            <Stack.Screen name="Date" component={Date} />
            <Stack.Screen name="Home" component={Home} />
            <Stack.Screen name="Questionnaire" component={Questionnaire} />
            <Stack.Screen name="QuesAddVhicle" component={QuesAddVhicle} />
            <Stack.Screen name="QuesLive" component={QuesLive} />
            <Stack.Screen name="QuesVecDetails" component={QuesVecDetails} />

            <Stack.Screen name="Wifi" component={Wifi} />
            <Stack.Screen name="Flat" component={Flat} />
            <Stack.Screen name="SceduleDate" component={SceduleDate} />
            <Stack.Screen name="UserDetails" component={UserDetails} />
            <Stack.Screen name="Test" component={Test} />
            <Stack.Screen name="Datainput" component={Datainput} />
            <Stack.Screen name="Clamp" component={Clamp} />
            <Stack.Screen name="Navbar" component={Navbar} />
            {/* <Stack.Screen name="Graphs" component={Graphs} /> */}
            <Stack.Screen name="UserProfile" component={UserProfile} />
            <Stack.Screen
              name="EditProfileScreen"
              component={EditProfileScreen}
            />
            <Stack.Screen name="AddCharger" component={AddCharger} />
            <Stack.Screen name="Notifications" component={Notifications} />
            <Stack.Screen name="ChargerSettings" component={ChargerSettings} />
          </Stack.Navigator>
          {/* <Toast ref={(ref) => Toast.setRef(ref)} /> */}
        </NavigationContainer>
      </Provider>
    </Sample>
  )
}
