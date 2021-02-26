import React from 'react';
import { ScrollView, StyleSheet, ViewStyle } from 'react-native';
import { Box, Text } from '../../components';
import FastImage from 'react-native-fast-image';
import { PicturePost } from '@types/collections';
import TouchableScale from 'react-native-touchable-scale';
import { timeAgo } from '@utils/date-utils';

type ScrollablePicturesProps = {
  pictures: PicturePost[];
  onPicturePress: (index: number) => void;
  style?: ViewStyle;
};

function ScrollablePictures({ pictures, onPicturePress, style }: ScrollablePicturesProps) {
  return (
    <Box padding="m" marginBottom="m" style={style}>
      <Text variant="largeTitle" marginBottom="m">
        תמונות אחרונות
      </Text>
      <ScrollView contentContainerStyle={styles.scrollablePictures} showsHorizontalScrollIndicator={false} horizontal={true}>
        {pictures.map((picture, index) => (
          <TouchableScale
            activeScale={0.96}
            friction={20}
            style={styles.pictureWrapper}
            key={picture.id}
            onPress={() => onPicturePress(index)}
          >
            <FastImage source={{ uri: picture.pictureUrl }} style={styles.picture} />
            <Text variant="boxSubtitle">{timeAgo(picture.createdAt.toDate())}</Text>
          </TouchableScale>
        ))}
      </ScrollView>
    </Box>
  );
}

export default ScrollablePictures;

const styles = StyleSheet.create({
  scrollablePictures: { minWidth: '100%' },
  pictureWrapper: { marginRight: 12 },
  picture: { width: 225, height: 225, marginBottom: 4, borderRadius: 4 },
});
