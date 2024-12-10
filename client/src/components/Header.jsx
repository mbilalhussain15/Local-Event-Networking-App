import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

const Header = ({ onNotificationPress, onSpeechPress }) => (
  <View style={styles.header}>
    {/* App Name */}
    <Text style={styles.title}>Home</Text>

    <View style={styles.icons}>
    </View>
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
  title: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: 'bold',
  },
  icons: {
    flexDirection: 'row',
  },
  icon: {
    marginLeft: 15,
  },
  iconText: {
    fontSize: 24,
    color: '#FFFFFF',
  },
});

export default Header;
