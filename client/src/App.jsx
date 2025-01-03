import './i18n';
import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { Provider } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import store from './redux/store'; 
import RootNavigator from './navigation/RootNavigator'; 
import { UserProvider } from './context/UserContext';

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      const token = await AsyncStorage.getItem('userToken');
      setIsAuthenticated(!!token);
      setLoading(false);
    };

    checkAuth();
  }, []);

  if (loading) {
    return null; 
  }

  return (
    <Provider store={store}>
      <UserProvider>
        <NavigationContainer>
          <RootNavigator isAuthenticated={isAuthenticated} />
        </NavigationContainer>
      </UserProvider>
    </Provider>
  );
};

export default App;
