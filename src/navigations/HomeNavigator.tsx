import React from 'react';
import { Platform } from 'react-native';
import { Home } from '../screens';
import HeaderProfilePicture from '@components/HeaderProfilePicture';
import { RootStackParamList } from '../types/navigation';
import { createStackNavigator } from '@react-navigation/stack';
import RecentPictures from '@screens/Community/RecentPictures';

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
        // headerRight: () => (
        //   <Box marginRight="xm" flexDirection="row">
        //     <Icon name="inbox" size={24} color="#d4d4d4" style={{ marginRight: 4 }} />
        //   </Box>
        // ),
        headerLeft: () => <HeaderProfilePicture navigation={navigation} />,
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
