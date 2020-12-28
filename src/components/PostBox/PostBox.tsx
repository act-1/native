import React from 'react';
import { StyleSheet, ViewStyle } from 'react-native';
import FastImage from 'react-native-fast-image';
import Icon from 'react-native-vector-icons/Feather';
import { Box, Text, Ticker } from '../../components';
import * as timeago from 'timeago.js';
import HTML from 'react-native-render-html';
import { likePost, unlikePost } from '@services/feed';

import he from 'timeago.js/lib/lang/he';
timeago.register('he', he);

type PostBoxProps = {
  id: string;
  authorName: string;
  authorPicture: string;
  content: string;
  image?: URL;
  style?: ViewStyle;
  liked: boolean;
  timestamp: string;
};

function PostBox(props: PostBoxProps) {
  const { id: postId, authorName, authorPicture, content, liked, timestamp, style } = props;

  const likePress = async () => {
    try {
      if (!liked) {
        await likePost(postId);
      } else {
        await unlikePost(postId);
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Box backgroundColor="mainBackground" alignItems="flex-start" style={style}>
      <Box flexDirection="row" paddingHorizontal="m">
        <FastImage
          source={{
            uri: authorPicture,
          }}
          style={styles.authorImage}
        />
        <Box marginTop="m" marginLeft="s">
          <Box flexDirection="row" marginBottom="xxs">
            <Box flexDirection="row" alignItems="center">
              <Text variant="boxTitle" fontSize={15} marginRight="s">
                {authorName}
              </Text>
              <Text variant="boxSubtitle" fontSize={15}>
                {timeago.format(timestamp, 'he')}
              </Text>
            </Box>
          </Box>
          <Box alignItems="flex-start">
            <Box paddingRight="xl" marginBottom="s">
              <HTML
                html={content}
                tagsStyles={{
                  p: { textAlign: 'left', fontSize: 15 },
                  div: { textAlign: 'left', fontSize: 15 },
                }}
              />
            </Box>

            <Box width="100%" flexDirection="row" alignItems="center" marginBottom="s">
              <Icon onPress={likePress} name="heart" color={liked ? 'red' : '#999999'} size={18} style={{ marginRight: 6 }} />
              <Ticker textStyle={{ ...styles.likeCount, color: liked ? 'red' : '#999999' }}>52</Ticker>
            </Box>
          </Box>
        </Box>
      </Box>

      <Box width="100%" height={2} backgroundColor="seperator" />
    </Box>
  );
}

export default PostBox;

const styles = StyleSheet.create({
  authorImage: {
    width: 40,
    height: 40,
    borderRadius: 25,
    marginRight: 0,
    marginTop: 12,
  },
  likeCount: {
    color: '#999999',
    fontFamily: 'Rubik-Medium',
    fontSize: 12,
  },
});
