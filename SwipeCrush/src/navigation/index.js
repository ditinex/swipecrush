import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Splash, Home, Login, Signup, Chatrooms, Room } from "src/screen";

import { Config, Theme } from "src/util";
import Icon from 'react-native-vector-icons/FontAwesome';

function DetailsScreen() {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: Theme.lightblue }}>
      <Text>Details Screen</Text>
    </View>
  );
}

function TabComponent({route, active}) {
  let iconTab = {
    Home: 'home',
    Chatrooms: 'comments',
    Message: 'envelope',
    People: 'heart',
    Notification: 'bell'
  }
  const style = (active)? [styles.container,styles.active] : styles.container
  return (
    <View style={style}>
      <Icon name={iconTab[route]} size={32} color={(active)?Theme.splashRed:Theme.grey} />
    </View>
  );
}

var styles = StyleSheet.create({
  icon: {
  },
  container: {
    flex: 1, alignItems: 'center', justifyContent: 'center',
    width: 50, margin: 5,
  },
  active: {
    borderWidth: 0.5, borderColor: Theme.splashRed, borderRadius: 8,
  },
});

const Tab = createBottomTabNavigator();

function BottomTab() {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          return <TabComponent route={route.name} active={focused} />
        }
      })}
      swipeEnabled = {true}
      tabBarOptions={{
        activeTintColor: 'tomato',
        inactiveTintColor: 'gray',
        showLabel: false,
        showIcon: true,
        keyboardHidesTabBar: true,
        style: { backgroundColor: Theme.white, borderTopColor: Theme.grey }
      }}
    >
      <Tab.Screen name="Chatrooms" component={Chatrooms} />
      <Tab.Screen name="Message" component={DetailsScreen} />
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="People" component={DetailsScreen} />
      <Tab.Screen name="Notification" component={DetailsScreen} />
    </Tab.Navigator>
  );
}


const Stack = createStackNavigator();

function Router(prop) {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Splash"
        mode="modal"
        headerMode="none"
      >
        <Stack.Screen name="Splash" component={Splash} />
        <Stack.Screen name="Home" component={BottomTab} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Signup" component={Signup} />
        <Stack.Screen name="Room" component={Room} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default Router;
