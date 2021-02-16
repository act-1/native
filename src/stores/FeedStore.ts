import { makeAutoObservable, runInAction } from 'mobx';
import auth from '@react-native-firebase/auth';
import { likePost, unlikePost, newImagePost, getAllPostLikes } from '@services/feed';
import { Post } from '@types/collections';
import { removeArrayItem, updateArrayItem } from '@utils/array-utils';
import { ImagePickerResponse } from 'react-native-image-picker';
import rootStore from './RootStore';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ILocation } from '@types/location';

class FeedStore {
  rootStore: null | rootStore = null;
  userPostLikes: string[] = [];
  uploadProgress = 0;
  uploadStatus: 'pending' | 'in_progress' | 'done' = 'pending';

  constructor(rootStore: rootStore) {
    makeAutoObservable(this, { rootStore: false });
    this.rootStore = rootStore;
    this.getUserLikes();
  }

  async getUserLikes() {
    try {
      // await AsyncStorage.clear();
      const fetchedUserLikes = await AsyncStorage.getItem('fetchedUserLikes');

      if (!fetchedUserLikes) {
        const postIds = await getAllPostLikes();

        await AsyncStorage.setItem('fetchedUserLikes', 'true');
        await AsyncStorage.setItem('userPostLikes', JSON.stringify(postIds));

        runInAction(() => {
          this.userPostLikes = postIds;
        });
      } else {
        const cachedPostLikes = await AsyncStorage.getItem('userPostLikes');

        if (cachedPostLikes) {
          this.userPostLikes = JSON.parse(cachedPostLikes);
        }
      }
    } catch (err) {
      console.error('Get user post likes error: ', err);
    }
  }

  async updatePostLike(postId: string, liked: boolean) {
    if (liked) {
      this.userPostLikes.push(postId);
    } else {
      this.userPostLikes = removeArrayItem(this.userPostLikes, postId);
    }
    console.log(this.userPostLikes);
    await AsyncStorage.setItem('userPostLikes', JSON.stringify(this.userPostLikes));
  }

  setUploadProgress(progress: number) {
    this.uploadProgress = progress;
  }

  /** On a beautiful, relaxing day this should've been on storage service, but there were some issues
   * with getting the `task` value from firebase storage and using it's `state_changed` listener when we returned it from the service
   *
   * Therefor we moved it here for resolving the issue faster.
   */
  async uploadImage({ image, text, location }: { image: ImagePickerResponse; text?: string; location?: ILocation }) {
    try {
      runInAction(() => {
        this.uploadStatus = 'in_progress';
      });

      const postData = await newImagePost({ image, text, location });
      // Upload to firestore

      runInAction(() => {
        this.uploadStatus = 'done';
      });

      this.rootStore?.mediaStore.addRecentPicture(postData);

      setTimeout(() => {
        runInAction(() => {
          this.uploadStatus = 'pending';
        });
      }, 5250);
    } catch (err) {
      console.log(err);
    }
  }
}

export default FeedStore;
