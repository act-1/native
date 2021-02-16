import React, { useState, useEffect, useRef } from 'react';
import { Pressable, StyleSheet, Dimensions } from 'react-native';
import { observer } from 'mobx-react-lite';
import { useStore } from '../../stores';
import FastImage from 'react-native-fast-image';
import LottieView from 'lottie-react-native';
import HapticFeedback from 'react-native-haptic-feedback';
import { Box, Text, Ticker } from '../../components';
import { Post } from '@types/collections';
import Svg, { Path } from 'react-native-svg';
import { likePost, unlikePost } from '@services/feed';
import { scale } from 'react-native-size-matters';

import * as timeago from 'timeago.js';
import he from 'timeago.js/lib/lang/he';
import { TouchableOpacity } from 'react-native-gesture-handler';
timeago.register('he', he);

type PostBoxProps = {
  post: Post;
  onPicturePress: (url: string) => void;
  updatePostLikeCount: (postId: string, likeCount: number) => void;
};

const deviceWidth = Dimensions.get('window').width;
let baseBoxWith = 300;

if (deviceWidth > 400) {
  baseBoxWith = 275;
}

function PostBox({ post, onPicturePress, updatePostLikeCount }: PostBoxProps) {
  const [liked, setLiked] = useState(false);
  const lottieHeart = useRef<LottieView>(null);
  const { feedStore } = useStore();

  const likePress = async () => {
    try {
      const hapticMethod = liked ? 'impactMedium' : 'impactLight';
      HapticFeedback.trigger(hapticMethod);

      if (liked) {
        lottieHeart.current!.play(18, 28);
      } else {
        lottieHeart.current!.play(3, 14);
      }

      const newLikeCount = liked ? post.likeCount - 1 : post.likeCount + 1;

      updatePostLikeCount(post.id, newLikeCount);
      feedStore.updatePostLike(post.id, !liked);
      setLiked((prevState) => !prevState);

      const updateFunction = liked ? unlikePost : likePost;

      await updateFunction(post.id);
    } catch (err) {
      feedStore.updatePostLike(post.id, !liked);
      setLiked((prevState) => !prevState);
      console.error(err); // TODO: Record to crashlytics.
    }
  };

  useEffect(() => {
    if (feedStore.userPostLikes.includes(post.id)) {
      setLiked(true);
      lottieHeart.current!.play(17, 18);
    }
  }, []);

  return (
    <Box alignItems="flex-start" marginBottom="s" style={[{ backgroundColor: '#0a0d0f' }]}>
      <Box flexDirection="row" paddingHorizontal="xm">
        <FastImage source={{ uri: post.authorPicture }} style={styles.authorImage} />
        <Box marginTop="m" style={{ marginLeft: 10 }}>
          <Box alignItems="flex-start" backgroundColor="seperator" style={styles.messageBubble}>
            <Box style={styles.arrowContainer}>
              <Svg
                style={{ left: -6 }}
                width={15.5}
                height={17.5}
                viewBox="32.484 17.5 15.515 17.5"
                enable-background="new 32.485 17.5 15.515 17.5"
              >
                <Path d="M48,35c-7-4-6-8.75-6-17.5C28,17.5,29,35,48,35z" fill={'#222222'} x="0" y="0" />
              </Svg>
            </Box>

            {post.type === 'picture' && (
              <TouchableOpacity onPress={() => onPicturePress(post.pictureUrl)} activeOpacity={0.7}>
                <FastImage
                  source={{ uri: post.pictureUrl }}
                  style={{
                    width: scale(265),
                    marginHorizontal: -12,
                    height: post.pictureHeight / (post.pictureWidth / scale(205)),
                    marginTop: -15,
                    marginBottom: post.textContent ? 6 : 0,
                    zIndex: 1,
                    borderTopRightRadius: 25,
                    borderTopLeftRadius: 25,
                  }}
                />
              </TouchableOpacity>
            )}

            <Box paddingRight="xxl" marginBottom="s">
              {post && post.textContent?.length! > 0 && (
                <Text variant="text" fontFamily="AtlasDL3.1AAA-Medium">
                  {post.textContent}
                </Text>
              )}
            </Box>

            <Box flexDirection="row" alignItems="center">
              <Text color="lightText" fontFamily="AtlasDL3.1AAA-Medium" fontSize={14} style={{ marginRight: 6 }}>
                {post.authorName}
              </Text>
              <Text variant="boxSubtitle" fontSize={14}>
                {timeago.format(post.createdAt?.toDate(), 'he')}
              </Text>
            </Box>
          </Box>
          <Pressable onPress={likePress} accessibilityLabel="אהבתי" style={{ alignSelf: 'flex-start', paddingTop: 6 }}>
            <Box width="100%" flexDirection="row" alignItems="center">
              <Box paddingLeft="s" style={{ marginRight: 6 }}>
                <LottieView
                  ref={lottieHeart}
                  source={require('@assets/heart-animation.json')}
                  style={{ width: 22.5 }}
                  loop={false}
                  speed={1}
                />
              </Box>
              <Ticker textStyle={{ ...styles.likeCount, color: liked ? '#eb524b' : '#999999' }}>{post.likeCount}</Ticker>
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
