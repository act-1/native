import { makeAutoObservable, runInAction, toJS } from 'mobx';
import rootStore from './RootStore';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { createCheckIn } from '@services/checkIn';
import { Location, Event } from '@types/collections';

class CheckInStore {
  rootStore: null | rootStore = null;

  pendingCheckIn: CheckIn | undefined = undefined;
  lastCheckIn: CheckIn | undefined = undefined;
  privacySetting: PrivacyOption | undefined = undefined;
  currentLocation: Location | undefined = undefined;
  currentEvent: Event | undefined = undefined;

  constructor(rootStore: rootStore) {
    makeAutoObservable(this, { rootStore: false });
    this.rootStore = rootStore;
  }

  get hasActiveCheckIn() {
    if (this.activeCheckIn) {
      return new Date() < new Date(this.activeCheckIn.expireAt);
    }
    return false;
  }

  setPendingCheckIn = (checkInInfo: CheckIn) => {
    this.pendingCheckIn = checkInInfo;
  };

  setActiveCheckIn = (checkInInfo: CheckIn) => {
    this.activeCheckIn = checkInInfo;
  };

  setPrivacySetting = (value: PrivacyOption) => {
    this.privacySetting = value;
  };

  async checkIn(checkInData: CheckIn) {
    try {
      const { checkIn } = await createCheckIn(checkInData);
      this.lastCheckIn = checkIn;
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
      this.lastCheckIn = undefined;
    } catch (err) {
      throw err;
    }
  }
}

export default CheckInStore;
