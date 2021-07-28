import React, { useState, useContext } from 'react';
import { View, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import DismissKeyboard from '../components/DismissKeyboard';
import { BaseText } from '../constants/TextStyles';
import { AuthContext } from '../navigation/AuthProvider';
import { auth } from '../../firebase';
import Modal from 'react-native-modal';
import colors from '../constants/colors';

const LoginScreen = () => {
  const { login } = useContext(AuthContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [resetPopupVisible, setResetPopupVisible] = useState(false);
  const [resetEmail, setResetEmail] = useState('');

  const passwordReset = async (email) => {
    try {
      await auth.sendPasswordResetEmail(email);
      setResetPopupVisible(false);
      setResetEmail('');
    } catch (e) {
      alert(e);
    }
  }

  return (
    <DismissKeyboard>
      <View style={styles.container}>
        <Modal
          isVisible={resetPopupVisible}
          animationInTiming={400}
          animationOutTiming={400}
          onBackdropPress={() => {
            setResetPopupVisible(false);
            setResetEmail('');
          }}
        >
          <DismissKeyboard>
            <View style={styles.resetPasswordModal}>
              <BaseText style={{ fontSize: 14 }}>Enter your email and we will send instructions to reset your password</BaseText>
              <TextInput
                style={styles.resetInputBox}
                value={resetEmail}
                onChangeText={input => setResetEmail(input.trim())}
                placeholder='Your email'
                placeholderTextColor='rgba(0, 0, 0, 0.3)'
                autoCapitalize='none'
              />
              <TouchableOpacity
                style={styles.resetButton}
                onPress={() => {
                  passwordReset(resetEmail);
                }}
              >
                <BaseText style={{ fontSize: 16 }}>Send</BaseText>
              </TouchableOpacity>
            </View>
          </DismissKeyboard>
        </Modal>
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
        <TouchableOpacity onPress={() => setResetPopupVisible(true)}>
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
  },
  resetPasswordModal: {
    height: '30%',
    width: '80%',
    backgroundColor: colors.authButtonColor,
    alignSelf: 'center',
    borderRadius: 20,
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  resetInputBox: {
    width: '85%',
    textAlign: 'center',
    fontSize: 14,
    fontFamily: 'Futura',
    margin: 30,
    padding: 5,
    borderColor: colors.authBGColor,
    borderBottomWidth: 1,
    color: colors.authBGColor,
  },
  resetButton: {
    paddingVertical: 6,
    alignItems: 'center',
    borderColor: colors.authBGColor,
    borderWidth: 2,
    borderRadius: 20,
    width: 110,
  },
});

export default LoginScreen;