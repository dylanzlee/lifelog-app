import React, { useState, useEffect, useContext, useRef } from 'react';
import { View, StyleSheet, Dimensions, TextInput, Animated } from 'react-native';
import { db } from '../../firebase';
import { AuthContext } from '../navigation/AuthProvider';
import { AppContext } from '../navigation/AppProvider';
import { BaseText } from '../constants/TextStyles';
import Svg, { Path } from 'react-native-svg';
import { scaleLinear, scaleQuantile } from "d3-scale";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";
import * as path from 'svg-path-properties';
import * as shape from "d3-shape";
import moment from 'moment';
import colors from '../constants/colors';

export const convertDateToUnix = date => {
  return moment(date, 'YYYY-MM-DD').unix();
}

const convertUnixToDate = unix => {
  const dateObj  = new Date(unix * 1000);
  return dateObj.toLocaleDateString();
}

const screenWidth = Dimensions.get('window').width;
const SELECTION_WIDTH = screenWidth - 32;
const BUTTON_WIDTH = (screenWidth - 32) / 5;
const verticalPadding = 8;
const cursorRadius = 7.5;

const LogGraph = ({ logId, logColor }) => {
  const mountedRef = useRef(true);
  const cursor = useRef();
  const labelDate = useRef();
  const labelValue = useRef();
  const { addDate } = useContext(AppContext);
  const { user } = useContext(AuthContext);
  const userRef = db.collection('users').doc(user.uid);
  const graphColor = colors.changeLightness(logColor, '60%');
  const [unixValueMap, setUnixValueMap] = useState(new Map());
  const [selected, setSelected] = useState(0);
  const [x, setX] = useState(new Animated.Value(0));
  const unixToday = convertDateToUnix(moment().format('YYYY-MM-DD'));

  useEffect(() => {
    const fetchedDataMap = new Map();
    const fetchData = async () => {
      await userRef.collection('logs').doc(logId).collection('calendar').get().then(snapshot => {
        snapshot.docs.map(doc => {
          fetchedDataMap.set(doc.data().unix, doc.data().value);
        });
      });
      setUnixValueMap(fetchedDataMap);
    }
    fetchData();
    return () => {
      mountedRef.current = false;
    }
  }, [addDate]);

  // create the dataList which includes 365 data pairs
  const dataList = [];
  const unixLastYear = unixToday - (86400 * 364);
  let unixToAdd = unixLastYear;
  for (let i = 0; i < 365; ++i) {
    const input = [unixToAdd, 0];
    if (unixValueMap.has(unixToAdd)) {
      input[1] = unixValueMap.get(unixToAdd);
    }
    dataList.push(input);
    unixToAdd += 86400;
  }

  // add to map containing all unix: value pairs
  const totalMap = new Map();
  for (let i = 0; i < dataList.length; ++i) {
    totalMap.set(dataList[i][0], dataList[i][1]);
  }
  
  const buildGraph = datapoints => {
    const dates = datapoints.map(data => data[0]);
    const values = datapoints.map(data => Math.round(data[1] * 1e3) / 1e3);
    const scaleX = scaleLinear()
      .domain([Math.min(...dates), Math.max(...dates)])
      .range([0, screenWidth]);
    const minValue = Math.min(...values);
    const maxValue = Math.max(...values);
    const scaleY = scaleLinear()
      .domain([minValue, maxValue])
      .range([screenWidth - verticalPadding, verticalPadding]);
    return {
      dates,
      scaleX,
      scaleY,
      maxValue,
      path: shape
        .line()
        .x(d => scaleX(d[0]))
        .y(d => scaleY(d[1]))
        .curve(shape.curveBasis)(datapoints),
    };
  }
  
  const graphs = [
    {
      label: '1W',
      value: 0,
      data: buildGraph(dataList.slice(-7)),
    },
    {
      label: '1M',
      value: 1,
      data: buildGraph(dataList.slice(-31)),
    },
    {
      label: '3M',
      value: 2,
      data: buildGraph(dataList.slice(-91)),
    },
    {
      label: '6M',
      value: 3,
      data: buildGraph(dataList.slice(-182)),
    },
    {
      label: '1Y',
      value: 4,
      data: buildGraph(dataList),
    },
  ];

  const currentSelected = graphs[selected].data;
  const currentMaxValue = currentSelected.maxValue;
  const properties = path.svgPathProperties(currentSelected.path);
  const lineLength = properties.getTotalLength();

  const moveCursor = value => {
    const {x, y} = properties.getPointAtLength(value);
    cursor.current.setNativeProps({ top: y - cursorRadius, left: x - cursorRadius });
    let curUnix = 0
    for (let i = 0; i < currentSelected.dates.length; ++i) {
      if (currentSelected.dates[i] >= currentSelected.scaleX.invert(x)) {
        if (i == 0 || i == currentSelected.dates.length - 1) {
          curUnix = currentSelected.dates[i];
        } else {
          curUnix = currentSelected.dates[i - 1];
        }
        break;
      }
    }
    // const dateConverted = convertUnixToDate(parseInt(currentSelected.scaleX.invert(x)));
    const dateConverted = convertUnixToDate(curUnix);
    const valueConverted = Math.round(totalMap.get(curUnix) * 1e3) / 1e3;
    labelDate.current.setNativeProps({ text: `${dateConverted}` });
    labelValue.current.setNativeProps({ text: `${valueConverted}` });
  }

  useEffect(() => {
    x.addListener(({ value }) => moveCursor(lineLength - value));
    moveCursor(lineLength);
  });

  return (
    <View style={styles.container}>
      <View style={[styles.header, { backgroundColor: logColor }]}>
        <View style={{ flexDirection: 'row' }}>
          <BaseText style={styles.headerText}>Date: </BaseText>
          <TextInput ref={labelDate} style={[styles.headerText, { fontFamily: 'Futura' }]} />
        </View>
        <View style={{ flexDirection: 'row' }}>
          <BaseText style={styles.headerText}>Value: </BaseText>
          <TextInput ref={labelValue} style={[styles.headerText, { fontFamily: 'Futura' }]} />
        </View>
        <BaseText style={styles.headerText}>Peak: {currentMaxValue}</BaseText>
      </View>
      <View>
        <Svg width={screenWidth} height={screenWidth}>
          <Path
            d={currentSelected.path}
            fill="transparent"
            stroke={graphColor}
            strokeWidth={3}
          />
          <View 
            ref={cursor}
            style={[styles.cursor, {
              borderColor: graphColor,
              backgroundColor: '#FFFAF1',
              width: cursorRadius * 2,
              height: cursorRadius * 2,
              borderRadius: cursorRadius,
            }]}
          />
        </Svg>
        <Animated.ScrollView
          style={StyleSheet.absoluteFill}
          contentContainerStyle={{ width: lineLength * 2 }}
          showsHorizontalScrollIndicator={false}
          scrollEventThrottle={16}
          bounces={false}
          onScroll={Animated.event(
            [
              {
                nativeEvent: {
                  contentOffset: { x },
                },
              },
            ],
            { useNativeDriver: true },
          )}
          horizontal
          decelerationRate='fast'
        />
      </View>
      <View style={styles.selection}>
        <View style={StyleSheet.absoluteFill}>
          <View
            style={[
              styles.backgroundSelection,
              { transform: [{ translateX: BUTTON_WIDTH * selected }] },
            ]}
          />
        </View>
        {graphs.map((graph, index) => {
          return (
            <TouchableWithoutFeedback
              key={graph.label}
              onPress={() => {
                setSelected(index);
              }}
            >
              <View style={[styles.labelContainer]}>
                <BaseText style={styles.label}>{graph.label}</BaseText>
              </View>
            </TouchableWithoutFeedback>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFAF1',
    marginTop: 60,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    paddingVertical: 10,
  },
  headerText: {
    fontSize: 15,
  },
  backgroundSelection: {
    backgroundColor: "#F3F3F3",
    // backgroundColor: 'rgba(0, 0, 0, 0.1)',
    ...StyleSheet.absoluteFillObject,
    width: BUTTON_WIDTH,
    borderRadius: 8,
  },
  cursor: {
    borderWidth: 3,
  },
  selection: {
    flexDirection: "row",
    width: SELECTION_WIDTH,
    alignSelf: "center",
  },
  labelContainer: {
    padding: 16,
    width: BUTTON_WIDTH,
  },
  label: {
    fontSize: 16,
    color: "black",
    fontWeight: "bold",
    textAlign: "center",
  },
});

export default LogGraph;