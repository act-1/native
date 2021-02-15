import React from 'react';
import { View, Platform } from 'react-native';
import { Box } from '../components';
import { Home } from '../screens';
import { RootStackParamList } from '../types/navigation';
import { createStackNavigator } from '@react-navigation/stack';
import Icon from 'react-native-vector-icons/Feather';
import FastImage from 'react-native-fast-image';

const HomeStack = createStackNavigator<RootStackParamList>();

function HomeNavigator() {
  return (
    <HomeStack.Navigator
      screenOptions={{
        headerTitle: 'ACT1',
        headerTitleAlign: 'center',
        headerStyle: { backgroundColor: '#0a0a0a', shadowOffset: { height: 0, width: 0 } },
        headerTitleStyle: {
          fontSize: 22,
          fontFamily: 'AtlasDL3.1AAA-Bold',
          fontWeight: Platform.select({ ios: '700', android: null }),
          letterSpacing: 0.4,
          color: '#EC534B',
        },
        // headerRight: () => (
        //   <Box marginRight="xm" flexDirection="row">
        //     <Icon name="inbox" size={24} color="#d4d4d4" style={{ marginRight: 4 }} />
        //   </Box>
        // ),
        headerLeft: () => (
          <Box marginLeft="xm" marginBottom="xxs">
            <FastImage
              source={{ uri: 'https://i.pravatar.cc/150?img=5' }}
              style={{ width: 27, height: 27, borderRadius: 25, borderColor: '#e9e9e9' }}
            />
          </Box>
        ),
      }}
    >
      <HomeStack.Screen name="Home" component={Home} />
    </HomeStack.Navigator>
  );
}

export default HomeNavigator;
