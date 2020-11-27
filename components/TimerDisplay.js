import React from 'react';
import { Text, View, StyleSheet } from 'react-native';

export default function TimerDisplay(props) {
  let days = Math.floor(props.seconds / (1000 * 60 * 60 * 24));
  let hours = Math.floor((props.seconds % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  let minutes = Math.floor((props.seconds % (1000 * 60 * 60)) / (1000 * 60));
  let seconds = Math.floor((props.seconds % (1000 * 60)) / 1000);
  let milliseconds = Math.floor((props.seconds % (1000)) / 1);

  return (
    <View style={styles.container}>
      { days > 0 ? <Text>{`${days}d`}</Text> : null }
      { hours > 0 ? <Text>{`${hours}h`}</Text> : null }
      { hours > 0 ? <Text>{`${hours}h`}</Text> : null }
      <Text style={styles.text}>{`${minutes}`.padStart(2, '0')}:</Text>
      <Text style={styles.text}>{`${seconds}`.padStart(2, '0')}:</Text>
      <Text style={styles.text}>{`${milliseconds}`.padStart(3, '0')}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  text: {
    color: 'white',
    fontSize: 50,
    fontVariant: ['tabular-nums'],
  }
});
