import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { Text } from 'react-native-paper';
import Background from '../components/Background';
import Logo from '../components/Logo';
import LogoLogin from '../components/LoginLogo';
import Header from '../components/Header';
import Button from '../components/Button';
import TextInput from '../components/TextInput';
import BackButton from '../components/BackButton';
import { theme } from '../core/theme';
import { useDispatch, useSelector } from 'react-redux';
import { loginuser } from '../Redux/Action';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function UserDetails({ navigation }) {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState({
    name: '',
    password: '',
  });

  const saveData = async (data) => {
    console.log(data?.password, 'enfhgevwfnbv');
    console.log('wev,mn');
    const { name, password } = data;

    // Perform input validation
    if (name.trim() === '' || password.trim() === '') {
      // Display an error or show a toast message indicating that the input is empty
      return;
    }

    try {
      const response = await fetch(
        `http://192.168.4.1/?username=${name}&password=${password}&` +
          JSON.stringify({
            name,
            password,
          }),
        {
          method: 'POST',
          headers: {
            'content-type': 'application/json',
          },
        }
      );
      navigation.navigate('Home');
      const result = await response.json();

      // toast.success(result?.toast);
      console.log(result, 'casdvas');
      if (!result?.success) {
        throw Error(result.error);
        // navigation.navigate('Home');
      }
    } catch (error) {
      console.log(error, 'cvdsavs');
    }
  };

  return (
    <Background>
      <BackButton goBack={navigation.goBack} />
      <Logo />
      <LogoLogin />
      <Header>Create Account</Header>
      <TextInput
        label="Name"
        returnKeyType="next"
        name="name"
        value={data.name}
        onChangeText={(txt) => {
          setData((prevData) => ({ ...prevData, name: txt }));
        }}
      />
      <TextInput
        label="Password"
        returnKeyType="done"
        name="password"
        value={data.password}
        onChangeText={(txt) => {
          setData((prevData) => ({ ...prevData, password: txt }));
        }}
        secureTextEntry
      />
      <Button
        mode="contained"
        onPress={() => saveData(data)}
        style={{ marginTop: 24 }}
        disabled={loading}
      >
        {loading ? 'Loading...' : 'Sign Up'}
      </Button>
      <View style={styles.row}>
        <Text>Already have an account? </Text>
        <TouchableOpacity onPress={() => navigation.replace('LoginScreen')}>
          <Text style={styles.link}>Login</Text>
        </TouchableOpacity>
      </View>
    </Background>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    marginTop: 4,
  },
  link: {
    fontWeight: 'bold',
    color: theme.colors.primary,
  },
});
