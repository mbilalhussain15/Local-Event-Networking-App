import React, { useState } from 'react';
import { TouchableOpacity, Text } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import Icon from 'react-native-vector-icons/Ionicons';
import { useTranslation } from 'react-i18next';
import SettingsModal from '../components/SettingsModal';

import HomeScreen from '../screens/HomeScreen';
import EventsScreen from '../screens/EventsScreen';
import EventDetailsScreen from '../screens/EventDetailsScreen';
import MapScreen from '../screens/MapScreen';
import ProfileScreen from '../screens/ProfileScreen';
import SettingScreen from '../screens/SettingScreen';
import TicketScreen from '../screens/TicketScreen';

const Tab = createBottomTabNavigator();
const EventsStack = createStackNavigator();

const EventsStackNavigator = () => (
  <EventsStack.Navigator>
    <EventsStack.Screen 
      name="Event" 
      component={EventsScreen} 
      options={{ headerShown: false }} 
    />
    <EventsStack.Screen 
      name="EventDetails" 
      component={EventDetailsScreen} 
      options={{ title: 'Event Details' }} 
    />
  </EventsStack.Navigator>
);

const BottomTabs = () => {
  const [isSettingsVisible, setSettingsVisible] = useState(false);

  const { t } = useTranslation();

  const openSettings = () => {
    setSettingsVisible(true);
  };

  const closeSettings = () => {
    setSettingsVisible(false);
  };

  return (
    <>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;


            if (route.name === 'Home') {
              iconName = focused ? 'home' : 'home-outline';
            } else if (route.name === 'Events') {
              iconName = focused ? 'calendar' : 'calendar-outline';
            } else if (route.name === 'Map') {
              iconName = focused ? 'map' : 'map-outline';
            } else if (route.name === 'Tickets') {
              iconName = focused ? 'ticket' : 'ticket-outline';
            } else if (route.name === 'Settings') {
              iconName = focused ? 'settings' : 'settings-outline';
            }

            return <Icon name={iconName} size={size} color={color} />;
          },
          tabBarLabel:  route.name === 'Tickets' ? t('ticket') : t(route.name.toLowerCase()),
          tabBarActiveTintColor: '#5C3BE7',
          tabBarInactiveTintColor: 'gray',
          headerShown: false,
        })}
      >
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="Tickets" component={TicketScreen} />
        <Tab.Screen name="Events" component={EventsStackNavigator} />
        <Tab.Screen name="Map" component={MapScreen} />
        
        <Tab.Screen
          name="Settings"
          component={SettingScreen} 
          listeners={{
            tabPress: (e) => {
              e.preventDefault(); 
              openSettings(); 
            },
          }}
          options={{
            tabBarButton: (props) => (
              <TouchableOpacity {...props} onPress={openSettings}>
                <Icon name="settings-outline" size={24} color="gray" />
                <Text style={{ color: 'gray', fontSize: 12 }}>{t('settings')}</Text>
              </TouchableOpacity>
            ),
          }}
        />
      </Tab.Navigator>

      <SettingsModal
        isVisible={isSettingsVisible}
        closeSettings={closeSettings}
      />
    </>
  );
};

export default BottomTabs;