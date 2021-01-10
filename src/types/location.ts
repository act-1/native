import { FirebaseFirestoreTypes } from '@react-native-firebase/firestore';

export type ILocation = {
  id: string;
  city: string;
  name: string;
  province: [
    'תל אביב',
    'השרון',
    'חיפה והקריות',
    'הגליל התחתון',
    'הגליל העליון',
    'גולן',
    'המרכז',
    'השפלה',
    'חוף אשקלון ועוטף עזה',
    'הנגב',
    'אילת והערבה',
    'ירושלים'
  ];
  coordinates: { _latitude: number; _longitude: number };
  type?: 'location';
};
