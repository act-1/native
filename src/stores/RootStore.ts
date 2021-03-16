import { makeAutoObservable } from 'mobx';

import userStore from './UserStore';
import feedStore from './FeedStore';
import eventStore from './EventStore';
import mediaStore from './MediaStore';
import chatStore from './ChatStore';
import checkInStore from './CheckInStore';
import liveStore from './LiveStore';

class RootStore {
  userStore: userStore;
  eventStore: eventStore;
  feedStore: feedStore;
  mediaStore: mediaStore;
  chatStore: chatStore;
  checkInStore: checkInStore;
  liveStore: liveStore;

  constructor() {
    makeAutoObservable(this);
    this.userStore = new userStore(this);
    this.eventStore = new eventStore(this);
    this.feedStore = new feedStore(this);
    this.mediaStore = new mediaStore(this);
    this.chatStore = new chatStore(this);
    this.checkInStore = new checkInStore(this);
    this.liveStore = new liveStore(this);
  }

  // Initalization of the app during splash screen
  async initApp() {
    try {
      this.mediaStore.getHomeScreenPictures();
      this.checkInStore.getCurrentRegion();
      this.eventStore.getEvents().then(({ liveEvents }) => {
        this.liveStore.getLiveProtestersPictures(liveEvents);
      });
      this.liveStore.setLiveListeners();
      this.userStore.getUserEvents();
      this.userStore.refreshFCMToken();
      this.feedStore.getUserLikes();

      return true;
    } catch (err) {
      console.error(err);
      throw err;
    }
  }
}

export default RootStore;
