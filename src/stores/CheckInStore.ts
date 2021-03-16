import { makeAutoObservable, runInAction } from 'mobx';
import rootStore from './RootStore';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { createCheckIn } from '@services/checkIn';
import { getRegion } from '@services/locations';
import { Location, Event } from '@types/collections';

class CheckInStore {
  rootStore: null | rootStore = null;
  currentCheckIn: CheckIn | undefined = undefined;

  constructor(rootStore: rootStore) {
    makeAutoObservable(this, { rootStore: false });
    this.rootStore = rootStore;
  }

  async isRiotAround() {
    // Check if there's an active check in.
    const checkIn = this.loadCachedCheckIn();

    if (checkIn === null) {
      const region = await getRegion([31.773581, 35.21508]);

      if (region) {
        if (region.isActive) {
          const expireAt = region.expireAt.toDate();
          const fcmToken = this.rootStore?.userStore.FCMToken!;

          const checkIn = createCheckIn(region.name, expireAt, fcmToken);

          if (checkIn) {
            await AsyncStorage.setItem('lastCheckIn', JSON.stringify({ region, expireAt }));
          }
        }
      }
    }
  }

  async loadCachedCheckIn() {
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
  }
}

export default CheckInStore;
