import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const Header = ({ location }) => (
  <View style={styles.header}>
    <View>
      <Text style={styles.locationLabel}>Current Location</Text>
      <Text style={styles.location}>{location}</Text>
    </View>
    <TouchableOpacity style={styles.notificationIcon}>
      <Text>🔔</Text> 
    </TouchableOpacity>
  </View>
);

const styles = StyleSheet.create({
  header: {
    backgroundColor: '#6C5CE7',
    padding: 20,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  locationLabel: {
    color: '#FFFFFF',
    fontSize: 12,
  },
  location: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  notificationIcon: {
    padding: 10,
  },
});

export default Header;
