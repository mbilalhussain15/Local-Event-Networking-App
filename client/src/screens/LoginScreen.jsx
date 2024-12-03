import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

const BASE_URL = 'http://10.0.2.2:4000/api/login';

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    try {
      const response = await axios.post(`${BASE_URL}`, { email, password });
      console.log("response = ",response)
      const { message, token } = response.data;

      if (rememberMe) {
        await AsyncStorage.setItem('userToken', token);
      }

      Alert.alert('Success', message);
      // Navigate to the next screen
      navigation.replace('Home');
    } catch (error) {
        console.log("error = ",error.message)
      Alert.alert('Login Failed', error.response?.data?.message || 'Something went wrong');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.logo}>EVENTHUB</Text>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="abc@email.com"
          keyboardType="email-address"
          value={email}
          onChangeText={setEmail}
        />
        <TextInput
          style={styles.input}
          placeholder="Your password"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />
      </View>
      <View style={styles.rememberContainer}>
        <TouchableOpacity onPress={() => setRememberMe(!rememberMe)}>
          <Text style={[styles.rememberText, rememberMe && styles.checked]}>
            {rememberMe ? '✔ Remember Me' : 'Remember Me'}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('ForgotPasswordScreen')}>
          <Text style={styles.forgotText}>Forgot Password?</Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>SIGN IN</Text>
      </TouchableOpacity>
      <Text style={styles.orText}>OR</Text>
      <View style={styles.socialContainer}>
        <TouchableOpacity style={styles.socialButton}>
          <Text style={styles.socialText}>Login with Google</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.socialButton}>
          <Text style={styles.socialText}>Login with Facebook</Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity onPress={() => navigation.navigate('RegisterScreen')}>
        <Text style={styles.registerText}>Don’t have an account? Sign up</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F9FAFC',
  },
  logo: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#5C3BE7',
  },
  inputContainer: {
    width: '85%',
    marginBottom: 20,
  },
  input: {
    height: 50,
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 10,
    backgroundColor: '#fff',
  },
  rememberContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '85%',
    marginBottom: 20,
  },
  rememberText: {
    fontSize: 14,
    color: '#333',
  },
  checked: {
    color: '#5C3BE7',
  },
  forgotText: {
    fontSize: 14,
    color: '#5C3BE7',
  },
  button: {
    backgroundColor: '#5C3BE7',
    width: '85%',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    marginBottom: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  orText: {
    marginVertical: 10,
    color: '#333',
  },
  socialContainer: {
    width: '85%',
  },
  socialButton: {
    backgroundColor: '#eee',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    marginBottom: 10,
  },
  socialText: {
    color: '#333',
  },
  registerText: {
    marginTop: 20,
    color: '#5C3BE7',
  },
});

export default LoginScreen;
