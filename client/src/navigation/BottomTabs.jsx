import React, { useState } from 'react';
import { TouchableOpacity, Text, StyleSheet, View, Dimensions } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons';
import SettingsModal from '../components/SettingsModal'; // Import the modal component

import HomeScreen from '../screens/HomeScreen';
import EventsScreen from '../screens/EventsScreen';
import MapScreen from '../screens/MapScreen';
import ProfileScreen from '../screens/ProfileScreen';
import SettingScreen from '../screens/SettingScreen';

const Tab = createBottomTabNavigator();

const BottomTabs = () => {
  const [isSettingsVisible, setSettingsVisible] = useState(false);

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
            } else if (route.name === 'Profile') {
              iconName = focused ? 'person' : 'person-outline';
            } else if (route.name === 'Settings') {
              iconName = focused ? 'settings' : 'settings-outline';
            }

            return <Icon name={iconName} size={size} color={color} />;
          },
          tabBarLabel: route.name === 'Settings' ? 'Settings' : route.name,
          tabBarActiveTintColor: '#5C3BE7',
          tabBarInactiveTintColor: 'gray',
          headerShown: false,
        })}
      >
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="Events" component={EventsScreen} />
        <Tab.Screen name="Map" component={MapScreen} />
        <Tab.Screen name="Profile" component={ProfileScreen} />

        <Tab.Screen
          name="Settings"
          component={SettingScreen} // Empty screen to trigger modal
          listeners={{
            tabPress: (e) => {
              e.preventDefault(); // Prevent navigation to a new screen
              openSettings(); // Open the modal when clicked
            },
          }}
          options={{
            tabBarButton: (props) => (
              <TouchableOpacity {...props} onPress={openSettings}>
                <Icon name="settings-outline" size={24} color="gray" />
                <Text style={{ color: 'gray', fontSize: 12 }}>Settings</Text>
              </TouchableOpacity>
            ),
          }}
        />
      </Tab.Navigator>

      {/* Use the SettingsModal component */}
      <SettingsModal
        isVisible={isSettingsVisible}
        closeSettings={closeSettings}
      />
    </>
  );
};

export default BottomTabs;



























// import React, { useState } from 'react';
// import { TouchableOpacity, Text, StyleSheet, View, ScrollView, Dimensions } from 'react-native';
// import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
// import Icon from 'react-native-vector-icons/Ionicons';
// import Modal from 'react-native-modal';

// import HomeScreen from '../screens/HomeScreen';
// import EventsScreen from '../screens/EventsScreen';
// import MapScreen from '../screens/MapScreen';
// import ProfileScreen from '../screens/ProfileScreen';

// const Tab = createBottomTabNavigator();

// const BottomTabs = () => {
//   const [isSettingsVisible, setSettingsVisible] = useState(false);

//   const openSettings = () => {
//     setSettingsVisible(true);
//   };

//   const closeSettings = () => {
//     setSettingsVisible(false);
//   };

//   // Empty component for the "More" tab
//   const EmptyScreen = () => null;

//   return (
//     <>
//       <Tab.Navigator
//         screenOptions={({ route }) => ({
//           tabBarIcon: ({ focused, color, size }) => {
//             let iconName;

//             if (route.name === 'Home') {
//               iconName = focused ? 'home' : 'home-outline';
//             } else if (route.name === 'Events') {
//               iconName = focused ? 'calendar' : 'calendar-outline';
//             } else if (route.name === 'Map') {
//               iconName = focused ? 'map' : 'map-outline';
//             } else if (route.name === 'Profile') {
//               iconName = focused ? 'person' : 'person-outline';
//             } else if (route.name === 'More') {
//               // Change the icon to settings
//               iconName = focused ? 'settings' : 'settings-outline';
//             }

//             return <Icon name={iconName} size={size} color={color} />;
//           },
//           tabBarLabel: route.name === 'More' ? 'Settings' : route.name,  // Change label to "Settings"
//           tabBarActiveTintColor: '#5C3BE7',
//           tabBarInactiveTintColor: 'gray',
//           headerShown: false,
//         })}
//       >
//         <Tab.Screen name="Home" component={HomeScreen} />
//         <Tab.Screen name="Events" component={EventsScreen} />
//         <Tab.Screen name="Map" component={MapScreen} />
//         <Tab.Screen name="Profile" component={ProfileScreen} />

