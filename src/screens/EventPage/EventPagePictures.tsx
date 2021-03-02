import React, { useState, useEffect, useMemo } from 'react';
import { ActivityIndicator } from 'react-native';
import { Box, Text } from '../../components';
import { ScrollablePictures } from '../../components/Widgets';
import { getPictures } from '@services/feed';

import { Event, Location, PicturePost } from '@types/collections';
import { FirebaseFirestoreTypes } from '@react-native-firebase/firestore';

import { useNavigation } from '@react-navigation/native';

const noPicturesText = (
  <Text variant="largeTitle" textAlign="center">
    לא הועלו תמונות
  </Text>
);

type EventPagePicturesProps = {
  event?: Event;
  location?: Location;
  size: 'small' | 'large';
};

/**
 * Fetch and display event pictures, according to the provided `filter`.
 */

function EventPagePictures({ event, location, size = 'large' }: EventPagePicturesProps) {
  const navigation = useNavigation();

  const [eventPictures, setEventPictures] = useState<PicturePost[]>([]);
  const [eventPicturesDocs, setEventPicturesDocs] = useState<FirebaseFirestoreTypes.QueryDocumentSnapshot[]>([]);
  const [fetchingPictures, setFetchingPictures] = useState(true);

  const onPicturePress = (index: number) => {
    navigation.navigate('EventPictureList', {
      source: event ? 'event' : 'location',
      sourceId: event?.id || location?.id,
      title: event?.shortTitle || event?.title || location?.name,
      initialPictures: eventPicturesDocs,
      initialIndex: index,
      onPictureListRefresh,
    });
  };

  const renderComponent = useMemo(() => {
    if (fetchingPictures) return <ActivityIndicator color="grey" />;
    if (eventPictures.length === 0) return noPicturesText;
    return <ScrollablePictures pictures={eventPictures} onPicturePress={onPicturePress} size={size} />;
  }, [eventPictures, fetchingPictures]);

  // Refresh local state if refersh occurs on EventPictureList
  const onPictureListRefresh = (pictureDocs: FirebaseFirestoreTypes.QueryDocumentSnapshot[], pictureData: PicturePost[]) => {
    setEventPicturesDocs([...pictureDocs, ...eventPicturesDocs]);
    setEventPictures([...pictureData, ...eventPictures]);
  };

  useEffect(() => {
    setFetchingPictures(true);

    const source = event ? 'event' : 'location';
    const sourceId = event ? event.id : location!.id;

    getPictures({ source, sourceId, limit: 8 })
      .then((pictureDocs) => {
        const pictures = pictureDocs.map((picture) => picture.data() as PicturePost);
        setEventPictures(pictures);
        setEventPicturesDocs(pictureDocs);
      })
      .catch((err) => console.error(err))
      .finally(() => setFetchingPictures(false));
  }, [event, location]);

  return (
    <Box style={{ minHeight: size === 'small' ? 184 : 225 }} justifyContent="center" paddingVertical="xm" marginBottom="m">
      {renderComponent}
    </Box>
  );
}

export default EventPagePictures;
