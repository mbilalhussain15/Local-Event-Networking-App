import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import LoginScreen from '../screens/LoginScreen';
import RegistrationScreen from '../screens/RegistrationScreen';
import BottomTabs from './BottomTabs';
import ProfileScreen from '../screens/ProfileScreen';
import EventDetailsScreen from '../screens/EventDetailsScreen';

const Stack = createStackNavigator();

const RootNavigator = ({ isAuthenticated }) => {
  return (
    <Stack.Navigator
      initialRouteName={isAuthenticated ? 'Main' : 'Login'}
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="RegisterScreen" component={RegistrationScreen} />
      <Stack.Screen name="Main" component={BottomTabs} />
      <Stack.Screen name="Profile" component={ProfileScreen} />
      <Stack.Screen name="eventDetails" component={EventDetailsScreen} />
    </Stack.Navigator>
  );
};

export default RootNavigator;
