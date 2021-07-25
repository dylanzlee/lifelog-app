import React, { useState, useContext } from 'react';
import { View, StyleSheet, TouchableOpacity, TextInput } from 'react-native';
import { BaseText } from '../constants/TextStyles';
import { db } from '../../firebase';
import { AuthContext } from '../navigation/AuthProvider';
import { AppContext } from '../navigation/AppProvider';
import GestureRecognizer from 'react-native-swipe-gestures';
import DismissKeyboard from '../components/DismissKeyboard';
import colors from '../constants/colors';
import firebase from 'firebase';

const AddLogScreen = ({ navigation }) => {
  const [logName, setLogName] = useState('');
  const [unit, setUnit] = useState('');
  const [minVal, setMinVal] = useState(Number.MIN_VALUE);
  const [maxVal, setMaxVal] = useState(Number.MAX_VALUE);
  const { toggleSwitch } = useContext(AppContext);
  const { user } = useContext(AuthContext);
  const userRef = db.collection('users').doc(user.uid);

  const getRandomColor = () => {
    const randomHue = Math.floor(Math.random() * 60) * 6;
    const randomColor = `hsl(${randomHue}, 70%, 80%)`;
    return randomColor;
  }

  const addLog = () => {
    const logColor = getRandomColor();
    userRef.collection('logs').doc(logName.toLowerCase()).set({
      id: logName.trim().toLowerCase(),
      name: logName.trim(),
      unit: unit.trim(),
      minVal: minVal,
      maxVal: maxVal,
      color: logColor,
      numEntries: 0,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    });
    userRef.update({
      numLogs: firebase.firestore.FieldValue.increment(1),
    });
    toggleSwitch();
    navigation.navigate("Tabs");
  }

  const handleOnPress = async () => {
    if (logName.trim() == '') {
      alert('Please enter a log name');
      return;
    }
    if (isNaN(minVal) || isNaN(maxVal)) {
      alert('Minimum Value and Maximum Value must be valid numbers');
      return;
    }
    if (maxVal < minVal) {
      alert('Maximum Value cannot be smaller than Minimum Value');
      return;
    }
    let exit = false;
    await userRef.get().then(doc => {
      if (doc.data().numLogs == 0) {
        addLog();
        exit = true;
      }
    });
    if (exit) {
      return;
    }
    await userRef.collection('logs').where('id', '==', logName.trim().toLowerCase()).get().then(snapshot => {
      if (!snapshot.empty) {
        alert('This log name already exists');
      } else {
        addLog();
      }
    });
  }

  return (
    <GestureRecognizer
      style={{ flex: 1, height: '100%', width: '100%' }}
      onSwipeDown={() => navigation.goBack()}
    >
      <DismissKeyboard>
        <View style={styles.container}>
          <TextInput 
            style={styles.inputBox}
            value={logName}
            onChangeText={input => setLogName(input)}
            placeholder='Log Name *'
          />
          <TextInput
            style={styles.inputBox}
            value={unit}
            onChangeText={input => setUnit(input)}
            placeholder='Unit (e.g. mins, kg, dollars)'
            autoCapitalize='none'
          />
          <TextInput
            style={styles.inputBox}
            value={minVal}
            onChangeText={input => {
              let minInput = input == '' ? Number.MIN_VALUE : input;
              setMinVal(parseFloat(minInput));
            }}
            placeholder='Minimum Value'
            numeric value
            keyboardType={'numeric'}
          />
          <TextInput
            style={styles.inputBox}
            value={maxVal}
            onChangeText={input => {
              let maxInput = input == '' ? Number.MAX_VALUE : input;
              setMaxVal(parseFloat(maxInput));
            }}
            placeholder='Maximum Value'
            numeric value
            keyboardType={'numeric'}
          />
          <BaseText style={styles.note}>Note: Fields marked with * are required</BaseText>
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              handleOnPress();
            }}
          >
            <BaseText style={styles.addLogText}>Add log</BaseText>
          </TouchableOpacity>
        </View>
      </DismissKeyboard>
    </GestureRecognizer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.authButtonColor,
    justifyContent: 'center',
    alignItems: 'center',
  },
  inputBox: {
    width: '75%',
    textAlign: 'center',
    fontSize: 16,
    fontFamily: 'Futura',
    margin: 20,
    padding: 15,
    borderColor: colors.authBGColor,
    borderBottomWidth: 2,
    color: colors.authBGColor,
  },
  button: {
    marginTop: 30,
    marginBottom: 20,
    paddingVertical: 10,
    alignItems: 'center',
    backgroundColor: colors.authButtonColor,
    borderColor: colors.authBGColor,
    borderWidth: 2,
    borderRadius: 20,
    width: 150,
  },
  note: {
    fontSize: 10,
    alignSelf: 'flex-start',
    paddingLeft: '12.5%',
    marginTop: 10,
  },
  addLogText: {
    fontSize: 15,
    fontWeight: 'bold',
    color: colors.authBGColor,
  },
});

export default AddLogScreen;