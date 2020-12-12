import { StackScreenProps } from '@react-navigation/stack';

export type EventPageScreenProps = StackScreenProps<RootStackParamList, 'EventPage'>;

export type RootStackParamList = {
  Home: undefined;
  EventPage: { eventId: string };
};
