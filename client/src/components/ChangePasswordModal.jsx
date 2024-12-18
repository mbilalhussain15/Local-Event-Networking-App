import React, { useState,useContext } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, ActivityIndicator } from 'react-native';
import Modal from 'react-native-modal';
import Icon from 'react-native-vector-icons/Ionicons';
import { useUpdatePasswordMutation } from '../redux/slices/api/authApiSlice';
import { useTranslation } from 'react-i18next';
import { UserContext } from '../context/UserContext';

const ChangePasswordModal = ({ isVisible, closeModal }) => {
  const { t } = useTranslation();
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { user } = useContext(UserContext);
  const [updatePassword] = useUpdatePasswordMutation();

  const userId = user?.user?._id;

  const handleSavePassword = async () => {
    if (newPassword !== confirmPassword) {
      Alert.alert(t('Error'), t('Passwords do not match.'));
      return;
    }

     if (!oldPassword || !newPassword || !confirmPassword) {
      Alert.alert(t('Error'), t('All fields are required.'));
      return;
    }
  
    const data = {
      oldPassword,
      newPassword,
      confirmPassword,
    };
    setIsLoading(true);
    try {
      await updatePassword({ userId, data }).unwrap();
      Alert.alert(t('Success'), t('Password updated successfully.'));
    } catch (error) {
      Alert.alert(t('Error'), error?.data?.message || t('Password update failed.'));
    } finally {
      setIsLoading(false);
    }
    closeModal();
  };

  return (
         <Modal isVisible={isVisible} onBackdropPress={closeModal}>
        <View style={styles.modalContent}>
          <TouchableOpacity style={styles.modalCloseIcon}  onPress={() => closeModal()}>
            <Icon name="close-circle" size={24} color="gray" />
          </TouchableOpacity>
          <Text style={styles.label}>{t('Change Password')}</Text>
          <TextInput
            style={styles.input}
            placeholder={t('Old Password')}
            secureTextEntry
            value={oldPassword}
            onChangeText={setOldPassword}
          />
          <TextInput
            style={styles.input}
            placeholder={t('New Password')}
            secureTextEntry
            value={newPassword}
            onChangeText={setNewPassword}
          />
          <TextInput
            style={styles.input}
            placeholder={t('Confirm Password')}
            secureTextEntry
            value={confirmPassword}
            onChangeText={setConfirmPassword}
          />
          <TouchableOpacity
            disabled={isLoading}
            style={styles.lightBlueButton}
            onPress={isLoading ? null : handleSavePassword} >
            {isLoading ? (
                <ActivityIndicator size="small" color="#fff" />
              ) : (
                <Text style={styles.saveButtonText}>{t('Save')}</Text>
              )}
          </TouchableOpacity>
        </View>
      </Modal>
  );
};

const styles = StyleSheet.create({

    modalCloseIcon: {
    position: 'absolute',
    top: 10,
    right: 10,
    zIndex: 1,
  },
  input: {
    width: '100%',
    padding: 10,
    marginVertical: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
  },
  lightBlueButton: {
    backgroundColor: '#0080FF',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginTop: 20,
  },
  saveButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },

   modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
    position: 'relative',
  },
  label: {
    fontSize: 16,
    marginBottom: 10,
    marginTop:20,
    fontWeight:'bold'
  },
});

export default ChangePasswordModal;
