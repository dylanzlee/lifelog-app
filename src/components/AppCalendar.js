import React, { useState, useEffect, useContext, useRef } from 'react';
import { View, StyleSheet } from 'react-native';
import { BaseText } from '../constants/TextStyles';
import { AntDesign } from '@expo/vector-icons';
import { db } from '../../firebase';
import { AuthContext } from '../navigation/AuthProvider';
import { AppContext } from '../navigation/AppProvider';
import { Calendar } from 'react-native-calendars';
import moment from 'moment';

const AppCalendar = () => {
  return (
    <Calendar
      enableSwipeMonths
      hideArrows
    />
  );
}

const styles = StyleSheet.create({

});

export default AppCalendar;