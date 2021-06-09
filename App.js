import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import AuthNavigator from './src/navigation/AuthNavigator';
import SelectScreen from './src/screens/SelectScreen';
import SelectBox from './src/components/SelectBox';


const App = () => {
  return (
    <>
      {/* <AuthNavigator /> */}
      <SelectScreen />
      {/* <SelectBox 
        backgroundColor='#FFF8DC'
        title='Exercise' /> */}
    </>
  );
}

export default App;