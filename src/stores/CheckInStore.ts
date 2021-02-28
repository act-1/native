import { makeAutoObservable, runInAction, toJS } from 'mobx';
import rootStore from './RootStore';
import { Location, Event } from '@types/collections';

class CheckInStore {
  rootStore: null | rootStore = null;

  pendingCheckIn: CheckIn | undefined = undefined;
  activeCheckIn: CheckIn | undefined = undefined;
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
}

export default CheckInStore;
