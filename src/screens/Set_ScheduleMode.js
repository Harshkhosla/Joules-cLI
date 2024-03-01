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
import Modal from 'react-native-modal'
import ChargingHomepage_Buttons from '../components/ChargingHomepage_Buttons'

const Set_ScheduleMode = ({ open, setisSchedule }) => {
  return (
    <Modal
      isVisible={open}
      onSwipeComplete={() => setisSchedule(false)}
      swipeDirection={['down']}
      onBackdropPress={() => setisSchedule(false)}
      onBackButtonPress={() => setisSchedule(false)}
      style={styles.modal}
    >
      <View style={styles.container}>
        <View style={styles.contents}>
          <View style={styles.cancelButton}>
            <TouchableOpacity
              onPress={() => {
                setisSchedule(false)
              }}
            >
              <Image source={require('../assets/cancel.png')} />
            </TouchableOpacity>
          </View>
          <View style={styles.contentBox}>
            <View style={[styles.header]}>
              <Image
                style={styles.imgicon}
                source={require('../assets/history.png')}
              />
              <Text style={[styles.text, { color: '#7F14EB' }]}>
                Schedule Mode
              </Text>
            </View>
            <View style={{ gap: 8, marginVertical: 10 }}>
              <Text style={[styles.text, { color: '#7F14EB' }]}>
                In schedule mode, you can preset the time of charging
              </Text>

              <Text style={[styles.text]}>
                To start the Schedule mode you need to set the given parameters
              </Text>
              <Text style={[styles.text]}>
                <Text
                  style={{ textDecorationLine: 'underline', color: '#2572FB' }}
                >
                  See Time
                </Text>{' '}
                when you can spend less money on charging
              </Text>
              <View style={{ gap: hp(2) }}>
                <TouchableOpacity style={styles.selecters}>
                  <Image
                    style={styles.imgicon}
                    source={require('../assets/calendar_month.png')}
                  />
                  <Text>Set date</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.selecters}>
                  <Image
                    style={styles.imgicon}
                    source={require('../assets/alarm.png')}
                  />
                  <Text>Set date</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
          <ChargingHomepage_Buttons
            action={() => {
              Alert.alert('perform hear which you wanted')
            }}
            title={'Start Charging'}
            modeColor={'#7F14EB'}
            status={true}
          />

          <View
            style={[styles.bottomColorBox, { backgroundColor: '#E3C9FD' }]}
          ></View>
        </View>
      </View>
    </Modal>
  )
}

export default Set_ScheduleMode

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
  selecters: {
    padding: 8,
    gap: 5,
    marginHorizontal: 20,
    borderWidth: 1,
    borderColor: '#777272',
    borderRadius: 10,
    backgroundColor: '#fff',
    flexDirection: 'row',
    alignItems: 'center',
  },
  text: {
    fontSize: 16,
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
