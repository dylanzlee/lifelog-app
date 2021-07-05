import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Modal, TouchableWithoutFeedback } from 'react-native';

const StatusModalPopup = ({ visible, bgColor, handleModalCallback, children }) => {
  const [showModal, setShowModal] = useState(visible);

  useEffect(() => {
    toggleModal();
  }, [visible]);
  
  const toggleModal = () => {
    if (visible) {
      setShowModal(true);
    } else {
      setShowModal(false);
    }
  }

  return (
    <Modal
      transparent
      visible={showModal}
      animationType='fade'
    >
      <TouchableWithoutFeedback
        onPress={handleModalCallback}
      >  
        <View style={styles.modalBackground}>
          <TouchableWithoutFeedback
            onPress={() => {}}
          >
            <View style={[styles.modalContainer, { backgroundColor: bgColor }]}>
              {children}
            </View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalBackground: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  modalContainer: {
    width: '100%',
    height: '12%',
    paddingHorizontal: 20,
    paddingTop: 10,
    elevation: 20,
  },  
});

export default StatusModalPopup;