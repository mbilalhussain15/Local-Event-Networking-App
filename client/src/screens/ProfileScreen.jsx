import React, { useState } from 'react';
import {
  Alert,
  Button,
  Image,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

const ProfileScreen = ({ navigation }) => {
  const [profileImage, setProfileImage] = useState(
    'https://via.placeholder.com/120'
  );
  const [imageModalVisible, setImageModalVisible] = useState(false);
  const [languageModalVisible, setLanguageModalVisible] = useState(false);

  const handleImageOption = (option) => {
    setImageModalVisible(false); // Close the modal
    if (option === 'add') {
      Alert.alert('Add Photo', 'Functionality to add a photo will go here.');
    } else if (option === 'edit') {
      Alert.alert('Edit Photo', 'Functionality to edit the photo will go here.');
    } else if (option === 'delete') {
      setProfileImage(null); // Remove the profile image
      Alert.alert('Delete Photo', 'Profile photo has been deleted.');
    }
  };

  const handleLanguageSelect = (language) => {
    setLanguageModalVisible(false); // Close the modal
    Alert.alert('Language Updated', `Language set to ${language}`);
  };

  const handleLogout = () => {
    navigation.navigate('Login'); // Redirect to Login
  };

  return (
    <View style={styles.container}>
      {/* Profile Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => setImageModalVisible(true)}>
          <Image
            source={
              profileImage
                ? { uri: profileImage }
                : { uri: 'https://via.placeholder.com/120' } // Default placeholder
            }
            style={styles.profileImage}
          />
        </TouchableOpacity>
        <Text style={styles.name}>John Doe</Text>
      </View>

      {/* Language Update Section */}
      <View style={styles.languageUpdate}>
        <TouchableOpacity
          style={styles.updateButton}
          onPress={() => setLanguageModalVisible(true)}
        >
          <Text style={styles.updateButtonText}>Update Language</Text>
        </TouchableOpacity>
      </View>

      {/* Logout Button */}
      <View style={styles.logoutContainer}>
        <Button title="Logout" color="#FF6B6B" onPress={handleLogout} />
      </View>

      {/* Modal for Profile Picture Options */}
      <Modal
        transparent={true}
        visible={imageModalVisible}
        animationType="slide"
        onRequestClose={() => setImageModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Choose an Action</Text>
            <TouchableOpacity
              style={styles.modalButton}
              onPress={() => handleImageOption('add')}
            >
              <Text style={styles.modalButtonText}>Add Photo</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.modalButton}
              onPress={() => handleImageOption('edit')}
            >
              <Text style={styles.modalButtonText}>Edit Photo</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.modalButton, styles.destructiveButton]}
              onPress={() => handleImageOption('delete')}
            >
              <Text style={styles.modalButtonText}>Delete Photo</Text>
            </TouchableOpacity>
            <Button title="Cancel" onPress={() => setImageModalVisible(false)} />
          </View>
        </View>
      </Modal>

      {/* Modal for Language Selection */}
      <Modal
        transparent={true}
        visible={languageModalVisible}
        animationType="slide"
        onRequestClose={() => setLanguageModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Select a Language</Text>
            <TouchableOpacity
              style={styles.modalButton}
              onPress={() => handleLanguageSelect('English')}
            >
              <Text style={styles.modalButtonText}>English</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.modalButton}
              onPress={() => handleLanguageSelect('German')}
            >
              <Text style={styles.modalButtonText}>German</Text>
            </TouchableOpacity>
            <Button title="Cancel" onPress={() => setLanguageModalVisible(false)} />
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#F9FAFC',
  },
  header: {
    alignItems: 'center',
    marginBottom: 20,
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 10,
    borderWidth: 2,
    borderColor: '#6C5CE7',
  },
  name: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  languageUpdate: {
    alignItems: 'center',
    marginVertical: 20,
  },
  updateButton: {
    backgroundColor: '#6C5CE7',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    width: '80%',
  },
  updateButtonText: {
    color: '#FFF',
    fontWeight: 'bold',
  },
  logoutContainer: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    right: 20,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: '#FFF',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
    width: '80%',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  modalButton: {
    width: '100%',
    padding: 15,
    backgroundColor: '#6C5CE7',
    borderRadius: 5,
    marginVertical: 5,
    alignItems: 'center',
  },
  modalButtonText: {
    color: '#FFF',
    fontWeight: 'bold',
  },
  destructiveButton: {
    backgroundColor: '#FF6B6B',
  },
});

export default ProfileScreen;
