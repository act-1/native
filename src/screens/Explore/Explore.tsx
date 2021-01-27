import React, { useEffect } from 'react';
import { SafeAreaView } from 'react-native';
import { Box, PictureThumbList } from '../../components';
import { observer } from 'mobx-react-lite';
import { useStore } from '../../stores';
import ExploreHeader from './ExploreHeader';

function Explore() {
  const { exploreStore } = useStore();

  useEffect(() => {
    if (exploreStore.currentFilter === 'recent' && exploreStore.recentPictures.length === 0) {
      exploreStore.getRecentPictures();
    }

    if (exploreStore.currentFilter === 'featured' && exploreStore.featuredPictures.length === 0) {
      exploreStore.getFeaturedPictures();
    }
  }, [exploreStore, exploreStore.currentFilter]);

  return (
    <Box>
      <SafeAreaView />
      <ExploreHeader />
      <PictureThumbList
        pictures={exploreStore.currentFilter === 'featured' ? exploreStore.featuredPictures : exploreStore.recentPictures}
      />
    </Box>
  );
}

export default observer(Explore);
