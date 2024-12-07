import React, { useState } from 'react';
import {
  Button,
  FlatList,
  Modal,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import EventCard from '../components/EventCard';

const events = [
  {
    id: '1',
    eventName: 'Updated Music Concert',
    description:
      'Experience an unforgettable night of live music at the New Concert Hall.',
    category: 'Music',
    maxCapacity: 500,
    registration_required: true,
    contact_email: 'info@musicconcert.com',
    is_virtual: false,
    created_by: 'John Doe',
    location: {
      venueName: 'New Concert Hall',
      streetAddress: '456 Broadway',
      city: 'New York',
      state: 'NY',
      postalCode: '10001',
      country: 'USA',
    },
    image: 'https://via.placeholder.com/150',
  },

  {
    id: '2',
    eventName: 'Tech Summit 2024',
    description:
      'Join the leading tech innovators and visionaries for the annual Tech Summit.',
    category: 'Technology',
    maxCapacity: 1000,
    registration_required: false,
    contact_email: 'info@techsummit.com',
    is_virtual: true,
    created_by: 'Tech Innovators Inc.',
    location: {
      venueName: 'Virtual Event',
      streetAddress: '',
      city: '',
      state: '',
      postalCode: '',
      country: '',
    },
    image: 'https://via.placeholder.com/150',
  },

  {
    id: '3',
    eventName: 'Art Gala 2024',
    description: 'Celebrate creativity and art with the finest artists worldwide.',
    category: 'Art',
    maxCapacity: 300,
    registration_required: true,
    contact_email: 'info@artgala.com',
    is_virtual: false,
    created_by: 'Art Enthusiasts',
    location: {
      venueName: 'Modern Art Museum',
      streetAddress: '123 Art Street',
      city: 'Paris',
      state: '',
      postalCode: '75000',
      country: 'France',
    },
    image: 'https://via.placeholder.com/150',
  },
];

const EventsScreen = () => {
  const [selectedEvent, setSelectedEvent] = useState(null);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Events</Text>
      <FlatList
        data={events}
        renderItem={({ item }) => (
          <EventCard
            eventName={item.eventName}
            category={item.category}
            location={item.location}
            onPress={() => setSelectedEvent(item)}
          />
        )}
        keyExtractor={(item) => item.id}
      />

      {selectedEvent && (
        <Modal
          animationType="slide"
          transparent={true}
          visible={!!selectedEvent}
          onRequestClose={() => setSelectedEvent(null)}
        >
          <View style={styles.modalContainer}>
            <View style={styles.expandedCard}>
              <Text style={styles.eventName}>{selectedEvent.eventName}</Text>
              <Text style={styles.eventCategory}>
                Category: {selectedEvent.category}
              </Text>
              <Text style={styles.eventDescription}>
                {selectedEvent.description}
              </Text>
              <Text style={styles.eventLocation}>
                Location: {selectedEvent.location.venueName},{' '}
                {selectedEvent.location.streetAddress}, {selectedEvent.location.city},{' '}
                {selectedEvent.location.state} {selectedEvent.location.postalCode},{' '}
                {selectedEvent.location.country}
              </Text>
              <Text style={styles.eventCapacity}>
                Max Capacity: {selectedEvent.maxCapacity}
              </Text>
              <Text style={styles.eventRegistration}>
                Registration Required: {selectedEvent.registration_required ? 'Yes' : 'No'}
              </Text>
              <Text style={styles.eventEmail}>
                Contact: {selectedEvent.contact_email}
              </Text>
              <Text style={styles.eventVirtual}>
                Virtual Event: {selectedEvent.is_virtual ? 'Yes' : 'No'}
              </Text>
              <Text style={styles.eventCreator}>
                Created By: {selectedEvent.created_by}
              </Text>
              <View style={styles.buttonContainer}>
                <Button
                  title="Buy a Ticket"
                  onPress={() => alert(`Ticket purchased for ${selectedEvent.eventName}`)}
                />
                <Button
                  title="Close"
                  onPress={() => setSelectedEvent(null)}
                  color="red"
                />
              </View>
            </View>
          </View>
        </Modal>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFC',
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  expandedCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 20,
    width: '90%',
    alignItems: 'flex-start',
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 4 },
  },
  eventName: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 12,
    color: '#333',
  },
  eventCategory: {
    fontSize: 18,
    color: '#555',
    marginBottom: 8,
  },
  eventDescription: {
    fontSize: 16,
    lineHeight: 24,
    color: '#333',
    marginBottom: 16,
  },
  eventLocation: {
    fontSize: 16,
    color: '#777',
    marginBottom: 8,
  },
  eventCapacity: {
    fontSize: 16,
    color: '#555',
    marginBottom: 8,
  },
  eventRegistration: {
    fontSize: 16,
    color: '#555',
    marginBottom: 8,
  },
  eventEmail: {
    fontSize: 16,
    color: '#555',
    marginBottom: 8,
  },
  eventVirtual: {
    fontSize: 16,
    color: '#555',
    marginBottom: 8,
  },
  eventCreator: {
    fontSize: 16,
    color: '#555',
    marginBottom: 16,
  },
  buttonContainer: {
    marginTop: 16,
    alignSelf: 'stretch',
  },
});

export default EventsScreen;
