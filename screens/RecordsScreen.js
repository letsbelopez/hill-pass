import React, { useState, useEffect } from 'react';
import { FlatList, SafeAreaView, StyleSheet, TouchableOpacity, View, Text } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import RecordItem from '../components/RecordItem';

export default function RecordsScreen(props) {
  const [data, setData] = useState([]);
  
  useEffect(() => {
    // AsyncStorage.setItem('records', JSON.stringify([]));
    AsyncStorage.getItem('records')
      .then(data => setData(JSON.parse(data)))
  });

  const renderItem = ({item}) => {
    return (
      <RecordItem 
        title={item.title} 
        milliseconds={item.milliseconds}
        count={item.count} 
      />
    );
  }

  // const DATA = [
  //   { id: '1', title: 'Hill Climbs', milliseconds: 1000, count: 7 },
  //   { id: '2', title: 'Laps', milliseconds: 2000, count: 7 },
  //   { id: '3', title: 'Jump Rope', milliseconds: 3000, count: 7 },
  //   { id: '4', title: 'Heavy Squats', milliseconds: 4000, count: 7 },
  //   { id: '5', title: 'Pullups', milliseconds: 5000, count: 7 },
  // ];

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        ItemSeparatorComponent={() => <View style={styles.separator} />} />
      <View style={styles.footer}>
        <TouchableOpacity onPress={props.onStartRecording}>
          <View style={styles.recordButton}>
            <View style={styles.recordIconOuter}>
              <View style={styles.recordIcon}></View>
            </View>
            <Text style={styles.recordButtonLabel}>Record</Text>
          </View>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white'
  },
  separator: {
    backgroundColor: 'lightgrey',
    height: 1,
    marginLeft: 20
  },
  footer: {
    paddingTop: 5,
    paddingBottom: 5,
    borderTopWidth: 1,
    borderTopColor: 'lightgrey',
    backgroundColor: 'white'
  },
  recordButton: {
    marginLeft: 'auto',
    marginRight: 'auto',
    alignItems: 'center',
  },
  recordButtonLabel: {
    marginTop: 5
  },
  recordIconOuter: {
    height: 30,
    width: 30,
    borderRadius: 30 *2,
    borderWidth: 1,
    borderColor: 'grey',
    alignItems: 'center',
    justifyContent: 'center',
  },
  recordIcon: {
    height: 15,
    width: 15,
    borderRadius: 15 * 2,
    backgroundColor: 'grey'
  }
});
