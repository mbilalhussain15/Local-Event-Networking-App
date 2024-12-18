import React, { useEffect, useState, useContext, useCallback, useRef } from 'react';
import { ActivityIndicator, Alert, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View, Platform } from 'react-native';
import { useTranslation } from 'react-i18next';
import i18n from 'i18next';
import DeviceInfo from 'react-native-device-info';
import { useGetEventsQuery } from '../redux/slices/api/eventApiSlice'; // Import the RTK Query hook
import AddEventCard from '../components/AddEventCard';
import Header from '../components/Header';
import { UserContext } from '../context/UserContext';
import { useNavigation, useFocusEffect } from '@react-navigation/native'; 
import { useGetUserByIdQuery } from '../redux/slices/api/authApiSlice';


const ExploreScreen = () => {
  const { t } = useTranslation();
  const { user, refreshFlag, setUser  } = useContext(UserContext);
  const navigation = useNavigation();

  const [updatedEvents, setUpdatedEvents] = useState([]);
  const { data: events, isLoading, isError, refetch: refetchEvents } = useGetEventsQuery();
  const { data: userData, error: userError, isLoading: userLoading, refetch: refetchUser } = useGetUserByIdQuery(user?.user?._id);
  
  const userFetchedRef = useRef(false);
  
 // Trigger refetch when the screen comes into focus
 useFocusEffect(
  useCallback(() => {
    // console.log('Home tab focused. Refetching events...');
    refetchEvents(); // Re-fetch data when the tab is focused
    refetchUser();
  }, [refetchEvents, refetchUser])
);

// Handle refreshFlag for programmatic updates
useEffect(() => {
  if (refreshFlag) {
    // console.log('Refresh flag detected. Refetching events...');
    refetchEvents();
    refetchUser();
  }
}, [refreshFlag, refetchEvents, refetchUser]);

useEffect(() => {
  // console.log('!userFetchedRef.current= ',userFetchedRef.current);
  if (userData && !userFetchedRef.current) {
   
    setUser(userData); 
    userFetchedRef.current = true; 
  }
}, [userData, setUser]);
  
  const handleNotificationPress = () => {
    Alert.alert(t('explore.navBar.notifications'));
  };

  const handleSpeechPress = () => {
    Alert.alert('Text-to-Speech Activated');
  };

  // Function to get device IP
  const getDeviceIp = async () => {
    try {
      const ip = await DeviceInfo.getIpAddress();
      return ip;
    } catch (error) {
      console.error("Error getting device IP:", error);
      return null;
    }
  };

  // Function to update the image URL based on platform and IP
  const updateImageUrlForPlatform = async (url) => {
    if (!url) return null;

    let updatedUrl = url;
    const deviceIp = await getDeviceIp();

    if (Platform.OS === 'android') {
      if (DeviceInfo.isEmulator()) {
        updatedUrl = url.replace('http://localhost', 'http://10.0.2.2');
      } else {
        updatedUrl = url.replace('http://localhost', `http://${deviceIp}`);
      }
    } else if (Platform.OS === 'ios') {
      updatedUrl = url.replace('http://localhost', `http://${deviceIp}`);
    }

    // Fallback if still pointing to localhost
    if (updatedUrl.includes('localhost')) {
      updatedUrl = url;
    }

    return updatedUrl;
  };

  // Handle events and update image URLs
  useEffect(() => {
    if (events && events.length > 0) {
      const updateEventImages = async () => {
        const updatedEventList = await Promise.all(
          events.map(async (event) => {
            const updatedImageUrl = await updateImageUrlForPlatform(event.eventImage);
            return { ...event, eventImage: updatedImageUrl };
          })
        );
        setUpdatedEvents(updatedEventList.slice(-6)); 
      };

      updateEventImages();
    }
  }, [events]);

  // Loading state
  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#4CAF50" />
        <Text>Loading Events...</Text>
      </View>
    );
  }

  // Error state
  if (isError || !updatedEvents.length) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>Failed to load events. Please try again later.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      
      <Header 
        title={t('header')}
        onNotificationPress={handleNotificationPress} 
        onSpeechPress={handleSpeechPress} 
      />
      <ScrollView style={styles.content}>
        <Text style={styles.sectionTitle}>{t('explore.upcomingEvents')}</Text>
        <ScrollView contentContainerStyle={styles.eventList} showsVerticalScrollIndicator={false}>
          {updatedEvents.map((event,index) => {

            const imageSource = event.eventImage && event.eventImage.trim() !== '' 
            ? { uri: event.eventImage }
            : require('../assets/eventsImages/event.jpg');
            return(
            <View key={index || event._id || event.eventName} style={styles.eventCardWrapper}>
              <Image source={imageSource} style={styles.eventImage} />
              <Text style={styles.eventName}>{event.eventName}</Text>
              <Text style={styles.eventCategory}>{event.category}</Text>
              <Text numberOfLines={2} style={styles.eventDescription}>{event.description}</Text>
      
              <TouchableOpacity 
                style={styles.viewDetailsButton} 
                onPress={() =>
                  navigation.navigate('eventDetails', {
                    eventId: event._id, 
                    eventDetailByID: event,
                  })
                }
              >
                <Text style={styles.viewDetailsText}>View Details</Text>
              </TouchableOpacity>
            </View>
            )
          }
          )}
        </ScrollView>
      </ScrollView>
      <View style={styles.addEventContainer}>
        <AddEventCard />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EAEDED',
  },
  content: {
    paddingHorizontal: 15,
  },
  sectionTitle: {
    paddingTop: 10,
    fontSize: 20,
    fontWeight: 'bold',
    marginVertical: 10,
    marginLeft: 10,
  },
  eventList: {
    alignItems: 'center',
  },
  eventCardWrapper: {
    backgroundColor: '#FFF',
    borderRadius: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 5,
    padding: 15,
    marginVertical: 10,
    alignItems: 'center',
    width: '90%',
  },
  eventImage: {
    width: '100%',
    height: 200,
    borderRadius: 10,
  },
  eventName: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 10,
    textAlign: 'center',
  },
  eventCategory: {
    fontSize: 14,
    color: '#555',
    marginVertical: 5,
  },
  eventDescription: {
    fontSize: 14,
    color: '#333',
    textAlign: 'center',
  },
  viewDetailsButton: {
    marginTop: 15,
    backgroundColor: '#4CAF50',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  viewDetailsText: {
    color: '#FFF',
    fontWeight: 'bold',
  },
  addEventContainer: {
    paddingHorizontal: 10,
    backgroundColor: '#EAEDED',
    borderTopColor: '#EAEDED',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    color: 'red',
    fontSize: 16,
  },
});

