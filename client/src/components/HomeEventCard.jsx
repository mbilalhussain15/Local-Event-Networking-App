import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';

const EventCard = ({ eventName, category, image, location, description }) => (
  <View style={styles.card}>
    <Image source={{ uri: image }} style={styles.image} />
    <Text style={styles.title}>{eventName}</Text>
    <Text style={styles.category}>Category: {category}</Text>
    {location && location.venueName && (
      <Text style={styles.location}>
        Location: {location.venueName}, {location.city || ''} {location.state || ''} {location.country || ''}
      </Text>
    )}
    {description && <Text style={styles.description}>{description}</Text>}
  </View>
);

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 10,
    margin: 5,
    width: 140,
  },
  image: {
    width: '100%',
    height: 80,
    borderRadius: 8,
    marginBottom: 5,
  },
  title: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  category: {
    fontSize: 12,
    color: '#777',
    marginBottom: 5,
  },
  location: {
    fontSize: 12,
    color: '#555',
    marginBottom: 5,
  },
  description: {
    fontSize: 12,
    color: '#555',
  },
});

export default EventCard;
