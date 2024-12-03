import React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import Category from '../components/CategoryList';
import EventCard from '../components/EventCard';
import Header from '../components/Header';
import InviteCard from '../components/InviteCard';
import SearchBar from '../components/SearchBar';

const HomeScreen = () => {
  return (
    <View style={styles.container}>
      <Header location="New York, USA" />
      <SearchBar placeholder="Search..." />

      {/* Categories Section */}
      <View style={styles.categories}>
        <Category label="Sports" color="#FF6B6B" />
        <Category label="Music" color="#FF9F43" />
        <Category label="Food" color="#1DD1A1" />
      </View>

      {/* Main Content */}
      <ScrollView style={styles.content}>
        <EventCard
          date="10 JUNE"
          title="International Band Music"
          attendees="+20 Going"
          image="https://via.placeholder.com/150"
        />
        <EventCard
          date="10 JUNE"
          title="Jo Malone Event"
          attendees="+15 Going"
          image="https://via.placeholder.com/150"
        />

        <InviteCard
          title="Invite your friends"
          subtitle="Get $20 for ticket"
          buttonText="INVITE"
        />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFC',
  },
  categories: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    marginVertical: 10,
  },
  content: {
    paddingHorizontal: 20,
  },
});

export default HomeScreen;
