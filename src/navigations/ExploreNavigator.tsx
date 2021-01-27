import React from 'react';
import { createStackNavigator, TransitionPresets } from '@react-navigation/stack';
import { LocationPage } from '@screens/LocationPage';
import { ExploreList } from '@screens/Explore';
import Icon from 'react-native-vector-icons/Feather';

const ExploreStack = createStackNavigator();

function ExploreNavigator() {
  return (
    <ExploreStack.Navigator
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
              marginLeft: 6,
            }}
            onPress={() => navigation.goBack()}
          />
        ),
      })}
    >
      <ExploreStack.Screen
        name="ExploreList"
        options={({ navigation }) => ({
          title: 'נבחרות',
          headerShown: false,
          gestureEnabled: true,

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
                marginLeft: 6,
              }}
              onPress={() => navigation.goBack()}
            />
          ),
        })}
        component={ExploreList}
      />
      <ExploreStack.Screen name="LocationPage" options={{ headerShown: true, headerTitle: '' }} component={LocationPage} />
    </ExploreStack.Navigator>
  );
}

export default ExploreNavigator;
