import React, { useState, useEffect } from 'react';
import { StyleSheet } from 'react-native';
import { Box, Text } from '../..';
import FastImage from 'react-native-fast-image';

import { FirebaseFirestoreTypes } from '@react-native-firebase/firestore';
import { observer } from 'mobx-react-lite';
import { useStore } from '../../../stores';
import { PicturePost } from '@types/collections';

import { useNavigation } from '@react-navigation/native';

// import ContentLoader, { Rect } from 'react-content-loader/native';
// const navigation = useNavigation();

function LatestPictures() {
  const { mediaStore } = useStore();
  const [recentPictures, setRecentPictures] = useState<PicturePost[]>([]);

  useEffect(() => {
    if (mediaStore.recentPictures.length > 0) {
      const picturesData: PicturePost[] = mediaStore.recentPictures.map(
        (document: FirebaseFirestoreTypes.DocumentData) => document.data() as PicturePost
      );

      const sortedPictures = picturesData.sort((a, b) => b.likeCount - a.likeCount);
      sortedPictures.forEach((l) => console.log(l.likeCount));
      setRecentPictures(sortedPictures);
    }
  }, [mediaStore.recentPictures]);

  useEffect(() => {
    mediaStore.getRecentPictures({ limit: 5 });
  }, [mediaStore]);

  if (recentPictures.length === 0) {
    return null;
  }

  return (
    <Box paddingHorizontal="m" marginBottom="l">
      <Box flexDirection="row" marginBottom="m">
        <FastImage source={{ uri: recentPictures[0].pictureUrl }} style={{ flex: 0.63, height: 236 }} />

        <Box flex={0.37}>
          <FastImage source={{ uri: recentPictures[1].pictureUrl }} style={{ height: 112, marginLeft: 12, marginBottom: 12 }} />
          <FastImage source={{ uri: recentPictures[2].pictureUrl }} style={{ height: 112, marginLeft: 12 }} />
        </Box>
      </Box>
      <Box flexDirection="row" flex={1}>
        <FastImage source={{ uri: recentPictures[3].pictureUrl }} style={{ flex: 0.9, height: 112 }} />

        <FastImage
          source={{
            uri: recentPictures[4].pictureUrl,
          }}
          style={{ flex: 0.9, height: 112, marginLeft: 12 }}
        />

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
      </Box>
    </Box>
  );
}

export default observer(LatestPictures);

const styles = StyleSheet.create({
  latestPicture: {
    borderRadius: 4,
  },
  morePicturesBox: {
    borderColor: '#222222',
    borderWidth: 2,
    borderRadius: 4,
  },
});
