import React, { useEffect } from 'react';
import {
  useNavigationBuilder,
  createNavigatorFactory,
  DefaultNavigatorOptions,
  TabRouter,
  TabRouterOptions,
  TabNavigationState,
} from '@react-navigation/native';
import SideTabView from '../views/SideTabView';


function SideTabNavigator({
  initialRouteName,
  backBehavior,
  children,
  screenOptions,
  ...rest
}) {
  const { state, descriptors, navigation } = useNavigationBuilder(TabRouter, {
    initialRouteName,
    backBehavior,
    children,
    screenOptions,
  });

  navigation.setOptions({
    headerShown: false
  });

  useEffect(() => {
    return function cleanup() {
       navigation.setOptions({
        headerShown: true
      });
    }
  }, []);

  return (
    <SideTabView
      {...rest}
      state={state}
      navigation={navigation}
      descriptors={descriptors}
    />
  );
}

export default createNavigatorFactory(SideTabNavigator);
