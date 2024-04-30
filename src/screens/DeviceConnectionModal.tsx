import React, { FC, useCallback } from 'react'
import {
  FlatList,
  ListRenderItemInfo,
  Modal,
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  TextInput,
} from 'react-native'
import {
  responsiveHeight as hp,
  responsiveWidth as wp,
} from 'react-native-responsive-dimensions'
import { Device } from 'react-native-ble-plx'
import App_top_Header from './App_top_Header'

type DeviceModalListItemProps = {
  item: ListRenderItemInfo<Device>
  connectToPeripheral: (device: Device) => void
  closeModal: () => void
}

type DeviceModalProps = {
  devices: Device[]
  visible: boolean
  connectToPeripheral: (device: Device) => void
  closeModal: () => void
}

const DeviceModalListItem: FC<DeviceModalListItemProps> = (props) => {
  const { item, connectToPeripheral, closeModal } = props

  const connectAndCloseModal = useCallback(() => {
    connectToPeripheral(item.item)
    closeModal()
  }, [closeModal, connectToPeripheral, item.item])

  return (
    <TouchableOpacity
      onPress={connectAndCloseModal}
      style={modalStyle.ctaButton}
    >
      <Text style={modalStyle.ctaButtonText}>{item.item.name}</Text>
    </TouchableOpacity>
  )
}

const DeviceModal: FC<DeviceModalProps> = (props) => {
  const { devices, visible, connectToPeripheral, closeModal, navigation } =
    props
  console.log(devices)

  const renderDeviceModalListItem = useCallback(
    (item: ListRenderItemInfo<Device>) => {
      return (
        <DeviceModalListItem
          item={item}
          connectToPeripheral={connectToPeripheral}
          closeModal={closeModal}
        />
      )
    },
    [closeModal, connectToPeripheral]
  )

  return (
    <Modal
      style={modalStyle.modalContainer}
      animationType="slide"
      transparent={false}
      visible={visible}
    >
      <View style={styles.container}>
        <App_top_Header
          title={'Nearby Chargers'}
          navigation={navigation}
          color={'#C1E0C2'}
        />

        <View style={styles.formcontent}>
          <View style={{ flex: 1 }}>
            <Text style={styles.Text}>
              Please tap the charger name to connect to your device via
              Bluetooth.
            </Text>
            <TextInput
              style={styles.input}
              secureTextEntry={true}
              placeholder="Chagrer 1"
            />
            <TextInput
              style={styles.input}
              placeholder="Chagrer 2"
              secureTextEntry={true}
            />
            <TextInput
              style={styles.input}
              placeholder="Chagrer 3"
              secureTextEntry={true}
            />
            <View style={styles.progressWindow}></View>
          </View>
          <View style={styles.tagNote}>
            <Image
              style={styles.tagNoteImg}
              source={require('../assets/energy_savings_leaf.png')}
            />
            <Text style={{ color: '#118615' }}>
              Charging an electric vehicle is equivalent to giving a car a
              breath of fresh air
            </Text>
          </View>
        </View>
      </View>
      {/* <SafeAreaView style={modalStyle.modalTitle}>
        <Text style={modalStyle.modalTitleText}>
          Tap on a device to connect
        </Text>
        <FlatList
          contentContainerStyle={modalStyle.modalFlatlistContiner}
          data={devices}
          renderItem={renderDeviceModalListItem}
        />
      </SafeAreaView> */}
    </Modal>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  formcontent: {
    flex: 1,
    paddingHorizontal: 20,
    justifyContent: 'space-between',
  },

  Text: {
    color: 'black',
    fontSize: 18,
    fontFamily: 'Poppins',
    fontWeight: '500',
    textAlign: 'justify',
    marginVertical: hp(4),
  },

  input: {
    height: 45,
    borderColor: '#838284',
    borderWidth: 1,
    borderRadius: 15,
    marginVertical: hp(1),
    paddingHorizontal: 20,
    color: '#838284',
  },
  progressWindow: {
    flex: 1,
    // backgroundColor: 'pink',
    alignItems: 'center',
    justifyContent: 'center',
  },

  ConnectButton: {
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    width: wp(40),
    padding: 10,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: 'green',
    marginTop: hp(1),
  },
  ConnectText: {
    fontSize: 16,
    color: '#0D0D0D',
  },

  tagNote: {
    height: 60,
    marginHorizontal: 20,
    paddingHorizontal: 10,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  tagNoteImg: {
    height: 40,
    marginRight: 6,
  },
})

const modalStyle = StyleSheet.create({
  modalContainer: {
    flex: 1,
    backgroundColor: '#f2f2f2',
  },
  modalFlatlistContiner: {
    flex: 1,
    justifyContent: 'center',
  },
  modalCellOutline: {
    borderWidth: 1,
    borderColor: 'black',
    alignItems: 'center',
    marginHorizontal: 20,
    paddingVertical: 15,
    borderRadius: 8,
  },
  modalTitle: {
    flex: 1,
    backgroundColor: '#f2f2f2',
  },
  modalTitleText: {
    marginTop: 40,
    fontSize: 30,
    fontWeight: 'bold',
    marginHorizontal: 20,
    textAlign: 'center',
  },
  ctaButton: {
    backgroundColor: 'purple',
    justifyContent: 'center',
    alignItems: 'center',
    height: 50,
    marginHorizontal: 20,
    marginBottom: 5,
    borderRadius: 8,
  },
  ctaButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
  },
})

export default DeviceModal
