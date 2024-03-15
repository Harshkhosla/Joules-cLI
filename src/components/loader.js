// LoaderComponent.js

import React from 'react';
import { View, ActivityIndicator, Modal, StyleSheet } from 'react-native';

const LoaderComponent = ({ loading }) => {
  return (
    <Modal transparent={true} animationType='fade' visible={loading}>
      <View style={styles.container}>
        <ActivityIndicator animating={loading} size="large" color="#0000ff" />
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // semi-transparent background
  },
});

export default LoaderComponent;
