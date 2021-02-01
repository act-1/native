import { FirebaseFirestoreTypes } from '@react-native-firebase/firestore';

export type IPost = {
  id: string;
  title: string;
  authorId: string;
  authorName: string;
  authorPicture: string;
  content: string;
  likeCounter: number;
  liked?: boolean;
  type: 'post';
  createdAt: FirebaseFirestoreTypes.Timestamp;
};

export type IPicturePost = {
  id: string;
  createdAt: FirebaseFirestoreTypes.Timestamp;
  updatedAt: FirebaseFirestoreTypes.Timestamp;
  type: 'picture';
  authorId: string;
  authorName: string;
  authorPicture: string;
  pictureWidth: number;
  pictureHeight: number;
  pictureUrl: string;
  archived: boolean;
  featured: boolean;
  homeScreen: boolean;
  text: string;
  likeCounter: number;
  locationId?: string;
  locationCity?: string;
  locationName?: string;
  province?: string;
  coordinates?: { _latitude: number; _longitude: number };
};
