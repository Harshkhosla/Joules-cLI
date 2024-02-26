import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  ScrollView,
  Alert,
} from 'react-native'
import {
  responsiveHeight as hp,
  responsiveWidth as wp,
  responsiveFontSize as fp,
} from 'react-native-responsive-dimensions'
import Icon from 'react-native-vector-icons/MaterialIcons'

import Circle from './Circle'
import CustomModal from './CustomModal'
import { useState } from 'react'

const Charger_Selection = ({ navigation }) => {
  const [isModalVisible,setisModalVisible]=useState(false)
  const onChargerClick=()=>{
    console.log("click hua");
    // Alert.alert("currently Not Available")  
    setisModalVisible(true)
  }
  return (
    // <ScrollView>
    <View style={styles.Container}>
      <View style={styles.LogoContainer}>
        <View style={styles.circles}>
          <Circle />
          <Circle />
        </View>
        <View style={styles.LogoWrapper}>
          <Image style={styles.Logo} source={require('../assets/jouls.png')} />
        </View>
      </View>
      <View style={styles.Charger_SelectionBoxContainer}>
        <View style={styles.Charger_Selection_UpBox}>
          <View style={styles.AskToStart}>
            <View>
              <Text style={styles.headingText}>Choose charging method</Text>
            </View>
            <View>
              <View>
                <TouchableOpacity style={styles.button} onPress={onChargerClick}>
                  <Text style={styles.link}>Home Charger</Text>
                </TouchableOpacity>
              </View>
              <View>
                <TouchableOpacity style={styles.button}
                  onPress={() => navigation.navigate('Newhome')}
                  >
                  <Text style={styles.link}>Public Charger</Text>
                  <Text>(Apartments, Offices, Semi-public areas)</Text>
                </TouchableOpacity>
              </View>
              {/* <TouchableOpacity
                style={styles.button}
                onPress={() => navigation.navigate('Newhome')}
              >
                <Text style={styles.link}>Go Home</Text>
              </TouchableOpacity> */}
            </View>
          </View>
        </View>
        <View style={styles.tagNote}>
          <Image
            style={styles.tagNoteImg}
            source={require('../assets/energy_savings_leaf.png')}
          />
          <Text style={{ color: '#118615' }}>
            Charging an electric vehicle is equivalent to giving a car a breath
            of fresh air
          </Text>
        </View>
      </View>
      <CustomModal visible={isModalVisible} onClose={() => setisModalVisible(false)}>
    <Text>This is the content of the modal.</Text>
  </CustomModal>
    </View>
    // {/* </ScrollView> */}
  )
}

export default Charger_Selection

const styles = StyleSheet.create({
  Container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  LogoContainer: {
    backgroundColor: '#fff',
    height: hp(27),
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
  },
  circles: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    position: 'absolute',
    // backgroundColor: 'red',
    gap: 8,
    bottom: hp(-25),
  },
  LogoWrapper: {
    // backgroundColor: 'pink',
    borderRadius: 14,
    elevation: 3,
  },
  Logo: {
    height: hp(9),
    width: wp(40),
    borderRadius: 14,
    resizeMode: 'contain',
    backgroundColor: '#fff',
  },
  Charger_SelectionBoxContainer: {
    flex: 1,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    backgroundColor: '#fff',
    marginTop: -18,
  },
  Charger_Selection_UpBox: {
    flex: 1,
    marginHorizontal: 16,
    margin: 20,
    padding: 20,
    paddingTop: 30,
    borderRadius: 20,
    elevation: 3,
    backgroundColor: 'white',
  },
  AskToStart: {
    flex: 1,
    // justifyContent: 'space-between',
  },
  headingText: {
    fontSize: 22,
    color: '#555454',
    marginBottom: 10,
  },
  button: {
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    height: 90,
    elevation: 2,
    // borderWidth: 1,
    // borderColor: '#AAAAAA',
    marginVertical: 5,
    borderRadius: 8,
  },
  link: {
    fontWeight: 600,
    fontSize: 22,
    color: '#118615',
  },
  tagNote: {
    height: 60,
    marginHorizontal: 20,
    paddingHorizontal: 10,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor: 'pink',
  },
  tagNoteImg: {
    height: 40,
    marginRight: 6,
  },
})