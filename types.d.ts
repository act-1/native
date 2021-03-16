type LatLng = [number, number];

// 🚨 PC ALERT 🚨 //
// The following line contains non-pc content.
// We know those are not correct pronouns, but that's the constant names used in Ivrita.js. Blames should go to thier issue list.
type Pronoun = 'MALE' | 'FEMALE' | 'NEUTRAL' | 'ORIGINAL';
type Avatar = 'alien' | 'anarchist' | 'diseaseDistributor' | 'traitor';

type EventStatus = 'upcoming' | 'live' | 'past';

type PostAction = 'report' | 'delete';

type PrivacyOption = 'PUBLIC' | 'PRIVATE' | 'ANONYMOUS';

type CheckInParams = {
  region: string;
  expireAt: Date;
  fcmToken?: string;
};

type BoardingScreenProps = {
  nextPage: () => void;
  scrollToPage?: (index: number) => void;
  style?: ViewStyle;
  currentIndex?: number;
};

type GraphAPIResult = {
  picture: {
    data: {
      url: string;
    };
  };
};

type Province = [
  'הגליל העליון',
  'הגליל התחתון',
  'הגולן',
  'חיפה והקריות',
  'ירושלים',
  'השרון',
  'תל אביב',
  'המרכז',
  'השפלה',
  'חוף אשקלון ועוטף עזה',
  'הנגב',
  'אילת והערבה'
];
