import i18n from 'i18next';
import React, { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const LanguageSwitcher = () => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState(
    i18n.language === 'en' ? 'English' : 'German'
  );

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  const changeLanguage = (lang) => {
    i18n.changeLanguage(lang);
    setSelectedLanguage(lang === 'en' ? 'English' : 'German');
    setShowDropdown(false);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={toggleDropdown} style={styles.button}>
        <Text style={styles.buttonText}>{selectedLanguage}</Text>
      </TouchableOpacity>
      {showDropdown && (
        <View style={styles.dropdown}>
          <TouchableOpacity onPress={() => changeLanguage('en')} style={styles.option}>
            <Text style={styles.optionText}>English</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => changeLanguage('de')} style={styles.option}>
            <Text style={styles.optionText}>German</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    right: 20,  // Position language switcher at the right side
    top: 20,    // Adjust top spacing if needed
    zIndex: 1000,
  },
  button: {
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  buttonText: {
    fontSize: 14,
    color: '#333',
  },
  dropdown: {
    marginTop: 5,
    backgroundColor: '#fff',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ddd',
    overflow: 'hidden',
  },
  option: {
    padding: 10,
  },
  optionText: {
    fontSize: 14,
    color: '#333',
  },
});

export default LanguageSwitcher;
