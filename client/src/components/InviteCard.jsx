import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const InviteCard = () => (
  <View style={styles.card}>
    <Text style={styles.title}>Invite your friends</Text>
    <Text style={styles.subtitle}>Get $20 for ticket</Text>
    <TouchableOpacity style={styles.button}>
      <Text style={styles.buttonText}>INVITE</Text>
    </TouchableOpacity>
  </View>
);

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#A29BFE',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
    marginVertical: 20,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  subtitle: {
    fontSize: 14,
    color: '#FFFFFF',
    marginVertical: 10,
  },
  button: {
    backgroundColor: '#00CEC9',
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
});

export default InviteCard;
