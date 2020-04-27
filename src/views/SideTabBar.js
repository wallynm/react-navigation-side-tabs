import React from 'react';
import {
  View,
  Animated,
  StyleSheet,
  Keyboard,
  Platform,
  LayoutChangeEvent,
  ScaledSize,
} from 'react-native';
import {
  NavigationContext,
  NavigationRouteContext,
  CommonActions,
  useTheme,
} from '@react-navigation/native';
import { SafeAreaConsumer } from 'react-native-safe-area-context';

import SideTabItem from './SideTabItem';


const DEFAULT_TABBAR_HEIGHT = 50;
const DEFAULT_MAX_TAB_ITEM_WIDTH = 125;

const useNativeDriver = Platform.OS !== 'web';

export default function SideTabBar({
  state,
  navigation,
  descriptors,
  activeBackgroundColor,
  activeTintColor,
  iconHorizontal = false,
  adaptive = true,
  allowFontScaling,
  inactiveBackgroundColor,
  inactiveTintColor,
  keyboardHidesTabBar = false,
  labelPosition,
  labelStyle,
  showIcon,
  showLabel,
  iconSize,
  labelSize,
  style,
  tabWidth,
  tabStyle,
}: Props) {
  const { colors } = useTheme();
  const [visible] = React.useState(() => new Animated.Value(1));
  const { routes } = state;

  return (
    <SafeAreaConsumer>
      {insets => (
        <Animated.View
          style={[
            styles.tabBar,
            {
              backgroundColor: colors.card,
              borderRightColor: colors.border,
              paddingTop: insets ? insets.top : 0,
            },
            style,
          ]}
          pointerEvents={'auto'}
        >
          <View style={styles.content}>
            {routes.map((route, index) => {
              const focused = index === state.index;
              const { options } = descriptors[route.key];

              const onPress = () => {
                const event = navigation.emit({
                  type: 'tabPress',
                  target: route.key,
                  canPreventDefault: true,
                });

                if (!focused && !event.defaultPrevented) {
                  navigation.dispatch({
                    ...CommonActions.navigate(route.name),
                    target: state.key,
                  });
                }
              };

              const onLongPress = () => {
                navigation.emit({
                  type: 'tabLongPress',
                  target: route.key,
                });
              };

              const label =
                options.tabBarLabel !== undefined
                  ? options.tabBarLabel
                  : options.title !== undefined
                  ? options.title
                  : route.name;

              const accessibilityLabel =
                options.tabBarAccessibilityLabel !== undefined
                  ? options.tabBarAccessibilityLabel
                  : typeof label === 'string'
                  ? `${label}, tab, ${index + 1} of ${routes.length}`
                  : undefined;

              return (
                <NavigationContext.Provider
                  key={route.key}
                  value={descriptors[route.key].navigation}
                >
                  <NavigationRouteContext.Provider value={route}>
                    <SideTabItem
                      route={route}
                      focused={focused}
                      horizontal={iconHorizontal}
                      onPress={onPress}
                      onLongPress={onLongPress}
                      accessibilityLabel={accessibilityLabel}
                      testID={options.tabBarTestID}
                      allowFontScaling={allowFontScaling}
                      activeTintColor={activeTintColor}
                      inactiveTintColor={inactiveTintColor}
                      activeBackgroundColor={activeBackgroundColor}
                      inactiveBackgroundColor={inactiveBackgroundColor}
                      button={options.tabBarButton}
                      iconSize={iconSize}
                      labelSize={labelSize}
                      icon={options.tabBarIcon}
                      label={label}
                      showIcon={showIcon}
                      showLabel={showLabel}
                      tabWidth={tabWidth}
                      labelStyle={labelStyle}
                      style={tabStyle}
                    />
                  </NavigationRouteContext.Provider>
                </NavigationContext.Provider>
              );
            })}
          </View>
        </Animated.Viewa>
      )}
    </SafeAreaConsumer>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    left: 0,
    right: 0,
    bottom: 0,
    borderRightWidth: StyleSheet.hairlineWidth,
    elevation: 8,
  },
  content: {
    flex: 1,
    flexDirection: 'column',
  },
});
