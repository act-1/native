import 'react-native-gesture-handler';
import React, { useEffect } from 'react';
import analytics from '@react-native-firebase/analytics';
import { observer } from 'mobx-react-lite';
import { useStore } from './stores';
import { Easing } from 'react-native';
import { DefaultTheme, NavigationContainer } from '@react-navigation/native';
import { ThemeProvider } from '@shopify/restyle';
import { ModalProvider, createModalStack, ModalOptions } from 'react-native-modalfy';
import { AttendingModal } from './components/Modals';
import theme from './theme';
import AppNavigator from './navigations/AppNavigator';
import RNBootSplash from 'react-native-bootsplash';

const modalConfig = { AttendingModal };
const defaultOptions: ModalOptions = {
  backdropOpacity: 0.6,
  animateInConfig: { easing: Easing.exp, duration: 0 }, // No effect
  animateOutConfig: { easing: Easing.exp, duration: 0 }, // No effect
};

const stack = createModalStack(modalConfig, defaultOptions);

function App() {
  const routeNameRef = React.useRef();
  const navigationRef = React.useRef();
  const store = useStore();

  useEffect(() => {
    const initApp = async () => {
      try {
        await store.initApp();
        await RNBootSplash.hide({ fade: true });
      } catch (err) {
        // TODO: Log to crashlytics
        console.error(err);
      }
    };

    if (store.userStore.user?.uid) {
      initApp();
    }
  }, [store.userStore.user]);

  return (
    <ThemeProvider theme={theme}>
      <ModalProvider stack={stack}>
        <NavigationContainer
          ref={navigationRef}
          theme={{ ...DefaultTheme, colors: { ...DefaultTheme.colors, background: '#fff' } }}
          onReady={() => (routeNameRef.current = navigationRef.current.getCurrentRoute().name)}
          onStateChange={async () => {
            const previousRouteName = routeNameRef.current;
            const currentRouteName = navigationRef.current.getCurrentRoute().name;

            if (previousRouteName !== currentRouteName) {
              await analytics().logScreenView({
                screen_name: currentRouteName,
                screen_class: currentRouteName,
              });
            }

            // Save the current route name for later comparision
            routeNameRef.current = currentRouteName;
          }}
        >
          <AppNavigator />
        </NavigationContainer>
      </ModalProvider>
    </ThemeProvider>
  );
}

export default observer(App);
