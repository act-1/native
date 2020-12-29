import { makeAutoObservable, runInAction, toJS } from 'mobx';
import firestore, { FirebaseFirestoreTypes } from '@react-native-firebase/firestore';
import { getAllPosts, likePost, unlikePost } from '@services/feed';
import rootStore from './RootStore';

function updateArrayObject(arr, id, updatedFields) {
  const index = arr.findIndex((item: any) => item.id === id);
  if (index === -1) throw new Error('Array item not found.');

  const obj = arr[index];
  const updateObj = { ...obj, ...updatedFields };
  const updatedArray = [...arr.slice(0, index), updateObj, ...arr.slice(index + 1)];
  return updatedArray;
}

class FeedStore {
  rootStore: null | rootStore = null;
  posts: any[] = [];

  constructor(rootStore: rootStore) {
    makeAutoObservable(this, { rootStore: false });
    this.rootStore = rootStore;
  }

  getPosts() {
    const userId = this.rootStore?.userStore?.user?.uid;
    if (userId) {
      getAllPosts(userId).then((posts) => {
        runInAction(() => {
          this.posts = posts;
        });
      });
    }
  }

  async updatePostLike(postId: string, liked: boolean) {
    const initialPosts = this.posts;
    const postIndex = initialPosts.findIndex((post) => post.id === postId);
    const postObj = initialPosts[postIndex];

    const likeCounter = liked ? postObj.likeCounter + 1 : postObj.likeCounter - 1;

    // Update the UI instantly. Revert later if the request failed.
    this.posts = updateArrayObject(initialPosts, postId, { liked, likeCounter });

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
