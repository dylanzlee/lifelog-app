import React, { useState, useContext, useEffect } from "react";
import { StyleSheet, View, SafeAreaView, TouchableOpacity } from 'react-native';
import { useIsFocused } from '@react-navigation/native';
import colors from '../constants/colors'; 
import { BaseText } from '../constants/TextStyles';
import DisplayLogsScreen from "./DisplayLogsScreen";
import { db } from '../../firebase';
import { AuthContext } from '../navigation/AuthProvider';

const LogsScreen = () => {
  const isFocused = useIsFocused();
  const {user} = useContext(AuthContext);
  const userRef = db.collection('users').doc(user.uid);

  const [numLogs, setNumLogs] = useState(0);

  useEffect(() => {
    userRef.get().then(doc => {
      setNumLogs(doc.data().numLogs);
    });
  }, [isFocused]);

  return (
    numLogs == 0 ? 
      <SafeAreaView style={[styles.wrapper, { justifyContent: 'center', alignItems: 'center' }]}>
        <View style={styles.messageContainer}>
          <BaseText style={styles.message}>You have not added any logs yet!</BaseText>
        </View>
      </SafeAreaView> :
      <SafeAreaView style={styles.wrapper}>
        <DisplayLogsScreen />
      </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: 'black',
  },
  messageContainer: {
    justifyContent: 'center',
    alignContent: 'center',
  },
  message: {
    color: colors.authButtonColor,
    fontSize: 18,
  }
});

export default LogsScreen;