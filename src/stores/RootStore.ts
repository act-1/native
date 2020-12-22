import { makeAutoObservable } from 'mobx';
import eventStore from './EventStore';
import userStore from './UserStore';

// TODO: Create AuthStore and EventStore

class RootStore {
  eventStore: null | eventStore = null;
  userStore: null | userStore = null;

  constructor() {
    makeAutoObservable(this);
    this.eventStore = new eventStore(this);
    this.userStore = new userStore(this);
  }
}

export default RootStore;