//         <Tab.Screen
//           name="More"
//           component={EmptyScreen} // Empty component to trigger Bottom Sheet
//           listeners={{
//             tabPress: (e) => {
//               e.preventDefault(); // Prevent navigation to a new screen
//               openSettings(); // Open the bottom sheet when clicked
//             },
//           }}
//           options={{
//             tabBarButton: (props) => (
//               <TouchableOpacity {...props} onPress={openSettings}>
//                 {/* Use the settings icon */}
//                 <Icon name="settings-outline" size={24} color="gray" />
//                 {/* Display Settings text */}
//                 <Text style={{ color: 'gray', fontSize: 12 }}>Settings</Text>
//               </TouchableOpacity>
//             ),
//           }}
//         />
//       </Tab.Navigator>

//       {/* Bottom Sheet Modal */}
//       <Modal
//         isVisible={isSettingsVisible}
//         onBackdropPress={closeSettings}
//         style={styles.bottomSheet}
//         backdropColor="rgba(0, 0, 0, 0.5)"
//         backdropOpacity={0.5}
//         useNativeDriver
//         hideModalContentWhileAnimating
//       >
//         <View style={styles.sheetContent}>
//           <TouchableOpacity style={styles.closeButton} onPress={closeSettings}>
//             <Icon name="close" size={24} color="black" />
//           </TouchableOpacity>

//           <ScrollView contentContainerStyle={styles.scrollContainer}>
//             <TouchableOpacity style={styles.option} onPress={() => alert('Profile')}>
//               <Icon name="person" size={20} color="gray" style={styles.icon} />
//               <Text style={styles.optionText}>Profile</Text>
//             </TouchableOpacity>
//             <TouchableOpacity style={styles.option} onPress={() => alert('Change Password')}>
//               <Icon name="key" size={20} color="gray" style={styles.icon} />
//               <Text style={styles.optionText}>Change Password</Text>
//             </TouchableOpacity>
//             <TouchableOpacity style={styles.option} onPress={() => alert('Change Language')}>
//               <Icon name="language" size={20} color="gray" style={styles.icon} />
//               <Text style={styles.optionText}>Change Language</Text>
//             </TouchableOpacity>
//             <TouchableOpacity style={styles.option} onPress={() => alert('Logout')}>
//               <Icon name="log-out" size={20} color="gray" style={styles.icon} />
//               <Text style={styles.optionText}>Logout</Text>
//             </TouchableOpacity>
//           </ScrollView>
//         </View>
//       </Modal>
//     </>
//   );
// };

// const { height: screenHeight } = Dimensions.get('window');

// const styles = StyleSheet.create({
//   bottomSheet: {
//     margin: 0,
//     justifyContent: 'flex-end',
//     height: screenHeight * 0.6,
//   },
//   sheetContent: {
//     backgroundColor: 'white',
//     borderTopLeftRadius: 16,
//     borderTopRightRadius: 16,
//     padding: 16,
//   },
//   closeButton: {
//     alignSelf: 'flex-end',
//     marginBottom: 16,
//   },
//   scrollContainer: {
//     paddingBottom: 20,
//   },
//   option: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     paddingVertical: 12,
//     borderBottomWidth: 1,
//     borderBottomColor: '#eee',
//   },
//   icon: {
//     marginRight: 10,
//   },
//   optionText: {
//     fontSize: 16,
//   },
// });

// export default BottomTabs;





























// import React, { useState } from 'react';
// import { TouchableOpacity, Text, StyleSheet, View, ScrollView, Dimensions } from 'react-native';
// import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
// import Icon from 'react-native-vector-icons/Ionicons';
// import Modal from 'react-native-modal';

// import HomeScreen from '../screens/HomeScreen';
// import EventsScreen from '../screens/EventsScreen';
// import MapScreen from '../screens/MapScreen';
// import ProfileScreen from '../screens/ProfileScreen';

// const Tab = createBottomTabNavigator();

// const BottomTabs = () => {
//   const [isSettingsVisible, setSettingsVisible] = useState(false);

//   const openSettings = () => {
//     setSettingsVisible(true);
//   };

//   const closeSettings = () => {
//     setSettingsVisible(false);
//   };

//   // Empty component for the "More" tab
//   const EmptyScreen = () => null;

//   return (
//     <>
//       <Tab.Navigator
//         screenOptions={({ route }) => ({
//           tabBarIcon: ({ focused, color, size }) => {
//             let iconName;

