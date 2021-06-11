import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { BaseText } from '../constants/TextStyles';

const SelectBox = (props) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity style={[styles.box, {
      backgroundColor: props.backgroundColor, borderColor: props.backgroundColor
      }]}>
        <BaseText style={styles.text}>{props.title}</BaseText>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
    backgroundColor: 'black',
  },
  box: {
    width: '95%',
    height: '95%',
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 18,
  }
});

export default SelectBox;