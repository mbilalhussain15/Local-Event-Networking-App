import React, { useEffect, useState } from 'react';
import { FlatList, StyleSheet, Text, View, Platform } from 'react-native';
import EventCard from '../components/EventCard';
import EventsHeader from '../components/EventsHeader';
import { useGetEventsQuery } from '../redux/slices/api/eventApiSlice';
import { useTranslation } from 'react-i18next';
import DeviceInfo from 'react-native-device-info';

const EventsScreen = ({ navigation }) => {
  const { t } = useTranslation(); // useTranslation hook for translations
  const { data, isLoading, isError } = useGetEventsQuery(); // API hook to fetch events
  const [events, setEvents] = useState([]); // Local state to store events

  // useEffect to handle events data once fetched
  useEffect(() => {
    if (data) {
      setEvents(data); // Set the fetched data to events state
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

  // useEffect to update event images based on platform
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
        <Text>{t('loading')}</Text>
      </View>
    );
  }

  // Error state
  if (isError || !events.length) {
    return (
      <View style={styles.container}>
        <Text>{t('error')}</Text>
      </View>
    );
  }

  // Render the events list
  return (
    <View style={styles.container}>
      <EventsHeader title={t('eventList')} style={styles.headerFullWidth} />
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
