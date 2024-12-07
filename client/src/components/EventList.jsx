import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import EventCard from './HomeEventCard';

const EventList = ({ title }) => (
  <View style={styles.eventList}>
    <View style={styles.header}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.link}>See All</Text>
    </View>
    <ScrollView horizontal showsHorizontalScrollIndicator={false}>
      <EventCard
        date="10 JUNE"
        title="International Band Music"
        attendees="+20 Going"
        location="36 Guild Street, London, UK"
      />
      {/* Add more EventCards as needed */}
    </ScrollView>
  </View>
);

const styles = StyleSheet.create({
  eventList: {
    marginBottom: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  link: {
    color: '#6C5CE7',
    fontWeight: 'bold',
  },
});

export default EventList;
