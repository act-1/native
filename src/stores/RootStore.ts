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

  seenBetaModal = 'false';

  constructor() {
    makeAutoObservable(this);
    this.userStore = new userStore(this);
    this.locationStore = new locationStore(this);
    this.eventStore = new eventStore(this);
    this.feedStore = new feedStore(this);
    this.displayBetaModal();
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

  async displayBetaModal() {
    const seen = await AsyncStorage.getItem('seenBetaModal');
    if (seen) {
      runInAction(() => {
        this.seenBetaModal = seen;
      });
    }
  }
}

export default RootStore;
