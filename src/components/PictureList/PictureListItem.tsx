import React, { useState, useRef } from 'react';
import { StyleSheet, Dimensions, LayoutChangeEvent, Pressable } from 'react-native';
import { Box, Text, Ticker } from '../';
import { useStore } from '../../stores';
import { useNavigation } from '@react-navigation/native';
import FastImage from 'react-native-fast-image';
import LottieView from 'lottie-react-native';
import { likePost, unlikePost } from '@services/feed';
import { PicturePost } from '@types/collections';
import Pinchable from 'react-native-pinchable';
import HapticFeedback from 'react-native-haptic-feedback';

import * as timeago from 'timeago.js';
import he from 'timeago.js/lib/lang/he';
timeago.register('he', he);

const deviceWidth = Dimensions.get('window').width;

function PictureListItem({ post, onLayout }: { post: PicturePost; onLayout: (event: LayoutChangeEvent) => void }) {
  const { feedStore } = useStore();
  const navigation = useNavigation();
  const [liked, setLiked] = useState(false);
  const lottieHeart = useRef<LottieView>(null);

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

      // updatePostLikeCount(post.id, newLikeCount);
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

  return (
    <Box onLayout={onLayout}>
      <Box flexDirection="row" alignItems="center" marginBottom="m" paddingHorizontal="s">
        <FastImage source={{ uri: post.authorPicture }} style={styles.profilePic} />
        <Box>
          <Text variant="boxTitle">{post.authorName}</Text>
          {post.locationId && (
            <Box flexDirection="row" alignItems="center">
              <Text
                variant="boxSubtitle"
                textAlign="left"
                onPress={() => navigation.navigate('LocationPage', { locationId: post.locationId })}
              >
                {post.locationName}
              </Text>
            </Box>
          )}
        </Box>
      </Box>
      <Pinchable maximumZoomScale={3.75}>
        <Box style={{ marginHorizontal: -16, marginBottom: 8 }}>
          {/* Height is calculated propotionaly to the device width */}
          <FastImage
            source={{ uri: post.pictureUrl }}
            style={{ height: post.pictureHeight / (post.pictureWidth / deviceWidth), width: '100%' }}
          />
        </Box>
      </Pinchable>
      <Box paddingHorizontal="m" flexDirection="row" alignItems="center" justifyContent="space-between" marginBottom="s">
        <Pressable onPress={likePress} accessibilityLabel="אהבתי">
          <Box flexDirection="row" alignItems="center">
            <Box style={{ marginRight: 6 }}>
              <LottieView
                ref={lottieHeart}
                source={require('@assets/heart-animation.json')}
                style={{ width: 22.5 }}
                loop={false}
                speed={1}
              />
            </Box>
            <Ticker textStyle={{ ...styles.likeCount, color: liked ? '#ec534b' : '#fff' }}>{post.likeCount}</Ticker>
          </Box>
        </Pressable>
        <Text variant="boxSubtitle" fontSize={14} textAlign="left">
          {post.createdAt && timeago.format(post.createdAt.toDate(), 'he')}
        </Text>
      </Box>
      <Box paddingHorizontal="m">
        <Text variant="text" fontSize={16} marginBottom="xm">
          {post.textContent}
        </Text>
      </Box>
    </Box>
  );
}

export default React.memo(PictureListItem);

const styles = StyleSheet.create({
  profilePic: {
    width: 42,
    height: 42,
    borderRadius: 50,
    marginRight: 8,
    borderColor: '#0a0d0f',
  },
  likeCount: {
    color: '#999999',
    fontFamily: 'AtlasDL3.1AAA-Medium',
    fontSize: 17,
  },
});
