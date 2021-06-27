import React, { useContext } from 'react';
import { SafeAreaView, View, ScrollView, StyleSheet } from 'react-native';
import { BaseText } from '../constants/TextStyles';
import { db } from '../../firebase';
import { AuthContext } from '../navigation/AuthProvider';
import { AntDesign } from '@expo/vector-icons';
import colors from '../constants/colors';

const StatusScreen = ({ route, navigation }) => {
  const { user } = useContext(AuthContext);
  const userRef = db.collection('users').doc(user.uid);
  const { logTitle, logId, logColor } = route.params;

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: logColor }]}>
      <ScrollView>
        <View>
          <AntDesign
            name="left"
            size={35}
            style={styles.backButton}
            onPress={() => navigation.goBack()}
          />
          <BaseText>{logTitle}</BaseText>
        </View>
        <BaseText>This is the status screen</BaseText>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
  },
  backButton: {
    color: 'black',
  },
});

export default StatusScreen;