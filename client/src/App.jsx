import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { Provider } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';

import store from './redux/store'; // Your Redux store
import RootNavigator from './navigation/RootNavigator'; // Handle auth flow

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      const token = await AsyncStorage.getItem('userToken');
      setIsAuthenticated(!!token); // Check if token exists
      setLoading(false);
    };

    checkAuth();
  }, []);

  if (loading) {
    return null; // Optional: Show a loading spinner
  }

  return (
    <Provider store={store}>
      <NavigationContainer>
        <RootNavigator isAuthenticated={isAuthenticated} />
      </NavigationContainer>
    </Provider>
  );
};

export default App;
