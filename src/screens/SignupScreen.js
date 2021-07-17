import React, { useState, useContext } from 'react';
import { View, TextInput, StyleSheet, TouchableOpacity, SafeAreaView } from 'react-native';
import DismissKeyboard from '../components/DismissKeyboard';
import { BaseText } from '../constants/TextStyles';
import colors from '../constants/colors';
import { AuthContext } from '../navigation/AuthProvider';

const SignupScreen = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const {register} = useContext(AuthContext);

  return (
    <DismissKeyboard>
      <SafeAreaView style={styles.container}>
        <View style={styles.nameContainer}>
          <BaseText style={styles.logName}>log</BaseText>
        </View>
        <View style={styles.fullNameContainer}>
          <TextInput
            style={styles.inputBoxSmall}
            value={firstName}
            onChangeText={input => setFirstName(input.trim())}
            placeholder='First name'
            placeholderTextColor='black'
          />
          <TextInput
            style={styles.inputBoxSmall}
            value={lastName}
            onChangeText={input => setLastName(input.trim())}
            placeholder='Last name'
            placeholderTextColor='black'
          />
        </View>
        <TextInput
          style={styles.inputBox}
          value={email}
          onChangeText={input => setEmail(input.trim().toLowerCase())}
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
          onPress={() => {
            if (!firstName) {
              alert('Please enter your first name');
              return;
            }
            if (!lastName) {
              alert('Please enter your last name');
              return;
            }
            register(firstName, lastName, email, password);
          }}
        >
          <BaseText style={styles.buttonText}>
            Create account
          </BaseText>
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
  logName: {
    fontSize: 40,
    color: colors.authButtonColor,
  },
  fullNameContainer: {
    flexDirection: 'row',
  },
  inputBoxSmall: {
    width: '40%',
    textAlign: 'center',
    fontSize: 16,
    fontFamily: 'Futura',
    margin: 10,
    padding: 15,
    borderColor: '#d3d3d3',
    borderBottomWidth: 1,
    color: '#f8f8ff',
  },
  inputBox: {
    width: '85%',
    textAlign: 'center',
    fontSize: 16,
    fontFamily: 'Futura',
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