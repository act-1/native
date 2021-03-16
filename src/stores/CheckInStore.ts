import { makeAutoObservable } from 'mobx';
import rootStore from './RootStore';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { createCheckIn } from '@services/checkIn';
import { getRegion } from '@services/locations';
import { Location, Event } from '@types/collections';

class CheckInStore {
  rootStore: null | rootStore = null;
  pendingCheckIn: CheckIn | undefined = undefined;
  lastCheckIn: CheckIn | undefined = undefined;
  privacySetting: PrivacyOption = 'PUBLIC';
  currentLocation: Location | undefined = undefined;
  currentEvent: Event | undefined = undefined;

  constructor(rootStore: rootStore) {
    makeAutoObservable(this, { rootStore: false });
    this.rootStore = rootStore;
    this.loadCachedCheckIn();
  }

  async getCurrentRegion() {
    // run utility function to get the current region
    // if no region is found - don't touch
    // if region is found - check if already checked in in the app cache
    // if it's not in the app cache, check if it's currently active in firestore
    // if it is create a new check in and cache for 3 hours
    getRegion([31.773581, 35.21508]);
  }

  async loadCachedCheckIn() {
    // await AsyncStorage.clear();
    const checkIn = await AsyncStorage.getItem('lastCheckIn');

    // Loads the location
    const checkInLocation = await AsyncStorage.getItem('checkInLocation');
    const checkInEvent = await AsyncStorage.getItem('checkInEvent');

    if (checkIn) {
      const lastCheckIn = JSON.parse(checkIn);
      this.setLastCheckIn(lastCheckIn);

      if (checkInLocation) this.currentLocation = JSON.parse(checkInLocation);
      if (checkInEvent) this.currentEvent = JSON.parse(checkInEvent);
    }
  }

  get hasActiveCheckIn() {
    if (this.lastCheckIn) {
      return new Date() < new Date(this.lastCheckIn.expireAt);
    }
    return false;
  }

  setPendingCheckIn = (checkInInfo: CheckIn) => {
    this.pendingCheckIn = checkInInfo;
  };

  setLastCheckIn = (checkInInfo: CheckIn | undefined) => {
    this.lastCheckIn = checkInInfo;
  };

  async setCurrentLocation(location: Location) {
    this.currentLocation = location;
    await AsyncStorage.setItem('checkInLocation', JSON.stringify(location));
  }

  async setCurrentEvent(event: Event) {
    this.currentEvent = event;
    await AsyncStorage.setItem('checkInEvent', JSON.stringify(event));
  }

  setPrivacySetting = (value: PrivacyOption) => {
    this.privacySetting = value;
  };

  async checkIn(checkInData) {
    try {
      const { checkIn } = await createCheckIn({ ...checkInData, privacySetting: this.privacySetting });

      this.setLastCheckIn(checkIn);

      if (checkIn.eventId) {
        this.rootStore?.chatStore.setCurrentRoomName(checkIn.eventId);
      } else {
        // Reset chat room name if checking to location.
        this.rootStore?.chatStore.setCurrentRoomName(undefined);
      }

      await AsyncStorage.setItem('lastCheckIn', JSON.stringify(checkIn));
      return checkIn;
    } catch (err) {
      console.error('Check in error: ', err);
      throw err;
    }
  }

  async deleteLastCheckIn() {
    try {
      await AsyncStorage.removeItem('lastCheckIn');

      this.setLastCheckIn(undefined);
    } catch (err) {
      throw err;
    }
  }
}

export default CheckInStore;
