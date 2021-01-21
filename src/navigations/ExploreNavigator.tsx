import React from 'react';
import { createStackNavigator, TransitionPresets } from '@react-navigation/stack';
// import { createNativeStackNavigator } from 'react-native-screens/native-stack';
import { createSharedElementStackNavigator } from 'react-navigation-shared-element';

import { LocationPage } from '@screens/LocationPage';
import { Explore, ExploreList } from '@screens/Explore';
import Icon from 'react-native-vector-icons/Feather';

// const ExploreStack = createStackNavigator();
// const ExploreStack = createNativeStackNavigator();
const ExploreStack = createSharedElementStackNavigator();

function ExploreNavigator() {
  return (
    <ExploreStack.Navigator
      screenOptions={{
        gestureEnabled: true,
        headerShown: false,
        headerTitleStyle: {
          fontSize: 22,
          fontFamily: 'AtlasDL3.1AAA-Medium',
          color: '#EC534B',
        },

        headerStyle: { backgroundColor: '#0a0a0a', shadowOpacity: 0 },
        // cardStyleInterpolator: ({ current: { progress } }) => ({
        //   cardStyle: {
        //     opacity: progress,
        //   },
        // }),
      }}
    >
      <ExploreStack.Screen name="ExploreMain" options={{ title: 'תמונות נבחרות' }} component={Explore} />
      <ExploreStack.Screen
        name="ExploreList"
        sharedElementsConfig={(route, otherRoute, showing) => {
          const { initialIndex } = route.params;
          console.log(initialIndex);
          if (showing) {
            return false;
          } else {
            return false;
          }
        }}
        options={({ navigation }) => ({
          title: 'אמ',
          headerShown: true,
          headerLeft: () => (
            <Icon
              name={'arrow-right'}
              size={28}
              color={'#fff'}
              style={{
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 1 },
                shadowOpacity: 1,
                shadowRadius: 2,
              }}
              onPress={() => navigation.goBack()}
            />
          ),
        })}
        component={ExploreList}
      />
      <ExploreStack.Screen name="LocationPage" options={{ headerShown: false }} component={LocationPage} />
    </ExploreStack.Navigator>
  );
}

export default ExploreNavigator;
