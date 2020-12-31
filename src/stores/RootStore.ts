import { makeAutoObservable } from 'mobx';

import eventStore from './EventStore';
import userStore from './UserStore';
import feedStore from './FeedStore';

class RootStore {
  eventStore: eventStore;
  feedStore: feedStore;
  userStore: userStore;

  constructor() {
    makeAutoObservable(this);
    this.eventStore = new eventStore(this);
    this.feedStore = new feedStore(this);
    this.userStore = new userStore(this);
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
