import React from 'react';
import { createStackNavigator, TransitionPresets } from '@react-navigation/stack';
import LiveFeed from '@screens/LiveFeed';
import Icon from 'react-native-vector-icons/Feather';

const LiveStack = createStackNavigator();

function LiveNavigator() {
  return (
    <LiveStack.Navigator
      screenOptions={({ navigation }) => ({
        gestureEnabled: true,
        headerShown: false,
        headerTitleStyle: {
          fontSize: 22,
          fontFamily: 'AtlasDL3.1AAA-Medium',
          color: '#EC534B',
        },
        ...TransitionPresets.SlideFromRightIOS,
        headerStyle: { backgroundColor: '#0a0a0a', shadowOpacity: 0 },
        // headerLeft: () => (
        //   <Icon
        //     name={'arrow-right'}
        //     size={28}
        //     color={'#fff'}
        //     style={{
        //       shadowColor: '#000',
        //       shadowOffset: { width: 0, height: 1 },
        //       shadowOpacity: 1,
        //       shadowRadius: 2,
        //       marginLeft: 6,
        //     }}
        //     onPress={() => navigation.goBack()}
        //   />
        // ),
      })}
    >
      <LiveStack.Screen
        name="LiveFeed"
        options={({ navigation }) => ({
          title: 'פיד מחאה',
          headerShown: true,
          gestureEnabled: true,
        })}
        component={LiveFeed}
      />
    </LiveStack.Navigator>
  );
}

export default LiveNavigator;
