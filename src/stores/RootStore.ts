import { makeAutoObservable } from 'mobx';

import userStore from './UserStore';
import locationStore from './LocationStore';
import feedStore from './FeedStore';
import eventStore from './EventStore';

class RootStore {
  userStore: userStore;
  locationStore: locationStore;
  eventStore: eventStore;
  feedStore: feedStore;

  constructor() {
    makeAutoObservable(this);
    this.userStore = new userStore(this);
    this.locationStore = new locationStore(this);
    this.eventStore = new eventStore(this);
    this.feedStore = new feedStore(this);
  }

  async initApp() {
    try {
      await this.eventStore.getEvents();
      await this.feedStore.getPosts();
      await this.userStore.refreshFCMToken();
      await this.userStore.getUserEvents();
      return true;
    } catch (err) {
      throw err;
    }
  }
}

export default RootStore;
