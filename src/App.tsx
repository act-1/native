import 'react-native-gesture-handler';
import React from 'react';
import { View, Text } from 'react-native';
import { DefaultTheme, NavigationContainer, RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { ThemeProvider } from '@shopify/restyle';
import theme from './theme';
import AppNavigator from './navigations/AppNavigator';

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

function App() {
  return (
    <ThemeProvider theme={theme}>
      <NavigationContainer theme={{ ...DefaultTheme, colors: { ...DefaultTheme.colors, background: '#fff' } }}>
        <AppNavigator />
      </NavigationContainer>
    </ThemeProvider>
  );
}

export default App;
