import React, { useState } from 'react';

import RecordingScreen from './screens/RecordingScreen';
import RecordsScreen from './screens/RecordsScreen';

export default function App() {
  const [isRecording, setIsRecording] = useState(false);
  const [resumedRecord, setResumedRecord] = useState(null);

  const onStartRecording = (record) => {
    if (record) setResumedRecord(record);
    setIsRecording(true);
  }

  const onStopRecording = () => setIsRecording(false);

  return (
    isRecording ? <RecordingScreen onStopRecording={onStopRecording} record={resumedRecord} /> : <RecordsScreen onStartRecording={onStartRecording} />
  );
}
