import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

const TabIcon = ({ label, icon }) => (
  <View style={styles.iconContainer}>
    <Text style={styles.icon}>{icon}</Text>
    <Text style={styles.label}>{label}</Text>
  </View>
);

const styles = StyleSheet.create({
  iconContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    fontSize: 24,
  },
  label: {
    fontSize: 12,
    color: '#6C757D',
  },
});

export default TabIcon;
