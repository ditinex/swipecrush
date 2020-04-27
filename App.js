import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  Modal,
  Alert
} from 'react-native';
import AppContainer from './src/index.js';

const App: () => React$Node = () => {
  console.disableYellowBox = true
  return (
    <>
      <StatusBar barStyle="dark-content" translucent backgroundColor="rgba(0, 0, 0, 0.05)" />
      <AppContainer />
    </>
  );
};

export default App;
