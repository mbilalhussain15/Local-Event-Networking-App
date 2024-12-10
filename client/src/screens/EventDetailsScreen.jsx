import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  Platform,
} from 'react-native';
import DeviceInfo from 'react-native-device-info';
import { useGetEventByIdQuery } from '../redux/slices/api/eventApiSlice';
import { useGetUserByIdQuery } from '../redux/slices/api/authApiSlice'; // Import user API
import Icon from 'react-native-vector-icons/Ionicons';

// Helper function to get the device IP address
const getDeviceIp = async () => {
  try {
    const ip = await DeviceInfo.getIpAddress();
    return ip;
  } catch (error) {
    console.error('Error getting device IP:', error);
    return null;
  }
};

// Helper function to update the image URL based on platform (Android/iOS)
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

  return updatedUrl.includes('localhost') ? url : updatedUrl;
};

const EventDetailsScreen = ({ route }) => {
  const { eventId } = route.params;

  // Fetch event details
  const { data: event, isLoading: eventLoading, isError: eventError } = useGetEventByIdQuery(eventId);

  // Fetch user details
  const { data: user, isLoading: userLoading, isError: userError } = useGetUserByIdQuery(event?.user_id, {
    skip: !event?.user_id, // Skip fetching if user_id is not available
  });

  const [eventDate, setEventDate] = useState('');
  const [eventTime, setEventTime] = useState('');
  const [location, setLocation] = useState({
    streetAddress: '',
    pincode: '',
    city: '',
    country: '',
  });

  const [updatedEvent, setUpdatedEvent] = useState(event);
  const [updatedUser, setUpdatedUser] = useState(user);

  // Update event and user image URL on component mount or when event/user changes
  useEffect(() => {
    if (event?.date) {
      const eventDateObj = new Date(event.date);
      setEventDate(eventDateObj.toLocaleDateString());
      setEventTime(eventDateObj.toLocaleTimeString());
    }

    if (event?.location) {
      const { streetAddress, postalCode, city, country } = event.location;
      setLocation({
        streetAddress: streetAddress || '',
        pincode: postalCode || '',
        city: city || '',
        country: country || '',
      });
    }

    // Update event image URL if exists
    const updateEventImage = async () => {
      if (event?.image) {
        const updatedImageUrl = await updateImageUrlForPlatform(event.image);
        setUpdatedEvent((prevEvent) => ({
          ...prevEvent,
          image: updatedImageUrl,
        }));
      }
    };

    // Update user profile image URL if exists
    const updateUserImage = async () => {
      if (user?.user?.profileImage) {
        const updatedImageUrl = await updateImageUrlForPlatform(user?.user?.profileImage);
        setUpdatedUser((prevUser) => ({
          ...prevUser,
          profileImage: updatedImageUrl,
        }));
      }
    };

    updateEventImage();
    updateUserImage();
  }, [event, user]);

  if (eventLoading || userLoading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#5C3BE7" />
        <Text>Loading details...</Text>
      </View>
    );
  }

  if (eventError || !event || userError || !user) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>Unable to load event or user details.</Text>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      {/* Event Header Image */}
      <Image
        source={updatedEvent?.image ? { uri: updatedEvent?.image } : require('../assets/eventsImages/event.jpg')}
        style={styles.headerImage}
      />

      <View style={styles.detailsContainer}>
        {/* Event Name */}
        <Text style={styles.title}>{event.eventName}</Text>

        {/* Event Date & Time */}
        <View style={styles.row}>
          <Icon name="calendar-outline" size={24} color="#5C3BE7" />
          <View style={styles.textContainer}>
            <Text style={styles.label}>{eventDate}</Text>
            <Text style={styles.subLabel}>{eventTime}</Text>
          </View>
        </View>

        {/* Event Location */}
        <View style={styles.row}>
          <Icon name="location-outline" size={24} color="#5C3BE7" />
          <View style={styles.textContainer}>
            {location.streetAddress && location.pincode && (
              <Text style={styles.label}>
                {location.streetAddress}, {location.pincode}
              </Text>
            )}
            {location.city && location.country && (
              <Text style={styles.label}>
                {location.city}, {location.country}
              </Text>
            )}
          </View>
        </View>

        {/* User (Organizer) Details */}
        <View style={styles.row}>
          <Image
            source={updatedUser?.profileImage ? { uri: updatedUser?.profileImage } : require('../assets/eventsImages/event.jpg')}
            style={styles.organizerImage}
          />
          <View style={styles.textContainer}>
            <Text style={styles.label}>
              {user.user.firstName} {user.user.lastName}
            </Text>
            <Text style={styles.subLabel}>{user.user.email}</Text>
            <Text style={styles.subLabel}>{user.user.phone}</Text>
          </View>
        </View>

        {/* About Event */}
        <Text style={styles.sectionTitle}>About Event</Text>
        <Text style={styles.description}>{event.description}</Text>
      </View>

      {/* Buy Ticket Button */}
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>BUY TICKET ${event.ticketPrice}</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    flex: 1,
  },
  scrollContainer: {
    flexGrow: 1,
    paddingBottom: 16, // Added some padding at the bottom to ensure smooth scrolling.
  },
  headerImage: {
    width: '100%',
    height: 250,
  },
  detailsContainer: {
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 30,
  },
  textContainer: {
    marginLeft: 8,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  subLabel: {
    fontSize: 14,
    color: '#666',
  },
  organizerImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 16,
    marginBottom: 8,
  },
  description: {
    fontSize: 14,
    lineHeight: 20,
    color: '#333',
  },
  button: {
    marginTop: 16,
    backgroundColor: '#5C3BE7',
    paddingVertical: 16,
    alignItems: 'center',
    borderRadius: 8,
    marginHorizontal: 16,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  errorText: {
    fontSize: 18,
    color: 'red',
    textAlign: 'center',
    marginTop: 32,
  },
});

