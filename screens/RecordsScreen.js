import React, { useState, useEffect } from 'react';
import { FlatList, SafeAreaView, StyleSheet, TouchableOpacity, View, Text, Modal } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import RecordItem from '../components/RecordItem';
import RecordScreen from './RecordScreen';

export default function RecordsScreen(props) {
  const [data, setData] = useState([]);
  const [selectedRecord, setSelectedRecord] = useState(null);
  
  useEffect(() => {
    /**
     * Records Type:
     * { id: '1', title: 'Hill Climbs', milliseconds: 1000, count: 7 }
     */
    // AsyncStorage.setItem('records', JSON.stringify([]));
    AsyncStorage.getItem('records')
      .then(data => setData(JSON.parse(data)));
  }, []);

  const renderItem = ({item}) => {
    return (
      <RecordItem 
        record={item}
        onPress={selectRecord}
      />
    );
  }

  const selectRecord = record => {
    setSelectedRecord(record);
  }

  const onDelete = async id => {
    let filtered = data.filter(r => r.id != id);
    try {
      await AsyncStorage.setItem('records', JSON.stringify(filtered));
    } catch (error) {
      console.log(`Error saving data`);
    }
    setData(filtered);
    setSelectedRecord(null);
  }

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
        ListEmptyComponent={() => <View style={styles.emptyComponent}><Text style={{color: 'grey'}}>List is empty, record something!</Text></View>}
      />
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
      <Modal
        animationType="slide"
        transparent={false}
        visible={!!selectedRecord}
        presentationStyle="overFullScreen"
        onRequestClose={() => {
          console.log('Modal has been closed.');
        }}>
        <RecordScreen record={selectedRecord} onCancel={() => setSelectedRecord(null)} onDelete={onDelete} />
      </Modal>
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
  },
  emptyComponent: {
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
