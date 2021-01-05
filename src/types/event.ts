import { FirebaseFirestoreTypes } from '@react-native-firebase/firestore';

export type IEvent = {
  id: string;
  title: string;
  locationId: string;
  locationName: string;
  startDate: Date;
  endDate: Date;
  thumbnail: URL;
  content: string;
  organizations: { id: string; thumbnail: string; title: string }[];
  attendingCount: number;
  coordinates: FirebaseFirestoreTypes.GeoPoint;
  type?: 'event';
  pastEvent: boolean;
};
