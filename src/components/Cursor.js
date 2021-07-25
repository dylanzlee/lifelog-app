import React from "react";
import { View, StyleSheet } from "react-native";
import { PanGestureHandler } from "react-native-gesture-handler";
import Animated, {
  useAnimatedGestureHandler,
  useSharedValue,
  useAnimatedStyle,
  withTiming
} from "react-native-reanimated";
import { parse, getYForX } from "react-native-redash";

const CURSOR = 50;
const styles = StyleSheet.create({
  cursor: {
    width: CURSOR,
    height: CURSOR,
    borderRadius: CURSOR / 2,
    backgroundColor: "rgba(0, 0, 0, 0.1)",
    justifyContent: "center",
    alignItems: "center",
  },
  cursorBody: {
    width: 15,
    height: 15,
    borderRadius: 7.5,
    backgroundColor: "black",
  },
});


const Cursor = ({ data }) => {
  const active = useSharedValue(false);
  const x = useSharedValue(0);

  const onGestureEvent = useAnimatedGestureHandler({
    onStart: () => {
      active.value = true;
    },
    onActive: event => {
      x.value = event.x;
    },
    onEnd: () => {
      active.value = false;
    }
  });

  const parsePath = useAnimatedStyle(path => {
    return {path: parse(path)};
  });

  const style = useAnimatedStyle(() => {
    const translateX = x.value;
    const parsedPath = parsePath(data.path).path;
    const translateY = getYForX(parsedPath, x.value);
    return {
      transform: [{ translateX }, translateY],
      opacity: withTiming(active.value ? 1 : 0),
    };
  });

  return (
    <PanGestureHandler onGestureEvent={onGestureEvent}>
      <Animated.View style={StyleSheet.absoluteFill}>
        <Animated.View style={[styles.cursor, style]}>
          <View style={styles.cursorBody} />
        </Animated.View>
      </Animated.View>
    </PanGestureHandler>
  );
};

export default Cursor;
