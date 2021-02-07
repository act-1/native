import { makeAutoObservable, runInAction } from 'mobx';
import AsyncStorage from '@react-native-async-storage/async-storage';

import userStore from './UserStore';
import locationStore from './LocationStore';
import feedStore from './FeedStore';
import eventStore from './EventStore';
import mediaStore from './mediaStore';

class RootStore {
  userStore: userStore;
  locationStore: locationStore;
  eventStore: eventStore;
  feedStore: feedStore;
  mediaStore: mediaStore;

  intializedApp = false;

  constructor() {
    makeAutoObservable(this);
    this.userStore = new userStore(this);
    this.locationStore = new locationStore(this);
    this.eventStore = new eventStore(this);
    this.feedStore = new feedStore(this);
    this.mediaStore = new mediaStore(this);
  }

  // Initalization of the app during splash screen
  async initApp() {
    try {
      await Promise.all([await this.userStore.refreshFCMToken(), await this.mediaStore.getFeaturedPictures()]);

      // The following fetches won't hold the splash screen hide
      this.eventStore.getEvents();
      this.userStore.getUserEvents();
      this.feedStore.getPosts();

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
