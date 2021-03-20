import React, { useState, useEffect, useMemo } from 'react';
import { ActivityIndicator } from 'react-native';
import { Box, Text } from '../../components';
import { ScrollablePictures } from '../../components/Widgets';
import { getPictures } from '@services/feed';
import { Event, Location, PicturePost } from '@types/collections';
import firestore, { FirebaseFirestoreTypes } from '@react-native-firebase/firestore';

import { useNavigation } from '@react-navigation/native';

type EventPagePicturesProps = {
  event?: Event;
  location?: Location;
  size?: 'small' | 'large';
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
    if (eventPictures.length === 0) return null;
    return <ScrollablePictures pictures={eventPictures} onPicturePress={onPicturePress} size={size} />;
  }, [eventPictures, fetchingPictures]);

  // Refresh local state if refersh occurs on EventPictureList
  const onPictureListRefresh = (pictureDocs: FirebaseFirestoreTypes.QueryDocumentSnapshot[], pictureData: PicturePost[]) => {
    setEventPicturesDocs([...pictureDocs, ...eventPicturesDocs]);
    setEventPictures([...pictureData, ...eventPictures]);
  };

  useEffect(() => {
    const newPicturesListener = (source: string, sourceId: string) => {
      const sourceField = source + 'Id';

      const query = firestore()
        .collection('posts')
        .where('type', '==', 'picture')
        .where(sourceField, '==', sourceId)
        .where('createdAt', '>', new Date());

      const unsubscribe = query.onSnapshot(
        (snapshot) => {
          console.log(new Date());
          if (snapshot === null) return;
          snapshot.docChanges().forEach((change) => {
            if (change.type === 'added') {
              console.log(change.doc.data());
              let picture = change.doc.data() as PicturePost;

              // Local writes arrives without `createdAt`.
              // See https://firebase.google.com/docs/firestore/query-data/listen#events-local-changes
              picture = { ...picture, createdAt: firestore.Timestamp.fromDate(new Date()) };

              setEventPicturesDocs((prevState) => [change.doc, ...prevState]);
              setEventPictures((prevState) => [picture, ...prevState]);
            }
          });
        },
        (err) => {
          console.error(err);
          throw err;
        }
      );

      return unsubscribe;
    };

    setFetchingPictures(true);

    const source = event ? 'event' : 'location';
    const sourceId = event ? event.id : location!.id;

    console.log(source, sourceId);

    let unsubscribeListener: any;

    getPictures({ source, sourceId, limit: 8 })
      .then((pictureDocs) => {
        const pictures = pictureDocs.map((picture) => picture.data() as PicturePost);
        setEventPictures(pictures);
        setEventPicturesDocs(pictureDocs);

        unsubscribeListener = newPicturesListener(source, sourceId);
      })
      .catch((err) => console.error(err))
      .finally(() => setFetchingPictures(false));

    return () => {
      if (unsubscribeListener) {
        unsubscribeListener();
      }
    };
  }, [event, location]);

  return (
    <Box style={{ minHeight: size === 'small' ? 107 : 225 }} justifyContent="center" marginBottom="m">
      {renderComponent}
    </Box>
  );
}

export default React.memo(EventPagePictures);
