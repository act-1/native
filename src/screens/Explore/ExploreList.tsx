import React from 'react';
import { PictureList } from '../../components';
import { observer } from 'mobx-react-lite';
import { useStore } from '../../stores';

function ExploreList({ route }) {
  const { exploreStore } = useStore();

  const title = exploreStore.currentFilter === 'featured' ? 'נבחרות' : 'אחרונות';

  return (
    <>
      <PictureList
        pictures={exploreStore.currentFilter === 'featured' ? exploreStore.featuredPictures : exploreStore.recentPictures}
        initialIndex={route.params.initialIndex}
        title={title}
      />
    </>
  );
}

export default observer(ExploreList);
