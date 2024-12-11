// import React, { useState,useContext } from 'react';
// import { TouchableOpacity, Text, StyleSheet, View, TextInput, Alert, ActivityIndicator } from 'react-native';
// import Modal from 'react-native-modal';
// import Icon from 'react-native-vector-icons/Ionicons';
// import { CommonActions, useNavigation } from '@react-navigation/native';
// import { Dropdown } from 'react-native-element-dropdown';
// import { useUpdatePasswordMutation, useUpdateUserLanguageMutation, useLogoutMutation } from '../redux/slices/api/authApiSlice.js';
// import { UserContext } from '../context/UserContext.jsx';
// import Toast from 'react-native-toast-message';

// const SettingsModal = ({ isVisible, closeSettings }) => {
//   const navigation = useNavigation();
//   const [passwordModalVisible, setPasswordModalVisible] = useState(false);
//   const [languageModalVisible, setLanguageModalVisible] = useState(false);
//   const [selectedLanguage, setSelectedLanguage] = useState(null);
//   const [oldPassword, setOldPassword] = useState('');
//   const [newPassword, setNewPassword] = useState('');
//   const [confirmPassword, setConfirmPassword] = useState('');
//   const [isLoading, setIsLoading] = useState(false); 

//   const [updatePassword] = useUpdatePasswordMutation();
//   const [updateUserLanguage] = useUpdateUserLanguageMutation();
//   const [logout] = useLogoutMutation();

//   const { user } = useContext(UserContext);
//   const userId = user?.user?._id;
//   const handleProfile = () => {
//     closeSettings();
//     navigation.navigate('Profile');
//   };

//   const handleChangePassword = () => {
//     closeSettings();
//     setPasswordModalVisible(true);
//   };

//   const handleChangeLanguage = () => {
//     closeSettings();
//     setLanguageModalVisible(true);
//   };

//   const handleLogout = async () => {
//     closeSettings();
  
//     try {

//       await logout().unwrap(); 
  
//       Toast.show({
//         type: 'success',
//         text1: 'Logout Successful',
//         text2: 'You have been logged out successfully.',
//       });
  
//       navigation.dispatch(
//         CommonActions.reset({
//           index: 0,
//           routes: [{ name: 'Login' }],
//         })
//       );
//     } catch (error) {
//       console.error('Logout failed:', error);
  
//       Alert.alert('Error', error?.data?.message || 'Failed to log out. Please try again.');
//     }
//   };

//   const handleSavePassword = async () => {
//     if (newPassword !== confirmPassword) {
//       Alert.alert('Error', 'New password and confirm password do not match.');
//       return;
//     }
  
//     if (!oldPassword || !newPassword || !confirmPassword) {
//       Alert.alert('Error', 'All fields are required.');
//       return;
//     }
  
//     const data = {
//       oldPassword,
//       newPassword,
//       confirmPassword,
//     };
//     setIsLoading(true);
//     try {
//       const response = await updatePassword({
//         userId,
//         data,
//       }).unwrap();
//       Alert.alert('Success', 'Your password has been successfully updated.');
//     } catch (error) {
//       console.error('Password update failed:', error);
//       Alert.alert('Error', error?.data?.message || 'Failed to update password. Please try again.');
//     }
//     finally {
//       setIsLoading(false); 
//     }
//     setPasswordModalVisible(false);
//   };
  
//   const handleSaveLanguage = async () => {
//     if (!selectedLanguage) {
//       Alert.alert('Error', 'Please select a language.');
//       return;
//     }
//     setIsLoading(true);
//     try {
//       const response = await updateUserLanguage({ userId, language: selectedLanguage }).unwrap(); // Replace `1` with actual userId
//       Alert.alert('Success', `Language updated to ${selectedLanguage}`);
//     } catch (error) {
//       console.error('Language update failed:', error);
//       Alert.alert('Error', 'Failed to update language. Please try again.');
//     }
//     finally {
//       setIsLoading(false); 
//     }
//     setLanguageModalVisible(false);
//   };

//   const languages = [
//     { label: 'English', value: 'english' },
//     { label: 'German', value: 'german' },
//   ];

//   return (
//     <>
//       <Modal
//         isVisible={isVisible}
//         onBackdropPress={closeSettings}
//         style={styles.bottomSheet}
//         backdropColor="rgba(0, 0, 0, 0.5)"
//         backdropOpacity={0.5}
//         useNativeDriver
//         hideModalContentWhileAnimating
//       >
//         <View style={styles.sheetContent}>
//           <TouchableOpacity style={styles.closeButton} onPress={closeSettings}>
//             <Icon name="close" size={24} color="black" />
//           </TouchableOpacity>

