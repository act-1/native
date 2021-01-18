import { makeAutoObservable, runInAction } from 'mobx';
import auth from '@react-native-firebase/auth';
import { getAllPosts, likePost, unlikePost } from '@services/feed';
import { IPost } from '@types/post';
import { updateArrayItem } from '@utils/array-utils';
import rootStore from './RootStore';

class FeedStore {
  rootStore: null | rootStore = null;
  posts: IPost[] = [];

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
}

export default FeedStore;
