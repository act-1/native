import React, { useState, useEffect } from 'react';
import { Box } from '../..';
import ContentLoader from './RecentPicturesWidgetContentLoader';
import FastImage from 'react-native-fast-image';

import { FirebaseFirestoreTypes } from '@react-native-firebase/firestore';
import { observer } from 'mobx-react-lite';
import { useStore } from '../../../stores';
import { PicturePost } from '@types/collections';

import { useNavigation } from '@react-navigation/native';
import TouchableScale from 'react-native-touchable-scale';

import HapticFeedback from 'react-native-haptic-feedback';
import { updateArrayItem } from '@utils/array-utils';

function RecentPicturesWidget() {
  const navigation = useNavigation();

  const { mediaStore } = useStore();
  const [recentPictures, setRecentPictures] = useState<PicturePost[]>([]);
  const [loadedPictures, setLoadedPictures] = useState<(true | undefined)[]>(new Array(6).fill(undefined));

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

  const onImageLoad = (imageIndex: number) => {
    setLoadedPictures((prevState) => {
      const updatedArray = updateArrayItem(prevState, imageIndex, true);
      return updatedArray;
    });
  };

  return (
    <Box paddingHorizontal="m" marginBottom="l" height={360}>
      <ContentLoader loadedPictures={loadedPictures} />
      <Box flexDirection="row" marginBottom="m">
        <TouchableScale
          activeScale={0.95}
          friction={10}
          onPressIn={() => HapticFeedback.trigger('impactLight')}
          onPressOut={() => HapticFeedback.trigger('impactLight')}
          onPress={() => navigation.navigate('RecentPictures')}
          style={{ flex: 0.65, marginRight: 12 }}
        >
          <FastImage
            source={{ uri: recentPictures[0].pictureUrl }}
            style={{ height: 236, borderRadius: 2 }}
            onLoad={() => onImageLoad(0)}
          />
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
              onLoad={() => onImageLoad(1)}
            />
          </TouchableScale>
          <TouchableScale
            activeScale={0.95}
            friction={10}
            onPress={() => navigateToPictureList(2)}
            onPressIn={() => HapticFeedback.trigger('impactLight')}
            onPressOut={() => HapticFeedback.trigger('impactLight')}
          >
            <FastImage
              source={{ uri: recentPictures[2].pictureUrl }}
              style={{ height: 112, borderRadius: 2 }}
              onLoad={() => onImageLoad(2)}
            />
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
          <FastImage
            source={{ uri: recentPictures[3].pictureUrl }}
            style={{ height: 112, borderRadius: 2 }}
            onLoad={() => onImageLoad(3)}
          />
        </TouchableScale>
        <TouchableScale
          activeScale={0.95}
          friction={10}
          onPress={() => navigateToPictureList(4)}
          onPressIn={() => HapticFeedback.trigger('impactLight')}
          onPressOut={() => HapticFeedback.trigger('impactLight')}
          style={{ flexGrow: 0.35 }}
        >
          <FastImage
            source={{ uri: recentPictures[4].pictureUrl }}
            style={{ height: 112, marginLeft: 12, borderRadius: 2 }}
            onLoad={() => onImageLoad(4)}
          />
        </TouchableScale>
        <TouchableScale
          activeScale={0.95}
          friction={10}
          onPress={() => navigateToPictureList(5)}
          onPressIn={() => HapticFeedback.trigger('impactLight')}
          onPressOut={() => HapticFeedback.trigger('impactLight')}
          style={{ flexGrow: 0.35 }}
        >
          <FastImage
            source={{ uri: recentPictures[5].pictureUrl }}
            style={{ height: 112, marginLeft: 12, borderRadius: 2 }}
            onLoad={() => onImageLoad(5)}
          />
        </TouchableScale>
      </Box>
    </Box>
  );
}

export default observer(RecentPicturesWidget);
