import { FirebaseFirestoreTypes } from '@react-native-firebase/firestore';

export type IEvent = {
  id: string;
  title: string;
  locationName: string;
  timestamp: FirebaseFirestoreTypes.Timestamp;
  date: string;
  localDay: string;
  upcomingDate: string;
  shortDate: string;
  time: string;
  thumbnail: URL;
};
