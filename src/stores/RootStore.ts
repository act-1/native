import { makeAutoObservable } from 'mobx';
import eventStore from './EventStore';
import userStore from './UserStore';
import feedStore from './FeedStore';

// TODO: Create AuthStore and EventStore

class RootStore {
  eventStore: null | eventStore = null;
  feedStore: null | feedStore = null;
  userStore: null | userStore = null;

  constructor() {
    makeAutoObservable(this);
    this.eventStore = new eventStore(this);
    this.feedStore = new feedStore(this);
    this.userStore = new userStore(this);
  }
}

export default RootStore;
