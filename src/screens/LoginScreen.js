import React, { useState, useContext } from 'react';
import { View, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import DismissKeyboard from '../components/DismissKeyboard';
import { BaseText } from '../constants/TextStyles';
import { AuthContext } from '../navigation/AuthProvider';
import colors from '../constants/colors';

const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const {login} = useContext(AuthContext);

  return (
    <DismissKeyboard>
      <View style={styles.container}>
        <View style={styles.nameContainer}>
          <BaseText style={styles.name}>log</BaseText>
        </View>
        <TextInput
          style={styles.inputBox}
          value={email}
          onChangeText={input => setEmail(input)}
          placeholder='Email'
          placeholderTextColor='black'
          autoCapitalize='none'
        />
        <TextInput
          style={styles.inputBox}
          value={password}
          onChangeText={input => setPassword(input)}
          placeholder='Password'
          placeholderTextColor='black'
          autoCapitalize='none'
          secureTextEntry={true}
        />
        <TouchableOpacity
          style={styles.button}
          onPress={() => login(email, password)}
        >
          <BaseText style={styles.buttonText}>Login</BaseText>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => alert('R.I.P my guy :(')}>
          <BaseText style={styles.buttonForgotPassword}>Forgot your password?</BaseText>
        </TouchableOpacity>
      </View>
    </DismissKeyboard>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.authBGColor,
    alignItems: 'center',
    justifyContent: 'center',
  },
  nameContainer: {
    marginBottom: 20,
    paddingBottom: 50,
  },
  name: {
    fontSize: 40,
    color: colors.authButtonColor,
  },
  inputBox: {
    width: '85%',
    margin: 10,
    padding: 15,
    fontSize: 16,
    fontFamily: 'Futura',
    borderColor: '#d3d3d3',
    borderBottomWidth: 1,
    textAlign: 'center',
    color: 'white',
  },
  button: {
    marginTop: 30,
    marginBottom: 20,
    paddingVertical: 10,
    alignItems: 'center',
    backgroundColor: colors.authBGColor,
    borderColor: colors.authButtonColor,
    borderWidth: 1,
    borderRadius: 20,
    width: 240,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.authButtonColor,
  },
  buttonForgotPassword: {
    color: colors.authButtonColor,
    fontSize: 16,
  }
});

export default LoginScreen;