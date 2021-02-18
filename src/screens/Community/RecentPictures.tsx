import React, { useState, useEffect } from 'react';
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

  useEffect(() => {
    if (mediaStore.recentPictures.length > 0) {
      const picturesData: PicturePost[] = mediaStore.recentPictures.map((document: any) => document.data());

      setRecentPictures(picturesData);
    }
  }, [mediaStore.recentPictures]);

  return (
    <PictureList pictures={recentPictures} updatePostLikeCount={updatePostLikeCount} initialIndex={route?.params?.initialIndex} />
  );
}

export default observer(RecentPictures);