export default EventDetailsScreen;




// import React, { useEffect, useState } from 'react';
// import {
//   View,
//   Text,
//   StyleSheet,
//   Image,
//   ScrollView,
//   TouchableOpacity,
//   ActivityIndicator,
//   Platform,
// } from 'react-native';
// import DeviceInfo from 'react-native-device-info';
// import { useGetEventByIdQuery } from '../redux/slices/api/eventApiSlice';
// import { useGetUserByIdQuery } from '../redux/slices/api/authApiSlice'; // Import user API
// import Icon from 'react-native-vector-icons/Ionicons';


// // Helper function to get the device IP address
// const getDeviceIp = async () => {
//   try {
//     const ip = await DeviceInfo.getIpAddress();
//     return ip;
//   } catch (error) {
//     console.error('Error getting device IP:', error);
//     return null;
//   }
// };

// // Helper function to update the image URL based on platform (Android/iOS)
// const updateImageUrlForPlatform = async (url) => {
//   if (!url) return null;

//   let updatedUrl = url;
//   const deviceIp = await getDeviceIp();

//   if (Platform.OS === 'android') {
//     if (DeviceInfo.isEmulator()) {
//       updatedUrl = url.replace('http://localhost', 'http://10.0.2.2');
//     } else {
//       updatedUrl = url.replace('http://localhost', `http://${deviceIp}`);
//     }
//   } else if (Platform.OS === 'ios') {
//     updatedUrl = url.replace('http://localhost', `http://${deviceIp}`);
//   }

//   return updatedUrl.includes('localhost') ? url : updatedUrl;
// };

// const EventDetailsScreen = ({ route }) => {
//   const { eventId } = route.params;

//   // Fetch event details
//   const { data: event, isLoading: eventLoading, isError: eventError } = useGetEventByIdQuery(eventId);

//   // Fetch user details
//   const { data: user, isLoading: userLoading, isError: userError } = useGetUserByIdQuery(event?.user_id, {
//     skip: !event?.user_id, // Skip fetching if user_id is not available
//   });

