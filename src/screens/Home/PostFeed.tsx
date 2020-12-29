import React, { useState, useEffect } from 'react';
import { toJS } from 'mobx';
import { observer } from 'mobx-react-lite';
import { useStore } from '../../stores';
import { Box, PostBox } from '../../components';
import { EventsWidget, LiveCheckIns } from './Feed/Widgets';

function PostFeed() {
  const { feedStore } = useStore();
  const { posts } = feedStore;

  return (
    <Box flex={1}>
      {posts.length > 0 && posts.map((post) => <PostBox {...post} key={post.id} />)}
      <EventsWidget onEventPress={() => console.log(1)} style={{ marginVertical: 8 }} />
    </Box>
  );
}

export default observer(PostFeed);
