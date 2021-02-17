import React, { useState, useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import { useStore } from '../../stores';

import { PictureList } from '../../components';
import { PicturePost } from '@types/collections';

function RecentPictures() {
  const { mediaStore } = useStore();
  const [recentPictures, setRecentPictures] = useState<PicturePost[]>([]);

  useEffect(() => {
    if (mediaStore.recentPictures.length > 0) {
      const picturesData: PicturePost[] = mediaStore.recentPictures.map((document: any) => document.data());

      setRecentPictures(picturesData);
    }
  }, [mediaStore.recentPictures]);

  return <PictureList pictures={recentPictures} />;
}

export default observer(RecentPictures);
