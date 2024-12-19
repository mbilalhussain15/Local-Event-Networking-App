import React, { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import HomeDrawer from './HomeDrawer';
import { useTranslation } from 'react-i18next';
import LanguageSwitcher from './LanguageSwitcher';

const Header = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const { t } = useTranslation();

  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  return (
    <View style={styles.header}>
      <TouchableOpacity onPress={toggleDrawer} style={styles.leftIcon}>
        <Icon name="menu" size={28} color="#FFFFFF" />
      </TouchableOpacity>
      <Text style={styles.title}>{t('header.home')}</Text>
      <HomeDrawer isVisible={isDrawerOpen} closeDrawer={toggleDrawer} />
      <LanguageSwitcher />
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

export default Header;
