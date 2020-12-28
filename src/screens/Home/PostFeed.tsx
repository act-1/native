import React, { useState, useEffect } from 'react';
import { Box, PostBox } from '../../components';
import { getAllPosts } from '@services/feed';

function PostFeed() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    getAllPosts().then((posts) => {
      setPosts(posts);
    });
  }, []);
  return <Box flex={1}>{posts.length > 0 && posts.map((post) => <PostBox {...post} key={post.id} />)}</Box>;
}

export default PostFeed;
