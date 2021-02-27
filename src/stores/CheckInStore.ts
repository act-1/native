import { makeAutoObservable, runInAction, toJS } from 'mobx';
import { check } from 'react-native-permissions';
import rootStore from './RootStore';

class CheckInStore {
  rootStore: null | rootStore = null;

  pendingCheckIn
  activeCheckIn 
  currentLocation
  currentEvent

  constructor(rootStore: rootStore) {
    makeAutoObservable(this, { rootStore: false });
    this.rootStore = rootStore;
  }
  
  get hasActiveCheckIn() {
    if (this.activeCheckIn !== null) {
      return new Date() < new Date(this.activeCheckIn.expireAt);
    }
    return false;
  }

  setPendingCheckIn = (checkInInfo: CheckIn) => {
    this.pendingCheckIn = checkInInfo;
  }

  setActiveCheckIn = (checkInInfo: CheckIn) => {
    this.activeCheckIn = checkInInfo;
  }
=
}

export default CheckInStore;
