import React, {useState, useEffect} from 'react';
import {View, Text, TextInput, Button, StyleSheet} from 'react-native';

import TimerDisplay from '../components/TimerDisplay';

export default function FinishScreen(props) {
  const [value, setTitle] = useState(null);

  useEffect(() => {
    if (props.title) setTitle(props.title);
  }, []);

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
          <TimerDisplay seconds={props.milliseconds} fontSize={20} />
        </View>
        <View style={{borderWidth: 0.5, borderColor: 'grey', height: '35%'}} />
        <View style={styles.stat}>
          <Text style={styles.statLabel}>Count</Text>
          <Text style={{fontSize: 20}}>{props.count}</Text>
        </View>
      </View>
      <View style={styles.header}><Text style={styles.statLabel}>CUSTOMIZE YOUR TIMER</Text></View>
      <View style={{...styles.formItem, ...styles.horizontalRow}}>
        <Text style={styles.formItemLabel}>Name:</Text>
        <TextInput placeholder="Title your recording" value={value} onChangeText={text => setTitle(text)} />
      </View>
      <Button title="Resume" onPress={props.onResume} />
      <Button title="Discard Activity" color="red" onPress={props.onDiscard} />
      <Button title="Save" onPress={() => props.onSave(value)} />
    </View>
  );
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