//   const [eventDate, setEventDate] = useState('');
//   const [eventTime, setEventTime] = useState('');
//   const [location, setLocation] = useState({
//     streetAddress: '',
//     pincode: '',
//     city: '',
//     country: '',
//   });

//   const [updatedEvent, setUpdatedEvent] = useState(event);
//   const [updatedUser, setUpdatedUser] = useState(user);

//   // Update event and user image URL on component mount or when event/user changes
//   useEffect(() => {
//     if (event?.date) {
//       const eventDateObj = new Date(event.date);
//       setEventDate(eventDateObj.toLocaleDateString());
//       setEventTime(eventDateObj.toLocaleTimeString());
//     }

//     if (event?.location) {
//       const { streetAddress, postalCode, city, country } = event.location;
//       setLocation({
//         streetAddress: streetAddress || '',
//         pincode: postalCode || '',
//         city: city || '',
//         country: country || '',
//       });
//     }

//     // Update event image URL if exists
//     const updateEventImage = async () => {
//       if (event?.image) {
//         const updatedImageUrl = await updateImageUrlForPlatform(event.image);
//         setUpdatedEvent((prevEvent) => ({
//           ...prevEvent,
//           image: updatedImageUrl,
//         }));
//       }
//     };

//     // Update user profile image URL if exists
//     const updateUserImage = async () => {
//       if (user?.user?.profileImage) {
//         const updatedImageUrl = await updateImageUrlForPlatform(user?.user?.profileImage);
//         setUpdatedUser((prevUser) => ({
//           ...prevUser,
//           profileImage: updatedImageUrl,
//         }));
//       }
//     };

//     updateEventImage();
//     updateUserImage();
//   }, [event, user]);

//   if (eventLoading || userLoading) {
//     return (
//       <View style={styles.container}>
//         <ActivityIndicator size="large" color="#5C3BE7" />
//         <Text>Loading details...</Text>
//       </View>
//     );
//   }

//   if (eventError || !event || userError || !user) {
//     return (
//       <View style={styles.container}>
//         <Text style={styles.errorText}>Unable to load event or user details.</Text>
//       </View>
//     );
//   }

//   return (
//     <ScrollView contentContainerStyle={styles.container}>
//       {/* Event Header Image */}
//       <Image
//         source={updatedEvent?.image ? { uri: updatedEvent?.image } : require('../assets/eventsImages/event.jpg')}
//         style={styles.headerImage}
//       />

//       <View style={styles.detailsContainer}>
//         {/* Event Name */}
//         <Text style={styles.title}>{event.eventName}</Text>

//         {/* Event Date & Time */}
//         <View style={styles.row}>
//           <Icon name="calendar-outline" size={24} color="#5C3BE7" />
//           <View style={styles.textContainer}>
//             <Text style={styles.label}>{eventDate}</Text>
//             <Text style={styles.subLabel}>{eventTime}</Text>
//           </View>
//         </View>

//         {/* Event Location */}
//         <View style={styles.row}>
//           <Icon name="location-outline" size={24} color="#5C3BE7" />
//           <View style={styles.textContainer}>
//             {location.streetAddress && location.pincode && (
//               <Text style={styles.label}>
//                 {location.streetAddress}, {location.pincode}
//               </Text>
//             )}
//             {location.city && location.country && (
//               <Text style={styles.label}>
//                 {location.city}, {location.country}
//               </Text>
//             )}
//           </View>
//         </View>

//         {/* User (Organizer) Details */}
//         <View style={styles.row}>
//           <Image
//             source={updatedUser?.profileImage ? { uri: updatedUser?.profileImage } : require('../assets/eventsImages/event.jpg')}
//             style={styles.organizerImage}
//           />
//           <View style={styles.textContainer}>
//             <Text style={styles.label}>
//               {user.user.firstName} {user.user.lastName}
//             </Text>
//             <Text style={styles.subLabel}>{user.user.email}</Text>
//             <Text style={styles.subLabel}>{user.user.phone}</Text>
//           </View>
//         </View>

//         {/* About Event */}
//         <Text style={styles.sectionTitle}>About Event</Text>
//         <Text style={styles.description}>{event.description}</Text>
//       </View>

