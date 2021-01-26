import React from 'react';
import { Platform } from 'react-native';
import { Box, Text } from '../components';
import { createStackNavigator } from '@react-navigation/stack';
import ActionScreen from '@screens/Action';
import { SelectLocation, LocationPage } from '@screens/LocationPage';
import NewPost from '@screens/NewPost';
import Icon from 'react-native-vector-icons/Feather';
import { TouchableOpacity } from 'react-native-gesture-handler';

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
        headerBackImage: () => (
          <Icon
            name={'arrow-right'}
            size={28}
            color={'#fff'}
            style={{ marginLeft: Platform.OS === 'ios' ? 8 : -4, marginBottom: Platform.OS === 'ios' ? 8 : 0 }}
            onPress={() => navigation.navigate('ActionScreen')} /** The goBack method doesn't work as expected on android **/
          />
        ),
      }}
    >
      <ActionStack.Screen name="ActionScreen" component={ActionScreen} options={{ headerTitle: 'יוצאים להפגין' }} />
      <ActionStack.Screen
        name="SelectLocation"
        component={SelectLocation}
        options={{
          headerTitle: 'איפה אתם?',
          headerBackTitleVisible: false,
        }}
      />
      <ActionStack.Screen
        name="NewPost"
        component={NewPost}
        options={{
          headerTitle: '',
          headerRightContainerStyle: { marginRight: 12 },
          headerBackTitleVisible: false,
        }}
      />
      <ActionStack.Screen name="LocationPage" component={LocationPage} options={{ headerBackTitleVisible: false }} />
    </ActionStack.Navigator>
  );
}

export default ActionNavigator;
