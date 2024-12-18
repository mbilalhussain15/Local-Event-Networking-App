import React, { useEffect, useState, useContext } from 'react';
import {
  ActivityIndicator,
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  Linking,
  View,
} from 'react-native';
import DeviceInfo from 'react-native-device-info';
import Icon from 'react-native-vector-icons/Ionicons';
import PaymentPopup from '../components/PaymentPopup';
import { useGetUserByIdQuery } from '../redux/slices/api/authApiSlice';
import { useGetEventByIdQuery } from '../redux/slices/api/eventApiSlice';
import { useTranslation } from 'react-i18next';  // Import the translation hook
import { UserContext } from '../context/UserContext';
import Tts from 'react-native-tts';

// Helper function to get the device IP address
const getDeviceIp = async () => {
  try {
    const ip = await DeviceInfo.getIpAddress();
    return ip;
  } catch (error) {
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

const EventDetailsScreen = ({ route, navigation }) => {

  const handlePhonePress = (phone) => {
    if (phone) {
      const url = `tel:${phone}`;
      Linking.openURL(url).catch(err => console.error('Error opening dialer: ', err));
    }
  };

  const handleEmailPress = (email) => {
    if (email) {
      const url = `mailto:${email}`;
      Linking.openURL(url).catch(err => console.error('Error opening email client: ', err));
    }
  };

  const handleSpeak = (text) => {
    Tts.stop(); // Stop any ongoing speech
    Tts.speak(text, { androidParams: { KEY_PARAM_VOLUME: 1.0 } });
  };

  const handleStop = () => {
    Tts.stop();
  };

  const { t } = useTranslation();  // Use translation hook
  const { eventId } = route.params;

  const { user } = useContext(UserContext); // Access user data from context
  const userId = user?.user?._id;

  // Fetch event details
  const { data: event, isLoading: eventLoading, isError: eventError } = useGetEventByIdQuery(eventId);

  // Fetch user details
  const { data: userDetails, isLoading: userLoading, isError: userError } = useGetUserByIdQuery(userId, {
    skip: !userId, // Skip fetching if userId is not available
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
  const [isPopupVisible, setIsPopupVisible] = useState(false);

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
      if (event?.eventImage) {
        const updatedImageUrl = await updateImageUrlForPlatform(event.eventImage);
        setUpdatedEvent((prevEvent) => ({
          ...prevEvent,
          eventImage: updatedImageUrl,
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
        <Text>{t('Loading details...')}</Text> 
      </View>
    );
  }

  if (eventError || !event || userError || !user) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>{t('Unable to load event or user details.')}</Text> 
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      {/* Back Button */}
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.goBack()}
      >
        <Icon name="arrow-back" size={24} color="#5C3BE7" />
      </TouchableOpacity>

      {/* Event Header Image */}
      <Image
        source={updatedEvent?.eventImage ? { uri: updatedEvent?.eventImage } : require('../assets/eventsImages/event.jpg')}
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
            <TouchableOpacity onPress={() => handleEmailPress(user.user.email)} >
              <Text style={styles.subLabel}>{user.user.email}</Text>
            </TouchableOpacity>
            {user.user.phone ? (
              <TouchableOpacity onPress={() => handlePhonePress(user.user.phone)}>
                <Text style={styles.subLabel}>{user.user.phone}</Text>
              </TouchableOpacity>
            ) : (
              <Text style={styles.subLabel}></Text>
            )}
          </View>
        </View>


        {/* About Event */}
        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'between' }}>
          <Text style={styles.sectionTitle}>{t('About Event')}</Text>
          <TouchableOpacity style={{ marginLeft: 10, justifyContent: 'space-between' }} onPress={() => handleSpeak(event.description)}>
            <Icon name="volume-high-outline" size={40} color="#5C3BE7" />
          </TouchableOpacity>
          <TouchableOpacity style={{ marginLeft: 10 }} onPress={handleStop}>
            <Icon name="stop-circle-outline" size={40} color="#5C3BE7" />
          </TouchableOpacity>
        </View>
        <Text style={styles.description}>{event.description}</Text>
        </View>

      {/* Buy Ticket Button */}
      <TouchableOpacity
        style={styles.button}
        onPress={() => setIsPopupVisible(true)}
      >
        <Text style={styles.buttonText}>{t('Buy Ticket')}</Text>
      </TouchableOpacity>
      <PaymentPopup
        event={event}
        user={user.user}
        isVisible={isPopupVisible}
        onClose={() => setIsPopupVisible(false)}
      />
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
    paddingBottom: 16,
  },
  headerImage: {
    width: '100%',
    height: 250,
  },
  detailsContainer: {
    padding: 16,
  },
  backButton: {
    position: 'absolute',
    top: 10,
    left: 10,
    zIndex: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    borderRadius: 20,
    padding: 5,
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
    fontSize: 15,
    color: '#666',
    cursor: 'pointer',
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
