import React, { useState,useContext } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert, ActivityIndicator } from 'react-native';
import Modal from 'react-native-modal';
import { Dropdown } from 'react-native-element-dropdown';
import { useUpdateUserLanguageMutation } from '../redux/slices/api/authApiSlice';
import { useTranslation } from 'react-i18next';
import Icon from 'react-native-vector-icons/Ionicons';
import { UserContext } from '../context/UserContext';


const ChangeLanguageModal = ({ isVisible, closeModal }) => {
  const { t } = useTranslation();
  const [selectedLanguage, setSelectedLanguage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const { user } = useContext(UserContext);
  const [updateUserLanguage] = useUpdateUserLanguageMutation();
  
  const userId = user?.user?._id;
  const languages = [
    { label: t('English'), value: 'english' },
    { label: t('German'), value: 'german' },
  ];

  const handleSaveLanguage = async () => {
    if (!selectedLanguage) {
      Alert.alert(t('Error'), t('Please select a language.'));
      return;
    }

    setIsLoading(true);
    try {
      await updateUserLanguage({ userId, language: selectedLanguage }).unwrap();
      Alert.alert(t('Success'), t('Language updated successfully.'));
    } catch (error) {
      Alert.alert(t('Error'), t('Failed to update language.'));
    } finally {
      setIsLoading(false);
    }
    closeModal();

  };

  return (
         <Modal isVisible={isVisible} onBackdropPress={closeModal}>
        <View style={styles.modalContent}>
          <TouchableOpacity style={styles.modalCloseIcon} onPress={() => closeModal()}>
            <Icon name="close-circle" size={24} color="gray" />
          </TouchableOpacity>
          <Text style={styles.label}>{t('Select Language')}:</Text>
          <Dropdown
            style={styles.dropdown}
            data={languages}
            search
            searchPlaceholder={t('Search...')}
            labelField="label"
            valueField="value"
            placeholder={t('Select a language')}
            value={selectedLanguage}
            onChange={(item) => setSelectedLanguage(item.value)}
          />
          <TouchableOpacity
            style={styles.lightBlueButton}
            onPress={isLoading ? null : handleSaveLanguage} 
            disabled={isLoading} 
          >
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

    modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
    position: 'relative',
  },

  modalCloseIcon: {
    position: 'absolute',
    top: 10,
    right: 10,
    zIndex: 1,
  },
  label: {
    fontSize: 16,
    marginBottom: 10,
    marginTop:20,
    fontWeight:'bold'
  },
  dropdown: {
    width: '100%',
    height: 50,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 20,
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



});

export default ChangeLanguageModal;
