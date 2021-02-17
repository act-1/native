import React from 'react';
import { StyleSheet, Dimensions } from 'react-native';
import { Box, Text, LikeButton } from '../';
import { useStore } from '../../stores';
import { useNavigation } from '@react-navigation/native';
import FastImage from 'react-native-fast-image';
import { likePost, unlikePost } from '@services/feed';
import { PicturePost } from '@types/collections';
import Pinchable from 'react-native-pinchable';

import * as timeago from 'timeago.js';
import he from 'timeago.js/lib/lang/he';
timeago.register('he', he);

const deviceWidth = Dimensions.get('window').width;

function PictureListItem({
  post,
  updatePostLikeCount,
}: {
  post: PicturePost;
  updatePostLikeCount: (postId: string, likeCount: number) => void;
}) {
  const { feedStore } = useStore();
  const navigation = useNavigation();

  const likePress = async () => {
    const liked = feedStore.userPostLikes.includes(post.id);
    try {
      const newLikeCount = liked ? post.likeCount - 1 : post.likeCount + 1;

      updatePostLikeCount(post.id, newLikeCount);
      feedStore.updatePostLike(post.id, !liked);

      const updateFunction = liked ? unlikePost : likePost;

      await updateFunction(post.id);
    } catch (err) {
      feedStore.updatePostLike(post.id, !liked);
      console.error(err); // TODO: Record to crashlytics.
    }
  };

  return (
    <Box>
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
      <Box paddingRight="m" flexDirection="row" alignItems="center" justifyContent="space-between" marginBottom="s">
        <LikeButton onPress={likePress} liked={feedStore.userPostLikes.includes(post.id)} likeCount={post.likeCount} />
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
