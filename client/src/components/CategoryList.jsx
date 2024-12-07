import React from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import CategoryButton from './CategoryButton';

const categories = [
  { label: '  Sports  ', color: '#FF6B6B' },
  { label: '  Music  ', color: '#FF9F43' },
  { label: '   Food   ', color: '#1DD1A1' },
  { label: '    Art    ', color: '#87CEEB' },
];

const CategoryList = () => (
  <ScrollView horizontal style={styles.categoryList} showsHorizontalScrollIndicator={false}>
    {categories.map((category, index) => (
      <CategoryButton key={index} label={category.label} color={category.color} />
    ))}
  </ScrollView>
);

const styles = StyleSheet.create({
  categoryList: {
    paddingHorizontal: 10,
    marginBottom: 10,
  },
});

export default CategoryList;
