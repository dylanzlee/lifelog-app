import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { BaseText } from '../constants/TextStyles';
import colors from '../constants/colors';

const WelcomeScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <View style={styles.nameContainer}>
        <BaseText style={styles.name}>log</BaseText>
      </View>
      <View style={styles.buttonsContainer}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.push("SignUp")}
        >
          <BaseText style={styles.buttonText}>Get started</BaseText>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, { backgroundColor: colors.authBGColor, marginTop: 10 }]}
          onPress={() => navigation.push("Login")}
        >
          <BaseText style={styles.loginText}>I have an account</BaseText>
        </TouchableOpacity>
      </View>
    </View>
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
    fontSize: 45,
    color: colors.authButtonColor,
  },
  buttonsContainer: {
    alignItems: 'center',
    marginTop: 70,
    width: '100%',
    top: '10%',
  },
  button: {
    margin: 10,
    paddingVertical: 11,
    alignItems: 'center',
    backgroundColor: colors.authButtonColor,
    borderColor: colors.authButtonColor,
    borderWidth: 1,
    borderRadius: 20,
    width: 300,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.authBGColor,
  },
  loginText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.authButtonColor,
  }
});

export default WelcomeScreen;