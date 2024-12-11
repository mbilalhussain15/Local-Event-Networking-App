import React from 'react';
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import AddEventCard from '../components/AddEventCard';
import Header from '../components/Header';

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
  const handleNotificationPress = () => {
    alert('Notifications');
  };

  const handleSpeechPress = () => {
    alert('Text-to-Speech Activated');
  };

  return (
    <View style={styles.container}>
      <Header 
        onNotificationPress={handleNotificationPress} 
        onSpeechPress={handleSpeechPress} 
      />
      <ScrollView style={styles.content}>
        <Text style={styles.sectionTitle}>Upcoming Events</Text>
        <ScrollView contentContainerStyle={styles.eventList} showsVerticalScrollIndicator={false}>
          {events.map((event) => (
            <View key={event.id} style={styles.eventCardWrapper}>
              <Image source={{ uri: event.image }} style={styles.eventImage} />
              <Text style={styles.eventName}>{event.eventName}</Text>
              <Text style={styles.eventCategory}>{event.category}</Text>
              <Text numberOfLines={2} style={styles.eventDescription}>{event.description}</Text>
              <TouchableOpacity 
                style={styles.viewDetailsButton} 
                onPress={() => alert(`Event: ${event.eventName}`)}
              >
                <Text style={styles.viewDetailsText}>View Details</Text>
              </TouchableOpacity>
            </View>
          ))}
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
    alignItems: 'center', // Centers the items horizontally
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
    width: '90%', // Makes the cards narrower for better centering
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
});

export default ExploreScreen;