//           <TouchableOpacity style={styles.option} onPress={handleProfile}>
//             <Icon name="person" size={20} color="gray" style={styles.icon} />
//             <Text style={styles.optionText}>Profile</Text>
//           </TouchableOpacity>
//           <TouchableOpacity style={styles.option} onPress={handleChangePassword}>
//             <Icon name="key" size={20} color="gray" style={styles.icon} />
//             <Text style={styles.optionText}>Change Password</Text>
//           </TouchableOpacity>
//           <TouchableOpacity style={styles.option} onPress={handleChangeLanguage}>
//             <Icon name="language" size={20} color="gray" style={styles.icon} />
//             <Text style={styles.optionText}>Change Language</Text>
//           </TouchableOpacity>
//           <TouchableOpacity style={styles.option} onPress={handleLogout}>
//             <Icon name="log-out" size={20} color="gray" style={styles.icon} />
//             <Text style={styles.optionText}>Logout</Text>
//           </TouchableOpacity>
//         </View>
//       </Modal>

//       {/* Change Password Modal */}
//       <Modal isVisible={passwordModalVisible} onBackdropPress={() => setPasswordModalVisible(false)}>
//         <View style={styles.modalContent}>
//           <TouchableOpacity style={styles.modalCloseIcon} onPress={() => setPasswordModalVisible(false)}>
//             <Icon name="close-circle" size={24} color="gray" />
//           </TouchableOpacity>
//           <Text style={styles.label}>Change Password</Text>
//           <TextInput
//             style={styles.input}
//             placeholder="Old Password"
//             secureTextEntry
//             value={oldPassword}
//             onChangeText={setOldPassword}
//           />
//           <TextInput
//             style={styles.input}
//             placeholder="New Password"
//             secureTextEntry
//             value={newPassword}
//             onChangeText={setNewPassword}
//           />
//           <TextInput
//             style={styles.input}
//             placeholder="Confirm Password"
//             secureTextEntry
//             value={confirmPassword}
//             onChangeText={setConfirmPassword}
//           />
//           <TouchableOpacity
//             disabled={isLoading}
//             style={styles.lightBlueButton}
//             onPress={isLoading ? null : handleSavePassword} >
//             {isLoading ? (
//                 <ActivityIndicator size="small" color="#fff" />
//               ) : (
//                 <Text style={styles.saveButtonText}>Save</Text>
//               )}
//           </TouchableOpacity>
//         </View>
//       </Modal>

//       {/* Change Language Modal */}
//       <Modal isVisible={languageModalVisible} onBackdropPress={() => setLanguageModalVisible(false)}>
//         <View style={styles.modalContent}>
//           <TouchableOpacity style={styles.modalCloseIcon} onPress={() => setLanguageModalVisible(false)}>
//             <Icon name="close-circle" size={24} color="gray" />
//           </TouchableOpacity>
//           <Text style={styles.label}>Select Language:</Text>
//           <Dropdown
//             style={styles.dropdown}
//             data={languages}
//             search
//             searchPlaceholder="Search..."
//             labelField="label"
//             valueField="value"
//             placeholder="Select a language"
//             value={selectedLanguage}
//             onChange={(item) => setSelectedLanguage(item.value)}
//           />
//           <TouchableOpacity
//             style={styles.lightBlueButton}
//             onPress={isLoading ? null : handleSaveLanguage} 
//             disabled={isLoading} 
//           >
//             {isLoading ? (
//               <ActivityIndicator size="small" color="#fff" />
//             ) : (
//               <Text style={styles.saveButtonText}>Save</Text>
//             )}
//           </TouchableOpacity>
//         </View>
//       </Modal>
//     </>
//   );
// };

// const styles = StyleSheet.create({
//   bottomSheet: {
//     margin: 0,
//     justifyContent: 'flex-end',
//     height: '60%',
//   },
//   sheetContent: {
//     backgroundColor: 'white',
//     borderTopLeftRadius: 16,
//     borderTopRightRadius: 16,
//     padding: 16,
//   },
//   closeButton: {
//     alignSelf: 'flex-end',
//     marginBottom: 16,
//   },
//   option: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     paddingVertical: 12,
//     borderBottomWidth: 1,
//     borderBottomColor: '#eee',
//   },
//   icon: {
//     marginRight: 10,
//   },
//   optionText: {
//     fontSize: 16,
//   },
//   modalContent: {
//     backgroundColor: 'white',
//     padding: 20,
//     borderRadius: 10,
//     alignItems: 'center',
//     position: 'relative',
//   },
//   modalCloseIcon: {
//     position: 'absolute',
//     top: 10,
//     right: 10,
//     zIndex: 1,
//   },
//   label: {
//     fontSize: 16,
//     marginBottom: 10,
//     marginTop:20,
//     fontWeight:'bold'
//   },
//   dropdown: {
//     width: '100%',
//     height: 50,
//     borderWidth: 1,
//     borderColor: '#ccc',
//     borderRadius: 5,
//     paddingHorizontal: 10,
//     marginBottom: 20,
//   },
//   input: {
//     width: '100%',
//     padding: 10,
//     marginVertical: 10,
//     borderWidth: 1,
//     borderColor: '#ccc',
//     borderRadius: 5,
//   },
//   lightBlueButton: {
//     backgroundColor: '#0080FF',
//     paddingVertical: 10,
//     paddingHorizontal: 20,
//     borderRadius: 5,
//     marginTop: 20,
//   },
//   saveButtonText: {
//     color: 'white',
//     fontWeight: 'bold',
//   },
// });

