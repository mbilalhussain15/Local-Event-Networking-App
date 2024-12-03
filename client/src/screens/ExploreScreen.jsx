import React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import CategoryList from '../components/CategoryList';
import EventList from '../components/EventList';
import Header from '../components/Header';
import InviteCard from '../components/InviteCard';
import SearchBar from '../components/SearchBar';

const ExploreScreen = () => {
  return (
    <View style={styles.container}>
      <Header location="New York, USA" />
      <SearchBar placeholder="Search..." />
      <CategoryList />
      <ScrollView style={styles.content}>
        <EventList title="Upcoming Events" />
        <InviteCard />
        {/* Placeholder for Nearby You section */}
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
});

export default ExploreScreen;
