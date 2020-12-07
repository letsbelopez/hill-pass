import React from 'react';
import {View, Button} from 'react-native';

export default function RecordScreen({record, onCancel}) {
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
        <Button title="Cancel" onPress={onCancel} />
      </View>
    </View>
  )
}
