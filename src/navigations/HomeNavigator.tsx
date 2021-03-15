import React from 'react';
import { Platform, Pressable } from 'react-native';
import { Home } from '../screens';
import { Box } from '../components';
import { RootStackParamList } from '../types/navigation';
import { createStackNavigator } from '@react-navigation/stack';
import RecentPictures from '@screens/Community/RecentPictures';
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
        headerLeft: () => (
          <Pressable
            onPress={() => navigation.navigate('Secondary', { screen: 'Settings' })}
            style={{ alignItems: 'center', padding: 6, justifyContent: 'center', borderRadius: 50, marginLeft: 6 }}
          >
            <Icon name="inbox" size={22} color="#747474" />
          </Pressable>
        ),
      }}
    >
      <HomeStack.Screen name="Home" component={Home} />
      <HomeStack.Screen
        name="RecentPictures"
        options={{
          headerTitle: 'תמונות אחרונות',
          headerBackTitleVisible: false,
          headerTitleAlign: 'center',
        }}
        component={RecentPictures}
      />
    </HomeStack.Navigator>
  );
}

export default HomeNavigator;
