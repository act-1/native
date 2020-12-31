import { makeAutoObservable } from 'mobx';

import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'mobx-persist';

import eventStore from './EventStore';
import userStore from './UserStore';
import feedStore from './FeedStore';

const hydrate = create({
  storage: AsyncStorage,
  jsonify: true,
});

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
      // Hydrate mobx store
      await Promise.all([hydrate('event', this.eventStore), hydrate('user', this.userStore), hydrate('feed', this.feedStore)]);
      await Promise.all([hydrate('user', this.userStore)]);
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
