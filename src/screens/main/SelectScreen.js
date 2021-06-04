import React from "react"
import { StyleSheet, Text, View } from 'react-native';

const SelectScreen = () => {
  return (
    <View style={styles.container}>
      <View style={styles.text}>
        <Text>Welcome to LifeLog</Text>
        <Text>This is the select screen</Text>
        <Text>Coming soon!</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    backgroundColor: 'blue',
    height: 100,
    width: '50%',
    justifyContent: 'center',
    alignItems: 'center',
  }
});

export default SelectScreen