import React, { useState, useEffect, useContext } from 'react';
import { View, StyleSheet } from 'react-native';
import { BaseText } from '../constants/TextStyles';
import { AuthContext } from '../navigation/AuthProvider';
import { AppContext } from '../navigation/AppProvider';
import { db } from '../../firebase';
import { convertDateToUnix } from './LogGraph';
import moment from 'moment';

const SummaryBox = ({ logId, name, unit, color }) => {
  const { user } = useContext(AuthContext);
  const userRef = db.collection('users').doc(user.uid);
  const { addDate } = useContext(AppContext);
  const [logInfo, setLogInfo] = useState({});

  useEffect(() => {
    const tmpInfo = {};
    const fetchCalendarInfo = async () => {
      await userRef.collection('logs').doc(logId).collection('calendar')
        .orderBy('timestamp', 'desc').limit(1).get().then(snapshot => {
        snapshot.docs.map(doc => {
          const todayDateString = moment().format('YYYY-MM-DD');
          let daysFromNow = todayDateString == doc.data().dateString ? '0 days' : moment(doc.data().timestamp.toDate()).add(1, 'days').fromNow(true);
          daysFromNow = daysFromNow == 'a day' ? '1 day' : daysFromNow;
          tmpInfo.lastLogged = moment(doc.data().dateString).format('M/D/YYYY');
          tmpInfo.daysFromNow = daysFromNow;
        });
      });
      // get data for the past week (last 7 days)
      const twoWeeksAgoUnix = convertDateToUnix(moment().subtract(13, 'days').format('YYYY-MM-DD'));
      const pastWeekArr = [];
      await userRef.collection('logs').doc(logId).collection('calendar')
        .where('unix', '>=', twoWeeksAgoUnix).get().then(snapshot => {
        snapshot.docs.map(doc => {
          for (let i = 0; i < 7; ++i) {
            const oneWeekAgo = moment().subtract(6, 'days');
            const tmpDateString = oneWeekAgo.add(i, 'days').format('YYYY-MM-DD');
            if (doc.data().dateString == tmpDateString) {
              pastWeekArr.push(doc.data().value);
            }
          }
        });
      });
      const average = pastWeekArr.reduce((a, b) => (a + b), 0) / pastWeekArr.length;
      tmpInfo.average = pastWeekArr.length ? Math.round(average * 1e3) / 1e3 : 'No entries';
      tmpInfo.numEntries = pastWeekArr.length ? pastWeekArr.length : 0;
      tmpInfo.maxVal = pastWeekArr.length ? Math.round(Math.max(...pastWeekArr) * 1e3) / 1e3 : 'No entries';
      setLogInfo(tmpInfo);
    }
    fetchCalendarInfo();
  }, [addDate]);

  return (
    <View style={styles.container}>
      <View style={[styles.logBox, { borderColor: color }]}>
        <View style={{ paddingBottom: 15, }}>
          <BaseText style={{ color: color, alignSelf: 'center', fontSize: 19 }}>{name}</BaseText>
        </View>
        <View>
          <View style={styles.textContainer}>
            <BaseText style={{ color: color, fontSize: 16 }}>Unit:</BaseText>
            <BaseText style={{ color: color, fontSize: 16 }}>{unit ? unit : 'None'}</BaseText>
          </View>
          <View style={styles.textContainer}>
            <BaseText style={{ color: color, fontSize: 16 }}>Last logged:</BaseText>
            <BaseText style={{ color: color, fontSize: 16 }}>{logInfo.lastLogged ? logInfo.lastLogged : 'No entries yet'}</BaseText>
          </View>
          <View style={styles.textContainer}>
            <BaseText style={{ color: color, fontSize: 16 }}>Time since last log:</BaseText>
            <BaseText style={{ color: color, fontSize: 16 }}>{logInfo.daysFromNow ? logInfo.daysFromNow : 'No entries yet'}</BaseText>
          </View>
        </View>
        <View>
          <BaseText style={{ color: color, fontSize: 16, marginVertical: 10 }}>(Past week)</BaseText>
          <View style={styles.textContainer}>
            <BaseText style={{ color: color, fontSize: 16 }}>No. of days logged:</BaseText>
            <BaseText style={{ color: color, fontSize: 16 }}>{logInfo.numEntries}</BaseText>
          </View>
          <View style={styles.textContainer}>
            <BaseText style={{ color: color, fontSize: 16 }}>Weekly record:</BaseText>
            <BaseText style={{ color: color, fontSize: 16 }}>{logInfo.maxVal}</BaseText>
          </View>
          <View style={styles.textContainer}>
            <BaseText style={{ color: color, fontSize: 16 }}>Average log value:</BaseText>
            <BaseText style={{ color: color, fontSize: 16 }}>{logInfo.average}</BaseText>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    justifyContent: 'center',
    alignItems: 'center',
  },
  logBox: {
    width: '85%',
    height: '85%',
    borderWidth: 2,
    borderRadius: 25,
    paddingVertical: 10,
    paddingHorizontal: 15,
  },
  textContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 1,
  }
});

export default SummaryBox;