//       {/* Buy Ticket Button */}
//       <TouchableOpacity style={styles.button}>
//         <Text style={styles.buttonText}>BUY TICKET ${event.ticketPrice}</Text>
//       </TouchableOpacity>
//     </ScrollView>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     backgroundColor: '#fff',
//     paddingBottom: 0,
//     flex: 1,
//   },
//   headerImage: {
//     width: '100%',
//     height: 250,
//   },
//   detailsContainer: {
//     padding: 16,
//   },
//   title: {
//     fontSize: 24,
//     fontWeight: 'bold',
//     marginBottom: 16,
//     textAlign: 'center',
//   },
//   row: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     marginBottom: 30,
//   },
//   textContainer: {
//     marginLeft: 8,
//   },
//   label: {
//     fontSize: 16,
//     fontWeight: 'bold',
//   },
//   subLabel: {
//     fontSize: 14,
//     color: '#666',
//   },
//   organizerImage: {
//     width: 40,
//     height: 40,
//     borderRadius: 20,
//   },
//   sectionTitle: {
//     fontSize: 18,
//     fontWeight: 'bold',
//     marginTop: 16,
//     marginBottom: 8,
//   },
//   description: {
//     fontSize: 14,
//     lineHeight: 20,
//     color: '#333',
//   },
//   button: {
//     marginTop: 16,
//     backgroundColor: '#5C3BE7',
//     paddingVertical: 16,
//     alignItems: 'center',
//     borderRadius: 8,
//     marginHorizontal: 16,
//   },
//   buttonText: {
//     color: '#fff',
//     fontWeight: 'bold',
//     fontSize: 16,
//   },
//   errorText: {
//     fontSize: 18,
//     color: 'red',
//     textAlign: 'center',
//     marginTop: 32,
//   },
// });

// export default EventDetailsScreen;






























// import React, { useEffect, useState } from 'react';
// import {
//   View,
//   Text,
//   StyleSheet,
//   Image,
//   ScrollView,
//   TouchableOpacity,
//   ActivityIndicator,
// } from 'react-native';
// import { useGetEventByIdQuery } from '../redux/slices/api/eventApiSlice';
// import { useGetUserByIdQuery } from '../redux/slices/api/authApiSlice'; // Import user API
// import Icon from 'react-native-vector-icons/Ionicons';

// const EventDetailsScreen = ({ route }) => {
//   const { eventId } = route.params;

//   // Fetch event details
//   const { data: event, isLoading: eventLoading, isError: eventError } = useGetEventByIdQuery(eventId);

//   // Fetch user details
//   const { data: user, isLoading: userLoading, isError: userError } = useGetUserByIdQuery(event?.user_id, {
//     skip: !event?.user_id, // Skip fetching if user_id is not available
//   });

  

//   const [eventDate, setEventDate] = useState('');
//   const [eventTime, setEventTime] = useState('');
//   const [location, setLocation] = useState({
//     streetAddress: '',
//     pincode: '',
//     city: '',
//     country: '',
//   });

//   useEffect(() => {
//     if (event?.date) {
//       const eventDateObj = new Date(event.date);
//       setEventDate(eventDateObj.toLocaleDateString());
//       setEventTime(eventDateObj.toLocaleTimeString());
//     }

//     if (event?.location) {
//       const { streetAddress, postalCode, city, country } = event.location;
//       setLocation({
//         streetAddress: streetAddress || '',
//         pincode: postalCode || '',
//         city: city || '',
//         country: country || '',
//       });
//     }
//   }, [event]);

//   if (eventLoading || userLoading) {
//     return (
//       <View style={styles.container}>
//         <ActivityIndicator size="large" color="#5C3BE7" />
//         <Text>Loading details...</Text>
//       </View>
//     );
//   }

//   if (eventError || !event || userError || !user) {
//     return (
//       <View style={styles.container}>
//         <Text style={styles.errorText}>Unable to load event or user details.</Text>
//       </View>
//     );
//   }

