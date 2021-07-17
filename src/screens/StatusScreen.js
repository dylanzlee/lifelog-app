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

const StatusScreen = ({ route, navigation }) => {
  const { user } = useContext(AuthContext);
  const userRef = db.collection('users').doc(user.uid);
  const { logId, logTitle, logColor } = route.params;
  const [visible, setVisible] = useState(false);
  const [deleteVisible, setDeleteVisible] = useState(false);
  const [addEntryVisible, setAddEntryVisible] = useState(false);

  const handleModalCallback = () => {
    setVisible(false);
  }

  const handlePopupCallback = () => {
    setDeleteVisible(false);
  }

  const handleAddEntryCallback = () => {
    setAddEntryVisible(false);
  }

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
        />
        <LogGraph
          logId={logId}
          logColor={logColor}
        />
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
});

export default StatusScreen;