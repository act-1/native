import { makeAutoObservable, runInAction } from 'mobx';
import AsyncStorage from '@react-native-async-storage/async-storage';

import userStore from './UserStore';
import locationStore from './LocationStore';
import feedStore from './FeedStore';
import eventStore from './EventStore';

class RootStore {
  userStore: userStore;
  locationStore: locationStore;
  eventStore: eventStore;
  feedStore: feedStore;

  intializedApp = false;

  constructor() {
    makeAutoObservable(this);
    this.userStore = new userStore(this);
    this.locationStore = new locationStore(this);
    this.eventStore = new eventStore(this);
    this.feedStore = new feedStore(this);
  }

  async initApp() {
    try {
      await Promise.all([
        await this.eventStore.getEvents(),
        await this.feedStore.getPosts(),
        await this.userStore.refreshFCMToken(),
        await this.userStore.getUserEvents(),
      ]);

      runInAction(() => {
        this.intializedApp = true;
      });

      return true;
    } catch (err) {
      console.error(err);
      throw err;
    }
  }
}

export default RootStore;
