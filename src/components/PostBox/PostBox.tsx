import React from 'react';
import { StyleSheet } from 'react-native';
import FastImage from 'react-native-fast-image';
import { Box, Text } from '../../components';

function PostBox() {
  return (
    <Box backgroundColor="mainBackground" alignItems="flex-start" padding="m">
      <Box flexDirection="row" marginBottom="s">
        <FastImage
          source={{
            uri:
              'https://scontent.ftlv16-1.fna.fbcdn.net/v/t1.0-9/90528969_110795007223055_4530916542791024640_o.png?_nc_cat=106&ccb=2&_nc_sid=09cbfe&_nc_ohc=-OTfEcMcxCQAX_LIlQg&_nc_ht=scontent.ftlv16-1.fna&oh=49ab9c3dec2ca614c297f85099ccf150&oe=600CB4D8',
          }}
          style={styles.authorImage}
        />
        <Box alignItems="flex-start">
          <Text variant="boxTitle">הדגלים השחורים</Text>
          <Text variant="boxSubtitle">לפני 4 שעות</Text>
        </Box>
      </Box>
      <Box alignItems="flex-start">
        <Text variant="text" fontFamily="Arial">
          המחאה פירקה את הליכוד. ובעזרת השם גם תפרק את הממשלה הכושלת הזו עוד הלילה.
        </Text>
      </Box>
    </Box>
  );
}

export default PostBox;

const styles = StyleSheet.create({
  authorImage: {
    width: 40,
    height: 40,
    borderRadius: 25,
    marginRight: 8,
  },
});
