import React from 'react';
import { Text, StyleSheet } from 'react-native';

const BaseText = (props) => (
  <Text style={{ ...styles.baseText, ...props.style }}>{props.children}</Text>
);

const styles = StyleSheet.create({
  baseText: {
    fontFamily: 'Futura'
  }
});

/* Potential fonts:
    American Typewriter
    Apple Color Emoji
    Apple SD Gothic Neo
    Arial
    Chalkboard SE / ChalkboardSE-Bold
    Futura
    Gill Sans
*/

export default BaseText;