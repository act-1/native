import { makeAutoObservable, runInAction } from 'mobx';
import rootStore from './RootStore';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { createCheckIn } from '@services/checkIn';
import { getRegion } from '@services/locations';
import { Location, Event } from '@types/collections';

class CheckInStore {
  rootStore: null | rootStore = null;
  currentCheckIn: CheckInParams | undefined = undefined;

  constructor(rootStore: rootStore) {
    makeAutoObservable(this, { rootStore: false });
    this.rootStore = rootStore;
  }

  async isRiotAround() {
    // Check if there's an active check in.
    try {
      const checkIn = await this.loadCachedCheckIn();

      if (checkIn === null) {
        const region = await getRegion([31.773581, 35.21508]);

        if (region) {
          if (region.isActive) {
            // Set expiration time to 1 hour from now
            // If the user open the app after 1 hour, we check if the region is still active and check them in again.
            const expireAt = new Date();
            expireAt.setMinutes(expireAt.getMinutes() + 60);

            const fcmToken = this.rootStore?.userStore.FCMToken!;
            const checkInParams = { expireAt, region: region.id, fcmToken };

            await createCheckIn(checkInParams);

            runInAction(() => {
              this.currentCheckIn = checkInParams;
            });

            await AsyncStorage.setItem('lastCheckIn', JSON.stringify(checkInParams));
          }
        }
      }
    } catch (err) {
      console.error(err);
      throw err;
    }
  }

  async loadCachedCheckIn() {
    try {
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
