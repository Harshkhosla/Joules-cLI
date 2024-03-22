import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Alert,
  Image,
} from 'react-native'
import React from 'react'
import Modal from 'react-native-modal'
import { useNavigation } from '@react-navigation/native'
import AsyncStorage from '@react-native-async-storage/async-storage'
// import { Item } from 'react-native-paper/lib/typescript/components/List/List'
// import { index } from 'd3'

const Navmodal = ({ naveopen, closeNave, name }) => {
  const navigation = useNavigation()

  const navitems = [
    {
      Nav_icon: require('../assets/historynav.png'),
      Nav_name: 'Charging history',
      navigat: 'Charging_History',
    },
    {
      Nav_icon: require('../assets/directions_car.png'),
      Nav_name: 'My Vehicles',
      // navigat: 'Screen2',
    },
    {
      Nav_icon: require('../assets/wifiicon.png'),
      Nav_name: 'Support',
      navigat: 'support',
    },
  ]

  const removeItemFromAsyncStorage = async () => {
    try {
      await AsyncStorage.removeItem('Authtoken')
      console.log('Item removed successfully')
      navigation.navigate('SignIn')
    } catch (error) {
      console.error('Error removing item from AsyncStorage:', error)
    }
  }

  const handleitemsClick = (item) => {
    closeNave()
    if (item) {
      navigation.navigate(item)
    }
  }

  const navigateToEdit = () => {
    navigation.navigate('Editprofile')
    closeNave()
  }
  return (
    <View>
      <Modal
        isVisible={naveopen}
        onBackdropPress={closeNave}
        onSwipeComplete={closeNave}
        swipeDirection={'left'}
        onBackButtonPress={closeNave}
        style={styles.modal}
        hideModalContentWhileAnimating={true}
        animationIn={'slideInLeft'}
        animationInTiming={100}
        animationOut={'slideOutLeft'}
        animationOutTiming={500}
      >
        <View style={styles.container}>
          <View style={{ backgroundColor: '' }}>
            <Image
              source={require('../assets/nevvector.png')}
              style={styles.backsvg}
              resizeMode="stretch"
            />
            <View style={styles.profileContainer}>
              <Image
                source={require('../assets/defaultuser.png')}
                style={styles.profileimg}
                resizeMode="contain"
              />
              <Text style={{ fontSize: 18, color: '#118615' }}>{name}</Text>
              <Text style={{ fontSize: 12 }}>mailg@gmail.com</Text>

              <TouchableOpacity
                style={styles.prfileEdit}
                onPress={() => navigateToEdit()}
              >
                <Image
                  source={require('../assets/account_circle.png')}
                  style={{ height: 20, width: 20, resizeMode: 'contain' }}
                  resizeMode="contain"
                />
                <Text style={{ color: '#FFFFFF' }}>Edit Profile</Text>
              </TouchableOpacity>
            </View>
          </View>
          <View style={{ marginHorizontal: 15 }}>
            {navitems.map((items, index) => (
              <TouchableOpacity
                key={index}
                style={styles.navButton}
                onPress={() => handleitemsClick(items.navigat)}
              >
                <View
                  style={{
                    flexDirection: 'row',
                    gap: 15,
                    alignItems: 'center',
                  }}
                >
                  <View style={{ padding: 3, backgroundColor: '#F7F7F7' }}>
                    <Image
                      source={items.Nav_icon}
                      style={{ height: 18, width: 18, resizeMode: 'contain' }}
                    />
                  </View>

                  <Text style={{ fontSize: 16, color: '#5F615F' }}>
                    {items.Nav_name}
                  </Text>
                </View>

                <Image
                  source={require('../assets/chevron_right.png')}
                  style={{ height: 20, width: 20, resizeMode: 'contain' }}
                />
              </TouchableOpacity>
            ))}
            <TouchableOpacity
              style={styles.logout}
              onPress={removeItemFromAsyncStorage}
            >
              <View>
                <Text style={{ fontSize: 16, color: '#118615' }}>Sign Out</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  )
}

export default Navmodal

const styles = StyleSheet.create({
  modal: {
    margin: 0,
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    width: '80%',
  },
  backsvg: { position: 'absolute', width: '100%', height: 120 },
  profileContainer: { alignItems: 'center', marginTop: 30, gap: 3 },
  profileimg: {
    width: 60,
    height: 60,
    alignSelf: 'center',
    borderRadius: 60 / 2,
    borderWidth: 2,
    borderColor: '#118615',
  },

  prfileEdit: {
    flexDirection: 'row',
    backgroundColor: '#118615',
    padding: 8,
    gap: 5,
    justifyContent: 'space-between',
    marginTop: 5,
    marginBottom: 20,
    alignItems: 'center',
    borderRadius: 20,
  },
  navButton: {
    flexDirection: 'row',
    backgroundColor: '#F0F0F0',
    padding: 8,
    justifyContent: 'space-between',
    marginBottom: 10,
    alignItems: 'center',
    borderRadius: 8,
  },
  logout: {
    marginTop: 5,
    flexDirection: 'row',
    justifyContent: 'center',
    width: '40%',
    padding: 8,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: '#B7B7B7',
  },
})
