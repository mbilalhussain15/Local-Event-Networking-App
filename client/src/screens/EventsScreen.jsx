import React, { useEffect, useState } from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native'; // Ensure correct path
import EventCard from '../components/EventCard';
import EventsHeader from '../components/EventsHeader';
import { useGetEventsQuery } from '../redux/slices/api/eventApiSlice';
import { useTranslation } from 'react-i18next'; 
import DeviceInfo from 'react-native-device-info';
import { Platform } from 'react-native';

const EventsScreen = ({ navigation }) => {
  const { t } = useTranslation();
  const [events, setEvents] = useState([]); // Local state for events
  const { data, isLoading, isError } = useGetEventsQuery(); // Fetch events from API

  useEffect(() => {
    if (data) {
      setEvents(data); // Replace hardcoded events with API data
    }
  }, [data]);


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

  useEffect(() => {
    if (data) {
      const updateEventImages = async () => {
        const updatedEventsList = await Promise.all(
          data.map(async (event) => {
            const updatedImageUrl = await updateImageUrlForPlatform(event.eventImage);
            return { ...event, eventImage: updatedImageUrl };
          })
        );
        setEvents(updatedEventsList);
      };

      updateEventImages();
    }
  }, [data]);

  // Loading state
  if (isLoading) {
    return (
      <View style={styles.container}>
        <Text>Loading Events...</Text>
      </View>
    );
  }

  // Error state
  if (isError || !events.length) {
    return (
      <View style={styles.container}>
        <Text>Failed to load events. Please try again later.</Text>
      </View>
    );
  }


  return (
    <View style={styles.container}>
      <EventsHeader style={styles.headerFullWidth} />
      <FlatList
        data={events}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => (
          <EventCard
            key={item._id}
            eventName={item.eventName}
            category={item.category}
            location={item.location}
            imageUrl={item.eventImage}
            onPress={() =>
              navigation.navigate('eventDetails', {
                eventId: item._id,
                eventDetailByID: item,
              })
            }
          />
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EAEDED',
  },
  headerFullWidth: {
    marginHorizontal: 0,
    width: '100%',
  },
});

export default EventsScreen;
