import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import DismissKeyboard from '../components/DismissKeyboard'; 

const WelcomeScreen = () => {
  return (
    <View style={styles.container}>
      <View style={styles.nameContainer}>
        <Text style={styles.name}>LifeLog</Text>
      </View>
      <View style={styles.buttons}>
        <TouchableOpacity>
          <Text>Get started</Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text>Log in</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  },
  nameContainer: {
    marginBottom: 20,
    paddingBottom: 50
  },
  name: {
    fontSize: 40
  },
  buttons: {
    alignItems: 'center'
  }
});

export default WelcomeScreen;