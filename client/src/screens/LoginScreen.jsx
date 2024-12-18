import React, { useContext, useState } from 'react';
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
import { UserContext } from '../context/UserContext.jsx';
import Icon from 'react-native-vector-icons/FontAwesome'; 

const LoginScreen = ({ navigation }) => {
  const { control, handleSubmit, formState: { errors } } = useForm(); 
  const [login, { isLoading }] = useLoginMutation();
  const { t } = useTranslation();
  const { setUser } = useContext(UserContext);
  const [showPassword, setShowPassword] = useState(false); 

  const onSubmit = async (data) => {
    try {
      const result = await login(data).unwrap(); 
      Toast.show({
        type: "success",
        text1: "Login Successful",
        text2: `Welcome back, ${result?.user?.firstName || "User"}! 🎉`,
      });
      setUser(result);
      navigation.replace("Main");
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
          name="email"
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
              value={value}
              onChangeText={onChange}
              onBlur={onBlur}
            />
          )}
        />
        {errors.email && <Text style={styles.errorText}>{errors.email?.message}</Text>}

       
        <View style={styles.passwordContainer}>
          <Controller
            control={control}
            name="password"
            rules={{ required: 'Password is required' }}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                style={styles.input}
                placeholder={t('login.password')}
                secureTextEntry={!showPassword} 
                value={value}
                onChangeText={onChange}
                onBlur={onBlur}
              />
            )}
          />
         
          <TouchableOpacity 
            onPress={() => setShowPassword(!showPassword)} 
            style={styles.icon}>
            <Icon name={showPassword ? 'eye' : 'eye-slash'} size={20} color="gray" />
          </TouchableOpacity>
        </View>
        {errors.password && <Text style={styles.errorText}>{errors.password?.message}</Text>}
      </View>

      <LanguageSwitcher style={styles.languageSwitcher} />

      <TouchableOpacity
        style={styles.button}
        onPress={handleSubmit(onSubmit)}
        disabled={isLoading}
      >
        <Text style={styles.buttonText}>
        {isLoading ? t('login.loggingIn') : t('login.title')}

        </Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate("RegisterScreen")}>
        <Text style={styles.registerText}>{t('login.signUpPrompt')}</Text>
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
    paddingRight: 40,  
  },
  passwordContainer: {
    position: 'relative', 
  },
  icon: {
    position: 'absolute',
    right: 10,  
    top: 15,    
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
  languageSwitcher: {
    marginVertical: 15,  // Adjust vertical margin as needed
  },
  
});

export default LoginScreen;