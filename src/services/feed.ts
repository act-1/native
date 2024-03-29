import firestore, { firebase, FirebaseFirestoreTypes } from '@react-native-firebase/firestore';
import * as geofirestore from 'geofirestore';
import functions from '@react-native-firebase/functions';
import auth from '@react-native-firebase/auth';
import { Post, PicturePost, Event, Location, LocationRef } from '@types/collections';
import { ImagePickerResponse } from 'react-native-image-picker';
import Storage, { uploadPicture } from './storage';

const GeoFirestore = geofirestore.initializeApp(firestore());
const postsCollection = GeoFirestore.collection('posts');

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

/**
 * Returns the post IDs the user liked.
 */
export async function getAllPostLikes() {
  try {
    const userId = auth().currentUser!.uid;
    const snapshot = await firestore().collection(`users/${userId}/likes`).get();
    const postIds = snapshot.docs.map((likeDoc) => likeDoc.id);
    return postIds;
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
  text: string;
  locationData: {
    locationId: string;
    locationName: string;
    locationCity: string;
    locationProvince: string;
    coordinates: { _latitude: number; _longitude: number };
  };
};

export async function createTextPost({ text, locationData }: CreateTextPostProps) {
  try {
    const currentUser = auth().currentUser;
    if (currentUser) {
      const postRef = postsCollection.doc();

      await postRef.set({
        id: postRef.id,
        authorId: currentUser.uid,
        authorName: currentUser.displayName,
        authorPicture: currentUser.photoURL,
        text,
        ...locationData,
        likeCount: 0,
        type: 'text',
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
  locationRef: LocationRef;
  event?: Event;
};

export async function newImagePost({ image, text, locationRef, event }: NewImagePostProps) {
  try {
    const currentUser = auth().currentUser;
    if (currentUser) {
      const uploadedImage = await Storage.uploadPicture(image.uri!);

      let postData = {
        type: 'picture',
        authorId: currentUser.uid,
        pictureWidth: uploadedImage.width,
        pictureHeight: uploadedImage.height,
        pictureUrl: uploadedImage.url,
        pictureId: uploadedImage.id,
        archived: false,
        featured: false,
        homeScreen: false,
        ...locationRef,
        coordinates: new firebase.firestore.GeoPoint(locationRef.coordinates._latitude, locationRef.coordinates._longitude),
        likeCount: 0,
        text,
      };

      if (event) {
        postData = { ...postData, eventId: event.id, eventTitle: event.title };
      }

      let postRef = null;
      postRef = postsCollection.doc();

      await postRef.set({
        ...postData,
        id: postRef.id,
        createdAt: firestore.FieldValue.serverTimestamp(),
        updatedAt: firestore.FieldValue.serverTimestamp(),
      });

      const postDocument = await postRef.get();
      return postDocument;
    }
  } catch (err) {
    console.error(err);
    throw err;
  }
}

export function deletePost(postId: string) {
  return firestore().collection('posts').doc(postId).delete();
}

type GetRecentPicturesProps = {
  limit?: number;
  startAfter?: FirebaseFirestoreTypes.DocumentData;
  afterDate?: FirebaseFirestoreTypes.Timestamp;
};

export async function getRecentPictures({ limit = 10, startAfter, afterDate }: GetRecentPicturesProps) {
  try {
    let query = firestore()
      .collection('posts')
      .where('type', '==', 'picture')
      .where('archived', '==', false)
      .orderBy('createdAt', 'desc')
      .limit(limit);

    // There's a strange behavior with the startAfter and limit conditions if we build the
    // query incrementally, so we create a new one.
    if (startAfter) {
      query = firestore()
        .collection('posts')
        .where('type', '==', 'picture')
        .where('archived', '==', false)
        .orderBy('createdAt', 'desc')
        .startAfter(startAfter)
        .limit(limit);
    }

    // Get new picture, created after the specified date
    if (afterDate) {
      query = firestore()
        .collection('posts')
        .where('type', '==', 'picture')
        .where('archived', '==', false)
        .where('createdAt', '>', afterDate)
        .orderBy('createdAt', 'desc')
        .limit(limit);
    }

    const postsSnapshot = await query.get();

    return postsSnapshot.docs;
  } catch (err) {
    throw err;
  }
}

export async function getHomeScreenPictures(): Promise<PicturePost[]> {
  try {
    const postsSnapshot = await firestore()
      .collection('posts')
      .where('type', '==', 'picture')
      .where('homeScreen', '==', true)
      .orderBy('createdAt', 'desc')
      .limit(8)
      .get();

    const posts = postsSnapshot.docs.map((post) => post.data() as PicturePost);
    return posts;
  } catch (err) {
    throw err;
  }
}

type EventPicturesProps = {
  source: 'event' | 'location';
  sourceId: string;
  limit?: number;
  startAfter?: FirebaseFirestoreTypes.DocumentData;
  afterDate?: FirebaseFirestoreTypes.Timestamp;
};

export async function getPictures({ source, sourceId, startAfter, afterDate, limit = 10 }: EventPicturesProps) {
  const sourceField = source + 'Id'; // `event` -> eventId, location -> locationId

  try {
    console.log('bbbbbb', source, sourceId);
    let query = firestore()
      .collection('posts')
      .where('type', '==', 'picture')
      .where('archived', '==', false)
      .where(sourceField, '==', sourceId)
      .orderBy('createdAt', 'desc')
      .limit(limit);

    // There's a strange behavior with the startAfter and limit conditions if we build the
    // query incrementally, so we create a new one.
    if (startAfter) {
      query = firestore()
        .collection('posts')
        .where('type', '==', 'picture')
        .where('archived', '==', false)
        .where(sourceField, '==', sourceId)
        .orderBy('createdAt', 'desc')
        .startAfter(startAfter);

      if (limit) {
        query.limit(limit);
      }
    }

    // Get new picture, created after the specified date
    if (afterDate) {
      query = firestore()
        .collection('posts')
        .where('type', '==', 'picture')
        .where('archived', '==', false)
        .where(sourceField, '==', sourceId)
        .where('createdAt', '>', afterDate)
        .orderBy('createdAt', 'desc');

      if (limit) {
        query.limit(limit);
      }
    }

    const picturesSnapshot = await query.get();
    return picturesSnapshot.docs;
  } catch (err) {
    throw err;
  }
}

export async function reportPost(postInfo: Post) {
  try {
    const userId = auth().currentUser!.uid;

    const reportId = `${postInfo.id}${userId}`;
    return firestore()
      .collection('reports')
      .doc(reportId)
      .set({
        ...postInfo,
        reporterId: userId,
      });
  } catch (err) {
    throw err;
  }
}

export default {
  newImagePost,
  getRecentPictures,
  getHomeScreenPictures,
  getPictures,
  deletePost,
  reportPost,
};
