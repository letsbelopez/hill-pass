import React from 'react';
import { Text, TouchableOpacity, StyleSheet, View } from 'react-native';

import TimerDisplay from './TimerDisplay';

export default function RecordItem(props) {
  return (
    <TouchableOpacity style={styles.item}>
      <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
        <Text>{props.title}</Text>
        <View style={{alignItems: 'flex-end'}}>
          <TimerDisplay seconds={props.milliseconds} fontSize={14} color='black' />
          <Text>{props.count}</Text>
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
