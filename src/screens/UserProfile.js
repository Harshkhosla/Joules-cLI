import React from 'react';
import {View, SafeAreaView,Image, StyleSheet} from 'react-native';
import {
  Avatar,
  Title,
  Caption,
  Text,
  
  TouchableRipple,
} from 'react-native-paper';
import Background from '../components/Background'
// import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import home from '../assets/home.png';
import search from '../assets/search.png';
import notifications from '../assets/bell.png';
import settings from '../assets/settings.png';
import logout from '../assets/logout.png';
// Menu
import menu from '../assets/menu.png';
import close from '../assets/close.png';

import photo from '../assets/photo.jpg';
import { useDispatch, useSelector } from 'react-redux';



export default function UserProfile({ navigation }) { 
  const email = useSelector(state => state?.userReducers?.Product?.email)
  console.log(email);
const clicked=()=>{
  console.log("juhbu");
  navigation.navigate('EditProfileScreen');
}
  return (
    <SafeAreaView style={styles.container}>

    <View style={styles.userInfoSection}>
      <View style={{flexDirection: 'row', marginTop: 15}}>
        <Avatar.Image 
           source={photo}
          size={80}
        />
        <View style={{marginLeft: 20}}>
          <Title style={[styles.title, {
            marginTop:15,
            marginBottom: 5,
          }]}>John Doe</Title>
          <Caption style={styles.caption}>@j_doe</Caption>
        </View>
      </View>
    </View>

    <View style={styles.userInfoSection}>
      <View style={styles.row}>
        {/* <Icon name="map-marker-radius" color="#777777" size={20}/> */}
        <Text style={{color:"#777777", marginLeft: 20}}>Kolkata, India</Text>
      </View>
      <View style={styles.row}>
        {/* <Icon name="phone" color="#777777" size={20}/> */}
        <Text style={{color:"#777777", marginLeft: 20}}>+91-900000009</Text>
      </View>
      <View style={styles.row}>
      <Image source={notifications} style={{ tintColor: '#FF6347', width: 20, height: 20 }} size={20} />
        <Text style={{color:"#777777", marginLeft: 20}}>{email==""?"john_doe@email.com":email}</Text>
      </View>
    </View>

    <View style={styles.infoBoxWrapper}>
        <View style={[styles.infoBox, {
          borderRightColor: '#dddddd',
          borderRightWidth: 1
        }]}>
          <Title>₹140.50</Title>
          <Caption>Cost of Charging Saved</Caption>
        </View>
        <View style={styles.infoBox}>
          <Title>12</Title>
          <Caption>Charges</Caption>
        </View>
    </View>

    <View style={styles.menuWrapper}>
      <TouchableRipple onPress={clicked}>
        <View style={styles.menuItem}>
          {/* <Icon name="heart-outline" color="#FF6347" size={25}/> */}
          <Text style={styles.menuItemText}>Your Favorites</Text>
        </View>
      </TouchableRipple>
      <TouchableRipple onPress={()=>{}}>
        <View style={styles.menuItem}>
        <Image source={settings} style={{ tintColor: '#FF6347', width: 25, height: 25 }} size={25} />
          <Text style={styles.menuItemText}>Payment</Text>
        </View>
      </TouchableRipple>
      <TouchableRipple onPress={() => {}}>
        <View style={styles.menuItem}>
        <Image source={home} style={{ tintColor: '#FF6347', width: 25, height: 25 }} size={25} />
          <Text style={styles.menuItemText}>Tell Your Friends</Text>
        </View>
      </TouchableRipple>
      <TouchableRipple onPress={() => {}}>
        <View style={styles.menuItem}>
        <Image source={search} style={{ tintColor: '#FF6347', width: 25, height: 25 }} size={25} />
          <Text style={styles.menuItemText}>Support</Text>
        </View>
      </TouchableRipple>
      <TouchableRipple onPress={() => {}}>
        <View style={styles.menuItem}>
        <Image source={settings} style={{ tintColor: '#FF6347', width: 25, height: 25 }} size={25} />

          <Text style={styles.menuItemText}>Settings</Text>
        </View>
      </TouchableRipple>
    </View>
  </SafeAreaView>
  )
}



const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    userInfoSection: {
      paddingHorizontal: 30,
      marginBottom: 25,
    },
    title: {
      fontSize: 24,
      fontWeight: 'bold',
    },
    caption: {
      fontSize: 14,
      lineHeight: 14,
      fontWeight: '500',
    },
    row: {
      flexDirection: 'row',
      marginBottom: 10,
    },
    infoBoxWrapper: {
      borderBottomColor: '#dddddd',
      borderBottomWidth: 1,
      borderTopColor: '#dddddd',
      borderTopWidth: 1,
      flexDirection: 'row',
      height: 100,
    },
    infoBox: {
      width: '50%',
      alignItems: 'center',
      justifyContent: 'center',
    },
    menuWrapper: {
      marginTop: 10,
    },
    menuItem: {
      flexDirection: 'row',
      paddingVertical: 15,
      paddingHorizontal: 30,
    },
    menuItemText: {
      color: '#777777',
      marginLeft: 20,
      fontWeight: '600',
      fontSize: 16,
      lineHeight: 26,
    },
  });