import { makeAutoObservable, runInAction } from 'mobx';
import { PermissionStatus } from 'react-native-permissions';
import auth, { FirebaseAuthTypes } from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import analytics from '@react-native-firebase/analytics';
import crashlytics from '@react-native-firebase/crashlytics';
import messaging from '@react-native-firebase/messaging';
import { checkLocationPermission, getCurrentPosition, requestLocationPermission } from '@utils/location-utils';
import EventsAPI from '@services/events';
import { getUserFCMToken, createUserFCMToken } from '@services/user';
import { createCheckIn } from '@services/checkIn';
import rootStore from './RootStore';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { FirebaseFirestoreTypes } from '@react-native-firebase/firestore';

let userDataListenerActive = false;

class UserStore {
  rootStore: null | rootStore = null;
  userEventIds: string[] = [];
  userLocationPermission: PermissionStatus = 'unavailable';
  userCurrentPosition: LatLng | undefined;
  lastCheckIn: CheckInParams | null = null;
  userData: FirebaseFirestoreTypes.DocumentData | null = null;
  initializedUser = false;

  constructor(rootStore: rootStore) {
    makeAutoObservable(this, { rootStore: false });
    this.rootStore = rootStore;
    this.initUserLocation();

    auth().onAuthStateChanged((user: FirebaseAuthTypes.User | null) => {
      if (user?.uid) {
        if (userDataListenerActive === false) {
          userDataListenerActive = true;
          this.userDataListener(user.uid);
        }

        crashlytics().setUserId(user.uid);

        // TODO: Extract to function
        runInAction(async () => {
          // await AsyncStorage.clear();
          const checkIn = await AsyncStorage.getItem('lastCheckIn');
          if (checkIn) {
            const lastCheckIn = JSON.parse(checkIn);
            this.lastCheckIn = lastCheckIn;
          }
        });
      }

      // If no user is logged in, mark the user initalization process as done.
      if (user === null) {
        runInAction(() => {
          this.initializedUser = true;
        });
      }
    });
  }

  get user() {
    return auth().currentUser;
  }

  get hasActiveCheckIn() {
    if (this.lastCheckIn !== null) {
      return new Date() < new Date(this.lastCheckIn.expireAt);
    }
    return false;
  }

  userDataListener(userId: string) {
    firestore()
      .collection('users')
      .doc(userId)
      .onSnapshot(
        (doc) => {
          if (this.initializedUser === false) {
            runInAction(() => {
              this.initializedUser = true;
            });
          }

          if (doc === null) {
            runInAction(() => {
              this.userData = null;
            });
            return;
          }

          runInAction(() => {
            this.userData = doc.data()!;
            this.initializedUser = true;
          });
        },
        (err: any) => {
          console.error('User Data Listener:, ', err.code);
        }
      );
  }

  signOut() {
    auth().signOut();
    this.userData = null;
    userDataListenerActive = false;
  }

  async getUserEvents() {
    try {
      const userId = auth().currentUser?.uid;

      if (!userId) {
        throw new Error('Not authenticated.');
      }

      const events = await EventsAPI.getUserEvents(userId);
      runInAction(() => {
        this.userEventIds = events;
      });
      return events;
    } catch (err) {
      console.error('Get user events: ', err);
      throw err;
    }
  }

  async refreshFCMToken() {
    try {
      const userId = auth().currentUser?.uid;

      if (!userId) {
        throw new Error('Not authenticated.');
      }

      const FCMToken = await messaging().getToken();

      const userFCMToken = await getUserFCMToken(userId, FCMToken);
      console.log(userFCMToken.exists);
      if (userFCMToken.exists) {
        // In the future we might want to update the active state.
        return userFCMToken;
      } else {
        const token = await createUserFCMToken(userId, FCMToken);
        console.log('to', token);
        return token;
      }
    } catch (err) {
      console.log(err);
      console.error('Refresh FCM Token: ', err);
      crashlytics().recordError(err);
    }
  }

  // Updates the location permission status and return the result.
  async updateLocationPermission() {
    const permission = await checkLocationPermission();
    analytics().logEvent(`user_permission_location_${permission}`);

    runInAction(() => {
      this.userLocationPermission = permission;
    });
    return permission;
  }

  async initUserLocation() {
    try {
      const permission = await this.updateLocationPermission();

      if (permission === 'granted') {
        const coordinates = await getCurrentPosition();
        runInAction(() => {
          this.userCurrentPosition = [...coordinates];
        });
      }
    } catch (err) {
      console.error(err);
      throw err;
    }
  }

  async getUserCoordinates() {
    try {
      analytics().logEvent('user_permission_location_request');
      const permission = await requestLocationPermission();

      let coordinates: LatLng | undefined;

      if (permission === 'granted') {
        coordinates = await getCurrentPosition();
        runInAction(() => {
          this.userCurrentPosition = coordinates;
        });
      }

      analytics().logEvent(`user_permission_location_${permission}`);
      runInAction(() => {
        this.userLocationPermission = permission;
      });
      return coordinates;
    } catch (err) {
      throw err;
    }
  }

  async checkIn(checkInData: CheckInParams) {
    try {
      const { checkIn } = await createCheckIn(checkInData);
      this.lastCheckIn = checkIn;
      await AsyncStorage.setItem('lastCheckIn', JSON.stringify(checkIn));
      return null;
    } catch (err) {
      console.error(err);
      throw err;
    }
  }

  async deleteLastCheckIn() {
    try {
      await AsyncStorage.removeItem('lastCheckIn');
      this.lastCheckIn = null;
    } catch (err) {
      throw err;
    }
  }
}

export default UserStore;
