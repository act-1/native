import { makeAutoObservable, runInAction } from 'mobx';
import rootStore from './RootStore';
import { IPicturePost } from '@types/post';
import FeedService from '@services/feed';

class FeedStore {
  rootStore: null | rootStore = null;
  currentFilter: 'featured' | 'recent' = 'featured';
  featuredPictures: IPicturePost[] = [];
  recentPictures: IPicturePost[] = [];

  constructor(rootStore: rootStore) {
    makeAutoObservable(this, { rootStore: false });
    this.rootStore = rootStore;
  }

  setCurrentFilter = (filter: 'featured' | 'recent') => {
    this.currentFilter = filter;
  };

  async getFeaturedPictures() {
    try {
      const featuredPictures = await FeedService.getFeaturedPictures();

      runInAction(() => {
        this.featuredPictures = featuredPictures;
      });
    } catch (err) {
      console.error(err);
    }
  }

  async getRecentPictures() {
    try {
      const recentPictures = await FeedService.getRecentPictures();

      runInAction(() => {
        this.recentPictures = recentPictures;
      });
    } catch (err) {
      console.error(err);
    }
  }

  async addRecentPicture(picturePost: IPicturePost) {
    this.recentPictures = [picturePost, ...this.recentPictures];
  }
}

export default FeedStore;
