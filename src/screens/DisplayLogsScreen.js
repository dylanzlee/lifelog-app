import React, { useState, useEffect, useContext, useRef } from "react";
import { StyleSheet, View, ScrollView } from 'react-native';
import { db } from '../../firebase';
import { AuthContext } from "../navigation/AuthProvider";
import SelectBox from '../components/SelectBox';
import colors from '../constants/colors';
import { AppContext } from "../navigation/AppProvider";

const DisplayLogsScreen = () => {
  const mountedRef = useRef(true);
  const { addSwitch } = useContext(AppContext);
  const { user } = useContext(AuthContext);
  const userRef = db.collection('users').doc(user.uid);
  const [logNames, setLogNames] = useState([]);

  const existingNames = [];
  let colorIdx = 0;

  useEffect(() => {    
    const fetchData = async () => {
      await userRef.collection('logs').orderBy('timestamp', 'asc').get().then(snapshot => {
        snapshot.docs.map(doc => {
          const curColor = colors.colorsArr[colorIdx % colors.colorsArr.length];
          existingNames.push([doc.data().name, curColor]);
          colorIdx += 1;
        });
      });
      setLogNames(existingNames);
    }

    fetchData();
    return () => {
      console.log('cleaned up: DisplayLogsScreen');
      mountedRef.current = false;
    }
  }, [addSwitch]);
  
  const logsArr = logNames.map(logName => (
    <View
      style={styles.box}
      key={logName[0]}
    >
      <SelectBox
        backgroundColor={logName[1]}
        title={logName[0]}
        logId={logName[0].toLowerCase()}
      />
    </View>
  ));

  return (
    <ScrollView
      alwaysBounceVertical={false}
    >
      <View style={styles.container}>
        {logsArr}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignContent: 'flex-start',
    flexWrap: 'wrap',
    paddingLeft: '4%',
  },
  box: {
    width: '48%',
    aspectRatio: 1,
  },
});

export default DisplayLogsScreen;