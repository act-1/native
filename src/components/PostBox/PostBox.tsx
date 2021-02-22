import React from 'react';
import { StyleSheet, Platform } from 'react-native';
import { observer } from 'mobx-react-lite';
import { useStore } from '../../stores';
import FastImage from 'react-native-fast-image';
import { Box, Text, LikeButton } from '../../components';
import { ChatMessage } from '@types/collections';
import { likePost, unlikePost } from '@services/feed';
import { scale } from 'react-native-size-matters';
import PostBoxBubble from './PostBoxBubble';
import { ContextMenuView } from 'react-native-ios-context-menu';

import { TouchableNativeFeedback, TouchableOpacity } from 'react-native-gesture-handler';
import { useActionSheet } from '@expo/react-native-action-sheet';
import Icon from 'react-native-vector-icons/Feather';
import Clipboard from '@react-native-clipboard/clipboard';

import * as timeago from 'timeago.js';
import he from 'timeago.js/lib/lang/he';
timeago.register('he', he);

type PostBoxProps = {
  message: ChatMessage;
  onPicturePress: (url: string) => void;
  updatePostLikeCount: (postId: string, likeCount: number) => void;
  archivePost: (postId: string) => void;
};

const copyToClipboard = (text: string) => {
  Clipboard.setString(text);
};

const textFontSize = Platform.select({ ios: 17.5, android: 16 });

function PostBox({ message, onPicturePress, updatePostLikeCount, archivePost }: PostBoxProps) {
  const { userStore, feedStore } = useStore();

  const { showActionSheetWithOptions } = useActionSheet();

  const menuItems = React.useMemo(() => {
    const items = [];

    if (message.text === '') {
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

    if (message.authorId === userStore.user?.uid) {
      items.push({
        actionKey: 'delete',
        actionTitle: 'מחיקה',
        menuAttributes: ['destructive'], // <- make menu action "destructive"
        icon: {
          iconType: 'SYSTEM',
          iconValue: 'trash.fill',
          androidIcon: 'trash-2',
        },
      });
    }
    return items;
  }, []);

  const likePress = async () => {
    const liked = feedStore.userPostLikes.includes(message.id);

    try {
      const newLikeCount = liked ? message.likeCount - 1 : message.likeCount + 1;

      updatePostLikeCount(message.id, newLikeCount);
      feedStore.updatePostLike(message.id, !liked);

      const updateFunction = liked ? unlikePost : likePost;

      await updateFunction(message.id);
    } catch (err) {
      feedStore.updatePostLike(message.id, !liked);
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
      destructiveButtonIndex: options.length - 1 === 0 ? null : options.length - 1,
      containerStyle: { backgroundColor: '#2a2a29' },
      showSeparators: true,
      separatorStyle: { backgroundColor: '#3b3b3b' },
    };

    const callback = (buttonIndex: number) => {
      if (buttonIndex > menuItems.length) return; // When pressing outside the action sheet, the buttonIndex is `options.length + 1` - outside the bounds of the menu items
      if (menuItems[buttonIndex].actionKey === 'copy' && message.type === 'text') {
        copyToClipboard(message.text);
      } else if (menuItems[buttonIndex].actionKey === 'delete') {
        archivePost(message.id);
      }
    };

    showActionSheetWithOptions(actionSheetOptions, callback);
  };

  return (
    <Box alignItems="flex-start" marginBottom="s">
      <Box flexDirection="row" paddingHorizontal="xm">
        <Box marginTop="m" style={{ marginLeft: 0 }}>
          <ContextMenuView
            onPressMenuItem={({ nativeEvent }: { nativeEvent: { actionKey: string } }) => {
              if (nativeEvent.actionKey === 'copy' && message.type === 'text') {
                copyToClipboard(message.text);
              }
              if (nativeEvent.actionKey === 'delete') {
                archivePost(message.id);
              }
            }}
            menuConfig={{
              menuTitle: '',
              menuItems,
            }}
            style={{ marginRight: 42.5 }}
          >
            <TouchableNativeFeedback onLongPress={openPostActionSheet}>
              <PostBoxBubble direction={userStore.user?.uid === message.authorId ? 'right' : 'left'}>
                {message.type === 'picture' && (
                  <TouchableOpacity onPress={() => onPicturePress(message.pictureUrl)} activeOpacity={0.7}>
                    <FastImage
                      source={{ uri: message.pictureUrl }}
                      style={[
                        styles.postPicture,
                        {
                          height:
                            message.pictureHeight /
                            (message.pictureWidth / (message.pictureWidth > message.pictureHeight ? scale(245) : scale(130))),
                          width: message.pictureWidth > message.pictureHeight ? scale(245) : scale(130),
                          marginBottom: message.text ? 6 : 0,
                        },
                      ]}
                    />
                  </TouchableOpacity>
                )}

                <Box paddingRight="xxl" marginBottom="xs">
                  {message.text?.length! > 0 && (
                    <Text color="mainForeground" fontSize={textFontSize} textAlign="left">
                      {message.text}
                    </Text>
                  )}
                </Box>

                <Box flexDirection="row" alignItems="center" opacity={0.95}>
                  <Text color="lightText" fontFamily="AtlasDL3.1AAA-Medium" fontSize={14} style={{ marginRight: 6 }}>
                    {message.authorName}
                  </Text>
                  <Text variant="boxSubtitle" textAlign="right" fontSize={14}>
                    {timeago.format(message.createdAt, 'he')}
                  </Text>
                </Box>
              </PostBoxBubble>
            </TouchableNativeFeedback>
          </ContextMenuView>
          <Box position="absolute" right={0} bottom={0}>
            {userStore.user?.uid !== message.authorId && (
              <FastImage source={{ uri: message.authorPicture }} style={styles.authorImage} />
            )}
          </Box>

          {/* <LikeButton
              onPress={likePress}
              liked={feedStore.userPostLikes.includes(message.id)}
              likeCount={message.likeCount}
              style={{ alignSelf: 'flex-start', paddingTop: 6 }}
            /> */}
        </Box>
      </Box>
    </Box>
  );
}

export default React.memo(observer(PostBox));

const styles = StyleSheet.create({
  authorImage: {
    width: 35,
    height: 35,
    borderRadius: 25,
    alignSelf: 'flex-end',
  },
  postPicture: {
    marginHorizontal: -12,
    marginTop: -15,
    zIndex: 1,
    borderTopRightRadius: 25,
    borderTopLeftRadius: 25,
  },
});
