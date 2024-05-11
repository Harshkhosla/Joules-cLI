import React, { useState } from 'react'
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  TextInput,
  ScrollView,
} from 'react-native'
import {
  responsiveHeight as hp,
  responsiveWidth as wp,
} from 'react-native-responsive-dimensions'
import Modal from 'react-native-modal'

const SetVehicale = ({ open, onClose,selectedVehicle,setSelectedVehicle }) => {

  //
  const [expandedIndex, setExpandedIndex] = useState(null)

  const handleCompanyPress = (index) => {
    setExpandedIndex(index)
  }

  const companies = [
    {
      name: 'OLA',
      models: [
        { modelName: 'S1 X+', value: 3 },
        { modelName: 'S1 Pro', value: 3.97 },
        { modelName: 'S1 air', value: 3 },
        { modelName: 'S1 X', value: 4 },
      ],
    },
    {
      name: 'Ather',
      models: [
        { modelName: '450 x', value: 2.97 },
        { modelName: '4505', value: 2.9 },
        { modelName: 'rizta', value: 3.07 },
      ],
    },
    {
      name: 'TVS',
      models: [
        { modelName: 'iQube', value: 3.4 },
        { modelName: 'iQubes', value: 3.4 },
        { modelName: 'ST', value: 3.4 },
        { modelName: 'ST 17', value: 3.4 },
      ],
    },
    {
      name: 'Jetter',
      models: [
        { modelName: 'Model A1', value: 5.1 },
        { modelName: 'Model A2', value: 5.1 },
        { modelName: 'Model A3', value: 5.1 },
      ],
      value:""
    },
    {
      name: 'Bajaj',
      models: [
        { modelName: 'Chetak', value: 3.2 }
      ],
    },
    {
      name: 'Okinawa',
      models: [
        { modelName: 'Praise Pro', value: 2.08 },
        { modelName: 'Praise', value: 3.24 },
        { modelName: 'iPraise +', value: 3.6 },
      ],
    },
  ]

  const toggleExpand = (index) => {
    if (expandedIndex === index) {
      setExpandedIndex(null)
    } else {
      setExpandedIndex(index)
    }
  }

  const handleModelPress = (name,model, kwh) => {
    console.log('Selected model:',name, model, 'with value:', kwh)
    setSelectedVehicle({name,model,kwh})
    onClose()
  }
  //
  return (
    <Modal
      // isVisible={true}
      isVisible={open}
      onSwipeComplete={onClose}
      // swipeDirection={['down']}
      animationIn={'fadeIn'}
      animationOut={'fadeOut'}
      onBackdropPress={onClose}
      onBackButtonPress={onClose}
      style={styles.modal}
    >
      <View style={styles.container}>
        <View style={styles.contents}>
          <View style={styles.cancelButton}>
            <TouchableOpacity onPress={onClose}>
              <Image source={require('../../assets/cancel.png')} />
            </TouchableOpacity>
          </View>
          <View style={styles.contentBox}>
            <Text style={styles.text}>Select Your Vehicle</Text>
            <ScrollView>
              <View style={styles.container2}>
                {companies.map((company, index) => (
                  <TouchableOpacity
                    key={index}
                    onPress={() => toggleExpand(index)}
                    style={[
                      styles.companyContainer,
                      // expandedIndex === index && { backgroundColor: 'red' },
                    ]}
                  >
                    <Text
                      style={[
                        styles.companyName,
                        expandedIndex === index && {
                          backgroundColor: '#C1E0C2',
                          height:35,
                          width:370,
                        },
                      ]}
                    >
                    {company.name}
                    </Text>
                    {expandedIndex === index && (
                      <View style={styles.modelsContainer}>
                        {company.models.map((model, idx) => (
                          <TouchableOpacity
                            key={idx}
                            onPress={() =>
                              handleModelPress(company.name,model.modelName, model.value)
                            }
                            style={styles.modelsContainer}
                          >
                            <Text style={styles.modelText}>
                                {model.modelName}
                              {/* : {model.value} */}
                            </Text>
                          </TouchableOpacity>
                        ))}
                      </View>
                    )}
                  </TouchableOpacity>
                ))}
              </View>
            </ScrollView>
          </View>

          {/* <View
            style={[styles.bottomColorBox, { backgroundColor: '#C1E0C2' }]}
          /> */}
        </View>
      </View>
    </Modal>
  )
}

export default SetVehicale

const styles = StyleSheet.create({
  modal: {
    // margin: 0,
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent',
  },
  contents: {
    backgroundColor: 'transparent',
    padding: 15,
    height: hp(80),

    width: '100%',
  },
  cancelButton: {
    alignSelf: 'flex-end',
  },
  contentBox: {
    marginVertical: 10,
    // padding: 20,
    backgroundColor: '#fff',
    flex: 1,
    borderRadius: 14,
    borderColor: '#B7B7B7',
    borderWidth: 1,
    overflow: 'hidden',
  },
  text: {
    color: '#6C6C6C',
    fontSize: 20,
    marginBottom: 10,
    fontWeight:500,
    padding:20

  },

  container2: {
    paddingVertical: 1,
    marginLeft:-10
    // backgroundColor: '#f0f0f0',
  },
  companyContainer: {
    marginBottom: 10,
    borderRadius: 8,
    padding: 2,
    // marginLeft:12
  },
  companyName: {
    fontSize: 18,
    color:"#6C6C6C",
    marginLeft:14,  
    // padding:10
  },
  modelsContainer: {
    marginTop: 5,
  },
  modelText: {
    fontSize: 16,
    marginBottom: 5,
    marginLeft: 35,
    color:"#6C6C6C",
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
