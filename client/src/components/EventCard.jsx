import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';

const EventCard = ({ eventName, category, location, onPress }) => (
  <TouchableOpacity style={styles.card} onPress={onPress}>
    <Text style={styles.eventName}>{eventName}</Text>
    <Text style={styles.eventCategory}>Category: {category}</Text>
    <Text style={styles.eventLocation}>
      Location: {location.venueName}, {location.city}
    </Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
    alignItems: 'center',
  },
  eventName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
    textAlign: 'center',
  },
  eventCategory: {
    fontSize: 14,
    color: '#555',
    marginBottom: 4,
    textAlign: 'center',
  },
  eventLocation: {
    fontSize: 12,
    color: '#888',
    textAlign: 'center',
  },
});

export default EventCard;
