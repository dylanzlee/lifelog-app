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

const LogCalendar = ({ logId, logColor, openCalendarPopup, closeCalendarPopup }) => {
  const mountedRef = useRef(true);
  const { addDate, setDateSelected } = useContext(AppContext);
  const { updateEntries } = useContext(AppContext);
  const { user } = useContext(AuthContext);
  const userRef = db.collection('users').doc(user.uid);
  const [numEntries, setNumEntries] = useState(0);
  const [datesAdded, setDatesAdded] = useState([]);
  const [calendarDayString, setCalendarDayString] = useState('');
  const [visible, setVisible] = useState(false);
  const [logUnit, setLogUnit] = useState('');
  // const [clickedDate, setClickedDate] = useState(moment());

  useEffect(() => {
    userRef.collection('logs').doc(logId).get().then(doc => {
      setLogUnit(doc.data().unit.toString());
    });
  }, []);

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
  }, [addDate, updateEntries]);

  const datesBlacklist = [{ start: moment().add(1, 'days'), end: moment().add(500, 'days') }];

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
          <BaseText style={{ fontSize: 15 }}>Total Entries: {numEntries}</BaseText>
          {logUnit ?
            <BaseText style={{ fontSize: 15 }}>({logUnit})</BaseText> :
            <View />}
        </View>
        <View style={styles.calendarContainer}>
          <CalendarStrip
            // scrollable
            // scrollerPaging
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
            minDate={moment().subtract(365, 'days')}
            maxDate={moment().add(500, 'days')}
            markedDates={markedDatesArr}
            onDateSelected={date => {
              // setClickedDate(date);
              const [month, day, year] = date.format('L').split('/');
              setCalendarDayString(`${year}-${month}-${day}`);
              setDateSelected(`${year}-${month}-${day}`);
              setVisible(true);
              openCalendarPopup();
            }}
            // selectedDate={clickedDate}
            datesBlacklist={datesBlacklist}
            calendarAnimation={{ type: 'parallel', duration: 1200 }}
          />
        </View>
      </View>
      <AddFromCalendarPopup
        visible={visible}
        handleAddToCalendarCallback={handleAddToCalendarCallback}
        logId={logId}
        logColor={logColor}
        dateString={calendarDayString}
        closeCalendarPopup={closeCalendarPopup}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
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