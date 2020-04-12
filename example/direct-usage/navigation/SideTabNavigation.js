import React from 'react';

import { createSideTabNavigator } from 'react-navigation-side-tabs';
import Home from '../screens/HomeScreen';
import Link from '../screens/LinksScreen';
import { Ionicons } from '@expo/vector-icons';

const Tab = createSideTabNavigator();

const App = () => {
  return (
    <Tab.Navigator
      initialRouteName="LinkScreen"
      tabBarOptions={{
        activeTintColor: '#e91e63',
        // iconHorizontal: true,
        // iconHorizontal: false,
        // iconSize: 32,
        // // labelSize: 32,
        // showLabel: true,
        // // showLabel: false,
        // // tabWidth: 30,
        tabWidth: 130
      }}
    >
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          title: 'Home Test',
          tabBarLabel: 'Home',
          titleIcon: () => (
            <Ionicons name="md-home" color={'#000'} size={20} />
          ),
          tabBarIcon: ({ color, size, focused }) => (
            <Ionicons name="md-home" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="LinkScreen"
        component={Link}
        options={{
          tabBarLabel: 'Updates sada dasdas',
          titleIcon: () => (
            <Ionicons name="md-home"  color={'#000'} size={20} />
          ),
          tabBarIcon: ({ color, size, focused }) => (
            <Ionicons name="md-home" color={color} size={size} />
          ),
        }}
      /> 
    </Tab.Navigator>
  );
}


export default App
