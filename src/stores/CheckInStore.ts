import { makeAutoObservable } from 'mobx';
import rootStore from './RootStore';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { createCheckIn } from '@services/checkIn';
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

  setCurrentLocation = (location: Location) => {
    this.currentLocation = location;
  };

  setCurrentEvent = (event: Event) => {
    this.currentEvent = event;
  };

  setPrivacySetting = (value: PrivacyOption) => {
    this.privacySetting = value;
  };

  async checkIn() {
    try {
      const { checkIn } = await createCheckIn(this.pendingCheckIn);

      this.setLastCheckIn(checkIn);

      await AsyncStorage.setItem('lastCheckIn', JSON.stringify(checkIn));
      return checkIn;
    } catch (err) {
      console.error(err);
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
