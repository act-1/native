import React from 'react';
import { PictureList } from '../../components';
import { observer } from 'mobx-react-lite';
import { useStore } from '../../stores';

function ExploreList({ route }) {
  const { exploreStore } = useStore();

  return (
    <>
      <PictureList pictures={exploreStore.recentPictures} initialIndex={route.params.initialIndex} />
    </>
  );
}

export default observer(ExploreList);
