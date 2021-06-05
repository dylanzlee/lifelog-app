import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

const WelcomeScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <View style={styles.nameContainer}>
        <Text style={styles.name}>LifeLog</Text>
      </View>
      <View style={styles.buttonsContainer}>
        <TouchableOpacity
          style={styles.signupButton}
          onPress={() => navigation.push("SignUp")} >
          <Text style={styles.buttonText}>Get started</Text>
        </TouchableOpacity>
        <TouchableOpacity
        style={styles.loginbutton}
        onPress={() => navigation.push("Login")} >
          <Text style={styles.buttonText}>Log in</Text>
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
    fontSize: 45
  },
  buttonsContainer: {
    alignItems: 'center',
    marginTop: 70
  },
  signupButton: {
    margin: 10,
    paddingVertical: 10,
    alignItems: 'center',
    backgroundColor: '#FFA611',
    borderColor: '#FFA611',
    borderWidth: 1,
    borderRadius: 20,
    width: 280
  },
  loginbutton: {
    margin: 10,
    paddingVertical: 10,
    alignItems: 'center',
    backgroundColor: '#F6820D',
    borderColor: '#F6820D',
    borderWidth: 1,
    borderRadius: 20,
    width: 280
  },
  buttonText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff'
  }
});

export default WelcomeScreen;