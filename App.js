import React, { useState } from 'react';

import RecordingScreen from './screens/RecordingScreen';
import RecordsScreen from './screens/RecordsScreen';

export default function App() {
  const [isRecording, setIsRecording] = useState(false);

  return (
    isRecording ? <RecordingScreen /> : <RecordsScreen />
  );
}
