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

  async addPostLike(postId: string) {
    const initialPosts = this.posts;
    const postIndex = initialPosts.findIndex((post) => post.id === postId);
    const postObj = initialPosts[postIndex];

    // Update the UI instantly. Revert later if request failed.
    this.posts = updateArrayObject(initialPosts, postId, { liked: true, likeCounter: postObj.likeCounter + 1 });

    try {
      const { liked } = await likePost(postId);
      if (liked) {
        return { liked: true };
      } else {
        throw new Error('Unexpected error occured.');
      }
    } catch (err) {
      // Revert to initial posts if request failed.
      this.posts = initialPosts;
      throw err;
    }
  }

  async removePostLike(postId: string) {
    const initialPosts = this.posts;
    const postIndex = initialPosts.findIndex((post) => post.id === postId);
    const postObj = initialPosts[postIndex];

    // Update the UI instantly. Revert later if request failed.
    this.posts = updateArrayObject(initialPosts, postId, { liked: false, likeCounter: postObj.likeCounter - 1 });

    try {
      const { unliked } = await unlikePost(postId);
      if (unliked) {
        return { unliked: true };
      } else {
        throw new Error('Unexpected error occured.');
      }
    } catch (err) {
      // Revert to initial posts if request failed.
      this.posts = initialPosts;
      throw err;
    }
  }
}

export default FeedStore;
