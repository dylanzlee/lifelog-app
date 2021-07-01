import React, { useContext, useState, useEffect } from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { BaseText } from '../constants/TextStyles';
import colors from '../constants/colors';
import { AuthContext } from '../navigation/AuthProvider';
import { db } from '../../firebase';

const ProfileScreen = () => {
  const { user, logout } = useContext(AuthContext);
  const [userName, setUserName] = useState('');

  const userRef = db.collection('users').doc(user.uid);

  useEffect(() => {
    userRef.get().then(doc => {
      setUserName(doc.data().name.first.toString());
    });
  }, []);

  return (
    <View style={styles.container}>
      <BaseText style={{ color: colors.authButtonColor, fontSize: 18 }}>Welcome, {userName}!</BaseText>
      <TouchableOpacity
        style={styles.button}
        onPress={() => logout()}
      >
        <BaseText style={styles.signoutText}>Sign out</BaseText>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    justifyContent: 'center',
    alignItems: 'center',
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
    width: 150,
  },
  signoutText: {
    fontSize: 15,
    fontWeight: 'bold',
    color: colors.authButtonColor,
  },
});

export default ProfileScreen;