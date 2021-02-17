import React, { useEffect, useRef } from 'react';
import { FlatList } from 'react-native';
import { PicturePost } from '@types/collections';
import PictureListItem from './PictureListItem';

type PictureListProps = {
  pictures: PicturePost[];
  updatePostLikeCount: (postId: string, likeCount: number) => void;
  initialIndex?: number;
};

function PictureList({ pictures, updatePostLikeCount, initialIndex }: PictureListProps) {
  const flatListRef = useRef<FlatList>(null);

  useEffect(() => {
    // This is a hack to solve `initialScrollToIndex` issue, when the items didn't have enough time to render initially
    // and the method failed.
    if (initialIndex) {
      let wait = new Promise((resolve) => setTimeout(resolve, 70));
      wait.then(() => {
        flatListRef.current!.scrollToIndex({ index: initialIndex, animated: false });
      });
    }
  }, [initialIndex]);

  return (
    <FlatList
      ref={flatListRef}
      data={pictures}
      showsVerticalScrollIndicator={false}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => <PictureListItem post={item} updatePostLikeCount={updatePostLikeCount} />}
      initialNumToRender={2}
    />
  );
}

export default React.memo(PictureList);
