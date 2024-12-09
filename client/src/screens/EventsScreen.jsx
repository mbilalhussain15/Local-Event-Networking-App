// import React from 'react';
// import { FlatList, StyleSheet, Text, View } from 'react-native';
// import EventCard from '../components/EventCard';

// const events = [
//   {
//     id: '1',
//     eventName: 'Updated Music Concert',
//     description: 'Experience an unforgettable night of live music at the New Concert Hall.',
//     category: 'Music',
//     location: {
//       venueName: 'New Concert Hall',
//       streetAddress: '456 Broadway',
//       city: 'New York',
//       state: 'NY',
//       postalCode: '10001',
//       country: 'USA',
//     },
//   },
//   {
//     id: '2',
//     eventName: 'Art Exhibition',
//     description: 'Explore amazing artwork from talented artists around the world.',
//     category: 'Art',
//     location: {
//       venueName: 'Modern Art Gallery',
//       streetAddress: '789 Art Lane',
//       city: 'Los Angeles',
//       state: 'CA',
//       postalCode: '90001',
//       country: 'USA',
//     },
//   },
//   // Add more events if needed
// ];

// const EventsScreen = ({ navigation }) => {
//   return (
//     <View style={styles.container}>
//       <Text style={styles.title}>Events</Text>
//       <FlatList
//         data={events}
//         keyExtractor={(item) => item.id}
//         renderItem={({ item }) => (
//           <EventCard
//             eventName={item.eventName}
//             category={item.category}
//             location={item.location}
//             onPress={() => navigation.navigate('EventDetails', { eventId: item.id })}
//           />
//         )}
//       />
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     padding: 16,
//     backgroundColor: '#fff',
//   },
//   title: {
//     fontSize: 24,
//     fontWeight: 'bold',
//     marginBottom: 16,
//     textAlign: 'center',
//   },
// });

// export default EventsScreen;

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
            onPress={() => navigation.navigate('EventDetails', { eventId: item.id })}
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


