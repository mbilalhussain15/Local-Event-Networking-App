import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useTranslation } from 'react-i18next';

const Header = ({ onNotificationPress, onSpeechPress }) => {
  const { t } = useTranslation();  // Initialize translation hook

  return (
    <View style={styles.header}>
      {/* Translated App Name */}
      <Text style={styles.title}>{t('header.home')}</Text> 

      <View style={styles.icons}>
        {/* You can add the notification and speech buttons here */}
      </View>

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
