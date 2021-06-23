import React from "react";
import { StyleSheet, View, ScrollView } from 'react-native';
import SelectBox from '../components/SelectBox';

const DisplayLogsScreen = () => {
  return (
    <ScrollView>
      <View style={styles.container}>
        <View style={styles.box}>
          <SelectBox
            backgroundColor='#FFF8DC'
            title='Exercise'
          />
        </View>
        <View style={styles.box}>
          <SelectBox
            // backgroundColor='#E6E6FA'
            title='Cooking'
          />
        </View>
        <View style={styles.box}>
          <SelectBox
            // backgroundColor='#E3FFB5'
            title='Cleaning'
          />
        </View>
        <View style={styles.box}>
          <SelectBox
            // backgroundColor='#AFEEEE'
            title='Spending'
          />
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignContent: 'flex-start',
    flexWrap: 'wrap',
    paddingLeft: '4%',
  },
  box: {
    width: '48%',
    aspectRatio: 1,
  },
});

export default DisplayLogsScreen;