import React, { useState, useEffect, useContext, useRef } from 'react';
import { View, StyleSheet } from 'react-native';
import { BaseText } from '../constants/TextStyles';
import { AntDesign } from '@expo/vector-icons';
import { db } from '../../firebase';
import { AuthContext } from '../navigation/AuthProvider';
import { AppContext } from '../navigation/AppProvider';
import CalendarStrip from 'react-native-calendar-strip';
import AddFromCalendarPopup from './AddFromCalendarPopup';
import moment from 'moment';

const LogCalendar = ({ logId, logColor }) => {
  const mountedRef = useRef(true);
  const { addDate, dateSelected, setDateSelected } = useContext(AppContext);
  const { updateEntries } = useContext(AppContext);
  const { user } = useContext(AuthContext);
  const userRef = db.collection('users').doc(user.uid);
  const [numEntries, setNumEntries] = useState(0);
  const [datesAdded, setDatesAdded] = useState([]);
  const [calendarDayString, setCalendarDayString] = useState('');
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    userRef.collection('logs').doc(logId).get().then(doc => {
      setNumEntries(doc.data().numEntries);
    });
  }, [updateEntries]);
  
  useEffect(() => {
    const fetchedDates = []
    const fetchDates = async () => {
      await userRef.collection('logs').doc(logId).collection('calendar').get().then(snapshot => {
        snapshot.docs.map(doc => {
          fetchedDates.push(doc.data().dateString);
        });
      });
      setDatesAdded(fetchedDates);
    }
    fetchDates();
    return () => {
      mountedRef.current = false;
    }
  }, [addDate]);

  const markedDatesArr = []
  for (let i = 0; i < datesAdded.length; ++i) {
    markedDatesArr.push({
      date: moment(datesAdded[i], 'YYYY-MM-DD'),
      lines: [ { key: datesAdded[i], color: logColor, }, ],
    });
  }

  const handleAddToCalendarCallback = () => {
    setVisible(false);
  }
  
  return (
    <View style={{ flex: 1, height: '100%', width: '100%' }}>
      <View style={styles.container}>
        <View style={styles.header}>
          <BaseText style={{ fontSize: 13 }}>Entries added: {numEntries}</BaseText>
        </View>
        <View style={styles.calendarContainer}>
          <CalendarStrip
            scrollable
            scrollerPaging
            calendarAnimation={{ type: 'sequence', duration: 30 }}
            markingType={'custom'}
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
            markedDates={markedDatesArr}
            onDateSelected={async (date) => {
              const [month, day, year] = date.format('L').split('/');
              setCalendarDayString(`${year}-${month}-${day}`);
              setDateSelected(`${year}-${month}-${day}`);
              setVisible(true);
            }}
          />
        </View>
      </View>
      <AddFromCalendarPopup
        visible={visible}
        handleAddToCalendarCallback={handleAddToCalendarCallback}
        logId={logId}
        logColor={logColor}
        dateString={calendarDayString}
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
  calendarContainer: {
    flex: 1,
  },
  calendarStrip: {
    height: '150%',
    paddingVertical: 10,
  },
  calendarText: {
    color: 'black',
    fontFamily: 'Futura',
    fontWeight: 'normal',
  },
  calendarHeader: {
    marginBottom: 20,
  },
  innerStyle: {
    height: '100%',
  },
  dateNumber: {
    marginTop: 5,
  },
});

export default LogCalendar;