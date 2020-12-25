import React from 'react';
import { Box, PostBox } from '../../components';

function PostFeed({ posts }) {
  return (
    <Box flex={1}>
      {posts.map((post) => (
        <PostBox
          authorName="הדגלים השחורים"
          authorPicture={
            new URL(
              'https://scontent.ftlv16-1.fna.fbcdn.net/v/t1.0-9/90528969_110795007223055_4530916542791024640_o.png?_nc_cat=106&ccb=2&_nc_sid=09cbfe&_nc_ohc=-OTfEcMcxCQAX_LIlQg&_nc_ht=scontent.ftlv16-1.fna&oh=49ab9c3dec2ca614c297f85099ccf150&oe=600CB4D8'
            )
          }
          content="המחאה פירקה את הליכוד. ובעזרת השם גם תפרק את הממשלה הכושלת הזו עוד הלילה."
          key={Math.random()}
          style={{ marginBottom: 12 }}
        />
      ))}
    </Box>
  );
}

export default PostFeed;