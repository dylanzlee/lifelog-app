import React, { useContext, useState, useEffect } from 'react';
import { View, SafeAreaView, StyleSheet, TouchableOpacity } from 'react-native';
import { BaseText } from '../constants/TextStyles';
import colors from '../constants/colors';
import { AuthContext } from '../navigation/AuthProvider';
import { db } from '../../firebase';
import { Entypo } from '@expo/vector-icons';

const ProfileScreen = () => {
  const { user, logout } = useContext(AuthContext);
  const [initials, setInitials] = useState('');
  const [userName, setUserName] = useState('');

  const userRef = db.collection('users').doc(user.uid);

  useEffect(() => {
    userRef.get().then(doc => {
      setUserName(`${doc.data().name.first.toString()} ${doc.data().name.last.toString()}`);
      setInitials(`${doc.data().name.first.toString()[0]}${doc.data().name.last.toString()[0]}`);
    });
  }, []);

  return (
    // <View style={styles.container}>
    //   <BaseText style={{ color: colors.authButtonColor, fontSize: 18 }}>Welcome, {userName}!</BaseText>
      // <TouchableOpacity
      //   style={styles.button}
      //   onPress={() => logout()}
      // >
      //   <BaseText style={styles.signoutText}>Sign out</BaseText>
      // </TouchableOpacity>
    // </View>
    <SafeAreaView style={styles.container}>
      <View style={styles.titleBar}> 
        <TouchableOpacity>
          <Entypo name="dots-three-vertical" size={24} color={colors.authButtonColor} />
        </TouchableOpacity>
      </View>
      <View style={styles.profileContainer}>
        <View style={styles.profileImage}>
          <BaseText style={{ color: colors.authBGColor, fontSize: 50 }}>{initials}</BaseText>
        </View>
        <BaseText style={{ color: colors.authButtonColor, fontSize: 22, marginTop: 15 }}>{userName}</BaseText>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    // justifyContent: 'center',
    // alignItems: 'center',
  },
  titleBar: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 24,
    marginHorizontal: 16,
  },
  profileContainer: {
    alignSelf: 'center',
    alignItems: 'center',
  },
  profileImage: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 150,
    height: 150,
    borderRadius: 100,
    borderColor: colors.authButtonColor,
    borderWidth: 1.5,
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