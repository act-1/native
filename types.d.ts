type LatLng = [number, number];

type CheckInParams = {
  id: string;
  userId: string;
  locationId: string;
  locationName: string;
  locationCity: string;
  eventId?: string;
  eventEndDate?: Date;
  expireAt: Date;
  createdAt: Date;
};

type PublicCheckInParams = {
  id: string;
  locationId: string;
  locationName: string;
  locationCity: string;
  userId: string;
  displayName: string;
  profilePicture: string;
  createdAt: string;
  expireAt: string;
  eventId: string | null;
  isActive: boolean;
};

type BoardingScreenProps = {
  nextPage: () => void;
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
