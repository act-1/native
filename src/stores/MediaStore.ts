import { makeAutoObservable, runInAction } from 'mobx';
import rootStore from './RootStore';
import { Post, PicturePost } from '@types/collections';
import { FirebaseFirestoreTypes } from '@react-native-firebase/firestore';
import FeedService from '@services/feed';
import { updateArrayByObjectId } from '@utils/array-utils';

class MediaStore {
  rootStore: null | rootStore = null;
  currentFilter: 'featured' | 'recent' = 'featured';
  featuredPictures: Post[] = [];
  recentPictures: FirebaseFirestoreTypes.DocumentData[] = [];

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

  async getRecentPictures({ limit, startAfter }: { limit: number; startAfter?: FirebaseFirestoreTypes.DocumentData }) {
    try {
      const recentPictures = await FeedService.getRecentPictures({ limit, startAfter });

      runInAction(() => {
        this.recentPictures = recentPictures;
      });
    } catch (err) {
      console.error(err);
    }
  }

  async addRecentPicture(picturePost: FirebaseFirestoreTypes.DocumentData) {
    this.recentPictures = [picturePost, ...this.recentPictures];
  }
}

export default MediaStore;
