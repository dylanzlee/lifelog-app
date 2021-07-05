import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { AntDesign } from '@expo/vector-icons';
import { createStackNavigator } from '@react-navigation/stack';
import { BaseText } from '../constants/TextStyles';
import colors from '../constants/colors';
import LogsScreen from '../screens/LogsScreen';
import ProfileScreen from '../screens/ProfileScreen';
import AddLogScreen from '../screens/AddLogScreen';
import SelectBox from '../components/SelectBox';
import StatusScreen from '../screens/StatusScreen';
import ConfirmDeletePopup from '../components/ConfirmDeletePopup';

const Tab = createBottomTabNavigator();

const Placeholder = () => <View style={{ flex: 1, backgroundColor: 'black' }}></View>

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
              <Text style={[styles.name, { color: focused ? colors.authButtonColor : 'grey' }]}>My Logs</Text>
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="Add"
        component={Placeholder}
        options={{
          tabBarIcon: () => (
            <View style={[styles.tab, { top: 4 }]}>
                <AntDesign name="pluscircleo" size={40} color={colors.authButtonColor} />
            </View>
          ),
        }}
        listeners={({ navigation }) => ({
          tabPress: event => {
            event.preventDefault();
            navigation.navigate("AddLog");
          }
        })}
      />
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
        }}
      />
    </Tab.Navigator>
  );
}

const ModalStack = createStackNavigator();

const ModalNavigator = () => {
  return (
    <ModalStack.Navigator mode='modal'>
      <ModalStack.Screen
        name="Tabs"
        component={TabNavigator}
        options={{ headerShown: false }}
      />
      <ModalStack.Screen
        name="AddLog"
        component={AddLogScreen}
        options={({ navigation }) => ({
          headerTitle: <BaseText>Add a new log!</BaseText>,
          headerStyle: styles.modalHeader,
          headerLeft: () => (
            <AntDesign
              name="close"
              size={35}
              color='black'
              onPress={() => navigation.goBack()}
            />
          ),
          headerLeftContainerStyle: styles.crossButton,
        })}
      />
      <ModalStack.Screen
        name="ConfirmDelete"
        component={ConfirmDeletePopup}
        options={{ headerShown: false }}
      />
    </ModalStack.Navigator>
  );
}

const AppStack = createStackNavigator();

const AppNavigator = () => {
  return (
  <AppStack.Navigator>
    <AppStack.Screen
      name="ModalNavigator"
      component={ModalNavigator}
      options={{ headerShown: false }}
    />
    <AppStack.Screen
      name="SelectBox"
      component={SelectBox}
    />
    <AppStack.Screen
      name="Status"
      component={StatusScreen}
      options={{ headerShown: false }}
    />
  </AppStack.Navigator>
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
  modalHeader: {
    backgroundColor: colors.authButtonColor,
    borderBottomWidth: 0,
    shadowOpacity: 0,
  },
  crossButton: {
    marginLeft: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default AppNavigator;