import React, { useState, useEffect, useMemo } from 'react';
import { ActivityIndicator, StyleSheet } from 'react-native';
import { Box, Text } from '../../components';
import ScrollablePictures from '@components/Widgets/ScrollablePictures';
import { getEventPictures } from '@services/feed';
import { PicturePost } from '@types/collections';

const noPicturesText = (
  <Text variant="largeTitle" textAlign="center">
    לא הועלו תמונות
  </Text>
);

type EventPicturesProps = {
  eventId: string;
  filter: 'featured' | 'recent';
};

/**
 * Fetch and display event pictures, according to the provided `filter`.
 */

function EventPictures({ eventId }: EventPicturesProps) {
  const [eventPictures, setEventPictures] = useState<PicturePost[]>([]);
  const [fetchingPictures, setFetchingPictures] = useState(false);

  const renderComponent = useMemo(() => {
    if (fetchingPictures) return <ActivityIndicator color="grey" />;
    if (eventPictures.length === 0) return noPicturesText;
    return <ScrollablePictures pictures={eventPictures} />;
  }, [eventPictures, fetchingPictures]);

  useEffect(() => {
    setFetchingPictures(true);

    getEventPictures({ eventId, filter: 'recent' })
      .then((pictureDocs) => {
        const pictures = pictureDocs.map((picture) => picture.data() as PicturePost);
        setEventPictures(pictures);
      })
      .catch((err) => console.error(err))
      .finally(() => setFetchingPictures(false));
  }, [eventId]);

  return <Box style={styles.eventPicturesWrapper}>{renderComponent}</Box>;
}

export default EventPictures;

const styles = StyleSheet.create({
  eventPicturesWrapper: { justifyContent: 'center', minHeight: 230 },
});
