import React, { useState, useEffect, useRef } from 'react';
import { FlatList, StyleSheet, TextInput } from 'react-native';
import { Box, Text, PostBox } from '../../components';
import { observer } from 'mobx-react-lite';
import { useStore } from '../../stores';

const post1 = {
  type: 'text',
  authorId: 1,
  authorName: 'גיא',
  authorPicture: 'https://avatars.githubusercontent.com/u/13344923?s=460&u=608d14c4d6c542d8f173dc2093e1763a7d18794c&v=4',
  likeCount: 0,
  textContent: 'שלום עולם!',
  createdAt: null,
  id: 321,
};

const post2 = {
  id: 333,
  type: 'text',
  authorId: 1,
  authorName: 'גיא',
  authorPicture: 'https://avatars.githubusercontent.com/u/13344923?s=460&u=608d14c4d6c542d8f173dc2093e1763a7d18794c&v=4',
  likeCount: 0,
  textContent: 'היי!',
  createdAt: null,
};

function ProtestChat({ navigation, route }: LocationScreenProps) {
  const { feedStore } = useStore();

  return (
    <Box flex={1}>
      <FlatList
        contentContainerStyle={{ flex: 1 }}
        data={[post1, post2]}
        inverted={true}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <PostBox post={item} />}
        initialNumToRender={2}
        showsVerticalScrollIndicator={false}
      />

      <Box paddingVertical="xl" justifyContent="flex-end" backgroundColor="seperator">
        <TextInput style={{ width: '100%' }} />
      </Box>
    </Box>
  );
}

export default observer(ProtestChat);

const styles = StyleSheet.create({});
