import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import AuthNavigator from './src/navigation/AuthNavigator';
import TabNavigator from './src/navigation/TabNavigator';

const App = () => {
  return (
    <NavigationContainer>
      {/* <AuthNavigator /> */}
      <TabNavigator />
    </NavigationContainer>
  );
}

export default App;