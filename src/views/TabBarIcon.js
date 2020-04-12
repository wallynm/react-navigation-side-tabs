import React from 'react';
import { View, StyleSheet, StyleProp, ViewStyle } from 'react-native';
import { Route } from '@react-navigation/native';


export default function TabBarIcon({
  activeTintColor,
  inactiveTintColor,
  renderIcon,
  size,
  style,
  focused
}) {

  // const opacity =
  const color = focused ? activeTintColor : inactiveTintColor

  // We render the icon twice at the same position on top of each other:
  // active and inactive one, so we can fade between them.
  return (
    <View style={style}>
      {renderIcon({
        focused,
        size,
        color
      })}
    </View>
  );
}
