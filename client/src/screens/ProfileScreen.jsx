import React, { useState, useEffect, useContext } from 'react';
import {
  View,
  Text,
  Image,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Modal,
  Button,
  Alert,
} from 'react-native';
import { launchImageLibrary, launchCamera } from 'react-native-image-picker';
import { request, PERMISSIONS, RESULTS } from 'react-native-permissions'; 
import { UserContext } from '../context/UserContext';
import { useUpdateUserMutation } from "../redux/slices/api/authApiSlice.js";
import DeviceInfo from 'react-native-device-info';
import NetInfo from '@react-native-community/netinfo';  
import { useTranslation } from 'react-i18next';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Ionicons from 'react-native-vector-icons/Ionicons';

const ProfileScreen = ({ navigation }) => {
  const { t } = useTranslation();
  const { user, setUser } = useContext(UserContext);
  
  if (!user) {
    return (
      <View style={styles.loadingContainer}>
        <Text>Loading...</Text>
      </View>
    );
  }
  useEffect(() => {
    const updateProfileInStorage = async () => {
      if (user) {
        await AsyncStorage.setItem('user', JSON.stringify(user)); // Save the updated user
      }
    };

    updateProfileInStorage();
  }, [user]);

  const [profile, setProfile] = useState({
    firstName: user?.user?.firstName || 'N/A',
    lastName: user?.user?.lastName || 'N/A',
    email: user?.user?.email || 'N/A',
    phone: user?.user?.phone || 'N/A',
    profileImage:  user?.user?.profileImage || null,
  });
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isEditModalVisible, setEditModalVisible] = useState(false);
  const [updatedProfile, setUpdatedProfile] = useState({ ...profile });
  const [updateUser] = useUpdateUserMutation();

const getDeviceIp = async () => {
  try {
    const ip = await DeviceInfo.getIpAddress();
    return ip;
  } catch (error) {
    console.error("Error getting device IP:", error);
    return null;
  }
};


 const updateImageUrlForPlatform = async (url) => {
  if (!url) return null;

  let updatedUrl = url;
  const deviceIp = await getDeviceIp();

  if (Platform.OS === 'android') {
  
    if (DeviceInfo.isEmulator()) {
      updatedUrl = url.replace('http://localhost', 'http://10.0.2.2');
    } else {
      
      updatedUrl = url.replace('http://localhost', `http://${deviceIp}`);
    }
  } else if (Platform.OS === 'ios') {
  
    updatedUrl = url.replace('http://localhost', `http://${deviceIp}`);
  }
 
  if (updatedUrl.includes('localhost')) {
   
    updatedUrl = url; 
  }

  return updatedUrl;
};

