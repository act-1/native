import { makeAutoObservable, runInAction } from 'mobx';
import perf from '@react-native-firebase/perf';
import auth from '@react-native-firebase/auth';
import storage from '@react-native-firebase/storage';
import FeedService, { getAllPosts, likePost, newImagePost, unlikePost } from '@services/feed';
import { IPost } from '@types/post';
import { updateArrayItem } from '@utils/array-utils';
import { ImagePickerResponse } from 'react-native-image-picker';
import rootStore from './RootStore';

class FeedStore {
  rootStore: null | rootStore = null;
  posts: IPost[] = [];
  uploadProgress = 0;
  uploadStatus: 'pending' | 'in_progress' | 'done' = 'pending';

  constructor(rootStore: rootStore) {
    makeAutoObservable(this, { rootStore: false });
    this.rootStore = rootStore;
  }

  async getPosts() {
    try {
      const userId = auth().currentUser?.uid;
      if (userId) {
        getAllPosts(userId).then((posts) => {
          runInAction(() => {
            this.posts = posts;
            return posts;
          });
        });
      }
    } catch (err) {
      console.error('Get posts:', err);
      throw err;
    }
  }

  async updatePostLike(postId: string, liked: boolean) {
    const initialPosts = this.posts;

    // Find the post object in the posts array.
    const postIndex = initialPosts.findIndex((post) => post.id === postId);
    const postObject = initialPosts[postIndex];

    // Create a new post object with the updated like counter & like status.
    const likeCounter = liked ? postObject.likeCounter + 1 : postObject.likeCounter - 1;
    const updatedPostObject = { ...postObject, liked, likeCounter };

    // Update the posts array with the updated object.
    // This updates the UI instantly. We'll revert later if the request fails.
    this.posts = updateArrayItem(initialPosts, postIndex, updatedPostObject);

    try {
      const updateFunction = liked ? likePost : unlikePost;
      return await updateFunction(postId);
    } catch (err) {
      // Revert to the initial posts if the request has failed.
      runInAction(() => {
        this.posts = initialPosts;
      });
      throw err;
    }
  }

  setUploadProgress(progress: number) {
    this.uploadProgress = progress;
  }

  /** On a beautiful, relaxing day this should've been on storage service, but there were some issues
   * with getting the `task` value from firebase storage and using it's `state_changed` listener when we returned it from the service
   *
   * Therefor we moved it here for resolving the issue faster.
   */
  async uploadImage({ image, text }: { image: ImagePickerResponse; text?: string }) {
    try {
      runInAction(() => {
        this.uploadStatus = 'in_progress';
      });

      const postData = await newImagePost({ image, text });
      // Upload to firestore

      runInAction(() => {
        this.uploadStatus = 'done';
      });

      this.rootStore?.exploreStore.addRecentPicture(postData);

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
