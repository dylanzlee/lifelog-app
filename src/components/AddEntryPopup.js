import React, { useState, useEffect, useContext } from 'react';
import { View, StyleSheet, Modal, TouchableOpacity, TouchableWithoutFeedback, TextInput } from 'react-native'
import { BaseText } from '../constants/TextStyles';
import { db } from '../../firebase';
import { AuthContext } from '../navigation/AuthProvider';
import { AppContext } from '../navigation/AppProvider';
import { convertDateToUnix } from './LogGraph';
import moment from 'moment';
import firebase from 'firebase';

const AddEntryPopup = ({ visible, logId, logColor, handleAddEntryCallback }) => {
  const { setUpdateEntries, toggleAddDate } = useContext(AppContext);
  const { user } = useContext(AuthContext);
  const userRef = db.collection('users').doc(user.uid);
  const [showPopup, setShowPopup] = useState(false);
  const [entryExists, setEntryExists] = useState(false);
  const [unit, setUnit] = useState('');
  const [prevEntry, setPrevEntry] = useState(0);
  const [entry, setEntry] = useState(0);

  const todayDateDisplay = moment().format('MMMM Do');
  const [month, day, year] = moment().format('L').split('/');
  const dateString = `${year}-${month}-${day}`;
  const dateToday = new Date(dateString);
  const fTimestamp = new firebase.firestore.Timestamp.fromDate(dateToday);

  useEffect(() => {
    userRef.collection('logs').doc(logId).get().then(doc => {
      setUnit(doc.data().unit.toString());
    });
    userRef.collection('logs').doc(logId).collection('calendar').doc(dateString).get().then(snapshot => {
      if (snapshot.exists) {
        setEntryExists(true);
        setPrevEntry(snapshot.data().value);
      } else {
        setEntryExists(false);
      }
    });
  }, []);

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

  const handleOnPress = async () => {
    if (!entry) {
      alert('Please enter a value');
      return;
    }
    let exit = false;
    await userRef.collection('logs').doc(logId).get().then(doc => {
      if (doc.data().minVal > parseFloat(entry)) {
        alert('Entry value cannot be less than ' + doc.data().minVal);
        exit = true;
      } else if (doc.data().maxVal < parseFloat(entry)) {
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
      value: parseFloat(entry),
    });
    if (!entryExists) {
      await userRef.collection('logs').doc(logId).update({
        numEntries: firebase.firestore.FieldValue.increment(1),
      });
      setUpdateEntries();
    }
    setPrevEntry(parseFloat(entry));
    toggleAddDate();
    setEntryExists(true);
    handleAddEntryCallback();
  }

  return (
    <Modal
      transparent
      visible={showPopup}
      animationType='fade'
    >
      <TouchableWithoutFeedback
        onPress={handleAddEntryCallback}
      >
        <View style={styles.popupBackground}>
        <TouchableWithoutFeedback
          onPress={() => {}}
        >
          <View style={[styles.popupContainer, { backgroundColor: logColor }]}>
            <View style={styles.headerText}>
              <BaseText style={{ fontSize: 18 }}>{todayDateDisplay}</BaseText>
            </View>
            <View style={styles.content}>
              <TextInput
                style={styles.inputBox}
                value={entry}
                onChangeText={input => setEntry(input)}
                placeholder={entryExists ? prevEntry.toString() : unit}
                placeholderTextColor='rgba(0, 0, 0, 0.3)'
                autoCapitalize='none'
                numeric value
                keyboardType={'numeric'}
                autoFocus
              />
              <TouchableOpacity
                style={styles.button}
                onPress={handleOnPress}
              >
                {entryExists ? 
                  <BaseText style={{ fontSize: 15 }}>Update</BaseText>
                  : <BaseText style={{ fontSize: 15 }}>Add entry</BaseText>}
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
    height: '25%',
    justifyContent: 'space-around',
    paddingHorizontal: 20,
    paddingVertical: 20,
    borderRadius: 20,
    elevation: 20,
  },
  headerText: {
    flex: 1.5,
    alignItems: 'center',
  },
  content: {
    flex: 2,
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
  },
});

export default AddEntryPopup;