export default ExploreScreen;



















// import React,{useEffect,useContext} from 'react';
// import { ActivityIndicator, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
// import { useTranslation } from 'react-i18next';
// import AddEventCard from '../components/AddEventCard';
// import Header from '../components/Header';
// import { useGetEventsQuery } from '../redux/slices/api/eventApiSlice'; // Import the RTK Query hook
// import { UserContext } from '../context/UserContext';
// import DeviceInfo from 'react-native-device-info';

// const ExploreScreen = () => {
//   const { t } = useTranslation();
//   const { user } = useContext(UserContext);
  
//   console.log('user: ', user.user._id);
//   const { data: events, isLoading, isError } = useGetEventsQuery();

//   const handleNotificationPress = () => {
//     Alert.alert(t('explore.navBar.notifications'));
//   };

//   const handleSpeechPress = () => {
//     Alert.alert('Text-to-Speech Activated');
//   };

//   // Function to get device IP
//   const getDeviceIp = async () => {
//     try {
//       const ip = await DeviceInfo.getIpAddress();
//       return ip;
//     } catch (error) {
//       console.error("Error getting device IP:", error);
//       return null;
//     }
//   };

//   // Function to update the image URL based on platform and IP
//   const updateImageUrlForPlatform = async (url) => {
//     if (!url) return null;

//     let updatedUrl = url;
//     const deviceIp = await getDeviceIp();

//     if (Platform.OS === 'android') {
//       if (DeviceInfo.isEmulator()) {
//         updatedUrl = url.replace('http://localhost', 'http://10.0.2.2');
//       } else {
//         updatedUrl = url.replace('http://localhost', `http://${deviceIp}`);
//       }
//     } else if (Platform.OS === 'ios') {
//       updatedUrl = url.replace('http://localhost', `http://${deviceIp}`);
//     }

