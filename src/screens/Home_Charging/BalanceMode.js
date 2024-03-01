import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Alert,
} from 'react-native'
import {
  responsiveHeight as hp,
  responsiveWidth as wp,
  responsiveFontSize as fp,
} from 'react-native-responsive-dimensions'
import ChargingHomepage_Buttons from '../../components/ChargingHomepage_Buttons'
import CheckBox from '../../components/CheckBox'
import Modal from 'react-native-modal'
import { useState } from 'react'

const BalanceMode = ({ open, setisBalanced }) => {
  const [ischecked, setischecked] = useState(false)
  return (
    <Modal
      isVisible={open}
      onSwipeComplete={() => setisBalanced(false)}
      swipeDirection={['down']}
      onBackdropPress={() => setisBalanced(false)}
      onBackButtonPress={() => setisBalanced(false)}
      style={styles.modal}
    >
      <View style={styles.container}>
        <View style={styles.contents}>
          <View style={styles.cancelButton}>
            <TouchableOpacity
              onPress={() => {
                setisBalanced(false)
              }}
            >
              <Image source={require('../../assets/cancel.png')} />
            </TouchableOpacity>
          </View>
          <View style={styles.contentBox}>
            <View style={[styles.header]}>
              <Image
                tintColor="green"
                style={styles.imgicon}
                source={require('../../assets/balance.png')}
              />
              <Text style={[styles.text, { color: 'green' }]}>
                Balance Mode
              </Text>
            </View>
            <View>
              <CheckBox
                label={'Don’t show this message'}
                checked={ischecked}
                color={'#118615'}
                onChange={() => {
                  setischecked(!ischecked)
                }}
              />
              {/* <Text>Don’t show this message</Text> */}
            </View>
          </View>
          <ChargingHomepage_Buttons
            action={() => {
              Alert.alert('this is alart')
            }}
            title={'Start Charging'}
            modeColor={'#118615'}
            status={true}
          />

          <View
            style={[styles.bottomColorBox, { backgroundColor: '#C1E0C2' }]}
          ></View>
        </View>
      </View>
    </Modal>
  )
}

export default BalanceMode

const styles = StyleSheet.create({
  modal: {
    margin: 0,
  },
  container: {
    flex: 1,
  },
  contents: {
    position: 'absolute',
    bottom: 0,
    backgroundColor: '#fff',
    padding: 20,
    height: hp(70),
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    width: '100%',
  },
  cancelButton: {
    alignSelf: 'flex-end',
  },
  contentBox: {
    marginVertical: 10,
    padding: 15,
    backgroundColor: '#fff',
    flex: 1,
    borderRadius: 14,
    borderColor: '#B7B7B7',
    borderWidth: 1,
    justifyContent: 'space-between',
  },
  header: {
    padding: 8,
    gap: 5,
    alignSelf: 'center',
    borderWidth: 1,
    borderColor: '#777272',
    borderRadius: 10,
    backgroundColor: '#fff',
    flexDirection: 'row',
    alignItems: 'center',
  },
  imgicon: {
    height: 30,
    width: 30,
    resizeMode: 'contain',
  },
  bottomColorBox: {
    position: 'absolute',
    bottom: 0,
    height: hp(40),
    borderTopLeftRadius: 15,
    borderTopRightRadius: 60,
    width: wp(100),
    zIndex: -1,
  },
})
