import React, { useState, useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import { useStore } from '../../stores';
import { Box, PostBox } from '../../components';
import { getAllPosts } from '@services/feed';
import { EventsWidget } from './Feed/Widgets';

function PostFeed() {
  const { userStore } = useStore();
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    if (userStore.user.uid)
      getAllPosts(userStore.user.uid).then((posts) => {
        setPosts(posts);
      });
  }, [userStore.user]);

  return (
    <Box flex={1}>
      {posts.length > 0 && posts.map((post) => <PostBox {...post} key={post.id} />)}
      <EventsWidget onEventPress={() => console.log(1)} style={{ marginVertical: 8 }} />
    </Box>
  );
}

export default observer(PostFeed);
