import React from 'react';
import { Pressable, StyleSheet, ViewStyle, Dimensions } from 'react-native';
import { observer } from 'mobx-react-lite';
import { useStore } from '../../stores';
import FastImage from 'react-native-fast-image';
import HTML from 'react-native-render-html';
import Icon from 'react-native-vector-icons/Feather';
import HapticFeedback from 'react-native-haptic-feedback';
import { Box, Text, Ticker } from '../../components';
import { Post } from '@types/collections';
import Svg, { Path } from 'react-native-svg';
import { scale } from 'react-native-size-matters';

import * as timeago from 'timeago.js';
import he from 'timeago.js/lib/lang/he';
timeago.register('he', he);

type PostBoxProps = {
  post: Post;
};

const deviceWidth = Dimensions.get('window').width;
let fontSize = 16;
let baseBoxWith = 300;

if (deviceWidth > 400) {
  fontSize = 17;
  baseBoxWith = 275;
}

function PostBox({ post }: PostBoxProps) {
  const { feedStore } = useStore();
  // const { id: postId, authorName, authorPicture, content, likeCounter, liked, pictureUrl, createdAt, style } = props;

  const likePress = async () => {
    // try {
    //   // Update post like with it's opposite like state.
    //   const hapticMethod = liked ? 'impactMedium' : 'impactLight';
    //   HapticFeedback.trigger(hapticMethod);
    //   await feedStore.updatePostLike(postId, !liked);
    // } catch (err) {
    //   console.log(err);
    // }
  };

  return (
    <Box alignItems="flex-start" marginBottom="s" style={[{ backgroundColor: '#0a0d0f' }]}>
      <Box flexDirection="row" paddingHorizontal="m">
        <FastImage source={{ uri: post.authorPicture }} style={styles.authorImage} />
        <Box marginTop="m" style={{ marginLeft: 10 }}>
          <Box alignItems="flex-start" backgroundColor="seperator" style={styles.messageBubble}>
            <Box style={styles.arrowContainer}>
              <Svg
                style={{ left: -4 }}
                width={15.5}
                height={17.5}
                viewBox="32.484 17.5 15.515 17.5"
                enable-background="new 32.485 17.5 15.515 17.5"
              >
                <Path d="M48,35c-7-4-6-8.75-6-17.5C28,17.5,29,35,48,35z" fill={'#222222'} x="0" y="0" />
              </Svg>
            </Box>

            {post.type === 'picture' && (
              <FastImage
                source={{ uri: post.pictureUrl }}
                style={{
                  width: scale(265),
                  marginHorizontal: -12,
                  height: post.pictureHeight / (post.pictureWidth / deviceWidth),
                  marginTop: -15,
                  marginBottom: 8,
                  zIndex: 1,
                  borderTopRightRadius: 25,
                  borderTopLeftRadius: 25,
                }}
                //
              />
            )}

            <Box paddingRight="xxl" marginBottom="s">
              {/* <HTML
                html={`<p>${}</p>`}
                textSelectable={true}
                tagsStyles={{
                  p: { textAlign: 'left', fontSize, fontFamily: 'AtlasDL3.1AAA-Bold', color: '#fff' },
                }}
              /> */}
              <Text variant="text" fontFamily="AtlasDL3.1AAA-Medium">
                {post.textContent}
              </Text>
            </Box>

            <Box flexDirection="row" alignItems="center">
              <Text color="lightText" fontFamily="AtlasDL3.1AAA-Medium" fontSize={14} style={{ marginRight: 6 }}>
                {post.authorName}
              </Text>
              <Text variant="boxSubtitle" fontSize={14}>
                {timeago.format(post.createdAt.toDate(), 'he')}
              </Text>
            </Box>
          </Box>
          <Pressable
            onPress={likePress}
            accessibilityLabel="אהבתי"
            style={{ alignSelf: 'flex-start', marginTop: 8, marginLeft: 8 }}
          >
            <Box width="100%" flexDirection="row" alignItems="center">
              <Icon name="heart" color={false ? '#ec534b' : '#999999'} size={22} style={{ marginRight: 6 }} />
              <Ticker textStyle={{ ...styles.likeCount, color: false ? '#ec534b' : '#999999' }}>42</Ticker>
            </Box>
          </Pressable>
        </Box>
      </Box>
    </Box>
  );
}

export default observer(PostBox);

const styles = StyleSheet.create({
  authorImage: {
    width: 40,
    height: 40,
    borderRadius: 25,
    alignSelf: 'flex-end',
  },
  messageBubble: {
    maxWidth: scale(baseBoxWith),
    paddingVertical: 8,
    paddingHorizontal: 12,
    marginLeft: 2,
    borderRadius: 20,
  },
  arrowContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: -1,
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'flex-start',
  },
  likeCount: {
    color: '#999999',
    fontFamily: 'AtlasDL3.1AAA-Medium',
    fontSize: 16,
  },
});
