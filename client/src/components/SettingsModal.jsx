import React, { useState, useContext } from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  View,
  Alert,
  ActivityIndicator,
} from 'react-native';
import Modal from 'react-native-modal';
import Icon from 'react-native-vector-icons/Ionicons';
import { CommonActions, useNavigation } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';
import Toast from 'react-native-toast-message';
import { useLogoutMutation } from '../redux/slices/api/authApiSlice.js';
import { UserContext } from '../context/UserContext.jsx';
import ChangePasswordModal from './ChangePasswordModal';
import ChangeLanguageModal from './ChangeLanguageModal';

const SettingsModal = ({ isVisible, closeSettings }) => {
  const { t } = useTranslation();
  const navigation = useNavigation();
  const [passwordModalVisible, setPasswordModalVisible] = useState(false);
  const [languageModalVisible, setLanguageModalVisible] = useState(false);

  const { user } = useContext(UserContext);
  const [logout] = useLogoutMutation();

  const handleProfile = () => {
    closeSettings();
    navigation.navigate('Profile');
  };

  const handleLogout = async () => {
    closeSettings();
    try {
      await logout().unwrap();
      Toast.show({
        type: 'success',
        text1: t('Logout Successful'),
        text2: t('You have been logged out successfully.'),
      });

      navigation.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [{ name: 'Login' }],
        })
      );
    } catch (error) {
      console.error('Logout failed:', error);
      Alert.alert(t('Error'), error?.data?.message || t('Failed to log out. Please try again.'));
    }
  };

  return (
    <>
      <Modal
        isVisible={isVisible}
        onBackdropPress={closeSettings}
        style={styles.bottomSheet}
      >
        <View style={styles.sheetContent}>
          <TouchableOpacity style={styles.closeButton} onPress={closeSettings}>
            <Icon name="close" size={24} color="black" />
          </TouchableOpacity>

          <TouchableOpacity style={styles.option} onPress={handleProfile}>
            <Icon name="person" size={20} color="gray" style={styles.icon} />
            <Text style={styles.optionText}>{t('Profile')}</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.option}
            onPress={() => {
              closeSettings();
              setPasswordModalVisible(true);
            }}
          >
            <Icon name="key" size={20} color="gray" style={styles.icon} />
            <Text style={styles.optionText}>{t('Change Password')}</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.option}
            onPress={() => {
              closeSettings();
              setLanguageModalVisible(true);
            }}
          >
            <Icon name="language" size={20} color="gray" style={styles.icon} />
            <Text style={styles.optionText}>{t('Change Language')}</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.option} onPress={handleLogout}>
            <Icon name="log-out" size={20} color="gray" style={styles.icon} />
            <Text style={styles.optionText}>{t('Logout')}</Text>
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
  bottomSheet: {
    margin: 0,
    justifyContent: 'flex-end',
  },
  sheetContent: {
    backgroundColor: 'white',
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    padding: 16,
  },
  closeButton: {
    alignSelf: 'flex-end',
    marginBottom: 16,
  },
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  icon: {
    marginRight: 10,
  },
  optionText: {
    fontSize: 16,
  },
});

export default SettingsModal;
