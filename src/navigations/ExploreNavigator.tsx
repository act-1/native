import React from 'react';
// import { createStackNavigator } from '@react-navigation/stack';
import { createNativeStackNavigator } from 'react-native-screens/native-stack';

import { Explore, ExploreList } from '@screens/Explore';
import Icon from 'react-native-vector-icons/Feather';

// const ExploreStack = createStackNavigator();
const ExploreStack = createNativeStackNavigator();

function ExploreNavigator() {
  return (
    <ExploreStack.Navigator
      screenOptions={{
        direction: 'rtl',
        gestureEnabled: true,
        headerTitleStyle: {
          fontSize: 22,
          fontFamily: 'AtlasDL3.1AAA-Medium',
          color: '#EC534B',
        },
        headerStyle: { backgroundColor: '#0a0a0a', shadowOpacity: 0 },
      }}
    >
      <ExploreStack.Screen name="ExploreMain" options={{ title: 'אמ' }} component={Explore} />
      <ExploreStack.Screen
        name="ExploreList"
        options={({ navigation }) => ({
          title: 'אמ',
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
    </ExploreStack.Navigator>
  );
}

export default ExploreNavigator;
