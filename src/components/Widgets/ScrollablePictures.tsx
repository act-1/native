import React from 'react';
import { ScrollView, StyleSheet, ViewStyle } from 'react-native';
import { Box, Text } from '../../components';
import FastImage from 'react-native-fast-image';
import { PicturePost } from '@types/collections';
import TouchableScale from 'react-native-touchable-scale';

type ScrollablePicturesProps = {
  pictures: PicturePost[];
  style?: ViewStyle;
};

function ScrollablePictures({ pictures, style }: ScrollablePicturesProps) {
  return (
    <Box padding="m" marginBottom="m" style={style}>
      <Text variant="largeTitle" marginBottom="m">
        תמונות אחרונות
      </Text>
      <ScrollView contentContainerStyle={styles.scrollablePictures} showsHorizontalScrollIndicator={false} horizontal={true}>
        {pictures.map((picture) => (
          <TouchableScale activeScale={0.96} friction={20} style={styles.pictureWrapper} key={picture.id}>
            <FastImage source={{ uri: picture.pictureUrl }} style={styles.picture} />
            <Text variant="boxSubtitle">לפני 12 דק'</Text>
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
