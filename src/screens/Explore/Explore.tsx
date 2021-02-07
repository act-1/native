import React, { useEffect } from 'react';
import { SafeAreaView } from 'react-native';
import { Box, PictureThumbList } from '../../components';
import { observer } from 'mobx-react-lite';
import { useStore } from '../../stores';
import ExploreHeader from './ExploreHeader';

function Explore() {
  const { mediaStore } = useStore();

  useEffect(() => {
    if (mediaStore.currentFilter === 'recent' && mediaStore.recentPictures.length === 0) {
      mediaStore.getRecentPictures();
    }

    if (mediaStore.currentFilter === 'featured' && mediaStore.featuredPictures.length === 0) {
      mediaStore.getFeaturedPictures();
    }
  }, [mediaStore, mediaStore.currentFilter]);

  return (
    <Box>
      <SafeAreaView />
      <ExploreHeader />
      <PictureThumbList
        pictures={mediaStore.currentFilter === 'featured' ? mediaStore.featuredPictures : mediaStore.recentPictures}
      />
    </Box>
  );
}

export default observer(Explore);