// export default SettingsModal;

import React, { useState, useContext } from 'react';
import { TouchableOpacity, Text, StyleSheet, View, TextInput, Alert, ActivityIndicator } from 'react-native';
import Modal from 'react-native-modal';
import Icon from 'react-native-vector-icons/Ionicons';
import { CommonActions, useNavigation } from '@react-navigation/native';
import { Dropdown } from 'react-native-element-dropdown';
import { useUpdatePasswordMutation, useUpdateUserLanguageMutation, useLogoutMutation } from '../redux/slices/api/authApiSlice.js';
import { UserContext } from '../context/UserContext.jsx';
import Toast from 'react-native-toast-message';
import { useTranslation } from 'react-i18next'; // Importing the translation hook

const SettingsModal = ({ isVisible, closeSettings }) => {
  const { t } = useTranslation(); // Initialize the translation function
  const navigation = useNavigation();
  const [passwordModalVisible, setPasswordModalVisible] = useState(false);
  const [languageModalVisible, setLanguageModalVisible] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState(null);
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false); 

  const [updatePassword] = useUpdatePasswordMutation();
  const [updateUserLanguage] = useUpdateUserLanguageMutation();
  const [logout] = useLogoutMutation();

  const { user } = useContext(UserContext);
  const userId = user?.user?._id;
  const handleProfile = () => {
    closeSettings();
    navigation.navigate('Profile');
  };

  const handleChangePassword = () => {
    closeSettings();
    setPasswordModalVisible(true);
  };

  const handleChangeLanguage = () => {
    closeSettings();
    setLanguageModalVisible(true);
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

  const handleSavePassword = async () => {
    if (newPassword !== confirmPassword) {
      Alert.alert(t('Error'), t('New password and confirm password do not match.'));
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
      const response = await updatePassword({
        userId,
        data,
      }).unwrap();
      Alert.alert(t('Success'), t('Your password has been successfully updated.'));
    } catch (error) {
      console.error('Password update failed:', error);
      Alert.alert(t('Error'), error?.data?.message || t('Failed to update password. Please try again.'));
    }
    finally {
      setIsLoading(false); 
    }
    setPasswordModalVisible(false);
  };
  
  const handleSaveLanguage = async () => {
    if (!selectedLanguage) {
      Alert.alert(t('Error'), t('Please select a language.'));
      return;
    }
    setIsLoading(true);
    try {
      const response = await updateUserLanguage({ userId, language: selectedLanguage }).unwrap();
      Alert.alert(t('Success'), t('Language updated to') + ` ${selectedLanguage}`);
    } catch (error) {
      console.error('Language update failed:', error);
      Alert.alert(t('Error'), t('Failed to update language. Please try again.'));
    }
    finally {
      setIsLoading(false); 
    }
    setLanguageModalVisible(false);
  };

  const languages = [
    { label: t('English'), value: 'english' },
    { label: t('German'), value: 'german' },
  ];

  return (
    <>
      <Modal
        isVisible={isVisible}
        onBackdropPress={closeSettings}
        style={styles.bottomSheet}
        backdropColor="rgba(0, 0, 0, 0.5)"
        backdropOpacity={0.5}
        useNativeDriver
        hideModalContentWhileAnimating
      >
        <View style={styles.sheetContent}>
          <TouchableOpacity style={styles.closeButton} onPress={closeSettings}>
            <Icon name="close" size={24} color="black" />
          </TouchableOpacity>

          <TouchableOpacity style={styles.option} onPress={handleProfile}>
            <Icon name="person" size={20} color="gray" style={styles.icon} />
            <Text style={styles.optionText}>{t('Profile')}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.option} onPress={handleChangePassword}>
            <Icon name="key" size={20} color="gray" style={styles.icon} />
            <Text style={styles.optionText}>{t('Change Password')}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.option} onPress={handleChangeLanguage}>
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
      <Modal isVisible={passwordModalVisible} onBackdropPress={() => setPasswordModalVisible(false)}>
        <View style={styles.modalContent}>
          <TouchableOpacity style={styles.modalCloseIcon} onPress={() => setPasswordModalVisible(false)}>
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

      {/* Change Language Modal */}
      <Modal isVisible={languageModalVisible} onBackdropPress={() => setLanguageModalVisible(false)}>
        <View style={styles.modalContent}>
          <TouchableOpacity style={styles.modalCloseIcon} onPress={() => setLanguageModalVisible(false)}>
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
    </>
  );
};

const styles = StyleSheet.create({
  bottomSheet: {
    margin: 0,
    justifyContent: 'flex-end',
    height: '60%',
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
});

export default SettingsModal;
