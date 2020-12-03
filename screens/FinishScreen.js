import React, {useState} from 'react';
import {View, Text, TextInput} from 'react-native';

import TimerDisplay from '../components/TimerDisplay';

export default function FinishScreen(props) {
  const [value, setTitle] = useState()
  return (
    <View style={{
      backgroundColor: 'white',
      borderRadius: 20,
      paddingVertical: 50,
      alignItems: 'center',
      justifyContent: 'center',
      flex: 1
    }}>
      <View>
        <View>
          <Text>Name:</Text>
          <TextInput placeholder="Title your recording" value={value} onChangeText={text => setTitle(text)} />
        </View>
        <Text>Time: <TimerDisplay seconds={props.milliseconds} /></Text>
        <Text>Count: {props.count}</Text>
      </View>
    </View>
  );
}