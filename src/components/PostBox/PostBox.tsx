import React from 'react';
import { Pressable, StyleSheet, ViewStyle, Dimensions } from 'react-native';
import { observer } from 'mobx-react-lite';
import { useStore } from '../../stores';
import FastImage from 'react-native-fast-image';
import HTML from 'react-native-render-html';
import Icon from 'react-native-vector-icons/Feather';
import ReactNativeHapticFeedback from 'react-native-haptic-feedback';
import { Box, Text, Ticker } from '../../components';
import { IPost } from '@types/post';
import * as timeago from 'timeago.js';
import he from 'timeago.js/lib/lang/he';
timeago.register('he', he);

type PostBoxProps = IPost & {
  id: string;
  image?: URL;
  style?: ViewStyle;
};

const windowWidth = Dimensions.get('window').width;
let fontSize = 15.5;
if (windowWidth > 400) {
  fontSize = 16;
}

function PostBox(props: PostBoxProps) {
  const { feedStore } = useStore();
  const { id: postId, authorName, authorPicture, content, likeCounter, liked, timestamp, style } = props;

  const likePress = async () => {
    try {
      // Update post like with it's opposite like state.
      const hapticMethod = liked ? 'impactMedium' : 'impactLight';
      ReactNativeHapticFeedback.trigger(hapticMethod);
      await feedStore.updatePostLike(postId, !liked);
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
              <Text variant="boxTitle" fontSize={fontSize} marginRight="s">
                {authorName}
              </Text>
              <Text variant="boxSubtitle" fontSize={fontSize}>
                {timeago.format(timestamp, 'he')}
              </Text>
            </Box>
          </Box>
          <Box alignItems="flex-start">
            <Box paddingRight="xxl" marginBottom="s">
              <HTML
                html={content}
                tagsStyles={{
                  p: { textAlign: 'left', fontSize },
                }}
              />
            </Box>

            <Pressable onPress={likePress}>
              <Box width="100%" flexDirection="row" alignItems="center" marginBottom="s">
                <Icon name="heart" color={liked ? 'red' : '#999999'} size={18} style={{ marginRight: 6 }} />
                <Ticker textStyle={{ ...styles.likeCount, color: liked ? 'red' : '#999999' }}>{likeCounter}</Ticker>
              </Box>
            </Pressable>
          </Box>
        </Box>
      </Box>

      <Box width="100%" height={2} backgroundColor="seperator" />
    </Box>
  );
}

export default observer(PostBox);

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
