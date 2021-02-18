import React, { useRef, useState } from 'react';
import { FlatList } from 'react-native';
import { PicturePost } from '@types/collections';
import PictureListItem from './PictureListItem';

type PictureListProps = {
  pictures: PicturePost[];
  updatePostLikeCount: (postId: string, likeCount: number) => void;
  initialIndex?: number;
};

function PictureList({ pictures, updatePostLikeCount, initialIndex }: PictureListProps) {
  const [initialLoad, setInitialLoad] = useState(false);
  const flatListRef = useRef<FlatList>(null);

  const scrollToIndex = () => {
    if (initialIndex && !initialLoad) {
      setTimeout(() => {
        flatListRef.current?.scrollToIndex({ index: initialIndex });
      }, 420);

      setInitialLoad(true);
    }
  };

  return (
    <FlatList
      ref={flatListRef}
      data={pictures}
      showsVerticalScrollIndicator={false}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => <PictureListItem post={item} updatePostLikeCount={updatePostLikeCount} />}
      initialNumToRender={6}
      onScrollToIndexFailed={() => {}}
      onContentSizeChange={scrollToIndex}
    />
  );
}

export default React.memo(PictureList);
