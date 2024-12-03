import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';

const CategoryButton = ({ label, color }) => (
  <TouchableOpacity style={[styles.button, { backgroundColor: color }]}>
    <Text style={styles.text}>{label}</Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  button: {
    padding: 10,
    borderRadius: 20,
    marginHorizontal: 5,
  },
  text: {
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
});

export default CategoryButton;
