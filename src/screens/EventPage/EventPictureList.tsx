import React, { useState, useEffect } from 'react';

import { observer } from 'mobx-react-lite';
import { useStore } from '../../stores';

import { EventPicturesScreenProps } from '@types/navigation';
import { PicturePost } from '@types/collections';
import { FirebaseFirestoreTypes } from '@react-native-firebase/firestore';

import { getPictures } from '@services/feed';

import PictureList from '../../components/PictureList';

function EventPictureList({ navigation, route }: EventPicturesScreenProps) {
  const { mediaStore } = useStore();
  const { source, sourceId, initialPictures } = route.params;

  const [eventPictures, setEventPictures] = useState<PicturePost[]>([]);
  const [eventPictureDocs, setEventPictureDocs] = useState<FirebaseFirestoreTypes.QueryDocumentSnapshot[]>([]);
  const [fetchingPictures, setFetchingPictures] = useState(false);

  React.useLayoutEffect(() => {
    navigation.setOptions({
      title: route.params.title,
    });
  }, [navigation, route.params.title]);

  const fetchMorePictures = async () => {
    try {
      setFetchingPictures(true);
      const lastDocumentIndex = eventPictures.length - 1;

      const docs = await getPictures({ source, sourceId, startAfter: eventPictureDocs[lastDocumentIndex], limit: 8 });
      setEventPictureDocs([...eventPictureDocs, ...docs]);

      const pictures = docs.map((picture) => picture.data() as PicturePost);
      setEventPictures([...eventPictures, ...pictures]);
    } catch (err) {
      console.error(err);
    } finally {
      setFetchingPictures(false);
    }
  };

  const onRefresh = async () => {
    try {
      setFetchingPictures(true);
      const firstPictureDate = eventPictures[0].createdAt;
      const newPictures = await getPictures({ source, sourceId, afterDate: firstPictureDate, limit: 8 });
      setEventPictureDocs([...newPictures, ...eventPictureDocs]);

      if (newPictures.length > 0) {
        const pictures = newPictures.map((picture) => picture.data() as PicturePost);
        setEventPictures([...pictures, ...eventPictures]);

        if (route.params.onPictureListRefresh) {
          route.params.onPictureListRefresh(newPictures, pictures);
        }
      }
    } catch (err) {
      console.error(err);
    } finally {
      setFetchingPictures(false);
    }
  };

  useEffect(() => {
    if (initialPictures && initialPictures.length > 0) {
      const pictures = initialPictures.map((picture) => picture.data() as PicturePost);
      setEventPictureDocs(initialPictures);
      setEventPictures(pictures);
    } else {
      // Fetch pictures
      getPictures({ source, sourceId, limit: 8 }).then((pictureDocs) => {
        const pictures = pictureDocs.map((picture) => picture.data() as PicturePost);
        setEventPictureDocs(pictureDocs);
        setEventPictures(pictures);
      });
    }
  }, [initialPictures]);

  return (
    <PictureList
      pictures={eventPictures}
      fetchMorePictures={fetchMorePictures}
      fetchingPictures={fetchingPictures}
      initialIndex={route?.params?.initialIndex}
      onRefresh={onRefresh}
    />
  );
}

export default observer(EventPictureList);
