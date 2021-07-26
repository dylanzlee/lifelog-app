import React, { useState, useEffect, useContext } from 'react';
import { View, StyleSheet, Modal, TouchableOpacity, TouchableWithoutFeedback, TextInput } from 'react-native'
import { BaseText } from '../constants/TextStyles';
import { db } from '../../firebase';
import { AuthContext } from '../navigation/AuthProvider';
import { AppContext } from '../navigation/AppProvider';
import { convertDateToUnix } from './LogGraph';
import moment from 'moment';
import firebase from 'firebase';

const AddFromCalendarPopup = ({ visible, handleAddToCalendarCallback, logId, logColor, dateString }) => {
  const { dateSelected, toggleAddDate, setUpdateEntries, addDate } = useContext(AppContext);
  const { user } = useContext(AuthContext);
  const userRef = db.collection('users').doc(user.uid);
  const [showPopup, setShowPopup] = useState(false);
  const [unit, setUnit] = useState('');
  const [entryExists, setEntryExists] = useState(false);
  const [prevEntry, setPrevEntry] = useState(0);
  const [entry, setEntry] = useState(0);
  const [prevNote, setPrevNote] = useState('');
  const [note, setNote] = useState('');

  const selectedDate = moment(new Date(dateString));
  const selectedDateDisplay = selectedDate.utc().format('MMMM Do');
  const fTimestamp = new firebase.firestore.Timestamp.fromDate(new Date(dateString));

  useEffect(() => {
    userRef.collection('logs').doc(logId).get().then(doc => {
      setUnit(doc.data().unit.toString());
    });
  }, []);

  useEffect(() => {
    userRef.collection('logs').doc(logId).collection('calendar').doc(dateSelected).get().then(snapshot => {
      if (snapshot.exists) {
        setEntryExists(true);
        setPrevEntry(Math.round(snapshot.data().value * 1e3) / 1e3);
        setPrevNote(snapshot.data().note.toString());
      } else {
        setEntryExists(false);
        setPrevEntry(0);
        setPrevNote('');
      }
    });
  }, [dateSelected, addDate]);
  
  useEffect(() => {
    togglePopup();
  }, [visible]);

  const togglePopup = () => {
    if (visible) {
      setShowPopup(true);
    } else {
      setShowPopup(false);
    }
  }
  const handleOnAdd = async () => {
    if (!entry && !prevEntry) {
      alert('Please enter a value');
      return;
    }
    const newEntry = entry ? entry : prevEntry;
    const newNote = note ? note : prevNote;
    let exit = false;
    await userRef.collection('logs').doc(logId).get().then(doc => {
      if (doc.data().minVal > parseFloat(newEntry)) {
        alert('Entry value cannot be less than ' + doc.data().minVal);
        exit = true;
      } else if (doc.data().maxVal < parseFloat(newEntry)) {
        alert('Entry value cannot be greater than ' + doc.data().maxVal);
        exit = true;
      }
    });
    if (exit) {
      return;
    }
    await userRef.collection('logs').doc(logId).collection('calendar').doc(dateString).set({
      dateString: dateString,
      timestamp: fTimestamp,
      unix: convertDateToUnix(dateString),
      value: parseFloat(newEntry),
      note: newNote.trim(),
    });
    if (!entryExists) {
      await userRef.collection('logs').doc(logId).update({
        numEntries: firebase.firestore.FieldValue.increment(1),
      });
      setUpdateEntries();
    }
    setPrevEntry(Math.round(parseFloat(newEntry) * 1e3) / 1e3);
    setPrevNote(newNote.trim());
    setEntry(0);
    toggleAddDate();
    setEntryExists(true);
    handleAddToCalendarCallback();
  }

  const handleOnDelete = async () => {
    await userRef.collection('logs').doc(logId).collection('calendar').doc(dateSelected).delete();
    await userRef.collection('logs').doc(logId).update({
      numEntries: firebase.firestore.FieldValue.increment(-1),
    });
    setUpdateEntries();
    toggleAddDate();
    setEntryExists(false);
    handleAddToCalendarCallback();
  }

  return (
    <Modal
      transparent
      visible={showPopup}
      animationType='fade'
    >
      <TouchableWithoutFeedback
        onPress={() => {
          handleAddToCalendarCallback();
          setEntry(0);
          setNote('');
        }}
      >
        <View style={styles.popupBackground}>
        <TouchableWithoutFeedback
          onPress={() => {}}
        >
          <View style={[styles.popupContainer, { backgroundColor: logColor }]}>
            <View style={styles.headerText}>
              <BaseText style={{ fontSize: 18 }}>{selectedDateDisplay}</BaseText>
            </View>
            <View style={styles.content}>
              <TextInput
                style={styles.inputBox}
                value={entry}
                onChangeText={input => setEntry(input)}
                placeholder={entryExists ? prevEntry.toString() : unit ? unit : 'Value'}
                placeholderTextColor='rgba(0, 0, 0, 0.3)'
                autoCapitalize='none'
                numeric value
                keyboardType={'numeric'}
              />
              <TextInput
                style={[styles.inputBox, { width: '85%', marginTop: 15, marginBottom: 10 }]}
                value={note}
                onChangeText={input => setNote(input)}
                placeholder={entryExists ? prevNote ? prevNote : 'Note' : 'Note'}
                placeholderTextColor='rgba(0, 0, 0, 0.3)'
                value
              />
              <TouchableOpacity
                style={styles.button}
                onPress={handleOnAdd}
              >
                {entryExists ? 
                  <BaseText style={{ fontSize: 15 }}>Update</BaseText> :
                  <BaseText style={{ fontSize: 15 }}>Add entry</BaseText>}
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.deleteButton}
                onPress={handleOnDelete}
              >
                <BaseText style={{ fontSize: 13, color: 'red' }}>Delete entry</BaseText>
              </TouchableOpacity>
            </View>
          </View>
        </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
}

const styles = StyleSheet.create({
  popupBackground: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  popupContainer: {
    width: '85%',
    height: '35%',
    justifyContent: 'space-around',
    paddingHorizontal: 20,
    paddingVertical: 20,
    borderRadius: 20,
    elevation: 20,
  },
  headerText: {
    flex: 1.2,
    alignItems: 'center',
  },
  content: {
    flex: 3,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  inputBox: {
    width: '45%',
    fontSize: 16,
    fontFamily: 'Futura',
    borderColor: 'black',
    borderBottomWidth: 1,
    textAlign: 'center',
    color: 'black',
  },
  button: {
    paddingVertical: 7,
    alignItems: 'center',
    borderColor: 'black',
    borderWidth: 2,
    borderRadius: 20,
    width: 120,
    marginTop: 5,
  },
  deleteButton: {
    marginTop: 5,
  },
});

export default AddFromCalendarPopup;