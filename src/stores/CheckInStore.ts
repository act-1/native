import { makeAutoObservable, runInAction } from 'mobx';
import rootStore from './RootStore';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { createCheckIn } from '@services/checkIn';
import { getClosestLocation, getRegion } from '@services/locations';
import { Location, Event, CheckIn } from '@types/collections';

class CheckInStore {
  rootStore: null | rootStore = null;
  currentCheckIn: CheckIn | undefined = undefined;

  constructor(rootStore: rootStore) {
    makeAutoObservable(this, { rootStore: false });
    this.rootStore = rootStore;
  }

  async isRiotAround() {
    // Check if there's an active check in.
    try {
      const checkIn = await this.loadCachedCheckIn();

      if (checkIn === null) {
        const location = await getClosestLocation([31.773581, 35.21508]);

        if (location) {
          // Set expiration time to 1.5 hour from now
          // If the user open the app after 1.5 hour, we check if the location is still active and check them in again.
          const expireAt = new Date();
          expireAt.setMinutes(expireAt.getMinutes() + 90);

          const fcmToken = this.rootStore?.userStore.FCMToken!;
          const checkInParams = {
            id: this.rootStore?.userStore.user?.uid,
            locationId: location.id,
            locationName: location.name,
            locationCity: location.city,
            locationRegion: location.region,
            coordinates: location.coordinates,
            fcmToken,
            expireAt,
          } as CheckIn;

          // Check if the location has an ongoing event
          const event = this.rootStore?.eventStore.liveEvents.find((event) => event.locationId === location.id);
          if (event) {
            checkInParams.eventId = event.id;
          }

          await createCheckIn(checkInParams);
          console.log('params: ', checkInParams);

          runInAction(() => {
            this.currentCheckIn = checkInParams;
          });

          await AsyncStorage.setItem('lastCheckIn', JSON.stringify(checkInParams));
        }
      }
    } catch (err) {
      console.error(err);
      throw err;
    }
  }

  async loadCachedCheckIn() {
    try {
      // await AsyncStorage.clear();
      const cachedCheckIn = await AsyncStorage.getItem('lastCheckIn');

      if (cachedCheckIn) {
        const checkIn = JSON.parse(cachedCheckIn);
        // Check if the check in is active
        if (new Date() < new Date(checkIn.expireAt)) {
          runInAction(() => {
            this.currentCheckIn = checkIn;
          });
          return checkIn;
        } else {
          // Check in has expired
          AsyncStorage.removeItem('lastCheckIn');
          return null;
        }
      } else {
        return null;
      }
    } catch (err) {
      console.error(err);
      throw err;
    }
  }
}

export default CheckInStore;
