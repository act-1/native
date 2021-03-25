import React from 'react';
import { StyleSheet, Dimensions, Pressable } from 'react-native';
import { Box, Text, LikeButton } from '../';
import { useStore } from '../../stores';
import FastImage from 'react-native-fast-image';
import { likePost, unlikePost, reportPost } from '@services/feed';
import { PicturePost } from '@types/collections';
import Pinchable from 'react-native-pinchable';
import { timeAgo } from '@utils/date-utils';
import Icon from 'react-native-vector-icons/Feather';
import { useActionSheet } from '@expo/react-native-action-sheet';

const deviceWidth = Dimensions.get('window').width;
const mapPinIcon = require('@assets/icons/location-circular-icon.png');

type PictureListItemProps = {
  post: PicturePost;
  updatePostLikeCount: (postId: string, likeCount: number) => void;
  postAction: (type: PostAction, post: PicturePost) => void;
};

function PictureListItem({ post, updatePostLikeCount, postAction }: PictureListItemProps) {
  const { userStore } = useStore();
  const { showActionSheetWithOptions } = useActionSheet();

  const openPostActionSheet = () => {
    const options: { title: string; key?: 'delete' | 'report'; icon?: string; destructive?: boolean }[] = [];
    if (post.authorId === userStore.user.uid) {
      options.push({ title: 'מחיקה', key: 'delete', icon: 'trash-2', destructive: true });
    } else {
      options.push({ title: 'דיווח', key: 'report', icon: 'alert-circle', destructive: true });
    }

    options.push({ title: 'ביטול' });

    const icons = options.map((item) => {
      if (item.icon) {
        return <Icon name={item.icon as string} size={20} color={item.destructive ? '#d32f2f' : '#ededed'} />;
      } else {
        return null;
      }
    });

    const actionSheetOptions = {
      options: options.map((option) => option.title),
      icons,
      cancelButtonIndex: 1,
      textStyle: { marginLeft: -20, marginBottom: 4, color: '#ededed' },
      destructiveButtonIndex: 0,
      containerStyle: { backgroundColor: '#2a2a29' },
      showSeparators: true,
      separatorStyle: { backgroundColor: '#3b3b3b' },
    };

    const callback = (buttonIndex: number) => {
      if (buttonIndex === 0) {
        if (options[buttonIndex].key === 'delete') {
          postAction('delete', post);
        }

        if (options[buttonIndex].key === 'report') {
          postAction('report', post);
        }
      }
    };

    showActionSheetWithOptions(actionSheetOptions, callback);
  };

  return (
    <Box>
      <Box style={styles.postItemAuthorRow}>
        <Box flexDirection="row">
          <FastImage source={mapPinIcon} style={styles.profilePic} />
          <Box>
            <Text variant="boxTitle">{post.locationName}</Text>
            {post.locationCity && (
              <Box flexDirection="row" alignItems="center">
                <Text variant="boxSubtitle" textAlign="left">
                  {post.locationCity}
                </Text>
              </Box>
            )}
          </Box>
        </Box>
        <Pressable onPress={openPostActionSheet}>
          <Icon name="more-horizontal" color="#bfc7cf" size={20} />
        </Pressable>
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

      {post.text?.length! > 0 && (
        <Text color="lightText" textAlign="left" fontSize={16.5} marginBottom="xs" paddingHorizontal="m">
          {post.text}
        </Text>
      )}

      <Box paddingHorizontal="m" flexDirection="row" alignItems="center" justifyContent="space-between" marginBottom="xxm">
        <Text variant="boxSubtitle" fontSize={14} textAlign="left">
          {post.createdAt && timeAgo(post.createdAt.toDate())}
        </Text>
      </Box>
    </Box>
  );
}

export default React.memo(PictureListItem);

const styles = StyleSheet.create({
  postItemAuthorRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingLeft: 8,
    paddingRight: 16,
    marginBottom: 12,
  },
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

/**
 * Like press handler, for future implementation
 */
// const { feedStore } = useStore();

// const likePress = async () => {
//   const liked = feedStore.userPostLikes.includes(post.id);
//   try {
//     const newLikeCount = liked ? post.likeCount - 1 : post.likeCount + 1;

//     updatePostLikeCount(post.id, newLikeCount);
//     feedStore.updatePostLike(post.id, !liked);

//     const updateFunction = liked ? unlikePost : likePost;

//     await updateFunction(post.id);
//   } catch (err) {
//     feedStore.updatePostLike(post.id, !liked);
//     console.error(err); // TODO: Record to crashlytics.
//   }
// };

// render button:
/* <LikeButton onPress={likePress} liked={feedStore.userPostLikes.includes(post.id)} likeCount={post.likeCount} /> */
