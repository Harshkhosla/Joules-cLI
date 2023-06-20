import React, { useEffect } from 'react';
import { StyleSheet, View, Image, Dimensions, Text } from 'react-native';
import Background from '../components/Background';

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

export default function Eligible({ navigation }) {
  useEffect(() => {
    const timeout = setTimeout(() => {
      // Navigate to the other component
      navigation.navigate('Car');
    }, 3000);

    // Clean up the timeout when the component is unmounted
    return () => clearTimeout(timeout);
  }, []);

  return (
    <Background>
      <View>
        <Image source={require('../assets/jouls.png')} style={styles.image1} />
      </View>
      <View>
        <Image source={require('../assets/eli.png')} style={styles.image} />
      </View>
      <View>
        <Image source={require('../assets/trees.png')} style={styles.images} />
      </View>
      <Text style={styles.Congratulations}>GREAT!</Text>
      <Text style={styles.link}>
        You’ve earned your ticket to a greener and cleaner world.
      </Text>
    </Background>
  );
}

const styles = StyleSheet.create({
  Congratulations: {
    fontWeight: 'bold',
    fontSize: 30,
    color: '#80C363',
    marginTop: screenHeight * -0.1,
  },
  link: {
    fontSize: 23,
    textAlign: 'center',
    color: 'black',
  },
  image: {
    width: screenWidth * 0.9,
    height: screenHeight * 0.27,
    marginTop: screenHeight * -0.22,
    alignSelf: 'center',
  },
  image1: {
    width: screenWidth * 0.28,
    height: screenHeight * 0.07,
    marginTop: screenHeight * -0.38,
  },
  images: {
    width: screenWidth * 0.4,
    height: screenWidth * 0.38,
    top: screenHeight * 0.38,
    right: screenWidth * -0.26,
  },
});
