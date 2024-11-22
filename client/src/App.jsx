import React from 'react';
import { StyleSheet } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

import { NavigationContainer } from '@react-navigation/native';
import StackNavigator from './navigation/StackNavigator.jsx';

const RootApp = () => {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <SafeAreaView style={styles.container}>
          <StackNavigator />
        </SafeAreaView>
      </NavigationContainer>
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default RootApp;






















// // App.js (Root - Entry Point)
// import React from 'react';
// import { StyleSheet } from 'react-native';
// import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context'; // Import SafeAreaProvider

// import { NavigationContainer } from '@react-navigation/native'; 
// import StackNavigator from './navigation/StackNavigator.jsx'; 

// const RootApp = () => {
//   return (
//     <SafeAreaProvider> {/* Wrap the app with SafeAreaProvider */}
//       <NavigationContainer>
//         <SafeAreaView style={styles.container}> {/* SafeAreaView around the content */}
//           <StackNavigator />  
//         </SafeAreaView>
//       </NavigationContainer>
//     </SafeAreaProvider>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//   },
// });

// export default RootApp;























// // App.js (Root - Entry Point)
// import React from 'react';
// import { StyleSheet } from 'react-native';
// import { SafeAreaView } from 'react-native-safe-area-context';

// import { NavigationContainer } from '@react-navigation/native'; 
// import StackNavigator from './navigation/StackNavigator.jsx'; 

// const RootApp = () => {
//   return (
//     <SafeAreaView style={styles.container}>
//       <NavigationContainer>
//         <StackNavigator />  
//       </NavigationContainer>
//     </SafeAreaView>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
// });

// export default RootApp;
