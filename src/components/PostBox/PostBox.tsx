import React, { useState, useEffect, useRef } from 'react';
import { Pressable, StyleSheet } from 'react-native';
import { observer } from 'mobx-react-lite';
import { useStore } from '../../stores';
import FastImage from 'react-native-fast-image';
import LottieView from 'lottie-react-native';
import HapticFeedback from 'react-native-haptic-feedback';
import { Box, Text, Ticker } from '../../components';
import { Post } from '@types/collections';
import { likePost, unlikePost } from '@services/feed';
import { scale } from 'react-native-size-matters';
import PostBoxBubble from './PostBoxBubble';
import { ContextMenuView } from 'react-native-ios-context-menu';

import { useActionSheet } from '@expo/react-native-action-sheet';
import Icon from 'react-native-vector-icons/Feather';
import Clipboard from '@react-native-clipboard/clipboard';

import * as timeago from 'timeago.js';
import he from 'timeago.js/lib/lang/he';
import { TouchableNativeFeedback, TouchableOpacity } from 'react-native-gesture-handler';
timeago.register('he', he);

type PostBoxProps = {
  post: Post;
  onPicturePress: (url: string) => void;
  updatePostLikeCount: (postId: string, likeCount: number) => void;
  archivePost: (postId: string) => void;
};

const copyToClipboard = (text: string) => {
  Clipboard.setString(text);
};

function PostBox({ post, onPicturePress, updatePostLikeCount, archivePost }: PostBoxProps) {
  const [liked, setLiked] = useState(false);
  const lottieHeart = useRef<LottieView>(null);

  const { userStore, feedStore } = useStore();

  const { showActionSheetWithOptions } = useActionSheet();

  const menuItems = React.useMemo(() => {
    const items = [];

    if (post.type === 'picture') {
      // items.push({
      //   actionKey: 'save-image',
      //   actionTitle: 'שמירת תמונה',
      //   icon: {
      //     iconType: 'SYSTEM',
      //     iconValue: 'square.and.arrow.down.fill',
      //   },
      // });
    }

    if (post.type === 'text') {
      items.push({
        actionKey: 'copy',
        actionTitle: 'העתקה',
        icon: {
          iconType: 'SYSTEM',
          iconValue: 'doc.on.doc.fill',
          androidIcon: 'copy',
        },
      });
    }

    if (post.authorId === userStore.user?.uid) {
      items.push({
        actionKey: 'delete',
        actionTitle: 'מחיקה',
        menuAttributes: ['destructive'], // <- make menu action "destructive"
        icon: {
          iconType: 'SYSTEM',
          iconValue: 'trash.circle.fill',
          androidIcon: 'trash-2',
        },
      });
    } else {
      items.push({
        actionKey: 'report',
        menuAttributes: ['destructive'],
        actionTitle: 'דיווח',
        icon: {
          iconType: 'SYSTEM',
          iconValue: 'exclamationmark.bubble.fill',
        },
      });
    }

    return items;
  }, []);

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

  // Relevant only for android devices
  const openPostActionSheet = () => {
    const options = menuItems.map((item) => item.actionTitle);
    const icons = menuItems.map((item) => (
      <Icon
        name={item.icon.androidIcon as string}
        size={20}
        color={item.menuAttributes?.includes('destructive') ? '#d32f2f' : '#ededed'}
      />
    ));

    const actionSheetOptions = {
      options,
      icons,
      cancelButtonIndex: 3,
      textStyle: { marginLeft: -20, marginBottom: 4, color: '#ededed' },
      destructiveButtonIndex: options.length - 1,
      containerStyle: { backgroundColor: '#2a2a29' },
      showSeparators: true,
      separatorStyle: { backgroundColor: '#3b3b3b' },
    };

    const callback = (buttonIndex: number) => {
      if (buttonIndex > menuItems.length) return; // When pressing outside the action sheet, the buttonIndex is `options.length + 1` - outside the bounds of the menu items
      if (menuItems[buttonIndex].actionKey === 'copy' && post.type === 'text') {
        copyToClipboard(post.textContent);
      } else if (menuItems[buttonIndex].actionKey === 'delete') {
        archivePost(post.id);
      }
    };

    showActionSheetWithOptions(actionSheetOptions, callback);
  };

  useEffect(() => {
    if (feedStore.userPostLikes.includes(post.id)) {
      setLiked(true);
      lottieHeart.current!.play(17, 18);
    }
  }, []);
  return (
    <ContextMenuView
      onPressMenuItem={({ nativeEvent }: { nativeEvent: { actionKey: string } }) => {
        if (nativeEvent.actionKey === 'copy' && post.type === 'text') {
          copyToClipboard(post.textContent);
        }
        if (nativeEvent.actionKey === 'delete') {
          archivePost(post.id);
        }
      }}
      menuConfig={{
        menuTitle: '',
        menuItems,
      }}
    >
      <Box alignItems="flex-start" marginBottom="s">
        <Box flexDirection="row" paddingHorizontal="xm">
          <FastImage source={{ uri: post.authorPicture }} style={styles.authorImage} />
          <Box marginTop="m" style={{ marginLeft: 10 }}>
            <TouchableNativeFeedback onLongPress={openPostActionSheet}>
              <PostBoxBubble>
                {post.type === 'picture' && (
                  <TouchableOpacity onPress={() => onPicturePress(post.pictureUrl)} activeOpacity={0.7}>
                    <FastImage
                      source={{ uri: post.pictureUrl }}
                      style={[
                        styles.postPicture,
                        {
                          height: post.pictureHeight / (post.pictureWidth / scale(205)),
                          marginBottom: post.textContent ? 6 : 0,
                        },
                      ]}
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
              </PostBoxBubble>
            </TouchableNativeFeedback>

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
    </ContextMenuView>
  );
}

export default React.memo(observer(PostBox));

const styles = StyleSheet.create({
  authorImage: {
    width: 40,
    height: 40,
    borderRadius: 25,
    alignSelf: 'flex-end',
  },
  postPicture: {
    width: scale(265),
    marginHorizontal: -12,
    marginTop: -15,
    zIndex: 1,
    borderTopRightRadius: 25,
    borderTopLeftRadius: 25,
  },
  likeCount: {
    color: '#999999',
    fontFamily: 'AtlasDL3.1AAA-Medium',
    fontSize: 16,
  },
});
