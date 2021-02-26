import React, { useState, useEffect } from 'react';

import { observer } from 'mobx-react-lite';
import { useStore } from '../../stores';

import { PicturePost } from '@types/collections';
import PictureList from '../../components/PictureList';

function EventPictures({ route, eventId }: EventPicturesProps) {
  const { mediaStore } = useStore();

  const [eventPictures, setEventPictures] = useState<PicturePost[]>([]);
  const [fetchingPictures, setFetchingPictures] = useState(false);

  // const fetchMorePictures = async () => {
  //   try {
  //     setFetchingPictures(true);
  //     const lastDocumentIndex = mediaStore.mediaStore.eventPictures[eventId].length - 1;
  //     await mediaStore.getRecentPictures({ startAfter: mediaStore.recentPictures[lastDocumentIndex], limit: 8 });
  //   } catch (err) {
  //     console.error(err);
  //   }
  // };

  useEffect(() => {
    if (mediaStore.eventPictures.eventId?.length > 0) {
      const picturesData: PicturePost[] = mediaStore.eventPictures[eventId].map((document: any) => document.data());
      setEventPictures(picturesData);
    }
  }, [eventId]);

  return (
    <PictureList
      pictures={eventPictures}
      fetchMorePictures={fetchMorePictures}
      fetchingPictures={fetchingPictures}
      initialIndex={route?.params?.initialIndex}
      onRefresh={() => mediaStore.getNewRecentPictures()}
    />
  );
}

export default observer(EventPictures);
