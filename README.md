# React Navigation Side Tabs

Implements same navigation concepts as [@react-navigation](https://reactnavigation.org/) with some changes to support side navbar, with fully functional links and support for several methods already well documented into their docs

## Implementation

```javascript
import React from 'react';

import { createSideTabNavigator } from './index'
import Home from '../../screens/HomeScreen';
import Link from '../../screens/LinksScreen';
import { Ionicons } from '@expo/vector-icons';

const Tab = createSideTabNavigator();

const App = () => {
  return (
    <Tab.Navigator
      initialRouteName="RedScreen"
      tabBarOptions={{
        activeTintColor: '#e91e63',
        iconHorizontal: true || false,
        iconSize: 32,
        labelSize: 32,
        showLabel: true,
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
        name="RedScreen"
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

```

New supported options for tabbar:

    iconHorizontal: true || false,
    iconSize: 32,
    labelSize: 32,
    showLabel: true,
    tabWidth: 130