import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

const MapScreen = () => (
  <View style={styles.container}>
    <Text style={styles.title}>Map Screen</Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F9FAFC',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
});

export default MapScreen;
