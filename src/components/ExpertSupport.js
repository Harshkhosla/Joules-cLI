// HeaderWithArrow.js

import React from 'react';
import { View, Text, TouchableOpacity,Linking, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import SupportAndRfidHeader from './SupportAndAddRfidHeader';

const ExpertSupport = ({ navigation }) => {
    const Number="6367133688"
    const handlePhoneCall = () => {
        // Phone number jise call karna hai
        const phoneNumber = `tel:${Number}`;
    
        // Linking API ka istemal phone call karne ke liye
        Linking.openURL(phoneNumber);
      };
      const handleOpenWhatsApp = () => {
        // WhatsApp number
        const phoneNumber = `whatsapp://send?phone=${Number}`;
    
        // Linking API ka istemal WhatsApp khole ke liye
        Linking.openURL(phoneNumber);
      };
  return (
    <View style={styles.container}>
    {/* <TouchableOpacity onPress={onPress} style={styles.headerContainer}>
      <Icon name="arrow-back" size={24} color="black" />
      <Text style={styles.headerText}>Contacts Us</Text>
    </TouchableOpacity> */}
<SupportAndRfidHeader title={"Support"} navigation={navigation}/>
    <TouchableOpacity onPress={handlePhoneCall}>
      <View style={styles.contactButton}>
        <MaterialCommunityIcons name="phone" size={24} color="#118615" style={styles.contactIcon} />
        <Text style={styles.contactText}>1122222334545</Text>
      </View>
    </TouchableOpacity>

    <TouchableOpacity onPress={handleOpenWhatsApp}>
      <View style={styles.contactButton}>
        <FontAwesome name="whatsapp" size={24} color="#118615" style={styles.contactIcon} />
        <Text style={styles.contactText}>1122222334545</Text>
      </View>
    </TouchableOpacity>

    {/* <TouchableOpacity>
      <View style={styles.contactButton}>
        <MaterialCommunityIcons name="email" size={24} color="#118615" style={styles.contactIcon} />
        <Text style={styles.contactText}>1122222334545</Text>
      </View>
    </TouchableOpacity> */}

    {/* <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: 221, marginLeft: 20 ,width:300}}>
      <TouchableOpacity style={styles.sendMessageButton}>
        <Text style={styles.sendMessageText}>Talk to our expert</Text>
      </TouchableOpacity>
    </View> */}
  </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    padding: 10,
    backgroundColor: '#fff',
    height:1000
  },
  headerContainer: {
    flexDirection: 'row',
    marginTop: 10,
    marginLeft: 6,
    backgroundColor: 'white',
    padding: 8,
    borderRadius: 10,
  },
  headerText: {
    fontSize: 18,
    marginLeft: 130,
    fontWeight: '600',
    fontSize: 30,
  },
  contactButton: {
    backgroundColor: 'white',
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 50,
    marginLeft: 10,
    borderRadius: 15,
    borderColor:"#118615",
    borderWidth:1,
    width: 318,
    padding: 15,
    // elevation: 5,
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
  },
  contactIcon: {
    marginRight: 15,
    marginLeft: 12,
  },
  contactText: {
    fontSize: 18,
    marginLeft: 10,
    color: 'black',
  },
  sendMessageButton: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    padding: 10,
    marginTop: 10,
    borderRadius: 8,
    borderWidth: 2,
    backgroundColor: 'green',
    borderColor: 'green',
  },
  sendMessageText: {
    fontSize: 20,
    color: '#fff',
  },
});

export default ExpertSupport;
