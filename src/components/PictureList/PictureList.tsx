import React, { useEffect, useRef } from 'react';
import { FlatList } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { PicturePost } from '@types/collections';
import PictureListItem from './PictureListItem';

const itemHeights: number[] = [];

const getItemLayout = (data: PicturePost[] | null | undefined, index: number) => {
  const length = itemHeights[index];
  const offset = itemHeights.slice(0, index).reduce((a, c) => a + c, 0);
  return { length, offset, index };
};

function PictureList({ pictures, title, initialIndex }: { pictures: PicturePost[]; title?: string; initialIndex?: number }) {
  const navigation = useNavigation();
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
      keyExtractor={(item) => item.id}
      renderItem={({ item, index }) => (
        <PictureListItem post={item} onLayout={(object) => (itemHeights[index] = object.nativeEvent.layout.height)} />
      )}
      initialNumToRender={2}
    />
  );
}

export default React.memo(PictureList);
