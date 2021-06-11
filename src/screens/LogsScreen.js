import React from "react"
import { StyleSheet, View, SafeAreaView } from 'react-native';
import SelectBox from '../components/SelectBox';
// import { useDimensions, useDeviceOrientation } from '@react-native-community/hooks';

const LogsScreen = () => {
  return (
    <SafeAreaView style={styles.wrapper}>
      <View style={styles.container}>
        <View style={styles.box}>
          <SelectBox
            backgroundColor='#FFF8DC'
            title='Exercise' />
        </View>
        <View style={styles.box}>
          <SelectBox
            backgroundColor='#E6E6FA'
            title='Cooking' />
        </View>
        <View style={styles.box}>
          <SelectBox
            backgroundColor='#E3FFB5'
            title='Cleaning' />
        </View>
        <View style={styles.box}>
          <SelectBox
            backgroundColor='#AFEEEE'
            title='Spending' />
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: 'black'
  },  
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignContent: 'flex-start',
    flexWrap: 'wrap',
    paddingLeft: '4%'
  },
  box: {
    width: '48%',
    aspectRatio: 1,
  },
});

export default LogsScreen;