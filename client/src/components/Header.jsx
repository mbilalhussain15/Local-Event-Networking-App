import React, { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import HomeDrawer from './HomeDrawer';

const Header = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  return (
    <View style={styles.header}>
      {/* Hamburger Icon */}
      <TouchableOpacity onPress={toggleDrawer} style={styles.leftIcon}>
        <Icon name="menu" size={28} color="#FFFFFF" />
      </TouchableOpacity>

      {/* Centered Title */}
      <Text style={styles.title}>Home</Text>

      {/* Placeholder for right alignment (if needed in future) */}
      <View style={styles.rightPlaceholder}></View>

      {/* Drawer */}
      <HomeDrawer isVisible={isDrawerOpen} closeDrawer={toggleDrawer} />
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    backgroundColor: '#6C5CE7',
    padding: 20,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    flexDirection: 'row',
    alignItems: 'center',
    position: 'relative', // Allows absolute positioning of the title
  },
  leftIcon: {
    position: 'absolute',
    left: 20,
    zIndex: 10,
  },
  title: {
    color: '#FFFFFF',
    fontSize: 25,
    fontWeight: 'bold',
    textAlign: 'center',
    flex: 1,
  },
});

export default Header;
