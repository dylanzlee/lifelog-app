import React from "react"
import { StyleSheet, Text, View, SafeAreaView } from 'react-native';
import SelectBox from '../components/SelectBox';

const SelectScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.row}>
        <SelectBox
          backgroundColor='#FFF8DC'
          title='Exercise' />
        <SelectBox
          backgroundColor='#E6E6FA'
          title='Cooking' />
      </View>
      <View style={styles.row}>
        <SelectBox
          backgroundColor='#E3FFB5'
          title='Cleaning' />
        <SelectBox 
          backgroundColor='#AFEEEE'
          title='Spending' />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    backgroundColor: 'black',
    alignItems: 'center',
    justifyContent: 'center',
    // flexWrap: 'wrap'
  },
  text: {
    // fontSize: 20
  },
  row: {
    flexDirection: 'row',
    // width: '100%',
    height: '50%',
    // justifyContent: 'space-around',
  },
});

export default SelectScreen