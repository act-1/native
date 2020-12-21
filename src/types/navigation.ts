import { StackScreenProps } from '@react-navigation/stack';

export type EventPageScreenProps = StackScreenProps<RootStackParamList, 'EventPage'>;
export type SelectLocationScreenProps = StackScreenProps<RootStackParamList, 'CheckInSelectLocation'>;
export type EventListScreenProps = StackScreenProps<RootStackParamList, 'EventList'>;

export type RootStackParamList = {
  Home: undefined;
  EventList: undefined;
  EventPage: { eventId: string };
  CheckInSelectLocation: undefined;
  CheckInPage: undefined;
};
