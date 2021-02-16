import React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import Community from '@screens/Community';
import Icon from 'react-native-vector-icons/Feather';

const CommunityStack = createStackNavigator();

function CommunityNavigator() {
  return (
    <CommunityStack.Navigator
      screenOptions={({ navigation }) => ({
        gestureEnabled: true,
        headerStyle: { backgroundColor: '#0a0a0a', shadowOpacity: 0 },
        headerTitleStyle: {
          fontSize: 22,
          fontFamily: 'AtlasDL3.1AAA-Bold',
          fontWeight: Platform.select({ ios: '700', android: null }),
          color: '#EC534B',
        },
      })}
    >
      <CommunityStack.Screen
        name="LiveFeed"
        options={({ navigation }) => ({
          title: 'קהילה',
          headerTitleAlign: 'center',
        })}
        component={Community}
      />
    </CommunityStack.Navigator>
  );
}

export default CommunityNavigator;

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
