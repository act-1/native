import React, { useEffect, useRef } from 'react';
import { FlatList } from 'react-native';
import { PictureList } from '../../components';
import { observer } from 'mobx-react-lite';
import { useStore } from '../../stores';
import ExploreHeader from './ExploreHeader';

function ExploreList({ route }) {
  const { exploreStore } = useStore();
  const title = exploreStore.currentFilter === 'featured' ? 'נבחרות' : 'אחרונות';

  useEffect(() => {
    if (exploreStore.currentFilter === 'recent' && exploreStore.recentPictures.length === 0) {
      exploreStore.getRecentPictures();
    }

    if (exploreStore.currentFilter === 'featured' && exploreStore.featuredPictures.length === 0) {
      exploreStore.getFeaturedPictures();
    }
  }, [exploreStore, exploreStore.currentFilter]);

  return (
    <>
      <ExploreHeader />
      {exploreStore.currentFilter === 'featured' && (
        <PictureList pictures={exploreStore.featuredPictures} initialIndex={route.params?.initialIndex} title={title} />
      )}
      {exploreStore.currentFilter === 'recent' && (
        <PictureList pictures={exploreStore.recentPictures} initialIndex={route.params?.initialIndex} title={title} />
      )}
    </>
  );
}

export default observer(ExploreList);

{
  /* <PictureList
pictures={exploreStore.currentFilter === 'featured' ? exploreStore.featuredPictures : exploreStore.recentPictures}
initialIndex={route.params?.initialIndex}
title={title}
/> */
}
