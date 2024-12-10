import { useGetEventsQuery } from '../redux/slices/api/eventApiSlice';
import React, { useEffect, useState } from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';// Ensure correct path
import EventCard from '../components/EventCard';

const EventsScreen = ({ navigation }) => {
  const [events, setEvents] = useState([]); // Local state for events
  const { data, isLoading, isError } = useGetEventsQuery(); // Fetch events from API

  useEffect(() => {
    if (data) {
      setEvents(data); // Replace hardcoded events with API data
    }
  }, [data]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Events</Text>
      <FlatList
        data={events}
        keyExtractor={(item) => item._id}
        
        renderItem={({ item }) => (
          <EventCard
            key={item._id}
            eventName={item.eventName}
            category={item.category}
            location={item.location}
            onPress={() => navigation.navigate('eventDetails', { eventId: item._id, eventDetailByID: item })}
          />
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
  },
});

export default EventsScreen;


