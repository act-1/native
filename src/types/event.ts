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
  content: string;
  organizations: { id: string; thumbnail: string; title: string };
  attendingCount: number;
  coordinates: FirebaseFirestoreTypes.GeoPoint;
};