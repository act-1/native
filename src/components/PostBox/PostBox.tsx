import React from 'react';
import { Pressable, StyleSheet, ViewStyle, Dimensions } from 'react-native';
import { observer } from 'mobx-react-lite';
import { useStore } from '../../stores';
import FastImage from 'react-native-fast-image';
import HTML from 'react-native-render-html';
import Icon from 'react-native-vector-icons/Feather';
import HapticFeedback from 'react-native-haptic-feedback';
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
      HapticFeedback.trigger(hapticMethod);
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
        <Box marginTop="m" style={{ marginLeft: 10 }}>
          <Box flexDirection="row" marginBottom="xxs">
            <Box flexDirection="row" alignItems="center">
              <Text variant="boxTitle" fontFamily="Rubik-Medium" fontSize={15.5} marginRight="xs">
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
                  p: { textAlign: 'left', fontSize, color: '#fff' },
                }}
              />
            </Box>

            <Pressable onPress={likePress} accessibilityLabel="אהבתי">
              <Box width="100%" flexDirection="row" alignItems="center" marginBottom="s">
                <Icon name="heart" color={liked ? '#ec534b' : '#999999'} size={18} style={{ marginRight: 6 }} />
                <Ticker textStyle={{ ...styles.likeCount, color: liked ? '#ec534b' : '#999999' }}>{likeCounter}</Ticker>
              </Box>
            </Pressable>
          </Box>
        </Box>
      </Box>

      <Box width="100%" height={1} backgroundColor="seperator" />
    </Box>
  );
}

export default observer(PostBox);

const styles = StyleSheet.create({
  authorImage: {
    width: 45,
    height: 45,
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
