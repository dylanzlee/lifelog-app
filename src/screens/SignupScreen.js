import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import DismissKeyboard from '../components/DismissKeyboard';

const SignupScreen = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <DismissKeyboard>
      <View style={styles.container}>
        <View style={styles.nameContainer}>
          <Text style={styles.name}>LifeLog</Text>
        </View>
        <TextInput
          style={styles.inputBox}
          value={name}
          onChangeText={input => setName(input)}
          placeholder='Full name' />
        <TextInput
          style={styles.inputBox}
          value={email}
          onChangeText={input => setEmail(input)}
          placeholder='Email' />
        <TextInput
          style={styles.inputBox}
          value={password}
          onChangeText={input => setPassword(input)}
          placeholder='Password' />
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Signup</Text>
        </TouchableOpacity>
      </View>
    </DismissKeyboard>
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
  inputBox: {
    width: '85%',
    textAlign: 'center',
    fontSize: 16,
    margin: 10,
    padding: 15,
    borderColor: '#d3d3d3',
    borderBottomWidth: 1
  },
  button: {
    marginTop: 30,
    marginBottom: 20,
    paddingVertical: 5,
    alignItems: 'center',
    backgroundColor: '#FFA611',
    borderColor: '#FFA611',
    borderWidth: 1,
    borderRadius: 20,
    width: 200
  },
  buttonText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff'
  }
});

export default SignupScreen;