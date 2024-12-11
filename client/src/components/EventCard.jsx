import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const EventCard = ({ eventName, category, location, imageUrl, onPress }) => (
  <TouchableOpacity style={styles.wrapper} onPress={onPress}>
    <View style={styles.card}>
      <View style={styles.contentWrapper}>
        <Image source={{ uri: imageUrl }} style={styles.image} />
        <View style={styles.textContainer}>
          <Text style={styles.eventName}>{eventName}</Text>
          <Text style={styles.eventCategory}>Category: {category}</Text>
          <Text style={styles.eventLocation}>
            Location: {location.venueName}, {location.city}
          </Text>
        </View>
      </View>
    </View>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  wrapper: {
    margin: 10,
  },
  card: {
    backgroundColor: '#FFF',
    borderRadius: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 6,
    elevation: 6,
    padding: 12,
    marginBottom: 16,
    alignItems: 'flex-start',
  },
  contentWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginRight: 16,
  },
  textContainer: {
    flex: 1,
    paddingRight: 16,
  },
  eventName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 4,
    textAlign: 'left',
  },
  eventCategory: {
    fontSize: 14,
    color: '#555',
    marginBottom: 2,
    textAlign: 'left',
  },
  eventLocation: {
    fontSize: 12,
    color: '#888',
    textAlign: 'left',
  },
});

export default EventCard;

// The imageUrl passed to EventCard in EventsScreen.jsx now uses the logic from EventDetailsScreen.jsx
// Ensure to pass updatedEvent?.image (processed using updateImageUrlForPlatform) to this component.
