import React from 'react';
import SideTabBar from './SideTabBar';

const TabBarView = ({
  tabBar = (props) => <SideTabBar {...props} />,
  tabBarOptions,
  state,
  navigation,
  descriptors
}) => {
  const route = state.routes[state.index];
  const descriptor = descriptors[route.key];
  const options = descriptor.options;

  if (options.tabBarVisible === false) {
    return null;
  }

  return tabBar({
    ...tabBarOptions,
    state: state,
    descriptors: descriptors,
    navigation: navigation,
  });
}

export default TabBarView;