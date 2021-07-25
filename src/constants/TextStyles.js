import React from 'react';
import { Text, StyleSheet, Platform } from 'react-native';

export const BaseText = (props) => (
  <Text style={{ ...styles.baseText, ...props.style }}>{props.children}</Text>
);

const styles = StyleSheet.create({
  baseText: {
    fontFamily: 'Futura',
    fontStyle: 'normal',
  },
  authText: {
    fontFamily: Platform.select({default: "Lato"}),
    fontStyle: 'normal',
  },
});

/* Potential fonts:
    American Typewriter
    Apple Color Emoji
    Apple SD Gothic Neo
    Arial
    Chalkboard SE / ChalkboardSE-Bold
    Futura
    Gill Sans
    Lato
*/