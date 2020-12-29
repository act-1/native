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
  timestamp: FirebaseFirestoreTypes.Timestamp;
};
