import { makeAutoObservable, runInAction } from 'mobx';
import rootStore from './RootStore';
import { IPicturePost } from '@types/post';
import FeedService from '@services/feed';

class FeedStore {
  rootStore: null | rootStore = null;
  pictures: IPicturePost[] = [];

  constructor(rootStore: rootStore) {
    makeAutoObservable(this, { rootStore: false });
    this.rootStore = rootStore;
    this.getRecentPictures();
  }

  async getRecentPictures() {
    try {
      const recentPictures = await FeedService.getRecentPictures();
      this.pictures = recentPictures;
    } catch (err) {
      console.error(err);
    }
  }
}

export default FeedStore;
