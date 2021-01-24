import { makeAutoObservable, runInAction } from 'mobx';
import perf from '@react-native-firebase/perf';
import auth from '@react-native-firebase/auth';
import storage from '@react-native-firebase/storage';
import FeedService, { getAllPosts, likePost, unlikePost } from '@services/feed';
import { IPost } from '@types/post';
import { updateArrayItem } from '@utils/array-utils';
import ImageResizer from 'react-native-image-resizer';
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
  async uploadImage({ image, text }) {
    try {
      runInAction(() => {
        this.uploadStatus = 'in_progress';
      });

      const trace = await perf().startTrace('imageUpload');

      const { uri, width, height } = image;

      // Whther to set the resize ratio based on the width (landscape image) or the height (portrait)
      const resizeDimension = image.width > image.height ? image.width : image.height;
      let resizeRatio = 1;

      // Resize dimensions for landscape picture
      if (resizeDimension > 5000) {
        resizeRatio = 2.2;
      }
      if (resizeDimension > 4000) {
        resizeRatio = 1.8;
      } else if (resizeDimension > 3000) {
        resizeRatio = 1.5;
      }

      const resizedImage = await ImageResizer.createResizedImage(uri, width / resizeRatio, height / resizeRatio, 'JPEG', 75);

      trace.putMetric('image_size', resizedImage.size);

      const reference = storage().ref(resizedImage.name);
      const task = reference.putFile(resizedImage.uri);

      task.on('state_changed', (taskSnapshot) => {
        const progress = (taskSnapshot.bytesTransferred / taskSnapshot.totalBytes) * 100;
        this.setUploadProgress(progress);
      });

      task.then(async () => {
        const pictureUrl = await reference.getDownloadURL();

        runInAction(() => {
          this.uploadStatus = 'done';
        });

        trace.stop();

        setTimeout(() => {
          runInAction(() => {
            this.uploadStatus = 'pending';
          });
        }, 5250);
      });

      // runInAction(() => {
      //   this.uploadStatus = 'in_progress';
      // });

      // await FeedService.newImagePost({ image, text });

      // runInAction(() => {
      //   this.uploadStatus = 'done';
      // });
    } catch (err) {
      console.log(err);
    }
  }
}

export default FeedStore;
