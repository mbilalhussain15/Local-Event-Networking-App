import React, { useState } from 'react';
import { TouchableOpacity, Text, StyleSheet, View, TextInput, Alert } from 'react-native';
import Modal from 'react-native-modal';
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import { Dropdown } from 'react-native-element-dropdown';

const SettingsModal = ({ isVisible, closeSettings }) => {
  const navigation = useNavigation();
  const [passwordModalVisible, setPasswordModalVisible] = useState(false);
  const [languageModalVisible, setLanguageModalVisible] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState(null);
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

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

  const handleLogout = () => {
    closeSettings();
    navigation.navigate('Login');
  };

  const handleSavePassword = () => {
    console.log('Old Password:', oldPassword);
    console.log('New Password:', newPassword);
    console.log('Confirm Password:', confirmPassword);
    Alert.alert('Password Saved', 'Your password has been successfully updated.');
    setPasswordModalVisible(false);
  };

  const handleSaveLanguage = () => {
    console.log('Selected Language:', selectedLanguage);
    Alert.alert('Language Saved', `You have selected: ${selectedLanguage}`);
    setLanguageModalVisible(false);
  };

  const languages = [
    { label: 'English', value: 'english' },
    { label: 'German', value: 'german' },
    { label: 'Spanish', value: 'spanish' },
    { label: 'French', value: 'french' },
    { label: 'Chinese', value: 'chinese' },
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
            <Text style={styles.optionText}>Profile</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.option} onPress={handleChangePassword}>
            <Icon name="key" size={20} color="gray" style={styles.icon} />
            <Text style={styles.optionText}>Change Password</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.option} onPress={handleChangeLanguage}>
            <Icon name="language" size={20} color="gray" style={styles.icon} />
            <Text style={styles.optionText}>Change Language</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.option} onPress={handleLogout}>
            <Icon name="log-out" size={20} color="gray" style={styles.icon} />
            <Text style={styles.optionText}>Logout</Text>
          </TouchableOpacity>
        </View>
      </Modal>

      {/* Change Password Modal */}
      <Modal isVisible={passwordModalVisible} onBackdropPress={() => setPasswordModalVisible(false)}>
        <View style={styles.modalContent}>
          <TouchableOpacity style={styles.modalCloseIcon} onPress={() => setPasswordModalVisible(false)}>
            <Icon name="close-circle" size={24} color="gray" />
          </TouchableOpacity>
          <Text style={styles.label}>Change Password</Text>
          <TextInput
            style={styles.input}
            placeholder="Old Password"
            secureTextEntry
            value={oldPassword}
            onChangeText={setOldPassword}
          />
          <TextInput
            style={styles.input}
            placeholder="New Password"
            secureTextEntry
            value={newPassword}
            onChangeText={setNewPassword}
          />
          <TextInput
            style={styles.input}
            placeholder="Confirm Password"
            secureTextEntry
            value={confirmPassword}
            onChangeText={setConfirmPassword}
          />
          <TouchableOpacity style={styles.lightBlueButton} onPress={handleSavePassword}>
            <Text style={styles.saveButtonText}>Save</Text>
          </TouchableOpacity>
        </View>
      </Modal>

      {/* Change Language Modal */}
      <Modal isVisible={languageModalVisible} onBackdropPress={() => setLanguageModalVisible(false)}>
        <View style={styles.modalContent}>
          <TouchableOpacity style={styles.modalCloseIcon} onPress={() => setLanguageModalVisible(false)}>
            <Icon name="close-circle" size={24} color="gray" />
          </TouchableOpacity>
          <Text style={styles.label}>Select Language:</Text>
          <Dropdown
            style={styles.dropdown}
            data={languages}
            search
            searchPlaceholder="Search..."
            labelField="label"
            valueField="value"
            placeholder="Select a language"
            value={selectedLanguage}
            onChange={(item) => setSelectedLanguage(item.value)}
          />
          <TouchableOpacity style={styles.lightBlueButton} onPress={handleSaveLanguage}>
            <Text style={styles.saveButtonText}>
              Save {selectedLanguage ? `(${selectedLanguage})` : ''}
            </Text>
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





































