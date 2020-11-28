import React from 'react';
import { FlatList, SafeAreaView, StyleSheet, View } from 'react-native';

import RecordItem from '../components/RecordItem';

export default function RecordsScreen() {
  const renderItem = ({item}) => {
    return (
      <RecordItem 
        title={item.title} 
        milliseconds={item.milliseconds}
        count={item.count} 
      />
    );
  };

  const DATA = [
    { id: '1', title: 'Hill Climbs', milliseconds: 1000, count: 7 },
    { id: '2', title: 'Laps', milliseconds: 2000, count: 7 },
    { id: '3', title: 'Jump Rope', milliseconds: 3000, count: 7 },
    { id: '4', title: 'Heavy Squats', milliseconds: 4000, count: 7 },
    { id: '5', title: 'Pullups', milliseconds: 5000, count: 7 },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={DATA}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        ItemSeparatorComponent={() => <View style={styles.separator} />} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  separator: {
    backgroundColor: 'black',
    height: 1
  }
})
