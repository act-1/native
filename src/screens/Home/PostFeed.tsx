import React from 'react';
import { Box, PostBox } from '../../components';
import { getAllPosts } from '@services/feed';

const posts = getAllPosts();

function PostFeed({ posts }) {
  return (
    <Box flex={1}>
      {posts.map((post) => (
        <PostBox
          authorName="התנועה לאיכות השלטון"
          authorPicture={new URL('https://res.cloudinary.com/onekm/image/upload/v1608193534/organizers/mqc_zxz7zu.jpg')}
          content="המחאה פירקה את הליכוד. ובעזרת השם גם תפרק את הממשלה הכושלת הזו עוד הלילה."
          key={Math.random()}
        />
      ))}
    </Box>
  );
}

export default PostFeed;
