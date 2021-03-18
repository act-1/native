import 'react-native-gesture-handler';
import React, { useEffect } from 'react';
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

let initalizedApp = false;

function App() {
  const navigationRef = React.useRef();
  const notificationRef = React.useRef<BannerNotification>(null);
  const store = useStore();

  useEffect(() => {
    const initApp = async () => {
      try {
        await inAppMessaging().setMessagesDisplaySuppressed(true);
        await store.initApp();

        // Allow enough time for AppNavigation to reflect changes to user properties
        // before hiding the splash screen
        setTimeout(async () => {
          await RNBootSplash.hide({ fade: true });
        }, 1050);

        inAppMessaging().setMessagesDisplaySuppressed(false);
      } catch (err) {
        // TODO: Log to crashlytics
        console.error(err);
      }
    };

    if (initalizedApp) return;

    // User haven't signed up yet
    if (store.userStore.initializedUser && store.userStore.userData === null) {
      RNBootSplash.hide({ fade: true });
      return;
    }

    // User has signed up and completed the sign up process
    if (store.userStore.initializedUser && store.userStore.user !== null && store.userStore.userData?.signupCompleted === true) {
      initalizedApp = true;
      initApp();
    }

    // User signed up but haven't completed the sign up process
    if (store.userStore.initializedUser && store.userStore.user !== null && store.userStore.userData?.signupCompleted === false) {
      RNBootSplash.hide({ fade: true });
    }

    // Initalize data if the user authenticated.
    // Otherwise, hide the splash screen to show the onboarding screen.

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [store.userStore.initializedUser, store.userStore.userData]);

  useEffect(() => {
    if (store.feedStore.uploadStatus === 'in_progress') {
      setTimeout(() => {
        notificationRef.current?.show();
      }, 400);
    }

    if (store.feedStore.uploadStatus === 'done') {
      // Wait for the completion to finish and hide the banner
      setTimeout(() => {
        notificationRef.current?.hide();
      }, 2700);
    }
  }, [store.feedStore.uploadStatus]);

  return (
    <SafeAreaProvider>
      <ThemeProvider theme={theme}>
        <ActionSheetProvider>
          <NavigationContainer
            ref={navigationRef}
            theme={{ ...DefaultTheme, colors: { ...DefaultTheme.colors, background: '#0B0D0F' } }}
          >
            <BannerNotification
              customComponent={<UploadBanner />}
              ref={notificationRef}
              showKnob={false}
              blurType="light"
              autohide={false}
              hideStatusBar={false}
            />
            <AppNavigator />
          </NavigationContainer>
        </ActionSheetProvider>
      </ThemeProvider>
    </SafeAreaProvider>
  );
}

export default observer(App);
