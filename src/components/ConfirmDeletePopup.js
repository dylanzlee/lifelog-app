import React, { useState, useEffect, useContext } from 'react';
import { View, StyleSheet, Modal, TouchableOpacity, TouchableWithoutFeedback } from 'react-native';
import { BaseText } from '../constants/TextStyles';
import { db } from '../../firebase';
import { AuthContext } from '../navigation/AuthProvider';
import { AppContext } from '../navigation/AppProvider';
import { useNavigation } from '@react-navigation/native';
import firebase from 'firebase';

const ConfirmDeletePopup = ({ visible, handlePopupCallback, logId }) => {
  const navigation = useNavigation();
  const { user } = useContext(AuthContext);
  const userRef = db.collection('users').doc(user.uid);
  const { toggleSwitch } = useContext(AppContext);
  const [showPopup, setShowPopup] = useState(visible);

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
    await userRef.collection('logs').doc(logId).delete();
    await userRef.update({
      numLogs: firebase.firestore.FieldValue.increment(-1),
    }).then(toggleSwitch()).then(handlePopupCallback).then(navigation.navigate("Tabs"));
  }

  return (
    <Modal
      transparent
      visible={showPopup}
    >
      <TouchableWithoutFeedback
        onPress={handlePopupCallback}
      >
        <View style={styles.popupBackground}>
          <TouchableWithoutFeedback
            onPress={() => {}}
          >
            <View style={styles.popupContainer}>
              <View style={{ alignItems: 'center' }}>
                <View style={styles.message}>
                  <BaseText>Are you sure you want to delete this log?</BaseText>
                  <BaseText>All data associated with this log will be lost.</BaseText>
                </View>
                <View>
                  <TouchableOpacity
                    style={styles.deleteButton}
                    onPress={handleOnPress}
                  >
                    <BaseText style={styles.confirmDeleteText}>Confirm delete</BaseText>
                  </TouchableOpacity>
                </View>
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
    height: '20%',
    justifyContent: 'space-around',
    backgroundColor: 'white',
    paddingHorizontal: 20,
    paddingVertical: 20,
    borderRadius: 20,
    elevation: 20,
  },
  message: {
    height: '40%',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 30,
  },
  deleteButton: {
    paddingVertical: 5,
    alignItems: 'center',
    borderColor: 'red',
    borderWidth: 2,
    borderRadius: 20,
    width: 160,
  },
  confirmDeleteText: {
    color: 'red',
    fontSize: 17,
  },
});

export default ConfirmDeletePopup;