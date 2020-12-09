import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Button, SafeAreaView, Modal } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import TimerDisplay from '../components/TimerDisplay';
import FinishScreen from './FinishScreen';

export default class RecordingScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      count: 0,
      seconds: 0,
      interval: null,
      pausedTime: 0,
      finishModalVisible: false,
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

  onFinish = () => {
    this.setState({finishModalVisible: true});
  }

  onSave = async (title) => {
    try {
      const value = await AsyncStorage.getItem('records');
      if(value !== null) {
        let data = JSON.parse(value);
        await AsyncStorage.setItem('records', JSON.stringify(
          [
            ...data, 
            { id: `${Date.now()}`, title, milliseconds: this.state.seconds, count: this.state.count }
          ]
        ));
      } else {
        await AsyncStorage.setItem('records', JSON.stringify(
          [
            { id: `${Date.now()}`, title, milliseconds: this.state.seconds, count: this.state.count }
          ]
        ));
      }
    } catch(e) {
      // error reading value
      console.log('error writing value');
    }
    this.setState({finishModalVisible: false});
    return this.props.onStopRecording();
  }

  onDiscard = () => {
    this.setState({finishModalVisible: false});
    this.props.onStopRecording();
  }

  render() {
    const { seconds, count, interval, finishModalVisible } = this.state;
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
          <View style={styles.buttonContainer}>
            <Button onPress={this.onCountDown} title="-" />
            <TouchableOpacity onPress={interval ? this.onStopClock : this.onStartClock}>
              <View style={interval ? styles.stopButton : styles.resumeButton}>
                {interval ? <View style={styles.stopIcon}></View> : <Text style={{fontWeight: 'bold'}}>RESUME</Text>}
              </View>
            </TouchableOpacity>
            {!interval && (
              <TouchableOpacity onPress={this.onFinish}>
                <View style={styles.stopButton}>
                  <Text style={{color: 'white', fontWeight: 'bold'}}>FINISH</Text>
                </View>
              </TouchableOpacity>
            )}
            <Button onPress={this.onCountUp} title="+" />
          </View>
        </View>

        <Modal
          animationType="slide"
          transparent={false}
          visible={finishModalVisible}
          presentationStyle="overFullScreen"
        >
          <FinishScreen 
            milliseconds={seconds} 
            count={count}
            onSave={(title) => this.onSave(title) } 
            onResume={() => this.setState({finishModalVisible: false})} 
            onDiscard={() => this.onDiscard()} />
        </Modal>
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
  stopButton: {
    width: 75,
    height: 75,
    borderRadius: 75 * 2,
    backgroundColor: 'black',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,

    elevation: 4,
  },
  resumeButton: {
    width: 75,
    height: 75,
    borderRadius: 75 * 2,
    borderColor: 'black',
    borderWidth: 2,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
  
    elevation: 4,
  },
  stopIcon: {
    height: 20,
    width: 20,
    backgroundColor: 'white',
  },
  buttonContainer: {
    flexDirection: 'row', 
    justifyContent: 'space-around', 
    flex: 1, 
    alignItems: 'center',
  },
});
