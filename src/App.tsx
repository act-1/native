import 'react-native-gesture-handler';
import React from 'react';
import { View, Text } from 'react-native';
import { NavigationContainer, RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { ThemeProvider } from '@shopify/restyle';
import theme from './theme';
import Icon from 'react-native-vector-icons/Feather';
import { Events } from './screens';
type RootStackParamList = {
  Home: undefined;
};

type HomeRouteProps = RouteProp<RootStackParamList, 'Home'>;
type HomeScreenProps = StackNavigationProp<RootStackParamList, 'Home'>;
type HomeProps = {
  route: HomeRouteProps;
  navigation: HomeScreenProps;
};

function HomeScreen() {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Home Screen</Text>
    </View>
  );
}

const Tab = createBottomTabNavigator();

function App() {
  return (
    <ThemeProvider theme={theme}>
      <NavigationContainer>
        <Tab.Navigator
          screenOptions={({ route }) => ({
            tabBarIcon: ({ focused, color, size }) => {
              let iconName;

              switch (route.name) {
                case 'Events':
                  iconName = 'calendar';
                  break;

                case 'Map':
                  iconName = 'map';
                  break;

                case 'CheckIn':
                  iconName = 'map-pin';
                  break;

                case 'Inbox':
                  iconName = 'inbox';
                  break;
                case 'Profile':
                  iconName = 'user';
                  break;
              }

              if (focused) {
              }

              return <Icon name={iconName} size={size} color={color} />;
            },
          })}
          tabBarOptions={{
            activeTintColor: '#6E7DFF',
            inactiveTintColor: 'gray',
            showLabel: false,
          }}
        >
          <Tab.Screen name="Map" component={HomeScreen} options={{ title: 'מפה' }} />
          <Tab.Screen name="Events" component={Events} />
          <Tab.Screen name="CheckIn" component={HomeScreen} />
          <Tab.Screen name="Inbox" component={HomeScreen} />
          <Tab.Screen name="Profile" component={HomeScreen} />
        </Tab.Navigator>
      </NavigationContainer>
    </ThemeProvider>
  );
}

export default App;
