import React, { useEffect, useRef } from 'react';
import { FlatList } from 'react-native';
import { PictureList } from '../../components';
import { observer } from 'mobx-react-lite';
import { useStore } from '../../stores';
import ExploreHeader from './ExploreHeader';

function ExploreList({ route }) {
  const { mediaStore } = useStore();
  const title = mediaStore.currentFilter === 'featured' ? 'נבחרות' : 'אחרונות';

  useEffect(() => {
    if (mediaStore.currentFilter === 'recent' && mediaStore.recentPictures.length === 0) {
      mediaStore.getRecentPictures();
    }

    if (mediaStore.currentFilter === 'featured' && mediaStore.featuredPictures.length === 0) {
      mediaStore.getFeaturedPictures();
    }
  }, [mediaStore, mediaStore.currentFilter]);

  return (
    <>
      <ExploreHeader />
      {mediaStore.currentFilter === 'featured' && (
        <PictureList pictures={mediaStore.featuredPictures} initialIndex={route.params?.initialIndex} title={title} />
      )}
      {mediaStore.currentFilter === 'recent' && (
        <PictureList pictures={mediaStore.recentPictures} initialIndex={route.params?.initialIndex} title={title} />
      )}
    </>
  );
}

export default observer(ExploreList);

{
  /* <PictureList
pictures={mediaStore.currentFilter === 'featured' ? mediaStore.featuredPictures : mediaStore.recentPictures}
initialIndex={route.params?.initialIndex}
title={title}
/> */
}
