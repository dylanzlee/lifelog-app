import React from 'react';
import { StyleSheet } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import WelcomeScreen from '../screens/WelcomeScreen';
import SignupScreen from '../screens/SignupScreen';
import LoginScreen from '../screens/LoginScreen';
import colors from '../constants/colors';
import { AntDesign } from '@expo/vector-icons';

const AuthStack = createStackNavigator();

const AuthNavigator = () => {
  return (
    <AuthStack.Navigator>
      <AuthStack.Screen
        name="Welcome"
        component={WelcomeScreen}
        options={{
          title: "",
          headerStyle: styles.header,
          headerShown: false,
        }}
      />
      <AuthStack.Screen
        name="SignUp"
        component={SignupScreen}
        options={({ navigation }) => ({
          title: "",
          headerStyle: styles.header,
          headerLeft: () => (
            <AntDesign
              name="left"
              size={35}
              color={colors.authButtonColor}
              onPress={() => navigation.goBack()}
            />
          ),
          headerLeftContainerStyle: styles.backButton,
        })}
      />
      <AuthStack.Screen
        name="Login"
        component={LoginScreen}
        options={({ navigation }) => ({
          title: "",
          headerStyle: styles.header,
          headerLeft: () => (
            <AntDesign
              name="left"
              size={35}
              color={colors.authButtonColor}
              onPress={() => navigation.goBack()}
            />
          ),
          headerLeftContainerStyle: styles.backButton,
        })}
      />
    </AuthStack.Navigator>
  );
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: colors.authBGColor,
    borderBottomWidth: 0,
    shadowOpacity: 0,
  },
  backButton: {
    marginLeft: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default AuthNavigator;