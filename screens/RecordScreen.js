import React from 'react';
import {View, Button, Text, StyleSheet} from 'react-native';
import TimerDisplay from '../components/TimerDisplay';

export default function RecordScreen({record, onCancel, onResumeRecordTiming, onDelete}) {
  return (
    <View style={{
      backgroundColor: 'white',
      paddingVertical: 50,
      justifyContent: 'center',
      flex: 1
    }}>
      <View style={styles.horizontalRow}>
        <View style={styles.stat}>
          <Text style={styles.statLabel}>Time</Text>
          <TimerDisplay seconds={record.milliseconds} fontSize={20} />
        </View>
        <View style={{borderWidth: 0.5, borderColor: 'grey', height: '35%'}} />
        <View style={styles.stat}>
          <Text style={styles.statLabel}>Count</Text>
          <Text style={{fontSize: 20}}>{record.count}</Text>
        </View>
      </View>
      <View style={styles.header}><Text style={styles.statLabel}>THE DETAILS</Text></View>
      <View style={{...styles.formItem, ...styles.horizontalRow}}>
        <Text style={styles.formItemLabel}>Name:</Text>
        <Text>{record.title}</Text>
      </View>
      <Button title="Cancel" color="grey" onPress={onCancel} />
      <Button title="Start new timer based on these values" onPress={() => onResumeRecordTiming(record)} />
      <Button title="Delete" color="red" onPress={() => onDelete(record.id)} />
    </View>
  )
}

const styles = StyleSheet.create({
  horizontalRow: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  stat: {
    paddingVertical: 10,
    paddingHorizontal: 20
  },
  statLabel: {
    fontSize: 11,
    color: 'grey'
  },
  header: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: 'lightgrey'
  },
  formItem: {
    padding: 20,
  },
  formItemLabel: {
    marginRight: 20
  },
});
