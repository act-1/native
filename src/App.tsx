import 'react-native-gesture-handler';
import React, { useEffect } from 'react';
import analytics from '@react-native-firebase/analytics';
import inAppMessaging from '@react-native-firebase/in-app-messaging';
import { observer } from 'mobx-react-lite';
import { useStore } from './stores';
import { DefaultTheme, NavigationContainer } from '@react-navigation/native';
import { ThemeProvider } from '@shopify/restyle';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { ActionSheetProvider } from '@expo/react-native-action-sheet';
import theme from './theme';
import { Notification as BannerNotification } from 'react-native-in-app-message';
import UploadBanner from '@components/UploadBanner';
import AppNavigator from './navigations/AppNavigator';
import RNBootSplash from 'react-native-bootsplash';

function App() {
  const routeNameRef = React.useRef();
  const navigationRef = React.useRef();
  const notificationRef = React.useRef<BannerNotification>(null);
  const store = useStore();

  useEffect(() => {
    const initApp = async () => {
      try {
        await inAppMessaging().setMessagesDisplaySuppressed(true);
        await store.initApp();
        await RNBootSplash.hide({ fade: true });
        inAppMessaging().setMessagesDisplaySuppressed(false);
      } catch (err) {
        // TODO: Log to crashlytics
        console.error(err);
      }
    };

    // Initalize data if the user authenticated.
    // Otherwise, hide the splash screen to show the onboarding screen.
    if (store.userStore.user && !store.intializedApp) {
      initApp();
    } else {
      RNBootSplash.hide({ fade: true });
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [store.userStore.user]);

  notificationRef.current?.show();

  return (
    <SafeAreaProvider>
      <ThemeProvider theme={theme}>
        <ActionSheetProvider>
          <NavigationContainer
            ref={navigationRef}
            theme={{ ...DefaultTheme, colors: { ...DefaultTheme.colors, background: '#0B0D0F' } }}
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
            <BannerNotification
              customComponent={<UploadBanner />}
              ref={notificationRef}
              showKnob={false}
              blurType="light"
              autohide={false}
              useForceTouch={true}
            />
            <AppNavigator />
          </NavigationContainer>
        </ActionSheetProvider>
      </ThemeProvider>
    </SafeAreaProvider>
  );
}

export default observer(App);
