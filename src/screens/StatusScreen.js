import React, { useState, useEffect, useContext } from 'react';
import { SafeAreaView, View, ScrollView, StyleSheet, TouchableOpacity, Animated } from 'react-native';
import { BaseText } from '../constants/TextStyles';
import { db } from '../../firebase';
import { AuthContext } from '../navigation/AuthProvider';
import { AppContext } from '../navigation/AppProvider';
import { AntDesign } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import StatusModalPopup from '../components/StatusModalPopup';
import ConfirmDeletePopup from '../components/ConfirmDeletePopup';
import AddEntryPopup from '../components/AddEntryPopup';
import LogCalendar from '../components/LogCalendar';
import LogGraph from '../components/LogGraph';
import moment from 'moment';

const StatusScreen = ({ route, navigation }) => {
  const { user } = useContext(AuthContext);
  const { addDate } = useContext(AppContext);
  const userRef = db.collection('users').doc(user.uid);
  const { logId, logTitle, logColor } = route.params;
  const [visible, setVisible] = useState(false);
  const [deleteVisible, setDeleteVisible] = useState(false);
  const [addEntryVisible, setAddEntryVisible] = useState(false);
  const [notesArr, setNotesArr] = useState([]);
  const [calendarPopupVisible, setCalendarPopupVisible] = useState(false);

  useEffect(() => { console.log('changed'); }, [addDate]);

  useEffect(() => {
    const tmpNotesArr = [];
    const fetchNotes = async () => {
      await userRef.collection('logs').doc(logId).collection('calendar')
        .orderBy('timestamp', 'desc').limit(45).get().then(snapshot => {
        snapshot.docs.map(doc => {
          if (doc.data().note) {
            tmpNotesArr.push({
              date: moment(doc.data().dateString).format('M/D/YYYY'),
              note: doc.data().note,
              value: Math.round(doc.data().value * 1e3) / 1e3,
            });
          }
        });
      });
      setNotesArr(tmpNotesArr);
    }
    fetchNotes();
  }, [addDate]);

  const handleModalCallback = () => {
    setVisible(false);
  }

  const handlePopupCallback = () => {
    setDeleteVisible(false);
  }

  const handleAddEntryCallback = () => {
    setAddEntryVisible(false);
  }

  const openCalendarPopup = () => {
    setCalendarPopupVisible(true);
  }

  const closeCalendarPopup = () => {
    setCalendarPopupVisible(false);
  }

  const displayNotesArr = notesArr.map(entry => (
    <View
      style={{ paddingVertical: 2, flexDirection: 'row', justifyContent: 'space-between'}}
      key={entry.date}
    >
      <BaseText style={{ fontSize: 16 }}>{entry.date}: {entry.note}</BaseText>
      <BaseText style={{ fontSize: 16 }}>({entry.value})</BaseText>
    </View>
  ));

  const StatusHeader = () => {
    return (
      <View style={[styles.header, { backgroundColor: logColor }]}>
        <View style={{ flex: 1, paddingLeft: 10 }}>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
          >
            <AntDesign name="left" size={35} style={styles.backButton} />
          </TouchableOpacity>
        </View>
        <View style={{ flex: 1, }}>
          <TouchableOpacity>
            <BaseText style={styles.title}>{logTitle}</BaseText>
          </TouchableOpacity>
        </View>
        <View style={styles.headerRight}>
          <TouchableOpacity
            style={{ marginRight: 10, }}
            onPress={() => setAddEntryVisible(true)}
          >
          <AntDesign name="plus" size={25} color="black" />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setVisible(true)}
          >
            <Entypo name="dots-three-horizontal" size={25} color="black" />
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: logColor }]}>
      <ScrollView
        stickyHeaderIndices={[0]}
      >
        <StatusHeader style={{ paddingBottom: 5 }} />
        <AddEntryPopup
          visible={addEntryVisible}
          handleAddEntryCallback={handleAddEntryCallback}
          logColor={logColor}
          logId={logId}
        />
        <ConfirmDeletePopup
          visible={deleteVisible}
          handlePopupCallback={handlePopupCallback}
          logId={logId}
        />
        <StatusModalPopup
          visible={visible}
          bgColor={logColor}
          handleModalCallback={handleModalCallback}
        >
          <View style={{ alignItems: 'center' }}>
            <View style={styles.modalHeader}>
              <TouchableOpacity
                onPress={() => setVisible(false)}
              >
                <AntDesign name="close" size={28} color='black' />
              </TouchableOpacity>
            </View>
            <View style={styles.deleteContainer}>
              <TouchableOpacity
                onPress={() => {
                  setDeleteVisible(true);
                  setVisible(false);
                }}
              >
                <BaseText style={styles.deleteText}>Delete log</BaseText>
              </TouchableOpacity>
            </View>
          </View>
        </StatusModalPopup>
        <LogCalendar
          logId={logId}
          logColor={logColor}
          openCalendarPopup={openCalendarPopup}
          closeCalendarPopup={closeCalendarPopup}
        />
        <LogGraph
          logId={logId}
          logColor={logColor}
        />
        <View style={styles.notesContainer}>
          <View style={{ flexDirection: 'row', marginBottom: 15 }}>
            <BaseText style={{ fontSize: 16 }}>Recent notes: </BaseText>
            {notesArr.length ? <View /> : <BaseText style={{ fontSize: 16 }}>None</BaseText>}
          </View>
          <View style={{ flex: 1 }}>
            {displayNotesArr}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingBottom: 5,
  },
  backButton: {
    color: 'black',
  },
  title: {
    textAlign: 'center',
    fontSize: 19,
  },
  headerRight: {
    flex: 1,
    flexDirection: 'row',
    paddingRight: 10,
    justifyContent: 'flex-end',
    right: 5,
  },
  modalHeader: {
    width: '100%',
    height: 23,
    alignItems: 'flex-end',
  },
  deleteContainer: {
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  deleteText: {
    color: 'red',
    fontSize: 20,
  },
  notesContainer: {
    padding: 10,
    margin: 10,
    borderWidth: 3,
    borderColor: 'white',
    borderRadius: 10,
    height: 'auto',
  }
});

export default StatusScreen;