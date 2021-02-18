import React, { useState, useEffect } from 'react';
import { Platform, StyleSheet } from 'react-native';
import { Box, Text } from '../..';
import FastImage from 'react-native-fast-image';

import { FirebaseFirestoreTypes } from '@react-native-firebase/firestore';
import { observer } from 'mobx-react-lite';
import { useStore } from '../../../stores';
import { PicturePost } from '@types/collections';

import { useNavigation } from '@react-navigation/native';
import { TouchableNativeFeedback } from 'react-native-gesture-handler';
import TouchableScale from 'react-native-touchable-scale';

import HapticFeedback from 'react-native-haptic-feedback';

// import ContentLoader, { Rect } from 'react-content-loader/native';

function RecentPicturesWidget() {
  const navigation = useNavigation();

  const { mediaStore } = useStore();
  const [recentPictures, setRecentPictures] = useState<PicturePost[]>([]);

  const navigateToPictureList = (pictureIndex: number) => {
    navigation.navigate('RecentPictures', { initialIndex: pictureIndex });
  };

  useEffect(() => {
    if (mediaStore.recentPictures.length > 0) {
      const picturesData: PicturePost[] = mediaStore.recentPictures.map(
        (document: FirebaseFirestoreTypes.DocumentData) => document.data() as PicturePost
      );

      setRecentPictures(picturesData);
    }
  }, [mediaStore.recentPictures]);

  useEffect(() => {
    mediaStore.getRecentPictures({ limit: 6 });
  }, [mediaStore]);

  if (recentPictures.length === 0) {
    return null;
  }

  return (
    <Box paddingHorizontal="m" marginBottom="l">
      <Box flexDirection="row" marginBottom="m">
        <TouchableScale
          activeScale={0.95}
          friction={10}
          onPressIn={() => HapticFeedback.trigger('impactLight')}
          onPressOut={() => HapticFeedback.trigger('impactLight')}
          onPress={() => navigation.navigate('RecentPictures')}
          style={{ flex: 0.65, marginRight: 12 }}
        >
          <FastImage source={{ uri: recentPictures[0].pictureUrl }} style={{ height: 236, borderRadius: 2 }} />
        </TouchableScale>
        <Box flex={0.32} style={{ marginRight: -12 }}>
          <TouchableScale
            activeScale={0.95}
            friction={10}
            onPress={() => navigateToPictureList(1)}
            onPressIn={() => HapticFeedback.trigger('impactLight')}
            onPressOut={() => HapticFeedback.trigger('impactLight')}
          >
            <FastImage
              source={{ uri: recentPictures[1].pictureUrl }}
              style={{ height: 112, marginBottom: 12, borderRadius: 2 }}
            />
          </TouchableScale>
          <TouchableScale
            activeScale={0.95}
            friction={10}
            onPress={() => navigateToPictureList(2)}
            onPressIn={() => HapticFeedback.trigger('impactLight')}
            onPressOut={() => HapticFeedback.trigger('impactLight')}
          >
            <FastImage source={{ uri: recentPictures[2].pictureUrl }} style={{ height: 112, borderRadius: 2 }} />
          </TouchableScale>
        </Box>
      </Box>
      <Box flexDirection="row" flex={1} justifyContent="space-between">
        <TouchableScale
          activeScale={0.95}
          friction={10}
          onPress={() => navigateToPictureList(3)}
          onPressIn={() => HapticFeedback.trigger('impactLight')}
          onPressOut={() => HapticFeedback.trigger('impactLight')}
          style={{ flexGrow: 0.35 }}
        >
          <FastImage source={{ uri: recentPictures[3].pictureUrl }} style={{ height: 112, borderRadius: 2 }} />
        </TouchableScale>
        <TouchableScale
          activeScale={0.95}
          friction={10}
          onPress={() => navigateToPictureList(4)}
          onPressIn={() => HapticFeedback.trigger('impactLight')}
          onPressOut={() => HapticFeedback.trigger('impactLight')}
          style={{ flexGrow: 0.35 }}
        >
          <FastImage source={{ uri: recentPictures[4].pictureUrl }} style={{ height: 112, marginLeft: 12, borderRadius: 2 }} />
        </TouchableScale>
        <TouchableScale
          activeScale={0.95}
          friction={10}
          onPress={() => navigateToPictureList(5)}
          onPressIn={() => HapticFeedback.trigger('impactLight')}
          onPressOut={() => HapticFeedback.trigger('impactLight')}
          style={{ flexGrow: 0.35 }}
        >
          <FastImage source={{ uri: recentPictures[5].pictureUrl }} style={{ height: 112, marginLeft: 12, borderRadius: 2 }} />
        </TouchableScale>
        {/* <TouchableNativeFeedback onPress={() => navigation.navigate('RecentPictures')}>
          <Box
            style={styles.morePicturesBox}
            flex={1}
            marginLeft="m"
            alignItems="center"
            justifyContent="center"
            borderColor="seperator"
          >
            <Text variant="boxTitle" fontSize={14} textAlign="center">
              לכל התמונות
            </Text>
          </Box>
        </TouchableNativeFeedback> */}
      </Box>
    </Box>
  );
}

export default observer(RecentPicturesWidget);

const styles = StyleSheet.create({
  latestPicture: {
    borderRadius: 4,
  },
  morePicturesBox: {
    height: 112,
    minWidth: Platform.select({ android: 112, ios: null }),
    borderColor: '#222222',
    borderWidth: 2,
    borderRadius: 4,
  },
});
