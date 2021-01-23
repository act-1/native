import React from 'react';
import { Platform, Pressable, StyleSheet } from 'react-native';
import { Box, Text, CircularButton } from '@components';
import { createStackNavigator } from '@react-navigation/stack';
import ActionScreen from '@screens/Action';
import { SelectLocation, LocationPage } from '@screens/LocationPage';
import NewPost from '@screens/NewPost';
import Icon from 'react-native-vector-icons/Feather';

const ActionStack = createStackNavigator();

function ActionNavigator({ navigation }) {
  return (
    <ActionStack.Navigator
      screenOptions={{
        headerTitleAlign: 'center',
        headerTitleStyle: {
          fontSize: 22,
          fontFamily: 'AtlasDL3.1AAA-Medium',
          color: '#EC534B',
          marginBottom: Platform.OS === 'ios' ? 11 : 2,
        },
        headerStyle: { backgroundColor: '#1e262d', shadowOpacity: 0 },
        headerStatusBarHeight: Platform.OS === 'ios' ? 11 : 0, // Modal height issues on iOS
      }}
    >
      <ActionStack.Screen name="ActionScreen" component={ActionScreen} options={{ headerTitle: 'יוצאים להפגין' }} />
      <ActionStack.Screen
        name="SelectLocation"
        component={SelectLocation}
        options={{
          headerTitle: 'איפה אתם?',
          headerBackTitleVisible: false,
          headerBackImage: () => (
            <Icon
              name={'arrow-right'}
              size={28}
              color={'#fff'}
              style={{
                marginLeft: Platform.OS === 'ios' ? 6 : -4,
                marginBottom: Platform.OS === 'ios' ? 8 : 0,
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 1 },
                shadowOpacity: 1,
                shadowRadius: 2,
              }}
              onPress={() => navigation.navigate('ActionScreen')} /** The goBack method doesn't work as expected on android **/
            />
          ),
        }}
      />
      <ActionStack.Screen name="NewPost" component={NewPost} options={{ headerTitle: 'פוסט חדש' }} />
      <ActionStack.Screen
        name="LocationPage"
        component={LocationPage}
        options={{ headerTitle: 'איפה אתם?', headerBackTitleVisible: false }}
      />
    </ActionStack.Navigator>
  );
}

export default ActionNavigator;
