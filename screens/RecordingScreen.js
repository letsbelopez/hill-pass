import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Button, SafeAreaView } from 'react-native';
import TimerDisplay from '../components/TimerDisplay';

export default function RecordingScreen(props) {
  const [count, setCount] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [interval, setIntervalId] = useState(null);
  const [pausedTime, setPausedTime] = useState(0);

  const onStartClock = () => {
    let startTime = Date.now();

    let intervalId = setInterval(() => {
      let currentTime = Date.now();
      let difference;
      if (pausedTime) {
        difference = (currentTime - startTime) + pausedTime;
      } else {
        difference = currentTime - startTime;
      }
      setSeconds(difference);
    }, 1);
    setIntervalId(intervalId);
  }

  const onStopClock = () => {
    clearInterval(interval);
    setIntervalId(null);
    setPausedTime(seconds);
  }
  
  const onCountUp = () => {
    setCount(count + 1);
  }
  
  const resetClock = () => {
    setSeconds(0);
    setPausedTime(0);
  }

  return (
    <SafeAreaView style={styles.container}>
      <TimerDisplay seconds={seconds} fontSize={50} color='white' />
      <View style={styles.oneButtonContainer}>
        <TouchableOpacity onPress={() => onCountUp()}>
          <View style={styles.countPlusLargeShadow}>
            <View style={styles.countPlusMediumShadow}>
              <View style={styles.countPlus}>
                <Text style={styles.count}>{count}</Text>
              </View>
            </View>
          </View>
        </TouchableOpacity>
      </View>
      <View style={styles.twoButtonsContainer}>
        <TouchableOpacity onPress={() => {interval ? onStopClock() : onStartClock()}}>
          <View style={{...styles.buttonSmall, backgroundColor: typeof interval == 'number' ? 'red' : 'green',}}>
            <Text style={styles.playPauseText}>{typeof interval == 'number' ? 'Stop' : 'Start'}</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={resetClock} disabled={typeof interval == 'number'}>
          <View style={{...styles.buttonSmall, backgroundColor: 'grey', opacity: typeof interval == 'number' ? 0.5: 1}}>
            <Text style={styles.countPlusText}>Reset</Text>
          </View>
        </TouchableOpacity>
      </View>
      
      <Button onPress={() => setCount(count - 1)} title="-" />
      <Button onPress={props.onStopRecording} title="Go Back" />
      <StatusBar style="auto" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  buttonSmall: {
    backgroundColor: '#e81f76',
    height: 100,
    width: 100,
    borderRadius: 100 * 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  container: {
    flex: 1,
    backgroundColor: 'hsla(152, 0%, 10%, 1)',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  oneButtonContainer: {
    alignItems: 'center',
    width: '100%'
  },
  twoButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%'
  },
  countPlus: {
    backgroundColor: '#fff',
    shadowColor: '#fff',
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowRadius: 30,
    shadowOpacity: .5,
    height: 250,
    width: 250,
    borderRadius: 250 * 2,
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: 75
  },
  countPlusMediumShadow: {
    shadowColor: '#f0f',
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowRadius: 60,
    shadowOpacity: 1,
  },
  countPlusLargeShadow: {
    shadowColor: '#0ff',
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowRadius: 70,
    shadowOpacity: .8,
  },
  countPlusText: {
    color: 'white',
    fontSize: 20
  },
  playPauseText: {
    color: 'white',
    fontSize: 20
  },
  count: {
    color: 'black',
    fontSize: 75
  }
});
