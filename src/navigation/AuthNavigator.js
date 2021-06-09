import React, { useState } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { auth } from '../../firebase';
import WelcomeScreen from '../screens/WelcomeScreen';
import SignupScreen from '../screens/SignupScreen';
import LoginScreen from '../screens/LoginScreen';

const AuthStack = createStackNavigator();

const AuthNavigator = () => {
  // const [signedIn, setSignedIn] = useState(false);

  // auth.onAuthStateChanged(user => {
  //   if (user) {
  //     setSignedIn(true);
  //   } else {
  //     setSignedIn(false);
  //   }
  // });

  return (
    <NavigationContainer theme={DefaultTheme}>
      <AuthStack.Navigator>
        <AuthStack.Screen
          name="Welcome"
          component={WelcomeScreen}
          options={{ title: "" }} />
        <AuthStack.Screen
          name="SignUp"
          component={SignupScreen}
          options={{ title: "" }} />
        <AuthStack.Screen
          name="Login"
          component={LoginScreen}
          options={{ title: "" }} />
      </AuthStack.Navigator>
    </NavigationContainer>
  );
}

export default AuthNavigator;