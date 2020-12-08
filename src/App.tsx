import 'react-native-gesture-handler';
import React from 'react';
import { DefaultTheme, NavigationContainer } from '@react-navigation/native';
import { ThemeProvider } from '@shopify/restyle';
import theme from './theme';
import AppNavigator from './navigations/AppNavigator';

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