//   return (
//     <ScrollView contentContainerStyle={styles.container}>
//       {/* Event Header Image */}
//       <Image 
//         source={event.image ? { uri: event.image } : require('../assets/eventsImages/event.jpg')} 
//         style={styles.headerImage} 
//       />

//       <View style={styles.detailsContainer}>
//         {/* Event Name */}
//         <Text style={styles.title}>{event.eventName}</Text>

//         {/* Event Date & Time */}
//         <View style={styles.row}>
//           <Icon name="calendar-outline" size={24} color="#5C3BE7" />
//           <View style={styles.textContainer}>
//             <Text style={styles.label}>{eventDate}</Text>
//             <Text style={styles.subLabel}>{eventTime}</Text>
//           </View>
//         </View>

//         {/* Event Location */}
//         <View style={styles.row}>
//           <Icon name="location-outline" size={24} color="#5C3BE7" />
//           <View style={styles.textContainer}>
//             {location.streetAddress && location.pincode && (
//               <Text style={styles.label}>
//                 {location.streetAddress}, {location.pincode}
//               </Text>
//             )}
//             {location.city && location.country && (
//               <Text style={styles.label}>
//                 {location.city}, {location.country}
//               </Text>
//             )}
//           </View>
//         </View>

//         {/* User (Organizer) Details */}
//         <View style={styles.row}>
//           {/* <Image
//             source={{ uri: user?.profileImage || 'https://via.placeholder.com/40' }} // Replace with actual user image URL
//             style={styles.organizerImage}
//           /> */}
//           {console.log("userImage= ", user?.user?.profileImage)}
//           <Image
//              source={user?.user?.profileImage ? { uri: user?.user?.profileImage } : require('../assets/eventsImages/event.jpg')}
//             style={styles.organizerImage}
//           />


//           <View style={styles.textContainer}>
//             <Text style={styles.label}>
//               {user.user.firstName} {user.user.lastName}
//             </Text>
//             <Text style={styles.subLabel}>Organizer</Text>
//           </View>
//         </View>

//         {/* About Event */}
//         <Text style={styles.sectionTitle}>About Event</Text>
//         <Text style={styles.description}>{event.description}</Text>
//       </View>

//       {/* Buy Ticket Button */}
//       <TouchableOpacity style={styles.button}>
//         <Text style={styles.buttonText}>BUY TICKET ${event.ticketPrice}</Text>
//       </TouchableOpacity>
//     </ScrollView>
//   );
// };


// const styles = StyleSheet.create({
//   container: {
//     backgroundColor: '#fff',
//     paddingBottom: 16,
//   },
//   headerImage: {
//     width: '100%',
//     height: 250,
//   },
//   detailsContainer: {
//     padding: 16,
//   },
//   title: {
//     fontSize: 24,
//     fontWeight: 'bold',
//     marginBottom: 16,
//     textAlign: 'center',
//   },
//   row: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     marginBottom: 16,
//   },
//   textContainer: {
//     marginLeft: 8,
//   },
//   label: {
//     fontSize: 16,
//     fontWeight: 'bold',
//   },
//   subLabel: {
//     fontSize: 14,
//     color: '#666',
//   },
//   organizerImage: {
//     width: 40,
//     height: 40,
//     borderRadius: 20,
//   },
//   sectionTitle: {
//     fontSize: 18,
//     fontWeight: 'bold',
//     marginTop: 16,
//     marginBottom: 8,
//   },
//   description: {
//     fontSize: 14,
//     lineHeight: 20,
//     color: '#333',
//   },
//   button: {
//     marginTop: 16,
//     backgroundColor: '#5C3BE7',
//     paddingVertical: 16,
//     alignItems: 'center',
//     borderRadius: 8,
//     marginHorizontal: 16,
//   },
//   buttonText: {
//     color: '#fff',
//     fontWeight: 'bold',
//     fontSize: 16,
//   },
//   errorText: {
//     fontSize: 18,
//     color: 'red',
//     textAlign: 'center',
//     marginTop: 32,
//   },
// });

// export default EventDetailsScreen;
