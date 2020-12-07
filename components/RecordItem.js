import React from 'react';
import { Text, TouchableOpacity, StyleSheet, View } from 'react-native';

import TimerDisplay from './TimerDisplay';

export default function RecordItem({record, onPress}) {
  return (
    <TouchableOpacity style={styles.item} onPress={() => onPress(record)}>
      <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
        <Text>{record.title}</Text>
        <View style={{alignItems: 'flex-end'}}>
          <TimerDisplay seconds={record.milliseconds} fontSize={14} color='black' />
          <Text>{record.count}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  item: {
    padding: 20
  }
});
