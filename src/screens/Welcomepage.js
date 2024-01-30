import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  ScrollView,
} from 'react-native'
import {
  responsiveHeight as hp,
  responsiveWidth as wp,
  responsiveFontSize as fp,
} from 'react-native-responsive-dimensions'
import Icon from 'react-native-vector-icons/MaterialIcons'

import Circle from './Circle'

const Welcomepage = ({ navigation }) => {
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
      <View style={styles.WelcomepageBoxContainer}>
        <View style={styles.Welcomepage_UpBox}>
          <View style={styles.AskToStart}>
            <View>
              <Text>Hi Aman,</Text>
              <Text>
                To improve your experience, We kindly request your input through
                a short questionnaire.
              </Text>
            </View>
            <View>
              <TouchableOpacity
                style={styles.button}
                // onPress={() => navigation.navigate('Charger_Selection')}
                onPress={() => navigation.navigate('Questionnaire')}
              >
                <Text style={styles.link}>Start</Text>
              </TouchableOpacity>
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
    </View>
    // {/* </ScrollView> */}
  )
}

export default Welcomepage

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
  WelcomepageBoxContainer: {
    flex: 1,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    backgroundColor: '#fff',
    marginTop: -18,
  },
  Welcomepage_UpBox: {
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
    justifyContent: 'space-between',
  },
  button: {
    alignItems: 'center',
    borderWidth: 2,
    borderRadius: 10,
    borderColor: '#118615',
  },
  link: {
    fontWeight: 600,
    padding: 14,
    color: 'green',
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
