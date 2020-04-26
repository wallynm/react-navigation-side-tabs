import React from 'react';
import {
  View,
  TouchableWithoutFeedback,
  Animated,
  StyleSheet,
  StyleProp,
  ViewStyle,
  TextStyle,
  Platform
} from 'react-native';
import { Route, useTheme } from '@react-navigation/native';
import Color from 'color';

import TabBarIcon from './TabBarIcon';

function SideTabItem ({
  focused,
  route,
  label,
  icon,
  button = ({ children, style, ...rest }) => (
    <TouchableWithoutFeedback {...rest}>
      <View style={style}>{children}</View>
    </TouchableWithoutFeedback>
  ),
  accessibilityLabel,
  testID,
  onPress,
  onLongPress,
  horizontal,
  activeTintColor: customActiveTintColor,
  inactiveTintColor: customInactiveTintColor,
  activeBackgroundColor = 'transparent',
  inactiveBackgroundColor = 'transparent',
  iconSize = 32,
  labelSize,
  tabWidth = 0,
  showLabel = true,
  showIcon = true,
  allowFontScaling,
  labelStyle,
  style,
}: Props) {
  const { colors } = useTheme();
  
  // For a good UX the navBar must bea at least 2x 
  // The size of the icon
  const minTabWidth = iconSize * 2;
  
  if (tabWidth <= minTabWidth) {
    console.warn(`The tabWidth must be at least ${minTabWidth} (2x the iconSize, ${iconSize})`)
    tabWidth = minTabWidth;
  }

  // Only allow to show the label when the tabWidth has sufficient space
  // to show at least some letters, in other case forces the labels to not show
  const controlShowLabel = showLabel || (tabWidth > minTabWidth) && showLabel;
  
  // As we have other font configured into Android we need to control
  // the size With a different multiplier
  let multiplier = Platform.OS === 'android' ? 2.3 : 2;

  // If the icons been showed as vertical we dont neet apply the 
  // multiplyer as it has the full row to display the text
  if (!horizontal) {
    multiplier = 1;
  }

  const scene = { route, focused };
  const width = (tabWidth - iconSize);
  const labelWidth = tabWidth - (iconSize * multiplier);

  const activeTintColor =
    customActiveTintColor === undefined
      ? colors.primary
      : customActiveTintColor;

  const inactiveTintColor =
    customInactiveTintColor === undefined
      ? Color(colors.text)
          .mix(Color(colors.card), 0.5)
          .hex()
      : customInactiveTintColor;


  const renderLabel = ({ focused }) => {
    if (controlShowLabel === false) {
      return null;
    }

    const color = focused ? activeTintColor : inactiveTintColor;

    if (typeof label === 'string') {
      return (
        <Animated.Text
          numberOfLines={1}
          style={[
            styles.label,
            horizontal ? styles.labelHorizontal : styles.labelVertical,
            showIcon && horizontal ? styles.labelBeside : styles.labelBeneath,
            labelStyle,
            { color, fontSize: labelSize, width: labelWidth },
          ]}
          allowFontScaling={allowFontScaling}
        >
          {label}
        </Animated.Text>
      );
    }

    if (typeof label === 'string') {
      return label;
    }

    return label({ focused, color });
  };

  const renderIcon = ({ focused }) => {
    if (showIcon === false || icon === undefined) {
      return null;
    }

    return (
      <TabBarIcon
        route={route}
        size={iconSize}
        focused={focused}
        activeTintColor={activeTintColor}
        inactiveTintColor={inactiveTintColor}
        renderIcon={icon}
      />
    );
  };

  const backgroundColor = focused
    ? activeBackgroundColor
    : inactiveBackgroundColor;

  return button({
    onPress,
    onLongPress,
    testID,
    accessibilityLabel,
    accessibilityRole: 'button',
    accessibilityStates: focused ? ['selected'] : [],
    style: [
      styles.tab,
      { backgroundColor, width },
      horizontal ? styles.tabHorizontal : styles.tabVertical,
      style
    ],
    children: (
      <React.Fragment>
        {renderIcon(scene)}
        {renderLabel(scene)}
      </React.Fragment>
    )
  })
}

const styles = StyleSheet.create({
  tab: {
    alignItems: 'center',
  },
  tabVertical: {
    justifyContent: 'flex-start',
    flexDirection: 'column',
  },
  tabHorizontal: {
    justifyContent: 'center',
    flexDirection: 'row',
  },
  label: {
    backgroundColor: 'transparent'
  },
  labelHorizontal: {
    textAlign: 'left'
  },
  labelVertical: {
    textAlign: 'center'
  },
  labelBeneath: {
    fontSize: 11,
    marginBottom: 1.5,
  },
  labelBeside: {
    fontSize: 22,
    marginLeft: 5,
  },
});

export default SideTabItem;
