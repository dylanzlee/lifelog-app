import React, { useState, useEffect, useContext, useRef } from 'react';
import { View, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import { db } from '../../firebase';
import { AuthContext } from '../navigation/AuthProvider';
import { AppContext } from '../navigation/AppProvider';
import { BaseText } from '../constants/TextStyles';
import Svg, { Path } from 'react-native-svg';
import { scaleLinear } from "d3-scale";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";
// import Cursor from './Cursor';
import * as shape from "d3-shape";
import moment from 'moment';

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

const LogGraph = ({ logId, logColor }) => {
  const mountedRef = useRef(true);
  const { addDate } = useContext(AppContext);
  const { user } = useContext(AuthContext);
  const userRef = db.collection('users').doc(user.uid);
  const [unixValueMap, setUnixValueMap] = useState(new Map());
  const [selected, setSelected] = useState(0);

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
  const unixToday = convertDateToUnix(moment().format('YYYY-MM-DD'));
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
  
  const buildGraph = datapoints => {
    const dates = datapoints.map(data => data[0]);
    const values = datapoints.map(data => data[1]);
    const scaleX = scaleLinear()
      .domain([Math.min(...dates), Math.max(...dates)])
      .range([0, screenWidth]);
    const minValue = Math.min(...values);
    const maxValue = Math.max(...values);
    const scaleY = scaleLinear().domain([minValue, maxValue]).range([screenWidth, 0]);
    return {
      minValue,
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

  return (
    <View style={styles.container}>
      <View style={[styles.header, { backgroundColor: logColor }]}>
        <View>
          <BaseText style={styles.headerText}>Date: TBA</BaseText>
        </View>
        <View>
          <BaseText style={styles.headerText}>Value: TBA</BaseText>
        </View>
        <View>
          <BaseText style={styles.headerText}>Peak: {currentMaxValue}</BaseText>
        </View>
      </View>
      <View>
        <Svg width={screenWidth} height={screenWidth}>
          <Path
            d={currentSelected.path}
            fill="transparent"
            stroke="black"
            strokeWidth={3}
          />
        </Svg>
        {/* <Cursor data={currentSelected} /> */}
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
    backgroundColor: "#f3f3f3",
    // backgroundColor: 'rgba(0, 0, 0, 0.1)',
    ...StyleSheet.absoluteFillObject,
    width: BUTTON_WIDTH,
    borderRadius: 8,
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