import React, { useState, useContext, useEffect } from "react";
import { StyleSheet, View, SafeAreaView } from 'react-native';
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
    })
  }, [isFocused]);

  return (
    <SafeAreaView style={styles.wrapper}>
      {numLogs == 0 ? 
        <View style={styles.messageContainer}>
          <BaseText style={styles.message}>Your logs will be displayed here</BaseText>
        </View>
        : <DisplayLogsScreen />}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: 'black',
    justifyContent: 'center',
    alignItems: 'center',
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