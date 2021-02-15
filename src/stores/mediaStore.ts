import { makeAutoObservable, runInAction } from 'mobx';
import rootStore from './RootStore';
import { Post, PicturePost } from '@types/collections';
import FeedService from '@services/feed';

class MediaStore {
  rootStore: null | rootStore = null;
  currentFilter: 'featured' | 'recent' = 'featured';
  featuredPictures: Post[] = [];
  recentPictures: Post[] = [];

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

  async addRecentPicture(picturePost: PicturePost) {
    this.recentPictures = [picturePost, ...this.recentPictures];
  }
}

export default MediaStore;
