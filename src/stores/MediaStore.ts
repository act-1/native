import { makeAutoObservable, runInAction, toJS } from 'mobx';
import rootStore from './RootStore';
import { Post, PicturePost } from '@types/collections';
import { FirebaseFirestoreTypes } from '@react-native-firebase/firestore';
import FeedService from '@services/feed';
import { updateArrayByObjectId } from '@utils/array-utils';
import RecentPictures from '@screens/Community/RecentPictures';

class MediaStore {
  rootStore: null | rootStore = null;
  currentFilter: 'featured' | 'recent' = 'featured';
  featuredPictures: Post[] = [];

  recentPictures: FirebaseFirestoreTypes.DocumentData[] = [];
  recentPicturesLoading = false;
  recentPicturesEnd = false;

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
    this.recentPicturesLoading = true;

    try {
      const fetchedPictures = await FeedService.getRecentPictures({ limit, startAfter });

      if (fetchedPictures.length === 0) {
        runInAction(() => {
          this.recentPicturesEnd = true;
          this.recentPicturesLoading = false;
        });
        return;
      }

      runInAction(() => {
        this.recentPictures = [...this.recentPictures, ...fetchedPictures];
        this.recentPicturesLoading = false;
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
