import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useRegisterMutation } from "../redux/slices/api/authApiSlice.js";
import Toast from "react-native-toast-message";
import {
  Alert,
  KeyboardAvoidingView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Platform,
} from 'react-native';
import LanguageSwitcher from '../components/LanguageSwitcher';

const RegistrationScreen = ({ navigation }) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [language, setLanguage] = useState('English');
  const [errors, setErrors] = useState({});
  const [registerUser, { isLoading }] = useRegisterMutation();
  const { t } = useTranslation();

  const validateForm = () => {
    const newErrors = {};
    if (!firstName) newErrors.firstName = 'First Name is required';
    if (!lastName) newErrors.lastName = 'Last Name is required';
    if (!email) newErrors.email = 'Email is required';
    else if (!/^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/i.test(email)) newErrors.email = 'Invalid email address';
    if (!password) newErrors.password = 'Password is required';
    if (!confirmPassword) newErrors.confirmPassword = 'Confirm Password is required';
    else if (confirmPassword !== password) newErrors.confirmPassword = 'Passwords do not match';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (isLoading) return;

    const isValid = validateForm();
    if (!isValid) return;

    try {
      const mappedData = {
        firstName,
        lastName,
        email,
        password,
        language,
      };

      const result = await registerUser(mappedData).unwrap();
      Toast.show({
        type: "success",
        text1: "Registration Successful",
        text2: `Welcome ${result?.firstName || "User"}! Your account has been created. 🎉`,
      });

      navigation.navigate("Login");
    } catch (error) {
      console.error("Registration error: ", error);
      Alert.alert("Error", error?.data?.message || "Registration failed");
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <LanguageSwitcher />
        <Text style={styles.title}>{t('register.title')}</Text>

        {/* First Name Input */}
        <TextInput
          style={[styles.input, errors.firstName && styles.errorInput]}
          placeholder={t('register.firstName')}
          value={firstName}
          onChangeText={(text) => {
            setFirstName(text);
            if (errors.firstName) {
              setErrors((prev) => ({ ...prev, firstName: null }));
            }
          }}
        />
        {errors.firstName && <Text style={styles.errorText}>{errors.firstName}</Text>}

        {/* Last Name Input */}
        <TextInput
          style={[styles.input, errors.lastName && styles.errorInput]}
          placeholder={t('register.lastName')}
          value={lastName}
          onChangeText={(text) => {
            setLastName(text);
            if (errors.lastName) {
              setErrors((prev) => ({ ...prev, lastName: null }));
            }
          }}
        />
        {errors.lastName && <Text style={styles.errorText}>{errors.lastName}</Text>}

        {/* Email Input */}
        <TextInput
          style={[styles.input, errors.email && styles.errorInput]}
          placeholder={t('register.email')}
          keyboardType="email-address"
          value={email}
          onChangeText={(text) => {
            setEmail(text);
            if (errors.email) {
              setErrors((prev) => ({ ...prev, email: null }));
            }
          }}
        />
        {errors.email && <Text style={styles.errorText}>{errors.email}</Text>}

        {/* Password Input */}
        <TextInput
          style={[styles.input, errors.password && styles.errorInput]}
          placeholder={t('register.password')}
          secureTextEntry
          value={password}
          onChangeText={(text) => {
            setPassword(text);
            if (errors.password) {
              setErrors((prev) => ({ ...prev, password: null }));
            }
          }}
        />
        {errors.password && <Text style={styles.errorText}>{errors.password}</Text>}

        {/* Confirm Password Input */}
        <TextInput
          style={[styles.input, errors.confirmPassword && styles.errorInput]}
          placeholder={t('register.confirmPassword')}
          secureTextEntry
          value={confirmPassword}
          onChangeText={(text) => {
            setConfirmPassword(text);
            if (errors.confirmPassword) {
              setErrors((prev) => ({ ...prev, confirmPassword: null }));
            }
          }}
        />
        {errors.confirmPassword && <Text style={styles.errorText}>{errors.confirmPassword}</Text>}

        {/* Submit Button */}
        <TouchableOpacity
          style={[styles.button, isLoading && { backgroundColor: '#A2A2A2' }]}
          onPress={handleSubmit}
          disabled={isLoading}
        >
          <Text style={styles.buttonText}>
            {isLoading ? "Registering..." : "Sign Up"}
          </Text>
        </TouchableOpacity>

        {/* Navigation to Login Screen */}
        <TouchableOpacity onPress={() => navigation.navigate("Login")}>
          <Text style={styles.signInText}>{t('register.alreadyHaveAccount')}</Text>
        </TouchableOpacity>
        <Toast />
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFC',
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 30,
    color: '#5C3BE7',
  },
  input: {
    width: '100%',
    height: 50,
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 5,
    backgroundColor: '#fff',
  },
  errorInput: {
    borderColor: 'red',
  },
  button: {
    backgroundColor: '#5C3BE7',
    width: '100%',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    marginTop: 15,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  signInText: {
    marginTop: 20,
    color: '#5C3BE7',
  },
  errorText: {
    color: 'red',
    fontSize: 12,
    alignSelf: 'flex-start', // Align error text to the left
    marginBottom: 10,
  },
});

export default RegistrationScreen;
