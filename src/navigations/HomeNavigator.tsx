import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { Home, EventList, EventPage } from '../screens';
import { RootStackParamList } from '../types/navigation';
import EventsNavigator from '../navigations/EventsNavigator';
import Icon from 'react-native-vector-icons/Feather';

const HomeStack = createStackNavigator<RootStackParamList>();

function HomeNavigator() {
  return (
    <HomeStack.Navigator screenOptions={{ headerShown: false }}>
      <HomeStack.Screen name="Home" component={Home} />
      <HomeStack.Screen name="EventList" options={{ title: 'הפגנות קרובות' }} component={EventList} />
      <HomeStack.Screen
        name="EventPage"
        component={EventPage}
        options={({ navigation }) => ({
          headerShown: false,
          headerTitle: 'עמוד הפגנה',
          headerBackTitle: ' ',
          headerStyle: {
            backgroundColor: '#697CFF',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
          headerLeft: () => (
            <Icon name={'arrow-right'} size={28} color={'#fff'} style={{ marginLeft: 15 }} onPress={() => navigation.goBack()} />
          ),
        })}
      />
    </HomeStack.Navigator>
  );
}

export default HomeNavigator;
