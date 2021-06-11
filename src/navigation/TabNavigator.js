import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import LogsScreen from '../screens/LogsScreen';
import ProfileScreen from '../screens/ProfileScreen';
import AddLogScreen from '../screens/AddLogScreen';
import { AntDesign } from '@expo/vector-icons';
import colors from '../constants/colors';

const Tab = createBottomTabNavigator();

const TabNavigator = () => {
  return (
    <Tab.Navigator
      tabBarOptions={{
        showLabel: false,
        style: styles.tabBar
      }}
    >
      <Tab.Screen
        name="Logs"
        component={LogsScreen}
        options={{
          tabBarIcon: ({focused}) => (
            <View style={styles.tab}>
              <AntDesign name="book" size={24} color={focused ? colors.authButtonColor : 'grey'} />
              <Text style={[styles.name, { color: focused ? colors.authButtonColor : 'grey' }]}>Logs</Text>
            </View>
          ),
        }} />
      <Tab.Screen
        name="AddLog"
        component={AddLogScreen}
        options={{
          tabBarIcon: () => (
            <View style={[styles.tab, { top: 4 }]}>
              <AntDesign name="pluscircleo" size={40} color={colors.authButtonColor} />
            </View>
          ),
        }} />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarIcon: ({focused}) => (
            <View style={styles.tab}>
              <AntDesign name="user" size={24} color={focused ? colors.authButtonColor : 'grey'} />
              <Text style={[styles.name, { color: focused ? colors.authButtonColor : 'grey' }]}>Profile</Text>
            </View>
          ),
        }} />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: 80,
    backgroundColor: 'black',
    fontFamily: 'Futura',
    borderTopColor: 'darkgrey',
  },
  tab: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: 200,
    top: 6,
  },
  name: {
    marginTop: 1,
  },
});

export default TabNavigator;