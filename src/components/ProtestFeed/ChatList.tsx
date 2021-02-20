import React, { useState, useEffect } from 'react';
import { View, FlatList } from 'react-native';

function ChatList({ chatMessages }) {
  return (
    <FlatList
      ListHeaderComponent={headerComponent}
      ListFooterComponent={() => <ActivityIndicator color="grey" animating={fetchingPosts} />}
      ListFooterComponentStyle={{ marginVertical: 16 }}
      maintainVisibleContentPosition={{ minIndexForVisible: 6 }}
      data={locationPosts}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <PostBox post={item} onPicturePress={selectPicture} updatePostLikeCount={updatePostLikeCount} archivePost={archivePost} />
      )}
      initialNumToRender={2}
      showsVerticalScrollIndicator={false}
    />
  );
}

export default ChatList;
