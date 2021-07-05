import React, { useState, useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import { BaseText } from '../constants/TextStyles';
import { AntDesign } from '@expo/vector-icons';
import CalendarStrip from 'react-native-calendar-strip';

const LogCalendar = ({ logId, logColor }) => {
  const [numEntries, setNumEntries] = useState(0)

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <BaseText style={{ fontSize: 13 }}>Entries added: 0</BaseText>
      </View>
      <CalendarStrip
        scrollable
        scrollerPaging
        leftSelector={<AntDesign name="left" size={22} color="black" />}
        rightSelector={<AntDesign name="right" size={22} color="black" />}
        style={styles.calendarStrip}
        calendarColor='#FFFAF1'
        calendarHeaderStyle={[styles.calendarText, styles.calendarHeader]}
        dateNumberStyle={[styles.calendarText, styles.dateNumber]}
        dateNameStyle={[styles.calendarText, styles.dateName]}
        highlightDateNumberStyle={[styles.calendarText, styles.dateNumber]}
        highlightDateNameStyle={[styles.calendarText, styles.dateName]}
        iconContainer={{flex: 0.1}}
        upperCaseDays={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    paddingLeft: 10,
    paddingVertical: 10,
  },
  calendarStrip: {
    height: '100%',
    paddingTop: 15,
    paddingBottom: 10,
  },
  calendarText: {
    color: 'black',
    fontFamily: 'Futura',
    fontWeight: 'normal',
    fontSize: 17,
  },
  calendarHeader: {
    marginBottom: 20,
  },
  dateNumber: {
    marginTop: 5,
  },
  dateName: {
    fontSize: 12,
  },
});

export default LogCalendar;