import { makeAutoObservable, runInAction } from 'mobx';
import { Platform } from 'react-native';
import { check, PERMISSIONS, request, PermissionStatus } from 'react-native-permissions';
import Geolocation from 'react-native-geolocation-service';
import auth, { FirebaseAuthTypes } from '@react-native-firebase/auth';
import { checkLocationPermission, getCurrentPosition } from '@utils/location-utils';
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
      if (Platform.OS === 'ios') {
        const status = await Geolocation.requestAuthorization('whenInUse');
        console.log('iOS Location Permission: ', status);

        if (['granted', 'restricted'].includes(status) !== true) {
        }
      }

      Geolocation.getCurrentPosition(
        (position) => {
          console.log(position);
        },
        (err) => {
          console.error(err);
        }
      );
    } catch (err) {
      console.error(err);
    }
  }
}

export default UserStore;
