import React from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';

const SearchBar = ({ placeholder }) => (
  <View style={styles.searchBar}>
    <Text>🔍</Text> 
    <TextInput
      style={styles.searchInput}
      placeholder={placeholder}
      placeholderTextColor="#B0B0B0"
    />
  </View>
);

const styles = StyleSheet.create({
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F1F1F1',
    margin: 15,
    padding: 10,
    borderRadius: 10,
  },
  searchInput: {
    marginLeft: 10,
    flex: 1,
    color: '#000',
  },
});

export default SearchBar;
