import { makeAutoObservable, runInAction } from 'mobx';
import auth from '@react-native-firebase/auth';
import { likePost, unlikePost, newImagePost, getAllPostLikes } from '@services/feed';
import { Post, Location } from '@types/collections';
import { removeArrayItem, updateArrayItem } from '@utils/array-utils';
import { ImagePickerResponse } from 'react-native-image-picker';
import rootStore from './RootStore';
import AsyncStorage from '@react-native-async-storage/async-storage';

class FeedStore {
  rootStore: null | rootStore = null;
  userPostLikes: string[] = [];
  uploadProgress = 0;
  uploadStatus: 'pending' | 'in_progress' | 'done' = 'pending';

  constructor(rootStore: rootStore) {
    makeAutoObservable(this, { rootStore: false });
    this.rootStore = rootStore;
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
  async uploadImage({
    image,
    text,
    location,
    eventId,
  }: {
    image: ImagePickerResponse;
    text?: string;
    location?: Location;
    eventId?: string;
  }) {
    try {
      runInAction(() => {
        this.uploadStatus = 'in_progress';
      });

      const document = await newImagePost({ image, text, location, eventId });
      // Upload to firestore

      runInAction(() => {
        this.uploadStatus = 'done';
      });

      this.rootStore?.mediaStore.addRecentPicture(document);

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
