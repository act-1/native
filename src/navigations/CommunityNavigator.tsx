import React from 'react';
import { View, Pressable, Platform, StyleSheet } from 'react-native';
import { createStackNavigator, TransitionPresets } from '@react-navigation/stack';

import Community from '@screens/Community';
import RecentPictures from '@screens/Community/RecentPictures';

import { Box } from '../components';

import HeaderProfilePicture from '@components/HeaderProfilePicture';

import { BlurView } from '@react-native-community/blur';

// Blurred view has lacking performance on android.
let headerBackground = () => <View style={[StyleSheet.absoluteFillObject, { backgroundColor: '#1e262d', elevation: 4 }]} />;

if (Platform.OS === 'ios') {
  headerBackground = () => (
    <BlurView blurType="thickMaterial" reducedTransparencyFallbackColor="#1e262d" style={StyleSheet.absoluteFillObject} />
  );
}

const CommunityStack = createStackNavigator();

function CommunityNavigator({ navigation }) {
  return (
    <CommunityStack.Navigator
      screenOptions={({ navigation }) => ({
        gestureEnabled: true,
        ...TransitionPresets.SlideFromRightIOS,
        headerTintColor: '#8a8a8b',
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
        name="Community"
        options={{
          title: 'קהילה',
          headerTitleAlign: 'center',
          headerBackTitle: 'קהילה',
          headerLeft: () => <HeaderProfilePicture navigation={navigation} />,
        }}
        component={Community}
      />
      <CommunityStack.Screen
        name="RecentPictures"
        options={{
          title: 'תמונות אחרונות',
          headerBackTitleVisible: false,
          headerTitleAlign: 'center',
          headerTransparent: Platform.select({ ios: true, android: false }),
          headerBackground,
        }}
        component={RecentPictures}
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
