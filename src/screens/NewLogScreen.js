import React from 'react';
import { View, StyleSheet } from 'react-native';
import BaseText from '../components/BaseText';

const NewLogScreen = () => {
  return (
    <View>
      <BaseText>This is the new log modal</BaseText>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
  }
});

export default NewLogScreen;