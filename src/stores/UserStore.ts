import { makeAutoObservable, runInAction } from 'mobx';
import { PermissionStatus } from 'react-native-permissions';
import auth, { FirebaseAuthTypes } from '@react-native-firebase/auth';
import messaging from '@react-native-firebase/messaging';
import { checkLocationPermission, getCurrentPosition, requestLocationPermission } from '@utils/location-utils';
import EventsAPI from '@services/events';
import { getUserFCMToken, createUserFCMToken } from '@services/user';
import { createUserCheckIn } from '@services/checkIn';
import rootStore from './RootStore';
import AsyncStorage from '@react-native-async-storage/async-storage';

class UserStore {
  rootStore: null | rootStore = null;
  user: FirebaseAuthTypes.User | null = null;
  userEventIds: string[] = [];
  userLocationPermission: PermissionStatus = 'unavailable';
  userCurrentPosition: LatLng | undefined;
  lastCheckIn = {};

  constructor(rootStore: rootStore) {
    makeAutoObservable(this, { rootStore: false });
    this.rootStore = rootStore;

    this.initUserLocation();

    auth().onAuthStateChanged((user: FirebaseAuthTypes.User | null) => {
      if (user && this.user?.uid !== user.uid) {
        runInAction(() => {
          this.user = user;
        });

        // TODO: Extract to function
        runInAction(async () => {
          const checkIn = await AsyncStorage.getItem('lastCheckIn');
          if (checkIn) {
            const lastCheckIn = JSON.parse(checkIn);
            await AsyncStorage.clear();

            this.lastCheckIn = lastCheckIn;
          }
        });
      } else if (!user) {
        this.signInAnonymously();
      }
    });
  }

  get hasActiveCheckIn() {
    return new Date() < new Date(this.lastCheckIn.expireAt);
  }

  async getUserEvents() {
    try {
      const events = await EventsAPI.getUserEvents(this.user?.uid!);
      runInAction(() => {
        this.userEventIds = events;
      });
      return events;
    } catch (err) {
      throw err;
    }
  }

  async refreshFCMToken() {
    try {
      const FCMToken = await messaging().getToken();
      const userFCMToken = await getUserFCMToken(this.user?.uid!, FCMToken);
      if (userFCMToken.exists) {
        // In the future we might want to update the active state.
        return userFCMToken;
      } else {
        const token = await createUserFCMToken(this.user?.uid!, FCMToken);
        return token;
      }
    } catch (err) {
      console.log(err);
    }
  }

  async signInAnonymously() {
    try {
      await auth().signInAnonymously();
    } catch (err) {
      console.error(err);
    }
  }

  // Updates the location permission status and return the result.
  async updateLocationPermission() {
    const permission = await checkLocationPermission();
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
        this.userCurrentPosition = coordinates;
      }
    } catch (err) {
      console.log(err);
    }
  }

  async getUserCoordinates() {
    try {
      const permission = await requestLocationPermission();

      if (permission === 'granted') {
        const coordinates = await getCurrentPosition();
        runInAction(() => {
          this.userCurrentPosition = coordinates;
        });
      }

      runInAction(() => {
        this.userLocationPermission = permission;
      });
    } catch (err) {
      console.error(err);
    }
  }

  async checkIn(locationId: string) {
    try {
      const { checkIn } = await createUserCheckIn(locationId);
      this.lastCheckIn = checkIn;
      await AsyncStorage.setItem('lastCheckIn', JSON.stringify(checkIn));
      return checkIn;
    } catch (err) {
      throw err;
    }
  }
}

export default UserStore;
