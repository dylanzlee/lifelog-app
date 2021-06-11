import React from 'react';
import { View, StyleSheet } from 'react-native';
import BaseText from '../components/BaseText';

const ProfileScreen = () => {
  return (
    <View style={styles.container}>
      <BaseText style={{ color: 'white' }}>This is the profile screen</BaseText>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    justifyContent: 'center',
    alignItems: 'center',
  }
});

export default ProfileScreen;