import React, { useState, useContext } from 'react';
import { SafeAreaView, View, ScrollView, StyleSheet, TouchableOpacity, Modal } from 'react-native';
import { BaseText } from '../constants/TextStyles';
import { db } from '../../firebase';
import { AuthContext } from '../navigation/AuthProvider';
import { AntDesign } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import StatusModalPopup from '../components/StatusModalPopup';
import ConfirmDeletePopup from '../components/ConfirmDeletePopup';

const StatusScreen = ({ route, navigation }) => {
  const { user } = useContext(AuthContext);
  const userRef = db.collection('users').doc(user.uid);
  const { logId, logTitle, logColor } = route.params;
  const [visible, setVisible] = useState(false);
  const [deleteVisible, setDeleteVisible] = useState(false);

  const handleModalCallback = () => {
    setVisible(false);
  }

  const handlePopupCallback = () => {
    setDeleteVisible(false);
  }

  const StatusHeader = () => {
    return (
      <View style={[styles.header, { backgroundColor: logColor }]}>
        <View style={{ flex: 1, paddingLeft: 10 }}>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
          >
            <AntDesign
              name="left"
              size={35}
              style={styles.backButton}
            />
          </TouchableOpacity>
        </View>
        <View style={{ flex: 1 }}>
          <TouchableOpacity>
            <BaseText style={styles.title}>{logTitle}</BaseText>
          </TouchableOpacity>
        </View>
        <View style={{ flex: 1, paddingRight: 10, alignItems: 'flex-end', right: 5 }}>
          <TouchableOpacity
            onPress={() => setVisible(true)}
          >
            <Entypo
              name="dots-three-horizontal"
              size={24}
              color="black"
            />
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
        <StatusHeader />
        <ConfirmDeletePopup
          visible={deleteVisible}
          handlePopupCallback={handlePopupCallback}
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
                <AntDesign
                  name="close"
                  size={28}
                  color='black'
                />
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
        <View>
          <BaseText>Lorem Ipsum</BaseText>
        </View>
        <View>
          <BaseText>Lorem Ipsum</BaseText>
        </View>
        <View>
          <BaseText>Lorem Ipsum</BaseText>
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
    fontSize: 18,
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
  }
});

export default StatusScreen;