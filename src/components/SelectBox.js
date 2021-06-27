import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { BaseText } from '../constants/TextStyles';
import { useNavigation } from '@react-navigation/native';

const SelectBox = ({ backgroundColor, title, logId }) => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={[styles.box, {
          backgroundColor: backgroundColor, borderColor: backgroundColor
        }]}
        onPress={() => navigation.navigate("Status", {
          logTitle: title,
          logId: logId,
          logColor: backgroundColor,
        })}
      >
        <BaseText style={styles.text}>{title}</BaseText>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
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