//             if (route.name === 'Home') {
//               iconName = focused ? 'home' : 'home-outline';
//             } else if (route.name === 'Events') {
//               iconName = focused ? 'calendar' : 'calendar-outline';
//             } else if (route.name === 'Map') {
//               iconName = focused ? 'map' : 'map-outline';
//             } else if (route.name === 'Profile') {
//               iconName = focused ? 'person' : 'person-outline';
//             } else if (route.name === 'More') {
//               iconName = focused ? 'ellipsis-horizontal' : 'ellipsis-horizontal-outline';
//             }

//             return <Icon name={iconName} size={size} color={color} />;
//           },
//           tabBarLabel: route.name === 'More' ? 'More' : route.name,  // Show label for all tabs
//           tabBarActiveTintColor: '#5C3BE7',
//           tabBarInactiveTintColor: 'gray',
//           headerShown: false,
//         })}
//       >
//         <Tab.Screen name="Home" component={HomeScreen} />
//         <Tab.Screen name="Events" component={EventsScreen} />
//         <Tab.Screen name="Map" component={MapScreen} />
//         <Tab.Screen name="Profile" component={ProfileScreen} />
        
//         <Tab.Screen
//           name="More"
//           component={EmptyScreen} // Empty component to trigger Bottom Sheet
//           listeners={{
//             tabPress: (e) => {
//               e.preventDefault(); // Prevent navigation to a new screen
//               openSettings(); // Open the bottom sheet when clicked
//             },
//           }}
//           options={{
//             tabBarButton: (props) => (
//               <TouchableOpacity {...props} onPress={openSettings}>
//                 <Icon name="ellipsis-horizontal-outline" size={24} color="gray" />
//               </TouchableOpacity>
//             ),
//             tabBarLabel: 'More', // Ensure this is here to show the label for the "More" tab
//           }}
//         />
//       </Tab.Navigator>

//       {/* Bottom Sheet Modal */}
//       <Modal
//         isVisible={isSettingsVisible}
//         onBackdropPress={closeSettings}
//         style={styles.bottomSheet}
//         backdropColor="rgba(0, 0, 0, 0.5)"
//         backdropOpacity={0.5}
//         useNativeDriver
//         hideModalContentWhileAnimating
//       >
//         <View style={styles.sheetContent}>
//           <TouchableOpacity style={styles.closeButton} onPress={closeSettings}>
//             <Icon name="close" size={24} color="black" />
//           </TouchableOpacity>

//           <ScrollView contentContainerStyle={styles.scrollContainer}>
//             <Text style={styles.option} onPress={() => alert('Option 1')}>
//               Profile
//             </Text>
//             <Text style={styles.option} onPress={() => alert('Option 2')}>
//               Change Password
//             </Text>
//             <Text style={styles.option} onPress={() => alert('Option 3')}>
//               Change Language
//             </Text>
//             <Text style={styles.option} onPress={() => alert('Option 4')}>
//               Logout
//             </Text>
//           </ScrollView>
//         </View>
//       </Modal>
//     </>
//   );
// };

// const { height: screenHeight } = Dimensions.get('window');

// const styles = StyleSheet.create({
//   bottomSheet: {
//     margin: 0,
//     justifyContent: 'flex-end',
//     height: screenHeight * 0.6,
//   },
//   sheetContent: {
//     backgroundColor: 'white',
//     borderTopLeftRadius: 16,
//     borderTopRightRadius: 16,
//     padding: 16,
//   },
//   closeButton: {
//     alignSelf: 'flex-end',
//     marginBottom: 16,
//   },
//   scrollContainer: {
//     paddingBottom: 20,
//   },
//   option: {
//     fontSize: 16,
//     paddingVertical: 12,
//     borderBottomWidth: 1,
//     borderBottomColor: '#eee',
//   },
// });

// export default BottomTabs;
























// import React, { useState } from 'react';
// import { TouchableOpacity, Text, StyleSheet, View, ScrollView, Dimensions } from 'react-native';
// import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
// import Icon from 'react-native-vector-icons/Ionicons';
// import Modal from 'react-native-modal';

// import HomeScreen from '../screens/HomeScreen';
// import EventsScreen from '../screens/EventsScreen';
// import MapScreen from '../screens/MapScreen';
// import ProfileScreen from '../screens/ProfileScreen';

