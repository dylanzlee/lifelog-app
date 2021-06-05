import React, { useState } from 'react';
import { Text } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { auth } from '../../firebase';
import WelcomeScreen from '../screens/WelcomeScreen';

const RootNavigator = () => {
  return (
    <NavigationContainer theme={DefaultTheme}>
      <Text>This is the root navigator</Text>
    </NavigationContainer>
  );
}

export default RootNavigator;