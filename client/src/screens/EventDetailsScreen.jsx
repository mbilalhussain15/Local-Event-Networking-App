import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const events = [
  {
    id: '1',
    eventName: 'International Band Music Concert',
    description:
      'Enjoy your favorite dishes and spend a lovely time with your friends and family. Food from local food trucks will be available for purchase.',
    date: '14 December, 2021',
    time: 'Tuesday, 4:00PM - 9:00PM',
    location: {
      venueName: 'Gala Convention Center',
      address: '36 Guild Street, London, UK',
    },
    organizer: 'Ashfak Sayem',
    ticketPrice: 120,
    image:
      'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4', // Replace with actual image URL or local asset
  },
];

const EventDetailsScreen = ({ route }) => {
  const { eventId } = route.params;
  const event = events.find((item) => item.id === eventId);

  if (!event) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>Event not found.</Text>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Header with Image */}
      <Image source={{ uri: event.image }} style={styles.headerImage} />

      {/* Event Details */}
      <View style={styles.detailsContainer}>
        <Text style={styles.title}>{event.eventName}</Text>

        <View style={styles.row}>
          <Icon name="calendar-outline" size={24} color="#5C3BE7" />
          <View style={styles.textContainer}>
            <Text style={styles.label}>{event.date}</Text>
            <Text style={styles.subLabel}>{event.time}</Text>
          </View>
        </View>

        <View style={styles.row}>
          <Icon name="location-outline" size={24} color="#5C3BE7" />
          <View style={styles.textContainer}>
            <Text style={styles.label}>{event.location.venueName}</Text>
            <Text style={styles.subLabel}>{event.location.address}</Text>
          </View>
        </View>

        <View style={styles.row}>
          <Image
            source={{
              uri: 'https://via.placeholder.com/40', // Replace with actual organizer image URL
            }}
            style={styles.organizerImage}
          />
          <View style={styles.textContainer}>
            <Text style={styles.label}>{event.organizer}</Text>
            <Text style={styles.subLabel}>Organizer</Text>
          </View>
        </View>

        {/* About Event */}
        <Text style={styles.sectionTitle}>About Event</Text>
        <Text style={styles.description}>{event.description}</Text>
      </View>

      {/* Buy Ticket Button */}
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>BUY TICKET ${event.ticketPrice}</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    paddingBottom: 16,
  },
  headerImage: {
    width: '100%',
    height: 250,
  },
  detailsContainer: {
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  textContainer: {
    marginLeft: 8,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  subLabel: {
    fontSize: 14,
    color: '#666',
  },
  organizerImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 16,
    marginBottom: 8,
  },
  description: {
    fontSize: 14,
    lineHeight: 20,
    color: '#333',
  },
  button: {
    marginTop: 16,
    backgroundColor: '#5C3BE7',
    paddingVertical: 16,
    alignItems: 'center',
    borderRadius: 8,
    marginHorizontal: 16,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  errorText: {
    fontSize: 18,
    color: 'red',
    textAlign: 'center',
    marginTop: 32,
  },
});

export default EventDetailsScreen;
