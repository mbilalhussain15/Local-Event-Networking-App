import React,{useState} from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Modal from 'react-native-modal';
import Icon from 'react-native-vector-icons/Ionicons';
import { CommonActions, useNavigation } from '@react-navigation/native';
import ChangeLanguageModal from './ChangeLanguageModal';
import ChangePasswordModal from './ChangePasswordModal';
const HomeDrawer = ({ isVisible, closeDrawer }) => {
  const navigation = useNavigation();

    const [passwordModalVisible, setPasswordModalVisible] = useState(false);
    const [languageModalVisible, setLanguageModalVisible] = useState(false);


  const handleProfile = () => {
    navigation.navigate('Profile');
    closeDrawer();
    console.log('Navigating to Profile');
  };

  const handleChangePassword = () => {
    setPasswordModalVisible(true);
    closeDrawer();
    console.log('Opening Change Password');
  };

  const handleChangeLanguage = () => {
    
    setLanguageModalVisible(true);

    closeDrawer();
    console.log('Opening Language Selection');
  };

  const handleLogout = () => {
    navigation.dispatch(
            CommonActions.reset({
              index: 0,
              routes: [{ name: 'Login' }],
            })
          );
    closeDrawer();
    console.log('Logging out');
  };

  return (
    <>
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
     {/* Change Password Modal */}
     <ChangePasswordModal
        isVisible={passwordModalVisible}
        closeModal={() => setPasswordModalVisible(false)}
      />
    {/* Change Language Modal */}
    <ChangeLanguageModal
      isVisible={languageModalVisible}
      closeModal={() => setLanguageModalVisible(false)}
  />
  </>
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
