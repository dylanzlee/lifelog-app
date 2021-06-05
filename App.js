import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import RootNavigator from './src/navigation/RootNavigator';
import SignupScreen from './src/screens/SignupScreen';
import LoginScreen from './src/screens/LoginScreen';
import WelcomeScreen from './src/screens/WelcomeScreen';

const App = () => {
  return (
    <>
      {/* <RootNavigator /> */}
      {/* <SignupScreen /> */}
      {/* <LoginScreen /> */}
      <WelcomeScreen />
    </>
  );
}

export default App;

