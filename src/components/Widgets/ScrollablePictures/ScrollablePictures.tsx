import React from 'react';
import { ScrollView, StyleSheet, ViewStyle } from 'react-native';
import { Box, Text } from '../../../components';
import FastImage from 'react-native-fast-image';
import { PicturePost } from '@types/collections';
import TouchableScale from 'react-native-touchable-scale';
import { timeAgo } from '@utils/date-utils';

type ScrollablePicturesProps = {
  pictures: PicturePost[];
  onPicturePress: (index: number) => void;
  size: 'small' | 'large';
  style?: ViewStyle;
};

function ScrollablePictures({ pictures, onPicturePress, size, style }: ScrollablePicturesProps) {
  const pictureSize = size === 'large' ? styles.largePicture : styles.smallPicture;

  return (
    <ScrollView
      contentContainerStyle={[styles.scrollablePictures, style]}
      showsHorizontalScrollIndicator={false}
      horizontal={true}
    >
      {pictures.map((picture, index) => (
        <TouchableScale
          activeScale={0.96}
          friction={20}
          style={styles.pictureWrapper}
          key={picture.id}
          onPress={() => onPicturePress(index)}
        >
          <FastImage source={{ uri: picture.pictureUrl }} style={[styles.picture, pictureSize]} />
          <Text variant="boxSubtitle">{timeAgo(picture.createdAt.toDate())}</Text>
        </TouchableScale>
      ))}
    </ScrollView>
  );
}

export default ScrollablePictures;

const styles = StyleSheet.create({
  scrollablePictures: { minWidth: '100%', paddingLeft: 12 },
  pictureWrapper: { marginRight: 12 },
  picture: { marginBottom: 4, borderRadius: 4, elevation: 6 },
  largePicture: { width: 225, height: 225 },
  smallPicture: { width: 125, height: 125 },
});
