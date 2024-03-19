import React from 'react'
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native'
// import Icon from 'react-native-vector-icons/AntDesign'
import Icon from 'react-native-vector-icons/AntDesign'

const Editprofile_header = () => {
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.backButton}>
        <Icon name="arrowleft" size={25} color="black" />
      </TouchableOpacity>
      <Text style={styles.headingText}>Edit Profile</Text>
    </View>
  )
}

export default Editprofile_header

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  backButton: {
    position: 'absolute',
    left: 20,
  },
  headingContainer: {
    flex: 1,
    alignItems: 'center',
  },
  headingText: {
    color: 'black',
    fontSize: 24,
    fontFamily: 'Poppins',
    fontWeight: '500',
    lineHeight: 36,
    textAlign: 'center',
  },
})
