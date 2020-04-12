import React from 'react';
import { Text } from 'react-native';
import SideTabBar from './SideTabBar';
import * as T from '@react-navigation/stack';
import SafeAreaProviderCompat from './SafeAreaProviderCompat';


// color: rgb(28, 28, 30);
// font-size: 18px;
// font-weight: 500;

const HeaderView = ({
  headerTitle,
  tabBarLabel,
  descriptor
}) => {
  return (
    <SafeAreaProviderCompat>
      <T.Header
        statusBarHeight={60}
        insets={{
          top: 0
        }}
        styleInterpolator={()=>{
          return {
            titleStyle:{},
            leftButtonStyle:{},
            leftLabelStyle:{},
            rightButtonStyle:{},
            backgroundStyle:{}
          }
        }}
        layout={{
          width: 0
        }}
        scene={{
          progress: {
            current: true
          },
          route:{
            name: 'test2'
          },
          descriptor
        }}>
        <Text>{headerTitle || tabBarLabel}</Text>
      </T.Header>
    </SafeAreaProviderCompat>
  )
}

export default HeaderView;