import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Splash, Home, Login, Signup, Chatrooms } from "src/screen";

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
    Message: 'envelope-o',
    People: 'heart',
    Notification: 'bell'
  }
  if(route=='Home')
  return (
    <View style={styles.home}>
      <Icon name={iconTab[route]} size={32} color={(active)?Theme.lightred:Theme.grey} />
    </View>
  );
  return (
    <View style={styles.container}>
      <Icon name={iconTab[route]} size={32} color={(active)?Theme.lightred:Theme.grey} />
    </View>
  );
}

var styles = StyleSheet.create({
  icon: {
  },
  container: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  home: { flex: 1, alignItems: 'center', justifyContent: 'center',
    borderWidth: 0.5, borderColor: Theme.grey, borderRadius: 50, backgroundColor: '#FFF', width: 50,
    position: 'relative', top: -25, backgroundColor: Theme.white
  }
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
        style={{paddingTop: 20}}
      >
        <Stack.Screen name="Splash" component={Splash} initialParams={prop} />
        <Stack.Screen name="Home" component={BottomTab} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Signup" component={Signup} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default Router;
