import React from 'react';
import { View, StyleSheet } from 'react-native';
import { BaseText } from '../constants/TextStyles';
import colors from '../constants/colors';

const AddLogScreen = () => {
  return (
    <View style={styles.container}>
      <BaseText style={{ color: colors.authBGColor }}>Add a new log!</BaseText>
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

export default AddLogScreen;