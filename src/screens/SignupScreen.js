import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, SafeAreaView } from 'react-native';
import DismissKeyboard from '../components/DismissKeyboard';
import { BaseText } from '../constants/TextStyles';
import colors from '../constants/colors';
import { Colors } from 'react-native/Libraries/NewAppScreen';

const SignupScreen = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <DismissKeyboard>
      <SafeAreaView style={styles.container}>
        <View style={styles.nameContainer}>
          <BaseText style={styles.name}>log</BaseText>
        </View>
        <TextInput
          style={styles.inputBox}
          value={name}
          onChangeText={input => setName(input)}
          placeholder='Full name'
          placeholderTextColor='black' />
        <TextInput
          style={styles.inputBox}
          value={email}
          onChangeText={input => setEmail(input)}
          placeholder='Email'
          placeholderTextColor='black' />
        <TextInput
          style={styles.inputBox}
          value={password}
          onChangeText={input => setPassword(input)}
          placeholder='Password'
          placeholderTextColor='black' />
        <TouchableOpacity style={styles.button}>
          <BaseText style={styles.buttonText}>Create account</BaseText>
        </TouchableOpacity>
      </SafeAreaView>
    </DismissKeyboard>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.authBGColor,
    alignItems: 'center',
    justifyContent: 'center'
  },
  nameContainer: {
    marginBottom: 20,
    paddingBottom: 50
  },
  name: {
    fontSize: 40,
    color: colors.authButtonColor,
  },
  inputBox: {
    width: '85%',
    textAlign: 'center',
    fontSize: 16,
    margin: 10,
    padding: 15,
    borderColor: '#d3d3d3',
    borderBottomWidth: 1,
    color: '#f8f8ff',
  },
  button: {
    marginTop: 30,
    marginBottom: 20,
    paddingVertical: 10,
    alignItems: 'center',
    backgroundColor: colors.authButtonColor,
    borderColor: colors.authButtonColor,
    borderWidth: 1,
    borderRadius: 20,
    width: 240
  },
  buttonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.authBGColor,
  },
});

export default SignupScreen;