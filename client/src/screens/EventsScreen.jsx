import React, { useEffect, useState } from 'react';
import { FlatList, StyleSheet, View } from 'react-native'; // Ensure correct path
import EventCard from '../components/EventCard';
import EventsHeader from '../components/EventsHeader';
import { useGetEventsQuery } from '../redux/slices/api/eventApiSlice';
import { useTranslation } from 'react-i18next'; 

const EventsScreen = ({ navigation }) => {
  const { t } = useTranslation();
  const [events, setEvents] = useState([]); // Local state for events
  const { data, isLoading, isError } = useGetEventsQuery(); // Fetch events from API

  useEffect(() => {
    if (data) {
      setEvents(data); // Replace hardcoded events with API data
    }
  }, [data]);

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