useEffect(() => {
  if (profile.profileImage) {
    const updateImage = async () => {
      const newImageUrl = await updateImageUrlForPlatform(profile.profileImage);
      setProfile((prevProfile) => ({
        ...prevProfile,
        profileImage: newImageUrl,
      }));
    };
    updateImage();
  }
}, [profile.profileImage]);


  const validateGermanPhone = (phone) => {
    const regex = /^\+49\d{9,14}$/;
    return regex.test(phone);
  };

  const handleSave = async () => {
    if (!validateGermanPhone(updatedProfile.phone)) {
      Alert.alert('Invalid Phone Number', 'Please enter a valid German phone number.');
      return;
    }
  
    const formData = new FormData();
    formData.append("firstName", updatedProfile.firstName);
    formData.append("lastName", updatedProfile.lastName);
    formData.append("phone", updatedProfile.phone);
  
    if (updatedProfile.profileImage) {
      formData.append("profileImage", {
        uri: updatedProfile.profileImage, 
        name: `profile_${Date.now()}.jpg`, 
        type: "image/jpeg", 
      });
    }
  
    try {
      const response = await updateUser({ id: user.user._id, data: formData }).unwrap();
      setProfile(response.user);
      setUser({ ...user, user: response.user });
      setEditModalVisible(false);
      Alert.alert("Success", "Profile updated successfully.");
    } catch (error) {
      console.error("Update Error: ", error);
      Alert.alert("Error", error.data?.message || "Failed to update profile.");
    }
  };
  

  const handleImageSelect = async () => {
    const permissionStatus = await request(PERMISSIONS.ANDROID.CAMERA);
    const galleryPermission = await request(PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE); 
    if (permissionStatus === RESULTS.GRANTED) {
      Alert.alert('Select Image', 'Choose from Gallery or Camera', [
        {
          text: 'Gallery',
          onPress: () => launchImageLibrary({ mediaType: 'photo' }, handleImageResponse),
        },
        {
          text: 'Camera',
          onPress: () => launchCamera({ mediaType: 'photo' }, handleImageResponse),
        },
      ]);
    } else {
      Alert.alert('Permission Denied', 'You need to grant camera permission to use this feature.');
    }
  };

  const handleImageResponse = (response) => {
    if (response.didCancel) {
      console.log('User canceled image picker');
    } else if (response.errorCode) {
      console.log('Image Picker Error: ', response.errorMessage);
    } else {
      const source = { uri: response.assets[0].uri };
      setUpdatedProfile({ ...updatedProfile, profileImage: source.uri });
    }
  };

  useEffect(() => {
    if (isEditModalVisible) {
      // Initialize the updatedProfile.profileImage with profile's image or default value
      setUpdatedProfile((prevState) => ({
        ...prevState,
        profileImage: profile.profileImage || null, // If no profile image, set null
      }));
    }
  }, [isEditModalVisible]); // This effect triggers when modal visibility changes
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.backButton}>{t('profile.back')}</Text>
        </TouchableOpacity>
        <Text style={styles.title}>{t('profile.title')}</Text>
        <TouchableOpacity onPress={() => setEditModalVisible(true)}>
          <Text style={styles.editButton}>{t('profile.edit')}</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.profileContainer}>
        <Image
          source={
            profile.profileImage
              ? { uri: profile.profileImage }
              : require('../assets/default-profile.png')
          }
          style={styles.profileImage}
        />
        <Text style={styles.profileName}>{`${profile.firstName} ${profile.lastName}`}</Text>
      </View>

      <View style={styles.detailsContainer}>
        <Text style={styles.label}>{t('profile.firstName')}:</Text>
        <TextInput style={styles.input} value={profile.firstName} editable={false} />

        <Text style={styles.label}>{t('profile.lastName')}:</Text>
        <TextInput style={styles.input} value={profile.lastName} editable={false} />

        <Text style={styles.label}>{t('profile.email')}:</Text>
        <TextInput style={styles.input} value={profile.email} editable={false} />

        <Text style={styles.label}>{t('profile.phone')}:</Text>
        <TextInput style={styles.input} value={profile.phone} editable={false} />
      </View>

      <Modal
        visible={isEditModalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setEditModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <TouchableOpacity
              style={styles.closeModalButton}
              onPress={() => setEditModalVisible(false)}
            >
              <Text style={styles.closeButtonText}>×</Text>
            </TouchableOpacity>
            <Text style={styles.modalTitle}>{t('profile.editProfile')}</Text>

            <TouchableOpacity onPress={handleImageSelect}>
              <Image
                source={
                  updatedProfile.profileImage
                    ? { uri: updatedProfile.profileImage }
                    : profile.profileImage
                    ? { uri: profile.profileImage }
                    : require('../assets/default-profile.png')
                }
                style={[styles.profileImage, styles.modalProfileImage]}
              />
            </TouchableOpacity>

            <Text style={styles.label}>{t('profile.firstName')}:</Text>
            <TextInput
              style={styles.input}
              value={updatedProfile.firstName}
              onChangeText={(text) =>
                setUpdatedProfile({ ...updatedProfile, firstName: text })
              }
            />

            <Text style={styles.label}>{t('profile.lastName')}:</Text>
            <TextInput
              style={styles.input}
              value={updatedProfile.lastName}
              onChangeText={(text) =>
                setUpdatedProfile({ ...updatedProfile, lastName: text })
              }
            />

            <Text style={styles.label}>{t('profile.phone')}:</Text>
            <TextInput
              style={styles.input}
              value={updatedProfile.phone}
              onChangeText={(text) =>
                setUpdatedProfile({ ...updatedProfile, phone: text })
              }
              placeholder={t('profile.phonePlaceholder')}
              keyboardType="phone-pad"
            />

            <View style={styles.modalButtons}>
              <Button title={t('profile.save')} onPress={handleSave} color="#007AFF" />
            </View>
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
    backgroundColor: '#F5F5F5',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  backButton: {
    fontSize: 16,
    color: '#007AFF',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  editButton: {
    fontSize: 16,
    color: '#007AFF',
  },
  profileContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 2,
    borderColor: '#007AFF',
  },
  profileName: {
    marginTop: 10,
    fontSize: 18,
    fontWeight: 'bold',
  },
  modalProfileImage: {
    alignSelf: 'center',
  },
  detailsContainer: {
    marginTop: 20,
  },
  label: {
    fontSize: 14,
    color: '#666',
    marginBottom: 5,
  },
  input: {
    backgroundColor: '#FFF',
    padding: 10,
    borderRadius: 5,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#DDD',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: '80%',
    backgroundColor: '#FFF',
    padding: 20,
    borderRadius: 10,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20,
  },
  closeModalButton: {
    position: 'absolute',
    top: 10,
    right: 10,
  },
  closeButtonText: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#333',
  },
});

export default ProfileScreen;