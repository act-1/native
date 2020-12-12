import 'react-native-gesture-handler';
import React from 'react';
import { Easing } from 'react-native';
import { StoreProvider } from './stores';
import { DefaultTheme, NavigationContainer } from '@react-navigation/native';
import { ThemeProvider } from '@shopify/restyle';
import { ModalProvider, createModalStack, ModalOptions } from 'react-native-modalfy';
import { AttendingModal } from './components/Modals';
import theme from './theme';
import AppNavigator from './navigations/AppNavigator';

const modalConfig = { AttendingModal };
const defaultOptions: ModalOptions = {
  backdropOpacity: 0.6,
  animateInConfig: { easing: Easing.exp, duration: 0 }, // No effect
  animateOutConfig: { easing: Easing.exp, duration: 0 }, // No effect
};

const stack = createModalStack(modalConfig, defaultOptions);

function App() {
  return (
    <StoreProvider>
      <ThemeProvider theme={theme}>
        <ModalProvider stack={stack}>
          <NavigationContainer theme={{ ...DefaultTheme, colors: { ...DefaultTheme.colors, background: '#fff' } }}>
            <AppNavigator />
          </NavigationContainer>
        </ModalProvider>
      </ThemeProvider>
    </StoreProvider>
  );
}

export default App;
