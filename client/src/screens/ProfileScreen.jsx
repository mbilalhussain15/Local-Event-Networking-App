import React, { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  Button,
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

const ProfileScreen = ({ navigation }) => {
  const [profileData, setProfileData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState(null); // Token for authentication
  const [newLanguage, setNewLanguage] = useState(''); // For updating user language

  // Base URLs
  const USER_API_BASE = 'http://localhost:4000/api';
  const NOTIFICATION_API_BASE = 'http://localhost:4000/api/notifications';

  // Fetch user data
  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const response = await fetch(`${USER_API_BASE}/users/1`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await response.json();
        setProfileData(data);
      } catch (error) {
        console.error('Error fetching profile data:', error);
        Alert.alert('Error', 'Failed to fetch user data.');
      } finally {
        setLoading(false);
      }
    };

    if (token) {
      fetchProfileData();
    } else {
      Alert.alert('Login Required', 'Please log in to view your profile.');
      navigation.navigate('Login'); // Navigate to a Login screen
    }
  }, [token]);

  // Update user language
  const updateUserLanguage = async () => {
    try {
      const response = await fetch(`${USER_API_BASE}/users/1/language`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ language: newLanguage }),
      });
      const data = await response.json();
      Alert.alert('Success', 'Language updated successfully.');
      setProfileData((prev) => ({ ...prev, language: newLanguage }));
    } catch (error) {
      console.error('Error updating language:', error);
      Alert.alert('Error', 'Failed to update language.');
    }
  };

  // Logout user
  const logoutUser = async () => {
    try {
      await fetch(`${USER_API_BASE}/logout`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setToken(null);
      Alert.alert('Logged Out', 'You have been logged out.');
      navigation.navigate('Login'); // Navigate to a Login screen
    } catch (error) {
      console.error('Error logging out:', error);
      Alert.alert('Error', 'Failed to log out.');
    }
  };

  if (loading) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color="#6C5CE7" />
      </View>
    );
  }

  if (!profileData) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>Failed to load profile data.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Profile Header */}
      <View style={styles.header}>
        <Image source={{ uri: profileData.profileImage }} style={styles.profileImage} />
        <Text style={styles.name}>
          {profileData.firstName} {profileData.lastName}
        </Text>
      </View>

      {/* About Me */}
      <View style={styles.about}>
        <Text style={styles.title}>About Me</Text>
        <Text style={styles.description}>
          {profileData.description || 'No description available.'}
        </Text>
      </View>

      {/* Update Language */}
      <View style={styles.languageUpdate}>
        <TextInput
          style={styles.input}
          placeholder="Enter new language"
          value={newLanguage}
          onChangeText={setNewLanguage}
        />
        <TouchableOpacity style={styles.updateButton} onPress={updateUserLanguage}>
          <Text style={styles.updateButtonText}>Update Language</Text>
        </TouchableOpacity>
      </View>

      {/* Logout Button */}
      <Button title="Logout" color="#FF6B6B" onPress={logoutUser} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#F9FAFC',
  },
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    color: 'red',
    fontSize: 16,
  },
  header: {
    alignItems: 'center',
    marginBottom: 20,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 10,
  },
  name: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  about: {
    marginTop: 20,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  description: {
    fontSize: 14,
    color: '#6C757D',
    marginTop: 10,
  },
  languageUpdate: {
    marginTop: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#CCC',
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,
  },
  updateButton: {
    backgroundColor: '#6C5CE7',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  updateButtonText: {
    color: '#FFF',
    fontWeight: 'bold',
  },
});

export default ProfileScreen;
