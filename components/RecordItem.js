import React from 'react';
import { Text, TouchableOpacity, StyleSheet } from 'react-native';

export default function RecordItem(props) {
  return (
    <TouchableOpacity style={styles.item}>
      <Text>{props.title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  item: {
    padding: 20,
  }
});