// const Tab = createBottomTabNavigator();

// const BottomTabs = () => {
//   const [isSettingsVisible, setSettingsVisible] = useState(false);

//   const openSettings = () => {
//     setSettingsVisible(true);
//   };

//   const closeSettings = () => {
//     setSettingsVisible(false);
//   };

//   // Empty component for the "More" tab
//   const EmptyScreen = () => null;

//   return (
//     <>
//       <Tab.Navigator
//         screenOptions={({ route }) => ({
//           tabBarIcon: ({ focused, color, size }) => {
//             let iconName;

//             if (route.name === 'Home') {
//               iconName = focused ? 'home' : 'home-outline';
//             } else if (route.name === 'Events') {
//               iconName = focused ? 'calendar' : 'calendar-outline';
//             } else if (route.name === 'Map') {
//               iconName = focused ? 'map' : 'map-outline';
//             } else if (route.name === 'Profile') {
//               iconName = focused ? 'person' : 'person-outline';
//             } else if (route.name === 'More') {
//               iconName = focused ? 'ellipsis-horizontal' : 'ellipsis-horizontal-outline';
//             }

//             return <Icon name={iconName} size={size} color={color} />;
//           },
//           tabBarActiveTintColor: '#5C3BE7',
//           tabBarInactiveTintColor: 'gray',
//           headerShown: false,
//         })}
//       >
//         {/* Other Screens */}
//         <Tab.Screen name="Home" component={HomeScreen} />
//         <Tab.Screen name="Events" component={EventsScreen} />
//         <Tab.Screen name="Map" component={MapScreen} />
//         <Tab.Screen name="Profile" component={ProfileScreen} />

//         {/* "More" Tab */}
//         <Tab.Screen
//           name="More"
//           component={EmptyScreen} // Empty component to trigger Bottom Sheet
//           listeners={{
//             tabPress: (e) => {
//               e.preventDefault(); // Prevent navigation to a new screen
//               openSettings(); // Open the bottom sheet when clicked
//             },
//           }}
//           options={{
//             tabBarButton: (props) => (
//               <TouchableOpacity {...props} onPress={openSettings}>
//                 <Icon name="ellipsis-horizontal-outline" size={24} color="gray" />
//               </TouchableOpacity>
//             ),
//           }}
//         />
//       </Tab.Navigator>

//       {/* Bottom Sheet Modal */}
//       <Modal
//         isVisible={isSettingsVisible}
//         onBackdropPress={closeSettings}
//         style={styles.bottomSheet}
//         backdropColor="rgba(0, 0, 0, 0.5)"
//         backdropOpacity={0.5}
//         useNativeDriver
//         hideModalContentWhileAnimating
//       >
//         <View style={styles.sheetContent}>
//           <TouchableOpacity style={styles.closeButton} onPress={closeSettings}>
//             <Icon name="close" size={24} color="black" />
//           </TouchableOpacity>

//           <ScrollView contentContainerStyle={styles.scrollContainer}>
//             <Text style={styles.option} onPress={() => alert('Option 1')}>
//               Profile
//             </Text>
//             <Text style={styles.option} onPress={() => alert('Option 2')}>
//               Change Password
//             </Text>
//             <Text style={styles.option} onPress={() => alert('Option 3')}>
//               Change Language
//             </Text>
//             <Text style={styles.option} onPress={() => alert('Option 4')}>
//               Logout
//             </Text>
          
//           </ScrollView>
//         </View>
//       </Modal>
//     </>
//   );
// };

// const { height: screenHeight } = Dimensions.get('window');

// const styles = StyleSheet.create({
//   bottomSheet: {
//     margin: 0,
//     justifyContent: 'flex-end',
//     height: screenHeight * 0.6, // Set height to 50% of the screen height (can adjust as needed)
//   },
//   sheetContent: {
//     backgroundColor: 'white',
//     borderTopLeftRadius: 16,
//     borderTopRightRadius: 16,
//     padding: 16,
//   },
//   closeButton: {
//     alignSelf: 'flex-end',
//     marginBottom: 16,
//   },
//   scrollContainer: {
//     paddingBottom: 20, // Optional padding for better scrolling experience
//   },
//   option: {
//     fontSize: 16,
//     paddingVertical: 12,
//     borderBottomWidth: 1,
//     borderBottomColor: '#eee',
//   },
// });

// export default BottomTabs;
