import React, { useRef, useState } from 'react';
import { FlatList, RefreshControl, ActivityIndicator } from 'react-native';
import { PicturePost } from '@types/collections';
import PictureListItem from './PictureListItem';

type PictureListProps = {
  pictures: PicturePost[];
  updatePostLikeCount: (postId: string, likeCount: number) => void;
  fetchMorePictures: () => void;
  fetchingPictures: boolean;
  onRefresh: () => void;
  initialIndex?: number;
};

function PictureList({
  pictures,
  updatePostLikeCount,
  fetchMorePictures,
  fetchingPictures,
  onRefresh,
  initialIndex,
}: PictureListProps) {
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
      refreshing={fetchingPictures}
      onRefresh={onRefresh}
      refreshControl={<RefreshControl refreshing={fetchingPictures} onRefresh={onRefresh} tintColor="#ece1e1" />}
      ListFooterComponent={() => <ActivityIndicator color="grey" animating={fetchingPictures} />}
      ListFooterComponentStyle={{ marginBottom: 60 }}
      onContentSizeChange={scrollToIndex}
      onEndReached={fetchMorePictures}
    />
  );
}

export default React.memo(PictureList);
