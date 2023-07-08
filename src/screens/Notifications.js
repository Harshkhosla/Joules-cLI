import React, { useState } from 'react';
import { View, ImageBackground, TouchableOpacity, StyleSheet, Dimensions, Image } from 'react-native';
import close1 from '../assets/f11.png';
import close from '../assets/close.png';
import { Avatar, Card, IconButton, Text } from 'react-native-paper';
import Button from '../components/Button';

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

const Notifications = ({ navigation }) => {
 
  return (
    <>
    <Text style={styles.title}>Notifications</Text>
        <View style={styles.container}>
    
        {/* <Card.Title
          title="Card Title"
          subtitle="Card Subtitle"
          left={(props) => <Avatar.Icon {...props} icon="folder" />}
          right={(props) => <IconButton {...props} icon="dots-vertical" />}
        /> */}
   
       
     

      {/* <TouchableOpacity style={styles.addButton} >
        <View style={styles.iconContainer}>
          <Image source={close} style={styles.icon} />
        </View>
      </TouchableOpacity> */}
    </View>
    </>
  );
};

const deviceWidth = Dimensions.get('window').width;
const deviceHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    height: deviceHeight,
    alignItems: 'center',
    justifyContent: 'center',
  },
  addButton: {
    position: 'absolute',
    bottom: screenHeight * 0.192,
    // width: deviceWidth * 0.38,  THIS IS FOR ADD button
  },
  iconContainer: {
    width: deviceWidth * 0.18,
    height: deviceWidth * 0.18,
    borderRadius: deviceWidth * 0.15,
    backgroundColor: '#F2F2F2',
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    width: '30%',
    height: '30%',
    resizeMode: 'contain',
  },
  backgroundImage: {
    width: screenWidth * 0.861,
    height: screenHeight * 0.56,
    marginTop: screenHeight * -0.302,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: -0,
    textAlign: 'center',
    backgroundColor:"green"
  },
});

export default Notifications;
