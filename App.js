import React from 'react'
import { Provider, Text } from 'react-native-paper'
import { NavigationContainer } from '@react-navigation/native'
import { createDrawerNavigator } from '@react-navigation/drawer'
import { createStackNavigator } from '@react-navigation/stack'
import { theme } from './src/core/theme'
import { Store } from './src/Redux/Store'
import { Provider as Sample } from 'react-redux'
import Splash from './src/screens/Splash'
import SceduleDate from './src/screens/SceduleDate'
import Toast from 'react-native-toast-message'
import Questionnaire from './src/screens/Home_Questionnair_Flow/Questionnaire'
import QuesAddVhicle from './src/screens/Home_Questionnair_Flow/QuesAddVhicle'
import QuesLive from './src/screens/Home_Questionnair_Flow/QuesLive'
import QuesVecDetails from './src/screens/Home_Questionnair_Flow/QuesVecDetails'
import Quesimg from './src/screens/Home_Questionnair_Flow/Quesimg'
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
import PublicScanner from './src/screens/Public_Charging/PublicScanner'
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
import LoginInput from './src/screens/Auth_App/LoginInput'
import SignIn from './src/screens/Auth_App/SignIn'
import Charger_Selection from './src/screens/Charger_Selection'
import Newhome from './src/screens/Public_Charging/Newhome'
import Welcomepage from './src/screens/Welcomepage'
import PublicHomePageFinal from './src/screens/Public_Charging/PublicHomePageFinal'
import Timer from './radhe'
import ModalRadhe from './src/screens/Public_Charging/radheModal'
import ChartRadhe from './src/screens/Chart'
import WifiSSID from './src/screens/WifiSSID'
import MessagePage from './src/screens/Home_Questionnair_Flow/MessagePage'
import MobileNoGetOtp from './src/screens/Auth_App/MobileNoGetOtp'
// import MobileVerifyOtp from './src/screens/Auth_App/MobileVerifyOtp'
import Charging_History from './src/screens/Charging_History'
import HomeCharging_Homepage from './src/screens/Home_Charging/HomeCharging_Homepage'
import ChargingAnimation from './src/screens/ChargingAnimation'
import Customdrawer from './Customdrawer'
import Support from './src/components/Support'
import HomeScreen from './src/components/Support'
import { TouchableOpacity, View } from 'react-native'

const Stack = createStackNavigator()

const Drawer = createDrawerNavigator()


export default function App() {
  return (

    <Sample store={Store}>
     
      <Provider theme={theme}>
        <NavigationContainer>
          <Stack.Navigator
            initialRouteName="StartScreen"
            screenOptions={{
              headerShown: false,
            }}
          >
            <Stack.Screen name="SignIn" component={SignIn} />
            <Stack.Screen name="chargerSelection" component={Charger_Selection}/>
            <Stack.Screen name='Newhome' component={Newhome}/> 
            <Stack.Screen name="support" component={Support} />
    <Stack.Screen name='Charging_History' component={Charging_History}/>
      <Stack.Screen name='finalhomepage' component={PublicHomePageFinal}/>
            <Stack.Screen name="MessagePage" component={MessagePage} />
            <Stack.Screen name="Questionnaire" component={Questionnaire} />
            <Stack.Screen name="QuesLive" component={QuesLive} />
            <Stack.Screen name="QuesVecDetails" component={QuesVecDetails} />
            {/* <Stack.Screen name="Quesimg" component={Quesimg} /> */}
            {/* <Stack.Screen name="Dashboard" component={Dashboard} />  */}
            {/* <Stack.Screen
              name="ResetPasswordScreen"
              component={ResetPasswordScreen} 
            /> */}
            {/* <Stack.Screen name='countDown' component={CountdownTimer}/> */}
            <Stack.Screen name='Welcomepage' component={Welcomepage}/>
            <Stack.Screen name="HomeCharging_Homepage" component={HomeCharging_Homepage}/>
            <Stack.Screen name="Graphs" component={Meter} />
            {/* <Stack.Screen name="HomePage" component={HomePage} /> */}
            <Stack.Screen name="PublicScanner" component={PublicScanner} />
            <Stack.Screen name="Load" component={Load} />
            <Stack.Screen name="Eligible" component={Eligible} />
            <Stack.Screen name="Car" component={Car} />
            <Stack.Screen name="House" component={House} />
            <Stack.Screen name="Date" component={Date} />
            <Stack.Screen name="Home" component={Home} /> 
            <Stack.Screen name="QuesAddVhicle" component={QuesAddVhicle} />
            <Stack.Screen name="Wifi" component={Wifi} />
            <Stack.Screen name="Flat" component={Flat} />
            <Stack.Screen name="SceduleDate" component={SceduleDate} />
            <Stack.Screen name="UserDetails" component={UserDetails} />
            <Stack.Screen name="Test" component={Test} />
            <Stack.Screen name="Datainput" component={Datainput} />
            <Stack.Screen name="Clamp" component={Clamp} />
            {/* <Stack.Screen name="Navbar" component={Navbar} /> */}
            <Stack.Screen name="UserProfile" component={UserProfile} />
            <Stack.Screen
              name="EditProfileScreen"
              component={EditProfileScreen}
            />
            <Stack.Screen name="AddCharger" component={AddCharger} />
            <Stack.Screen name="Notifications" component={Notifications} />
            <Stack.Screen name="ChargerSettings" component={ChargerSettings} />
            <Stack.Screen
          name="Support"
          component={HomeScreen}
          options={{
            title: 'Chat App',
            headerLeft: () => (
              <TouchableOpacity onPress={() => alert('Go back')}>
                {/* You can replace this arrow with your own back icon */}
                <Text>{'<'}</Text>
              </TouchableOpacity>
            ),
            headerRight: () => (
              <View style={{ flexDirection: 'row', marginRight: 10 }}>
                <TouchableOpacity onPress={() => alert('Phone')}>
                  {/* You can replace this phone icon with your own icon */}
                  <Text>📞</Text>
                </TouchableOpacity>
                <TouchableOpacity style={{ marginLeft: 10 }} onPress={() => alert('WhatsApp')}>
                  {/* You can replace this WhatsApp icon with your own icon */}
                  <Text>Whatsapp</Text>
                </TouchableOpacity>
              </View>
            ),
          }}
        />
          </Stack.Navigator>
          {/* <Toast ref={(ref) => Toast.setRef(ref)} /> */}
          <Toast/>
        </NavigationContainer>
      </Provider>
    </Sample>
  )
}
