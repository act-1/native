import React from 'react';
import { Platform, Pressable } from 'react-native';
import { Home, RiotMap } from '../screens';
import { CapturePicture } from '../components';
import { RootStackParamList } from '../types/navigation';
import { createStackNavigator, TransitionPresets } from '@react-navigation/stack';
import RecentPictures from '@screens/Community/RecentPictures';
import NewPost from '@screens/NewPost';
import Icon from 'react-native-vector-icons/Feather';

const HomeStack = createStackNavigator<RootStackParamList>();

function HomeNavigator({ navigation }) {
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
        headerTintColor: '#EC534B',
        headerTitleAllowFontScaling: false,
      }}
    >
      <HomeStack.Screen
        name="Home"
        component={Home}
        options={{
          headerLeft: () => (
            <Pressable
              onPress={() => navigation.navigate('Secondary', { screen: 'Settings' })}
              style={{ alignItems: 'center', padding: 6, justifyContent: 'center', borderRadius: 50, marginLeft: 8 }}
            >
              <Icon name="settings" size={22} color="#747474" />
            </Pressable>
          ),
        }}
      />
      <HomeStack.Screen
        name="RiotMap"
        component={RiotMap}
        options={{ headerShown: false, ...TransitionPresets.ModalSlideFromBottomIOS }}
      />

      <HomeStack.Screen
        name="RecentPictures"
        options={{
          headerTitle: 'תמונות אחרונות',
          headerTitleAlign: 'center',
          headerBackTitleVisible: false,
        }}
        component={RecentPictures}
      />

      <HomeStack.Screen
        name="NewPost"
        component={NewPost}
        options={{
          headerTitle: 'העלאת תמונה',
          headerTitleStyle: {
            fontSize: 20,
            fontFamily: 'AtlasDL3.1AAA-Medium',
            fontWeight: Platform.select({ ios: '700', android: null }),
            color: '#EC534B',
            marginRight: 15,
          },
          headerTitleContainerStyle: { marginBottom: 6 },
          headerRightContainerStyle: { marginRight: 12 },
          headerLeftContainerStyle: { marginLeft: 12, marginBottom: 6 },
          headerLeft: () => (
            <Pressable onPress={() => navigation.goBack()} hitSlop={10}>
              <Icon name="x" size={22} color="#747474" />
            </Pressable>
          ),
        }}
      />
    </HomeStack.Navigator>
  );
}

export default HomeNavigator;
