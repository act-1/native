import firestore, { firebase, FirebaseFirestoreTypes } from '@react-native-firebase/firestore';
import * as geofirestore from 'geofirestore';
import functions from '@react-native-firebase/functions';
import auth from '@react-native-firebase/auth';
import { Post, PicturePost } from '@types/collections';
import Storage, { uploadPicture } from './storage';
import { ImagePickerResponse } from 'react-native-image-picker';
import { ILocation } from '@types/location';
import { createTimestamp } from '@utils/date-utils';

const GeoFirestore = geofirestore.initializeApp(firestore());
const postsCollection = GeoFirestore.collection('posts');

export async function getAllPosts(userId: string): Promise<Post[]> {
  try {
    const postsQuerySnapshot = await firestore()
      .collection('posts')
      .where('type', '==', 'post')
      .orderBy('createdAt', 'desc')
      .get();
    const postsDocuments = postsQuerySnapshot.docs.map(
      (doc): FirebaseFirestoreTypes.DocumentData => ({
        ...doc.data(),
        createdAt: doc.data().createdAt.toDate(),
        id: doc.id,
      })
    );

    // Check if the user has liked each post
    const withUserLikes = postsDocuments.map(
      async (post): Post => {
        // TODO: Update with the current user id
        const liked = await checkUserPostLike(post.id, userId);
        return { ...post, liked };
      }
    );

    const posts: Post[] = await Promise.all(withUserLikes);

    return posts;
  } catch (err) {
    throw err;
  }
}

/**
 * Check if the user has liked a specific post.
 * @param postId The post Id to check the user's like ststus.
 * @param userId The user Id to check the like status for.
 * @returns {Promise} Resolved with the like status (true/false)
 */
async function checkUserPostLike(postId: string, userId: string): Promise<boolean> {
  try {
    const like = await firestore().collection(`posts/${postId}/likes`).doc(userId).get();

    if (like.exists) {
      return true;
    }

    return false;
  } catch (err) {
    throw err;
  }
}

export async function likePost(postId: string): Promise<{ updated: boolean; action: string }> {
  try {
    const result = await functions().httpsCallable('likePost')({ postId });
    return result.data;
  } catch (err) {
    throw err;
  }
}

export async function unlikePost(postId: string): Promise<{ updated: boolean; action: string }> {
  try {
    const result = await functions().httpsCallable('unlikePost')({ postId });
    return result.data;
  } catch (err) {
    throw err;
  }
}

export async function updateCheckInCount(): Promise<{ updated: boolean; action: string }> {
  try {
    const result = await functions().httpsCallable('updateCheckInCountManually')();
    return result.data;
  } catch (err) {
    throw err;
  }
}

type CreateTextPostProps = {
  textContent: string;
  locationData: {
    locationId: string;
    locationName: string;
    locationCity: string;
    locationProvince: string;
    coordinates: { _latitude: number; _longitude: number };
  };
};

export async function createTextPost({ textContent, locationData }: CreateTextPostProps) {
  try {
    const currentUser = auth().currentUser;
    if (currentUser) {
      const postRef = postsCollection.doc();

      await postRef.set({
        id: postRef.id,
        authorId: currentUser.uid,
        authorName: currentUser.displayName,
        authorPicture: currentUser.photoURL,
        textContent,
        ...locationData,
        coordinates: new firebase.firestore.GeoPoint(locationData.coordinates._latitude, locationData.coordinates._longitude),
        createdAt: firestore.FieldValue.serverTimestamp(),
        updatedAt: firestore.FieldValue.serverTimestamp(),
        archived: false,
      });
    }
  } catch (err) {
    throw err;
  }
}

type NewImagePostProps = {
  image: ImagePickerResponse;
  text?: string;
  location?: ILocation;
};

export async function newImagePost({ image, text, location }: NewImagePostProps) {
  try {
    const currentUser = auth().currentUser;
    if (currentUser) {
      const uploadedImage = await Storage.uploadPicture(image);

      const postData = {
        type: 'picture',
        authorId: currentUser.uid,
        authorName: currentUser.displayName,
        authorPicture: currentUser.photoURL,
        pictureWidth: uploadedImage.width,
        pictureHeight: uploadedImage.height,
        pictureUrl: uploadedImage.url,
        storagePath: uploadedImage.storagePath,
        archived: false,
        featured: false,
        homeScreen: false,
        likeCounter: 0,
        text,
      };

      let postRef = null;

      if (location) {
        postRef = postsCollection.doc();
        await postRef.set({
          ...postData,
          id: postRef.id,
          locationId: location.id,
          locationCity: location.city,
          locationName: location.name,
          province: location.province,
          coordinates: new firebase.firestore.GeoPoint(location.coordinates._latitude, location.coordinates._longitude),
          createdAt: firestore.FieldValue.serverTimestamp(),
          updatedAt: firestore.FieldValue.serverTimestamp(),
        });
      } else {
        postRef = firestore().collection('posts').doc();
        await postRef.set({
          ...postData,
          id: postRef.id,
          createdAt: firestore.FieldValue.serverTimestamp(),
          updatedAt: firestore.FieldValue.serverTimestamp(),
        });
      }

      const postDocument = await postRef.get();

      return postDocument.data() as PicturePost;
    }
  } catch (err) {
    console.error(err);
    throw err;
  }
}

export async function getRecentPictures(): Promise<PicturePost[]> {
  try {
    const postsSnapshot = await firestore()
      .collection('posts')
      .where('type', '==', 'picture')
      .where('archived', '==', false)
      .orderBy('createdAt', 'desc')
      .get();

    const posts = postsSnapshot.docs.map((post) => post.data() as PicturePost);
    return posts;
  } catch (err) {
    throw err;
  }
}

export async function getFeaturedPictures(): Promise<PicturePost[]> {
  try {
    const postsSnapshot = await firestore()
      .collection('posts')
      .where('type', '==', 'picture')
      .where('featured', '==', true)
      .get();

    const posts = postsSnapshot.docs.map((post) => post.data() as PicturePost);
    return posts;
  } catch (err) {
    throw err;
  }
}

export default {
  newImagePost,
  getRecentPictures,
  getFeaturedPictures,
};
