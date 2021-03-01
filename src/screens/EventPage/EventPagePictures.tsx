import React, { useState, useEffect, useMemo } from 'react';
import { ActivityIndicator, StyleSheet } from 'react-native';
import { Box, Text } from '../../components';
import ScrollablePictures from '@components/Widgets/ScrollablePictures';
import { getPictures } from '@services/feed';

import { Event, PicturePost } from '@types/collections';
import { FirebaseFirestoreTypes } from '@react-native-firebase/firestore';

import { useNavigation } from '@react-navigation/native';

const noPicturesText = (
  <Text variant="largeTitle" textAlign="center">
    לא הועלו תמונות
  </Text>
);

type EventPagePicturesProps = {
  event: Event;
  filter: 'featured' | 'recent';
};

/**
 * Fetch and display event pictures, according to the provided `filter`.
 */

function EventPagePictures({ event }: EventPagePicturesProps) {
  const navigation = useNavigation();

  const [eventPictures, setEventPictures] = useState<PicturePost[]>([]);
  const [eventPicturesDocs, setEventPicturesDocs] = useState<FirebaseFirestoreTypes.QueryDocumentSnapshot[]>([]);
  const [fetchingPictures, setFetchingPictures] = useState(false);

  const onPicturePress = (index: number) => {
    navigation.navigate('EventPictureList', {
      eventId: event.id,
      title: event.shortTitle || event.title,
      initialPictures: eventPicturesDocs,
      initialIndex: index,
      onPictureListRefresh,
    });
  };

  const renderComponent = useMemo(() => {
    if (fetchingPictures) return <ActivityIndicator color="grey" />;
    if (eventPictures.length === 0) return noPicturesText;
    return <ScrollablePictures pictures={eventPictures} onPicturePress={onPicturePress} />;
  }, [eventPictures, fetchingPictures]);

  // Refresh local state if refersh occurs on EventPictureList
  const onPictureListRefresh = (pictureDocs: FirebaseFirestoreTypes.QueryDocumentSnapshot[], pictureData: PicturePost[]) => {
    setEventPicturesDocs([...pictureDocs, ...eventPicturesDocs]);
    setEventPictures([...pictureData, ...eventPictures]);
  };

  useEffect(() => {
    setFetchingPictures(true);

    getPictures({ source: 'event', sourceId: event.id, limit: 8 })
      .then((pictureDocs) => {
        const pictures = pictureDocs.map((picture) => picture.data() as PicturePost);
        setEventPictures(pictures);
        setEventPicturesDocs(pictureDocs);
      })
      .catch((err) => console.error(err))
      .finally(() => setFetchingPictures(false));
  }, [event.id]);

  return <Box style={styles.eventPicturesWrapper}>{renderComponent}</Box>;
}

export default EventPagePictures;

const styles = StyleSheet.create({
  eventPicturesWrapper: { justifyContent: 'center', minHeight: 230 },
});
