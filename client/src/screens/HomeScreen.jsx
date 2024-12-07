import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import CategoryList from '../components/CategoryList';
import Header from '../components/Header';
import EventCard from '../components/HomeEventCard';
import InviteCard from '../components/InviteCard';
import SearchBar from '../components/SearchBar';

const events = [
  {
    id: '1',
    eventName: 'Music Concert',
    description: 'An unforgettable night of live music.',
    category: 'Music',
    image: 'https://via.placeholder.com/150',
    location: {
      venueName: 'New Concert Hall',
      city: 'New York',
      state: 'NY',
      country: 'USA',
    },
  },
  {
    id: '2',
    eventName: 'Tech Summit 2024',
    description: 'Join leading tech innovators and visionaries.',
    category: 'Technology',
    image: 'https://via.placeholder.com/150',
    location: {
      venueName: 'Virtual Event',
      city: 'Online',
    },
  },
  {
    id: '3',
    eventName: 'Art Gala',
    description: 'Celebrate creativity with the finest artists worldwide.',
    category: 'Art',
    image: 'https://via.placeholder.com/150',
    location: {
      venueName: 'Modern Art Museum',
      city: 'Paris',
      country: 'France',
    },
  },
  {
    id: '4',
    eventName: 'Food Festival',
    description: 'A feast of flavors from around the world.',
    category: 'Food',
    image: 'https://via.placeholder.com/150',
    location: {
      venueName: 'Gourmet Plaza',
      city: 'Los Angeles',
      state: 'CA',
    },
  },
  {
    id: '5',
    eventName: 'Sports Championship',
    description: 'Watch your favorite teams compete!',
    category: 'Sports',
    image: 'https://via.placeholder.com/150',
    location: {
      venueName: 'National Stadium',
      city: 'Chicago',
      state: 'IL',
      country: 'USA',
    },
  },
  {
    id: '6',
    eventName: 'Literature Meetup',
    description: 'Discuss and celebrate great literature.',
    category: 'Books',
    image: 'https://via.placeholder.com/150',
    location: {
      venueName: 'Library Hall',
      city: 'London',
      country: 'UK',
    },
  },
];

const ExploreScreen = () => {
  // Handlers for header buttons
  const handleNotificationPress = () => {
    alert('Notifications');
  };

  const handleSpeechPress = () => {
    alert('Text-to-Speech Activated');
  };

  return (
    <View style={styles.container}>
      {/* Updated Header with buttons */}
      <Header 
        onNotificationPress={handleNotificationPress} 
        onSpeechPress={handleSpeechPress} 
      />
      <SearchBar placeholder="Search..." />
      <CategoryList style={styles.categoryList} />
      <ScrollView style={styles.content}>
        <Text style={styles.sectionTitle}>Upcoming Events</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <View style={styles.eventList}>
            {events.map((event) => (
              <View key={event.id} style={styles.eventCardWrapper}>
                <EventCard
                  eventName={event.eventName}
                  category={event.category}
                  image={event.image}
                  location={event.location}
                  description={event.description}
                  onPress={() => alert(`Event: ${event.eventName}`)}
                />
              </View>
            ))}
          </View>
        </ScrollView>
        <InviteCard />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFC',
  },
  content: {
    paddingHorizontal: 15,
  },
  categoryList: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 10,
  },
  eventList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  eventCardWrapper: {
    width: 150,
    marginHorizontal: 5,
  },
});

export default ExploreScreen;
