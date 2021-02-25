import { firebase, FirebaseAnalyticsTypes } from '@react-native-firebase/analytics';

class Analytics {
  appAnalytics: FirebaseAnalyticsTypes.Module;

  constructor() {
    this.appAnalytics = firebase.analytics();
  }

  logEvent = (name: string, params?: { [key: string]: any }): Promise<void> => {
    return this.appAnalytics.logEvent(name, params);
  };
}

const appAnalytics = new Analytics();

export default appAnalytics;

export const logEvent = appAnalytics.logEvent;
