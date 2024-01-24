// import { StatusBar } from 'expo-status-bar';
import React, { useRef, useState } from 'react';
import { Animated, Image, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import profile from '../assets/profile.png';
import { useDispatch, useSelector } from 'react-redux';
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
import { AddCharger, ChargerSettings, Clamp, EditProfileScreen, Load, Notifications, RegisterScreen, UserDetails } from '.';
import LoginScreen from './RegisterScreen';

export default function Navbar({ navigation }) {
  const [currentTab, setCurrentTab] = useState("Home");
  // To get the current Status of the menu ...
  const [showMenu, setShowMenu] = useState(false);

  const UserData = useSelector(state => state?.userReducers?.Product);
  // console.log(UserData,"hera is every data");

  // Animated Properties...
  const offsetValue = useRef(new Animated.Value(0)).current;
  // Scale Intially must be One...
  const scaleValue = useRef(new Animated.Value(1)).current;
  const closeButtonOffset = useRef(new Animated.Value(0)).current;

  const hello = () => {
    console.log("hello");
    // Do Actions Here....
    // Scaling the view...
    Animated.timing(scaleValue, {
      toValue: showMenu ? 1 : 0.89,
      duration: 300,
      useNativeDriver: true
    }).start();

    Animated.timing(offsetValue, {
      toValue: showMenu ? 0 : 230, // Your Random Value...
      duration: 300,
      useNativeDriver: true
    }).start();

    Animated.timing(closeButtonOffset, {
      toValue: !showMenu ? -30 : 0, // Your Random Value...
      duration: 300,
      useNativeDriver: true
    }).start();

    setShowMenu(!showMenu);
  };

  const navigateToHome = () => {
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
        }} />
        <Text style={{
          fontSize: 20,
          fontWeight: 'bold',
          color: 'white',
          marginTop: 20
        }}>{UserData==""?"Name":UserData?.name}</Text>

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
          <TabButton currentTab={currentTab} setCurrentTab={setCurrentTab} title="Home" image={home} navigation={navigation} onPress={hello} />
          <TabButton currentTab={currentTab} setCurrentTab={setCurrentTab} title="My Devices" image={notifications} navigation={navigation} onPress={hello} />
          <TabButton currentTab={currentTab} setCurrentTab={setCurrentTab} title="Notifications" image={search} navigation={navigation} onPress={hello} />
          <TabButton currentTab={currentTab} setCurrentTab={setCurrentTab} title="Charger Settings" image={settings} navigation={navigation}  onPress={hello} />
          <TabButton currentTab={currentTab} setCurrentTab={setCurrentTab} title="Support" image={settings} navigation={navigation} onPress={hello} />
          <TabButton currentTab={currentTab} setCurrentTab={setCurrentTab} title="Analytics" image={settings} navigation={navigation} onPress={hello} />
        </View>
        <View>
          <TabButton currentTab={currentTab} setCurrentTab={setCurrentTab} title="LogOut" image={logout} navigation={navigation} />
        </View>
      </View>
      {
        // Overlay View...
      }
      <Animated.View style={{
        backgroundColor: 'white',
        position: 'absolute',
        top: -10,
        paddingVertical: 25,
        left: 0,
        right: 0,
        paddingHorizontal: 15,
        borderRadius: showMenu ? 15 : 0,
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
          }],
          // justifyContent: 'flex-end'
        }}>
          <TouchableOpacity onPress={hello}>
            <Image source={showMenu ? close : menu} style={{
              width: 20,
              height: 20,
              tintColor: 'black',
              marginTop: 40,
            }} />
          </TouchableOpacity>
          {currentTab === "Home" ? <Home navigation={navigation} /> : null}
          {currentTab === "My Devices" ? <AddCharger navigation={navigation} /> : null}
          {currentTab === "Charger Settings" ? <ChargerSettings navigation={navigation} /> : null}
          {currentTab === "Notifications" ? <Notifications navigation={navigation} /> : null}
        </Animated.View>
      </Animated.View>
    </SafeAreaView>
  );
}

const TabButton = ({ currentTab, setCurrentTab, title, image, navigation, onPress }) => {
  return (
    <TouchableOpacity onPress={() => {
      if (title === "LogOut") {
        localStorage.removeItem("Authtoken");
        navigation.navigate("LoginScreen");
      } else {
        setCurrentTab(title);
        if (onPress) {
          onPress(); // Call the onPress function if it exists
        }
      }
    }}>
      <View style={{
        flexDirection: "row",
        alignItems: 'center',
        paddingVertical: 8,
        backgroundColor: currentTab === title ? 'white' : 'transparent',
        paddingLeft: 13,
        paddingRight: 35,
        borderRadius: 8,
        marginTop: 15
      }}>
        <Image source={image} style={{
          width: 25,
          height: 25,
          tintColor: currentTab === title ? "#5359D1" : "white"
        }} />
        <Text style={{
          fontSize: 15,
          fontWeight: 'bold',
          paddingLeft: 15,
          color: currentTab === title ? "#5359D1" : "white"
        }}>{title}</Text>
      </View>
    </TouchableOpacity>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgba(17, 134, 21, 0.7)',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
  },
});