//     // Fallback if still pointing to localhost
//     if (updatedUrl.includes('localhost')) {
//       updatedUrl = url;
//     }

//     return updatedUrl;
//   };

//   // Handle events and update image URLs
//   useEffect(() => {
//     if (events && events.length > 0) {
//       const updateEventImages = async () => {
//         const updatedEventList = await Promise.all(
//           events.map(async (event) => {
//             const updatedImageUrl = await updateImageUrlForPlatform(event.eventImage);
//             return { ...event, eventImage: updatedImageUrl };
//           })
//         );
//         setUpdatedEvents(updatedEventList);
//       };

//       updateEventImages();
//     }
//   }, [events]);


//    // Loading state
//    if (isLoading) {
//     return (
//       <View style={styles.loadingContainer}>
//         <ActivityIndicator size="large" color="#4CAF50" />
//         <Text>Loading Events...</Text>
//       </View>
//     );
//   }

//   // Error state
//   if (isError || !events) {
//     return (
//       <View style={styles.errorContainer}>
//         <Text style={styles.errorText}>Failed to load events. Please try again later.</Text>
//       </View>
//     );
//   }
  
//   return (
//     <View style={styles.container}>
//       <Header 
//         title={t('header')}
//         onNotificationPress={handleNotificationPress} 
//         onSpeechPress={handleSpeechPress} 
//       />
//       <ScrollView style={styles.content}>
//         <Text style={styles.sectionTitle}>{t('explore.upcomingEvents')}</Text>
//         <ScrollView contentContainerStyle={styles.eventList} showsVerticalScrollIndicator={false}>
//           {events.map((event,index) => (
//             <View key={index || event.id} style={styles.eventCardWrapper}>
//               {console.log("event=",event.eventImage)}
//               <Image source={{ uri: event.eventImage }} style={styles.eventImage} />
//               <Text style={styles.eventName}>{event.eventName}</Text>
//               <Text style={styles.eventCategory}>{event.category}</Text>
//               <Text numberOfLines={2} style={styles.eventDescription}>{event.description}</Text>
//               <TouchableOpacity 
//                 style={styles.viewDetailsButton} 
//                 onPress={() => alert(`Event: ${event.eventName}`)}
//               >
//                 <Text style={styles.viewDetailsText}>View Details</Text>
//               </TouchableOpacity>
//             </View>
//           ))}
//         </ScrollView>
//       </ScrollView>
//       <View style={styles.addEventContainer}>
//         <AddEventCard />
//       </View>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#EAEDED',
//   },
//   content: {
//     paddingHorizontal: 15,
//   },
//   sectionTitle: {
//     paddingTop: 10,
//     fontSize: 20,
//     fontWeight: 'bold',
//     marginVertical: 10,
//     marginLeft: 10,
//   },
//   eventList: {
//     alignItems: 'center', // Centers the items horizontally
//   },
//   eventCardWrapper: {
//     backgroundColor: '#FFF',
//     borderRadius: 15,
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 3 },
//     shadowOpacity: 0.3,
//     shadowRadius: 6,
//     elevation: 5,
//     padding: 15,
//     marginVertical: 10,
//     alignItems: 'center',
//     width: '90%', // Makes the cards narrower for better centering
//   },
//   eventImage: {
//     width: '100%',
//     height: 200,
//     borderRadius: 10,
//   },
//   eventName: {
//     fontSize: 20,
//     fontWeight: 'bold',
//     marginTop: 10,
//     textAlign: 'center',
//   },
//   eventCategory: {
//     fontSize: 14,
//     color: '#555',
//     marginVertical: 5,
//   },
//   eventDescription: {
//     fontSize: 14,
//     color: '#333',
//     textAlign: 'center',
//   },
//   viewDetailsButton: {
//     marginTop: 15,
//     backgroundColor: '#4CAF50',
//     padding: 10,
//     borderRadius: 5,
//     alignItems: 'center',
//   },
//   viewDetailsText: {
//     color: '#FFF',
//     fontWeight: 'bold',
//   },
//   addEventContainer: {
//     paddingHorizontal: 10,
//     backgroundColor: '#EAEDED',
//     borderTopColor: '#EAEDED',
//   },
// });

// export default ExploreScreen;
