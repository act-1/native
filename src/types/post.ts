import { FirebaseFirestoreTypes } from '@react-native-firebase/firestore';

export type IPost = {
  title: string;
  authorId: string;
  authorName: string;
  authorPicture: string;
  content: string;
  likeCounter: number;
  timestamp: FirebaseFirestoreTypes.Timestamp;
};