// import React, { useState } from 'react';
// import { TouchableOpacity, Text, StyleSheet, View, TextInput } from 'react-native';
// import Modal from 'react-native-modal';
// import Icon from 'react-native-vector-icons/Ionicons';
// import { useNavigation } from '@react-navigation/native';
// import { Dropdown } from 'react-native-element-dropdown';

// const SettingsModal = ({ isVisible, closeSettings }) => {
//   const navigation = useNavigation();
//   const [passwordModalVisible, setPasswordModalVisible] = useState(false);
//   const [languageModalVisible, setLanguageModalVisible] = useState(false);
//   const [selectedLanguage, setSelectedLanguage] = useState(null);

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

//   const handleLogout = () => {
//     closeSettings();
//     navigation.navigate('Login');
//   };

//   const languages = [
//     { label: 'English', value: 'english' },
//     { label: 'German', value: 'german' },
//     { label: 'Spanish', value: 'spanish' },
//     { label: 'French', value: 'french' },
//     { label: 'Chinese', value: 'chinese' },
    
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
//           <TextInput style={styles.input} placeholder="Old Password" secureTextEntry />
//           <TextInput style={styles.input} placeholder="New Password" secureTextEntry />
//           <TextInput style={styles.input} placeholder="Confirm Password" secureTextEntry />
//           <TouchableOpacity style={styles.saveButton} onPress={() => setPasswordModalVisible(false)}>
//             <Text style={styles.saveButtonText}>Save</Text>
//           </TouchableOpacity>
//         </View>
//       </Modal>
      

//       {/* Change Language Modal */}
//       <Modal isVisible={languageModalVisible} onBackdropPress={() => setLanguageModalVisible(false)}>
//         <View style={styles.modalContent}>
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
//             onChange={(item) => {
//               setSelectedLanguage(item.value);
//             }}
//           />
//           <TouchableOpacity style={styles.saveButton} onPress={() => setLanguageModalVisible(false)}>
//             <Text style={styles.saveButtonText}>
//               Save {selectedLanguage ? `(${selectedLanguage})` : ''}
//             </Text>
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
//   },
//   label: {
//     fontSize: 16,
//     marginBottom: 10,
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
//     input: {
//     width: '100%',
//     padding: 10,
//     marginVertical: 10,
//     borderWidth: 1,
//     borderColor: '#ccc',
//     borderRadius: 5,
//   },
//   saveButton: {
//     backgroundColor: '#87CEEB',
//     paddingVertical: 10,
//     paddingHorizontal: 20,
//     borderRadius: 5,
//   },
//   saveButtonText: {
//     color: 'white',
//     fontWeight: 'bold',
//   },
// });

// export default SettingsModal;























// import React, { useState } from 'react';
// import { TouchableOpacity, Text, StyleSheet, View, ScrollView, TextInput } from 'react-native';
// import Modal from 'react-native-modal';
// import Icon from 'react-native-vector-icons/Ionicons';
// import { useNavigation } from '@react-navigation/native';


// const SettingsModal = ({ isVisible, closeSettings }) => {

//   const navigation = useNavigation();
//   const [passwordModalVisible, setPasswordModalVisible] = useState(false);
//   const [languageModalVisible, setLanguageModalVisible] = useState(false);

//   const handleProfile = () => {
//     closeSettings();
//     navigation.navigate('Profile'); // Ensure 'Profile' is part of your navigation routes
//   };

//   const handleChangePassword = () => {
//     closeSettings();
//     setPasswordModalVisible(true);
//   };

//   const handleChangeLanguage = () => {
//     closeSettings();
//     setLanguageModalVisible(true);
//   };

//   const handleLogout = () => {
//     closeSettings();
//     navigation.navigate('Login'); // Ensure 'Login' is part of your navigation routes
//   };

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

//           <ScrollView contentContainerStyle={styles.scrollContainer}>
//             <TouchableOpacity style={styles.option} onPress={handleProfile}>
//               <Icon name="person" size={20} color="gray" style={styles.icon} />
//               <Text style={styles.optionText}>Profile</Text>
//             </TouchableOpacity>
//             <TouchableOpacity style={styles.option} onPress={handleChangePassword}>
//               <Icon name="key" size={20} color="gray" style={styles.icon} />
//               <Text style={styles.optionText}>Change Password</Text>
//             </TouchableOpacity>
//             <TouchableOpacity style={styles.option} onPress={handleChangeLanguage}>
//               <Icon name="language" size={20} color="gray" style={styles.icon} />
//               <Text style={styles.optionText}>Change Language</Text>
//             </TouchableOpacity>
//             <TouchableOpacity style={styles.option} onPress={handleLogout}>
//               <Icon name="log-out" size={20} color="gray" style={styles.icon} />
//               <Text style={styles.optionText}>Logout</Text>
//             </TouchableOpacity>
//           </ScrollView>
//         </View>
//       </Modal>

