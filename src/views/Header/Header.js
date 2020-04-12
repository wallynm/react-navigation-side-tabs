import React from 'react';
import SideTabBar from '../SideTabBar';
import { Platform, StatusBar, StyleSheet, View, Text, Dimensions } from 'react-native';
import { useTheme } from '@react-navigation/native';
import { SafeAreaConsumer } from 'react-native-safe-area-context';
import HeaderTitle from './HeaderTitle';


export const getDefaultHeaderHeight = (statusBarHeight) => {
  const layout = Dimensions.get('window')
  const isLandscape = layout.width > layout.height;

  let headerHeight;

  if (Platform.OS === 'ios') {
    // @ts-ignore
    if (isLandscape && !Platform.isPad) {
      headerHeight = 32;
    } else {
      headerHeight = 44;
    }
  } else if (Platform.OS === 'android') {
    headerHeight = 56;
  } else {
    headerHeight = 64;
  }

  return headerHeight + statusBarHeight;
};


const Header = ({
  descriptor,
  insets
}) => {
  const { colors } = useTheme();
  
  const headerHeight = getDefaultHeaderHeight(insets.top);

  const {
    title,
    tabBarLabel,
    titleIcon,
    tabBarIcon
  } = descriptor.options

  return (
    <View pointerEvents="box-none" style={[
      styles.header,
      {
        paddingTop: insets ? insets.top : 0,
        height: headerHeight,
        borderBottomColor: colors.border,
      },
    ]}>
      {typeof titleIcon === 'function' && titleIcon()}
      <HeaderTitle style={styles.text}>
        {title || tabBarLabel}
      </HeaderTitle>
    </View>
  )
}

const styles = StyleSheet.create({
  text: {
    marginLeft: 16
  },
  header: {
    elevation: 8,
    backgroundColor: '#FFF',
    paddingLeft: 16,
    alignItems: 'center',
    borderBottomWidth: StyleSheet.hairlineWidth,
    flexDirection: 'row'
  }
});


const HeaderWrapper = (props) => {
  return (
    <SafeAreaConsumer>
      {insets => (
        <Header
          insets={insets}
          {...props}
        />
      )}
    </SafeAreaConsumer>
  )
}

export default HeaderWrapper;