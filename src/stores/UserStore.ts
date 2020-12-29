import { makeAutoObservable, runInAction } from 'mobx';
import { PermissionStatus } from 'react-native-permissions';
import auth, { FirebaseAuthTypes } from '@react-native-firebase/auth';
import messaging from '@react-native-firebase/messaging';
import { checkLocationPermission, getCurrentPosition, requestLocationPermission } from '@utils/location-utils';
import rootStore from './RootStore';
import EventsAPI from '../services/events';
import { createAnonymousUser, getUserFCMToken, createUserFCMToken } from '../services/user';

// TODO: Create AuthStore and EventStore

class UserStore {
  rootStore: null | rootStore = null;
  user: FirebaseAuthTypes.User | null = null;
  userEventIds: string[] = [];
  userLocationPermission: PermissionStatus = 'unavailable';
  userCurrentPosition: LatLng | undefined;

  constructor(rootStore: rootStore) {
    makeAutoObservable(this, { rootStore: false });
    this.rootStore = rootStore;
    console.log('hi?');

    this.initUserLocation();

    auth().onAuthStateChanged((user: FirebaseAuthTypes.User | null) => {
      if (user && this.user?.uid !== user.uid) {
        this.user = user;
        this.initAppOnAuth();
      }
    });
  }

  initAppOnAuth() {
    this.rootStore?.eventStore?.getEvents();
    this.rootStore?.feedStore?.getPosts();
    this.refreshFCMToken();
    EventsAPI.getUserEvents(this.user?.uid!).then((events) => {
      runInAction(() => {
        this.userEventIds = events;
      });
    });
  }

  async refreshFCMToken() {
    const FCMToken = await messaging().getToken();
    const userFCMToken = await getUserFCMToken(this.user?.uid!, FCMToken);
    if (userFCMToken.exists) {
      // update token
    } else {
      await createUserFCMToken(this.user?.uid!, FCMToken);
    }
  }

  async signInAnonymously() {
    try {
      const { user } = await auth().signInAnonymously();
      await createAnonymousUser(user.uid);
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
}

export default UserStore;
