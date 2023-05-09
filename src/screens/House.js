
import React, { useState } from 'react'
import Header from '../components/Header';
import { SafeAreaView, StyleSheet, TextInput, Alert } from 'react-native';
import { Text, View, Linking } from 'react-native';
import Button from '../components/Button'
import Background from '../components/Background';
import DropDownPicker from 'react-native-dropdown-picker';
import BackButton from '../components/BackButton'


export default function House({ navigation }) {
  return (
    <Background>
      <BackButton goBack={navigation.goBack} />
      <View style = { styles.MainContainer }>
      <Header>
        Which Car Do you Own ?
      </Header>

      <DropDownPicker
      open={open}
      value={value}
      items={items}
      setOpen={setOpen}
      setValue={setValue}
      setItems={setItems}
    />
      <Button style={ styles.bottomView}
        mode="contained"
        onPress={() => navigation.replace('Home')}
      >too home </Button>
      </View>
    </Background>
  )
}

const styles = StyleSheet.create({

  MainContainer:
  {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      paddingTop: ( Platform.OS === 'ios' ) ? 20 : 0
  },

  bottomView:{

    width: '100%', 
    height: 50, 
    backgroundColor: '#FF9800', 
    justifyContent: 'center', 
    alignItems: 'center',
    position: 'absolute',
    bottom: 0
  },

  textStyle:{

    color: '#fff',
    fontSize:22
  
}
});