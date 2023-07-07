// import { StatusBar } from 'expo-status-bar';
import React, { useRef, useState } from 'react';
import { Animated, Image, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import profile from '../assets/profile.png';

import home from '../assets/home.png';
import search from '../assets/search.png';
import notifications from '../assets/bell.png';
import settings from '../assets/settings.png';
import logout from '../assets/logout.png';
// Menu
import menu from '../assets/menu.png';
import close from '../assets/close.png';

// Photo
import photo from '../assets/photo.jpg';
import Home from './Home';
import { useNavigation } from '@react-navigation/native'; // import the useNavigation hook
import { AddCharger, Clamp, EditProfileScreen, Load, UserDetails } from '.';

export default function Navbar({ navigation }) {
    // const navigation = useNavigation()
    const [currentTab, setCurrentTab] = useState("Home");
     // To get the curretn Status of menu ...
  const [showMenu, setShowMenu] = useState(false);

  // Animated Properties...

  const offsetValue = useRef(new Animated.Value(0)).current;
  // Scale Intially must be One...
  const scaleValue = useRef(new Animated.Value(1)).current;
  const closeButtonOffset = useRef(new Animated.Value(0)).current;
  const navigateToHome = () => {
    // setCurrentTab("Home");
    navigation.navigate("UserProfile"); // navigate to the Home screen
  };
    return (
        <SafeAreaView style={styles.container}>
            <View style={{ justifyContent: 'flex-start', padding: 15 }}>
                <Image source={profile} style={{
                    width: 60,
                    height: 60,
                    borderRadius: 10,
                    marginTop: 8
                }}></Image>
                <Text style={{
          fontSize: 20,
          fontWeight: 'bold',
          color: 'white',
          marginTop: 20
        }}>Harsh Khosla</Text>

        <TouchableOpacity onPress={navigateToHome}>
          <Text style={{
            marginTop: 6,
            color: 'white'
          }}>View Profile</Text>
        </TouchableOpacity>
        <View style={{ flexGrow: 1, marginTop: 50 }}>
          {
            // Tab Bar Buttons....
          }

          {TabButton(currentTab, setCurrentTab, "Home", home,navigation)}
          {TabButton(currentTab, setCurrentTab, "My Devices", notifications,navigation)}
          {TabButton(currentTab, setCurrentTab, "Notifications", search,navigation)}
          {TabButton(currentTab, setCurrentTab, "Charger Settings", settings,navigation)}
          {TabButton(currentTab, setCurrentTab, "Support", settings,navigation)}

        </View>
        <View>
          {TabButton(currentTab, setCurrentTab, "LogOut", logout)}
        </View>
            </View>
            {
        // Over lay View...
      }

      <Animated.View style={{
        flexGrow: 1,
        backgroundColor: 'white',
        position: 'absolute',
        // These are for other pages 
        // top: 0,
        // paddingVertical: 20,
        // bottom: 0,
        // These are for the home page  
        top: -10,
        paddingVertical: 25,
        left: 0,
        right: 0,
        paddingHorizontal: 15,
        borderRadius: showMenu ? 15 : 0,
        // Transforming View...
        transform: [
          { scale: scaleValue },
          { translateX: offsetValue }
        ]
      }}>

        {
          // Menu Button...
        }

        <Animated.View style={{
          transform: [{
            translateY: closeButtonOffset
          }]
        }}>
          <TouchableOpacity onPress={() => {
            // Do Actions Here....
            // Scaling the view...
            Animated.timing(scaleValue, {
              toValue: showMenu ? 1 : 0.89,
              duration: 300,
              useNativeDriver: true
            })
              .start()

            Animated.timing(offsetValue, {
              // YOur Random Value...
              toValue: showMenu ? 0 : 230,
              duration: 300,
              useNativeDriver: true
            })
              .start()

            Animated.timing(closeButtonOffset, {
              // YOur Random Value...
              toValue: !showMenu ? -30 : 0,
              duration: 300,
              useNativeDriver: true
            })
              .start()

            setShowMenu(!showMenu);
          }}>

            <Image source={showMenu ? close : menu} style={{
              width: 20,
              height: 20,
              tintColor: 'black',
              marginTop: 40,

            }}></Image>

          </TouchableOpacity>
{currentTab=="Home"?<Home navigation={navigation}/>:console.log("hello")}
{/* {currentTab=="Search"?<EditProfileScreen/>:console.log("hello")} */}
 {currentTab=="My Devices"?<AddCharger navigation={navigation}/>:console.log("hello")} 
          
          {/* <Home></Home> */}

       

        </Animated.View>

      </Animated.View>
        </SafeAreaView>
    )
}

const TabButton = ( currentTab, setCurrentTab, title, image) => {
  const navigation = useNavigation()
    return (
  
      <TouchableOpacity onPress={() => {
        if (title == "LogOut") {
          // Do your Stuff...
          localStorage.removeItem("Authtoken");
          navigation.navigate("LoginScreen");
        } else {
          setCurrentTab(title)
        }
      }}>
        <View style={{
          flexDirection: "row",
          alignItems: 'center',
          paddingVertical: 8,
          backgroundColor: currentTab == title ? 'white' : 'transparent',
          paddingLeft: 13,
          paddingRight: 35,
          borderRadius: 8,
          marginTop: 15
        }}>
  
          <Image source={image} style={{
            width: 25, height: 25,
            tintColor: currentTab == title ? "#5359D1" : "white"
          }}></Image>
  
          <Text style={{
            fontSize: 15,
            fontWeight: 'bold',
            paddingLeft: 15,
            color: currentTab == title ? "#5359D1" : "white"
          }}>{title}</Text>
  
        </View>
      </TouchableOpacity>
    );
  }

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'rgba(17, 134, 21, 0.7)',
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
    },
});