import { makeAutoObservable, runInAction } from 'mobx';
import { PermissionStatus } from 'react-native-permissions';
import auth, { FirebaseAuthTypes } from '@react-native-firebase/auth';
import { checkLocationPermission, getCurrentPosition, requestLocationPermission } from '@utils/location-utils';
import rootStore from './RootStore';
import EventsAPI from '../api/events';
import { createAnonymousUser } from '../api/user';

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

    this.initUserLocation();

    auth().onAuthStateChanged((user: FirebaseAuthTypes.User | null) => {
      if (user) {
        this.user = user;
        rootStore.eventStore?.getEvents(); // Only authed users can fetch the event list
        EventsAPI.getUserEvents(user.uid).then((events) => {
          runInAction(() => {
            this.userEventIds = events;
          });
        });
      } else this.signInAnonymously();
    });
  }

  async signInAnonymously() {
    try {
      const { user } = await auth().signInAnonymously();
      await createAnonymousUser(user.uid);
    } catch (err) {
      console.error(err);
    }
  }

  async initUserLocation() {
    try {
      const permission = await checkLocationPermission();
      this.userLocationPermission = permission;

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
