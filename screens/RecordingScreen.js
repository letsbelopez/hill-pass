import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Button, SafeAreaView } from 'react-native';
import TimerDisplay from '../components/TimerDisplay';

export default class RecordingScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      count: 0,
      seconds: 0,
      interval: null,
      pausedTime: 0,
    };
  }

  componentDidMount() {
    this.onStartClock();
  }

  componentWillUnmount() {
    if (this.state.interval) clearInterval(this.state.interval);
  }

  onStartClock = () => {
    let startTime = Date.now();

    let intervalId = setInterval(() => {
      let currentTime = Date.now();
      let difference;
      if (this.state.pausedTime) {
        difference = (currentTime - startTime) + this.state.pausedTime;
      } else {
        difference = currentTime - startTime;
      }
      this.setState({seconds: difference});
    }, 1);
    this.setState({interval: intervalId});
  }

  onStopClock = () => {
    clearInterval(this.state.interval);
    this.setState({
      interval: null,
      pausedTime: this.state.seconds,
    });
  }
  
  onCountUp = () => {
    this.setState({count: this.state.count + 1});
  }

  onCountDown = () => {
    this.setState({count: this.state.count - 1});
  }
  
  resetClock = () => {
    this.setState({
      seconds: 0,
      pausedTime: 0
    });
  }

  render() {
    const { seconds, count } = this.state;
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.sectionVertical}>
          <Text style={styles.label}>TIME</Text>
          <TimerDisplay seconds={seconds} fontSize={75} color='black' />
        </View>
        <View style={{...styles.sectionVertical, ...styles.borderTop}}>
          <Text style={styles.label}>COUNT</Text>
          <Text style={{fontSize: 100}}>{count}</Text>
        </View>
        <View style={{...styles.sectionHorizontal, ...styles.borderTop}}>
          <Button onPress={this.onCountDown} title="-" />
          <Button onPress={this.onStopClock} title="Stop" />
          <Button onPress={this.onCountUp} title="+" />
        </View>
        <StatusBar style="auto" />
      </SafeAreaView>
    );
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  label: {
    color: 'lightgrey',
  },
  sectionVertical: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 50,
    width: '90%',
    flex: 1,
  },
  sectionHorizontal: {
    paddingVertical: 50,
    justifyContent: 'space-around',
    alignItems: 'flex-end',
    flexDirection: 'row',
    width: '90%',
    flex: 1,
  },
  borderTop: {
    borderTopColor: 'lightgrey',
    borderTopWidth: 1,
  },
});
