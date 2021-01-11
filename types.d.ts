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
