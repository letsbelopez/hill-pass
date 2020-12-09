import React, { useState } from 'react';

import RecordingScreen from './screens/RecordingScreen';
import RecordsScreen from './screens/RecordsScreen';

export default function App() {
  const [isRecording, setIsRecording] = useState(false);

  const onStartRecording = () => setIsRecording(true);
  const onStopRecording = () => setIsRecording(false);

  return (
    isRecording ? <RecordingScreen onStopRecording={onStopRecording} /> : <RecordsScreen onStartRecording={onStartRecording} />
  );
}
