import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';

const EventCard = ({ date, title, attendees, location }) => (
  <View style={styles.card}>
    <Image
      source={{ uri: 'https://via.placeholder.com/150' }}
      style={styles.image}
    />
    <View style={styles.details}>
      <Text style={styles.date}>{date}</Text>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.attendees}>{attendees}</Text>
      <Text style={styles.location}>{location}</Text>
    </View>
  </View>
);

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    overflow: 'hidden',
    marginRight: 10,
    width: 200,
  },
  image: {
    width: '100%',
    height: 100,
  },
  details: {
    padding: 10,
  },
  date: {
    color: '#FF6B6B',
    fontSize: 12,
    fontWeight: 'bold',
  },
  title: {
    fontSize: 14,
    fontWeight: 'bold',
    marginVertical: 5,
  },
  attendees: {
    fontSize: 12,
    color: '#6C757D',
  },
  location: {
    fontSize: 12,
    color: '#6C757D',
    marginTop: 5,
  },
});

export default EventCard;
