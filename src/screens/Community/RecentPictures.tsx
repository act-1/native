import React, { useState, useEffect } from 'react';
import { StatusBar } from 'react-native';
import { observer } from 'mobx-react-lite';
import { useStore } from '../../stores';

import { PictureList } from '../../components';
import { PicturePost } from '@types/collections';
import { RecentPicturesProps } from '@types/navigation';

import { updateArrayByObjectId } from '@utils/array-utils';

function RecentPictures({ route }: RecentPicturesProps) {
  const { mediaStore } = useStore();
  const [recentPictures, setRecentPictures] = useState<PicturePost[]>([]);

  const updatePostLikeCount = (postId: string, likeCount: number) => {
    if (likeCount < 0) return;
    const updatedPosts = updateArrayByObjectId(recentPictures, postId, { likeCount });
    setRecentPictures(updatedPosts);
  };

  const fetchMorePictures = () => {
    const lastDocumentIndex = mediaStore.recentPictures.length - 1;
    mediaStore.getRecentPictures({ startAfter: mediaStore.recentPictures[lastDocumentIndex], limit: 8 });
  };

  useEffect(() => {
    if (mediaStore.recentPictures.length > 0) {
      const picturesData: PicturePost[] = mediaStore.recentPictures.map((document: any) => document.data());
      setRecentPictures(picturesData);
    }
  }, [mediaStore.recentPictures]);

  return (
    <>
      <StatusBar backgroundColor="#161c22" />

      <PictureList
        pictures={recentPictures}
        updatePostLikeCount={updatePostLikeCount}
        fetchMorePictures={fetchMorePictures}
        initialIndex={route?.params?.initialIndex}
        fetchingPictures={mediaStore.recentPicturesLoading}
        onRefresh={() => mediaStore.getNewRecentPictures()}
      />
    </>
  );
}

export default observer(RecentPictures);
