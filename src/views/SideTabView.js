import React, { useState, useEffect } from 'react';
import { View, StyleSheet } from 'react-native';

import { TabNavigationState, useTheme } from '@react-navigation/native';
// eslint-disable-next-line import/no-unresolved
import { ScreenContainer } from 'react-native-screens';

import SafeAreaProviderCompat from './SafeAreaProviderCompat';
import ResourceSavingScene from './ResourceSavingScene';
import TabBarView from './TabBarView';
import Header from './Header/Header';


function SceneContent({
  isFocused,
  children,
}) {
  const { colors } = useTheme();

  return (
    <View
      accessibilityElementsHidden={!isFocused}
      importantForAccessibility={isFocused ? 'auto' : 'no-hide-descendants'}
      style={[styles.content, { backgroundColor: colors.background }]}
    >
      {children}
    </View>
  );
}


const SideTabView = (props) => {
  const {
    state,
    descriptors,
    lazy,
    ...rest
  } = props
  const { routes } = state;
  const [loaded, setLoaded] = useState([state.index]);
 
  useEffect(() => {
    setLoaded([...loaded, state.index])
  }, [state.index]);


  return (
    <SafeAreaProviderCompat>
      <View style={styles.container}>
        <TabBarView {...props}/>
        <ScreenContainer style={styles.pages}>
          {routes.map((route, index) => {
            const descriptor = descriptors[route.key];
            const { unmountOnBlur } = descriptor.options;
            const isFocused = state.index === index;

            if (unmountOnBlur && !isFocused) {
              return null;
            }

            if (lazy && !loaded.includes(index) && !isFocused) {
              // Don't render a screen if we've never navigated to it
              return null;
            }

            return (
              <ResourceSavingScene
                key={route.key}
                style={StyleSheet.absoluteFill}
                isVisible={isFocused}
              >
                <Header descriptor={descriptor}/>
                <SceneContent isFocused={isFocused}>
                  {descriptor.render()}
                </SceneContent>
              </ResourceSavingScene>
            );
          })}
        </ScreenContainer>
      </View>
    </SafeAreaProviderCompat>
  );
}

SideTabView.defaultProps = {
  lazy: true
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'red',
    flexDirection: 'row',
    flex: 1,
    overflow: 'hidden',
  },
  pages: {
    flex: 1,
  },
  content: {
    flex: 1,
  },
});

export default SideTabView;