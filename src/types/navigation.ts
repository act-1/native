import { StackScreenProps } from '@react-navigation/stack';
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { ImagePickerResponse } from 'react-native-image-picker';
import { FirebaseFirestoreTypes } from '@react-native-firebase/firestore';
import { PicturePost, Location } from './collections';

export type TabBarProps = BottomTabScreenProps<TabBarParamList>;
export type SelectLocationScreenProps = BottomTabScreenProps<RootStackParamList, 'CheckInSelectLocation'>;

export type HomeScreenProps = StackScreenProps<RootStackParamList, 'Home'>;
export type EventPageScreenProps = StackScreenProps<RootStackParamList, 'EventPage'>;
export type EventListScreenProps = StackScreenProps<RootStackParamList, 'EventList'>;
export type EventPicturesScreenProps = StackScreenProps<RootStackParamList, 'EventPictureList'>;
export type CheckInFormScreenProps = StackScreenProps<RootStackParamList, 'CheckInForm'>;
export type LocationScreenProps = StackScreenProps<RootStackParamList, 'LocationPage'>;
export type ProfileScreenProps = StackScreenProps<RootStackParamList, 'Profile'>;
export type SettingsScreenProps = StackScreenProps<RootStackParamList, 'Settings'>;
export type ActionScreenProps = StackScreenProps<RootStackParamList, 'ActionScreen'>;
export type NewPostProps = StackScreenProps<RootStackParamList, 'NewPost'>;
export type RecentPicturesProps = StackScreenProps<RootStackParamList, 'RecentPictures'>;
export type ProtestDashboardProps = StackScreenProps<RootStackParamList, 'ProtestDashboard'>;
export type ProtestChatProps = StackScreenProps<RootStackParamList, 'ProtestChat'>;
export type CapturePictureProps = StackScreenProps<RootStackParamList, 'CapturePicture'>;
export type UploadPreviewProps = StackScreenProps<RootStackParamList, 'UploadPreview'>;

export type RootStackParamList = {
  AppTabs: undefined;
  Home: undefined;
  EventsNavigator: undefined;
  EventList: undefined;
  EventPage: { eventId: string };
  EventPictureList: {
    source: string;
    sourceId: string;
    title: string;
    initialPictures?: FirebaseFirestoreTypes.DocumentSnapshot[];
    initialIndex?: number;
    onPictureListRefresh?: (pictureDocs: FirebaseFirestoreTypes.QueryDocumentSnapshot[], pictureData: PicturePost[]) => void;
  };
  CheckInSelectLocation: undefined;
  CheckInForm: { checkInData: CheckInParams };
  LocationPage: { locationId: string };
  Profile: undefined;
  Settings: undefined;
  SignUpNavigator: undefined;
  SignUpHello: undefined;
  ActionScreen: undefined;
  NewPost: { image: ImagePickerResponse; completionScreen: 'closeModal'; location?: Location };
  CapturePicture: {
    onImageUpload: ({ imageUri, text, inGallery }: { imageUri: string; text?: string; inGallery?: boolean }) => void;
    showGallerySwitch?: boolean;
  };
  SelectLocation: undefined;
  CheckInPrivacy: undefined;
  ProtestDashboard: undefined;
  ProtestChat: undefined;
  RecentPictures: { initialIndex?: number };
  UploadPreview: { image: ImagePickerResponse };
};

type TabBarParamList = {
  Home: undefined;
  CheckIn: undefined;
  Events: undefined;
};
