import React from 'react';
import { Controller, useForm } from "react-hook-form";
import { useTranslation } from 'react-i18next';
import {
  Alert,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import Toast from "react-native-toast-message";
import LanguageSwitcher from '../components/LanguageSwitcher';
import { useLoginMutation } from "../redux/slices/api/authApiSlice.js";

const LoginScreen = ({ navigation }) => {
  const { control, handleSubmit, formState: { errors } } = useForm(); // Initialize react-hook-form
  const [login, { isLoading }] = useLoginMutation();
  const { t } = useTranslation();

  // Handling form submission
  const onSubmit = async (data) => {
    try {
      // console.log("data=", data); // Check the data being sent
      const result = await login(data).unwrap(); // Call login API
      Toast.show({
        type: "success",
        text1: "Login Successful",
        text2: `Welcome back, ${result?.name || "User"}! 🎉`, // Example success message
      });
      navigation.replace("Main"); // Redirect to Home Screen
    } catch (error) {
      Alert.alert("Error", error.data?.message || "Login failed");
    }
  };

  return (
    <View style={styles.container}>
      <LanguageSwitcher />
      <Text style={styles.logo}>{t('login.title')}</Text>
      <View style={styles.inputContainer}>
        {/* Email Input */}
        <Controller
          control={control}
          name="email"  // Name of the field
          rules={{
            required: 'Email is required',
            pattern: {
              value: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/i,
              message: 'Invalid email address',
            },
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              style={styles.input}
              placeholder={t('login.email')}
              keyboardType="email-address"
              value={value} // Bind value
              onChangeText={onChange} // Update form state
              onBlur={onBlur} // Trigger validation on blur
            />
          )}
        />
        {errors.email && <Text style={styles.errorText}>{errors.email?.message}</Text>}

        {/* Password Input */}
        <Controller
          control={control}
          name="password"  // Name of the field
          rules={{ required: 'Password is required' }} // Validation rules
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              style={styles.input}
              placeholder={t('login.password')}
              secureTextEntry
              value={value} // Bind value
              onChangeText={onChange} // Update form state
              onBlur={onBlur} // Trigger validation on blur
            />
          )}
        />
        {errors.password && <Text style={styles.errorText}>{errors.password?.message}</Text>}
      </View>

      <TouchableOpacity
        style={styles.button}
        onPress={handleSubmit(onSubmit)} // Wrap onSubmit with handleSubmit
        disabled={isLoading}
      >
        <Text style={styles.buttonText}>
          {isLoading ? "Logging in..." : "Login"}
        </Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate("RegisterScreen")}>
        <Text style={styles.registerText}>Don't have an account? Sign up</Text>
      </TouchableOpacity>
      <Toast />
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
  registerText: {
    marginTop: 20,
    color: '#5C3BE7',
  },
  errorText: {
    color: 'red',
    fontSize: 12,
    marginBottom: 10,
  },
});

export default LoginScreen;
