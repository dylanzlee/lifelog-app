import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Button } from 'react-native';
import DismissKeyboard from '../components/DismissKeyboard';

const LoginScreen = ({ navigation }) => {
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
          value={email}
          onChangeText={input => setEmail(input)}
          placeholder='Email'
          autoCapitalize='none' />
        <TextInput
          style={styles.inputBox}
          value={password}
          onChangeText={input => setPassword(input)}
          placeholder='Password'
          autoCapitalize='none'
          secureTextEntry={true} />
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.push("SignUp")}>
          <Text style={styles.buttonSignup}>Get started</Text>
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
    margin: 10,
    padding: 15,
    fontSize: 16,
    borderColor: '#d3d3d3',
    borderBottomWidth: 1,
    textAlign: 'center'
  },
  button: {
    marginTop: 30,
    marginBottom: 20,
    paddingVertical: 5,
    alignItems: 'center',
    backgroundColor: '#F6820D',
    borderColor: '#F6820D',
    borderWidth: 1,
    borderRadius: 20,
    width: 200
  },
  buttonText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff'
  },
  buttonSignup: {
    color: '#FFA611',
    fontSize: 18
  }
});

export default LoginScreen;