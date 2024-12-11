import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Modal from 'react-native-modal';
import Icon from 'react-native-vector-icons/Ionicons';

const HomeDrawer = ({ isVisible, closeDrawer }) => {
  const handleProfile = () => {
    closeDrawer();
    console.log('Navigating to Profile');
  };

  const handleChangePassword = () => {
    closeDrawer();
    console.log('Opening Change Password');
  };

  const handleChangeLanguage = () => {
    closeDrawer();
    console.log('Opening Language Selection');
  };

  const handleLogout = () => {
    closeDrawer();
    console.log('Logging out');
  };

  return (
    <Modal
      isVisible={isVisible}
      onBackdropPress={closeDrawer}
      style={styles.leftDrawer}
      backdropColor="rgba(0, 0, 0, 0.5)"
      backdropOpacity={0.5}
      useNativeDriver
      hideModalContentWhileAnimating
      animationIn="slideInLeft"
      animationOut="slideOutLeft"
    >
      <View style={styles.drawerContent}>
        <TouchableOpacity style={styles.closeButton} onPress={closeDrawer}>
          <Icon name="close" size={28} color="#000" />
        </TouchableOpacity>

        {/* Sections */}
        <TouchableOpacity style={styles.option} onPress={handleProfile}>
          <Icon name="person-circle" size={40} color="#6C5CE7" style={styles.icon} />
          <Text style={styles.optionText}>Profile</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.option} onPress={handleChangePassword}>
          <Icon name="key" size={40} color="#6C5CE7" style={styles.icon} />
          <Text style={styles.optionText}>Change Password</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.option} onPress={handleChangeLanguage}>
          <Icon name="language" size={40} color="#6C5CE7" style={styles.icon} />
          <Text style={styles.optionText}>Change Language</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.option} onPress={handleLogout}>
          <Icon name="log-out-outline" size={40} color="#6C5CE7" style={styles.icon} />
          <Text style={styles.optionText}>Logout</Text>
        </TouchableOpacity>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  leftDrawer: {
    margin: 0,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  },
  drawerContent: {
    backgroundColor: 'white',
    width: '80%',
    height: '100%',
    padding: 20,
  },
  closeButton: {
    alignSelf: 'flex-end',
    marginBottom: 20,
  },
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
    paddingHorizontal: 10,
  },
  icon: {
    marginRight: 20,
  },
  optionText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
  },
});

export default HomeDrawer;
