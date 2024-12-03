import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

const EventsScreen = () => (
  <View style={styles.container}>
    <Text style={styles.title}>Events Screen</Text>
    {/* Add components for Events Screen */}
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

export default EventsScreen;
