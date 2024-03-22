import React from 'react'
import {
  Image,
  Keyboard,
  KeyboardAvoidingView,
  ScrollView,
  StyleSheet,
  Text,
  View,
  Platform,
  TouchableOpacity,
} from 'react-native'
import Editprofile_header from './Editprofile_header'
import Profile_Edit_Form from './Profile_Edit_Form'

const Editprofile = () => {
  const behavior = Platform.OS === 'ios' ? 'padding' : '200'
  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={behavior}
      onPress={() => Keyboard.dismiss()}
    >
      <ScrollView style={{ flex: 1 }}>
        <View style={{ flex: 1, marginBottom: 40 }}>
          <View style={styles.ellipse}>
            <View style={styles.profileimgContain}>
              <Image
                source={require('../../assets/defaultuser.png')}
                style={styles.profileimg}
                resizeMode="contain"
              />
              <View style={styles.editButton}>
                <TouchableOpacity onPress={() => console.log('press')}>
                  <Image
                    source={require('../../assets/editicon.png')}
                    style={styles.editimg}
                  />
                </TouchableOpacity>
              </View>
            </View>
          </View>

          <View style={{ marginTop: 20, marginBottom: 450 - 200, flex: 1 }}>
            <Editprofile_header />
          </View>
          <View style={{ flex: 1, alignItems: 'center' }}>
            <Profile_Edit_Form />
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  )
}

export default Editprofile

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  ellipse: {
    backgroundColor: '#DAF0CB',
    position: 'absolute',
    width: '100%',
    height: 450,
    top: -180,
    borderRadius: 350,
    // zIndex: 1,
  },
  profileimgContain: {
    position: 'absolute',
    top: 300,
    height: 125,
    width: 125,
    borderRadius: 125 / 2,
    borderWidth: 2,
    borderColor: '#118615',
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },
  profileimg: {
    width: 110,
    height: 110,
    borderRadius: 110 / 2,
  },
  editButton: {
    position: 'absolute',
    bottom: 6,
    right: 0,
    zIndex: 1,
  },
  editimg: {
    width: 30,
    height: 30,
  },
})
