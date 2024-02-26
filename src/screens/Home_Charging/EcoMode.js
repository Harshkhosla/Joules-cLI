import {
  StyleSheet,
  Text,
  View,
  Modal,
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
import { useState } from 'react'

const EcoMode = ({ open, setisEco }) => {
  const [ischecked, setischecked] = useState(false)
  return (
    <Modal
      visible={open}
      animationType="slide"
      transparent={true}
      onRequestClose={() => {
        setisEco(false)
      }}
    >
      <View style={styles.container}>
        <View style={styles.contents}>
          <View style={styles.cancelButton}>
            <TouchableOpacity
              onPress={() => {
                setisEco(false)
              }}
            >
              <Image source={require('../../assets/cancel.png')} />
            </TouchableOpacity>
          </View>
          <View style={styles.contentBox}>
            <View style={[styles.header]}>
              <Image
                style={styles.imgicon}
                width={100}
                source={require('../../assets/eco.png')}
              />
              <Text style={[styles.text, { color: '#2196F3' }]}>Eco Mode</Text>
            </View>
            <View>
              <CheckBox
                label={'Don’t show this message'}
                checked={ischecked}
                color={'#2196F3'}
                onChange={() => {
                  setischecked(!ischecked)
                }}
              />
            </View>
          </View>
          <ChargingHomepage_Buttons
            action={() => {
              Alert.alert('this is alart')
            }}
            title={'Start Charging'}
            modeColor={'#2196F3'}
          />

          <View
            style={[styles.bottomColorBox, { backgroundColor: '#87CEEB' }]}
          ></View>
        </View>
      </View>
    </Modal>
  )
}

export default EcoMode

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
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
    borderRadius: 10,
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
