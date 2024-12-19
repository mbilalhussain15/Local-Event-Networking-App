import React, { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import HomeDrawer from './HomeDrawer';

const EventsHeader = ({title}) => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  return (
    <View style={styles.header}>
      <TouchableOpacity onPress={toggleDrawer} style={styles.leftIcon}>
        <Icon name="menu" size={28} color="#FFFFFF" />
      </TouchableOpacity>
      <Text style={styles.title}>{title}</Text>
      <View style={styles.rightPlaceholder}></View>
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
    position: 'relative',
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

export default EventsHeader;
