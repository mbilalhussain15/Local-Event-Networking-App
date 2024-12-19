import React, {useEffect, useContext,useCallback } from 'react';
import { View, Text, FlatList, StyleSheet, ActivityIndicator } from 'react-native';
import { useGetTicketsByUserIdQuery } from '../redux/slices/api/ticketApiSlice';
import { useGetEventsQuery } from '../redux/slices/api/eventApiSlice';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { UserContext } from '../context/UserContext';
import EventsHeader from '../components/EventsHeader';
import {useFocusEffect } from '@react-navigation/native'; 
import { useTranslation } from 'react-i18next';

const TicketsList = () => {
  const {t} = useTranslation();
  const { user, refreshFlag  } = useContext(UserContext); 
  const userId = user?.user?._id;

  
  const { data: tickets, isLoading, isError, error, refetch: refetchTickets } = useGetTicketsByUserIdQuery(userId, {
    skip: !userId, 
  });

  const { data: events } = useGetEventsQuery();

  const ticketsWithEventName = tickets?.map(ticket => {
    const event = events?.find(event => event._id === ticket.eventId);
    return {
      ...ticket,
      eventName: event ? event.eventName : t('tickets.unknownEvent'), 
    };
  });

  useFocusEffect(
    useCallback(() => {
      console.log('Home tab focused. Refetching events...');
      refetchTickets(); 
    }, [refetchTickets])
  );

  useEffect(() => {
    if (refreshFlag) {
      refetchTickets();
    }
  }, [refreshFlag, refetchTickets]);
  // Render each ticket item
  const renderItem = ({ item }) => (
    <View style={styles.ticketContainer}>
      <Text style={styles.eventName}>{t('tickets.event')}: {item.eventName}</Text>
      <Text style={styles.ticketPrice}>{t('tickets.price')}: {item.price} {item.currency}</Text>
      <Text style={styles.ticketType}>{t('tickets.ticketType')}: {item.ticketType}</Text>
    </View>
  );

  if (!userId) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>{t('tickets.loginMessage')}</Text>
      </View>
    );
  }

  if (isLoading) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text>{t('tickets.loadingMessage')}</Text>
      </View>
    );
  }

  if (isError) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>{t('tickets.errorMessage')}: {error?.data?.message || t('tickets.genericError')}</Text>
      </View>
    );
  }

  return (
    <>
    <EventsHeader title={t('tickets.header')} style={styles.headerFullWidth} />
    <View style={styles.container}>
      <FlatList
        data={ticketsWithEventName || []} 
        keyExtractor={(item) => (item._id ? item._id.toString() : Math.random().toString())} 
        renderItem={renderItem}
        ListEmptyComponent={<Text>{t('tickets.noTickets')}</Text>}
      />
    </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f9f9f9',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
  },
  ticketContainer: {
    backgroundColor: '#fff',
    padding: 12,
    marginBottom: 10,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  ticketType: {
    fontSize: 16,
    color: '#666',
  },

  ticketPrice: {
    fontSize: 16,
    color: '#666',
    marginTop: 4,
  },
  eventName: {
    fontSize: 18,
    color: 'black',
    marginTop: 4,
    fontWeight: 'bold',
  },
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    color: 'red',
    fontSize: 16,
  },
  headerFullWidth: {
    marginHorizontal: 0,
    width: '100%',
  },
});

export default TicketsList;