//       {/* Change Password Modal */}
//       <Modal isVisible={passwordModalVisible} onBackdropPress={() => setPasswordModalVisible(false)}>
//         <View style={styles.modalContent}>
//           <TextInput style={styles.input} placeholder="Old Password" secureTextEntry />
//           <TextInput style={styles.input} placeholder="New Password" secureTextEntry />
//           <TextInput style={styles.input} placeholder="Confirm Password" secureTextEntry />
//           <TouchableOpacity style={styles.saveButton} onPress={() => setPasswordModalVisible(false)}>
//             <Text style={styles.saveButtonText}>Save</Text>
//           </TouchableOpacity>
//         </View>
//       </Modal>

//       {/* Change Language Modal */}
//       <Modal isVisible={languageModalVisible} onBackdropPress={() => setLanguageModalVisible(false)}>
//         <View style={styles.modalContent}>
//           <Text>Select Language:</Text>
//           {/* Replace below with your dropdown component */}
//           <TextInput style={styles.input} placeholder="Select Language" />
//           <TouchableOpacity style={styles.saveButton} onPress={() => setLanguageModalVisible(false)}>
//             <Text style={styles.saveButtonText}>Save</Text>
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
//   scrollContainer: {
//     paddingBottom: 20,
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
//   },
//   input: {
//     width: '100%',
//     padding: 10,
//     marginVertical: 10,
//     borderWidth: 1,
//     borderColor: '#ccc',
//     borderRadius: 5,
//   },
//   saveButton: {
//     backgroundColor: 'blue',
//     paddingVertical: 10,
//     paddingHorizontal: 20,
//     borderRadius: 5,
//   },
//   saveButtonText: {
//     color: 'white',
//     fontWeight: 'bold',
//   },
// });

// export default SettingsModal;


















// import React from 'react';
// import { TouchableOpacity, Text, StyleSheet, View, ScrollView } from 'react-native';
// import Modal from 'react-native-modal';
// import Icon from 'react-native-vector-icons/Ionicons';

// const SettingsModal = ({ isVisible, closeSettings }) => {
//   return (
//     <Modal
//       isVisible={isVisible}
//       onBackdropPress={closeSettings}
//       style={styles.bottomSheet}
//       backdropColor="rgba(0, 0, 0, 0.5)"
//       backdropOpacity={0.5}
//       useNativeDriver
//       hideModalContentWhileAnimating
//     >
//       <View style={styles.sheetContent}>
//         <TouchableOpacity style={styles.closeButton} onPress={closeSettings}>
//           <Icon name="close" size={24} color="black" />
//         </TouchableOpacity>

//         <ScrollView contentContainerStyle={styles.scrollContainer}>
//           <TouchableOpacity style={styles.option} onPress={() => alert('Profile')}>
//             <Icon name="person" size={20} color="gray" style={styles.icon} />
//             <Text style={styles.optionText}>Profile</Text>
//           </TouchableOpacity>
//           <TouchableOpacity style={styles.option} onPress={() => alert('Change Password')}>
//             <Icon name="key" size={20} color="gray" style={styles.icon} />
//             <Text style={styles.optionText}>Change Password</Text>
//           </TouchableOpacity>
//           <TouchableOpacity style={styles.option} onPress={() => alert('Change Language')}>
//             <Icon name="language" size={20} color="gray" style={styles.icon} />
//             <Text style={styles.optionText}>Change Language</Text>
//           </TouchableOpacity>
//           <TouchableOpacity style={styles.option} onPress={() => alert('Logout')}>
//             <Icon name="log-out" size={20} color="gray" style={styles.icon} />
//             <Text style={styles.optionText}>Logout</Text>
//           </TouchableOpacity>
//         </ScrollView>
//       </View>
//     </Modal>
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
//   scrollContainer: {
//     paddingBottom: 20,
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
// });

// export default SettingsModal;
