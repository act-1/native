import React from 'react';
import { Dimensions, StyleSheet } from 'react-native';
import FastImage from 'react-native-fast-image';
import { IPicturePost } from '@types/post';
import { Box } from '../../components';
import { useNavigation } from '@react-navigation/native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import ContentLoader, { Rect } from 'react-content-loader/native';

const tempPics = Array.from(Array(30).keys());
const deviceWidth = Dimensions.get('window').width;
const deviceHeight = Dimensions.get('window').height;
const thumbSize = deviceWidth / 3;
const placeholderThumbSize = thumbSize - 2;

function PictureThumbList({ pictures }: { pictures: IPicturePost[] }) {
  const navigation = useNavigation();

  return (
    <Box flexDirection="row" flexWrap="wrap">
      {pictures.map((picture, index) => (
        <TouchableOpacity onPress={() => navigation.navigate('ExploreList', { initialIndex: index })} key={picture.id}>
          <FastImage style={styles.imageThumb} source={{ uri: picture.pictureUrl }} />
        </TouchableOpacity>
      ))}

      <ContentLoader
        width={deviceWidth}
        height={deviceHeight}
        backgroundColor="#222222"
        foregroundColor="#333333"
        rtl
        style={styles.contentLoaderWrapper}
      >
        <Rect x="1" y="0" width={placeholderThumbSize} height={thumbSize} strokeWidth={1} stroke="#fff" />
        <Rect x={thumbSize + 1} y="0" width={placeholderThumbSize} height={thumbSize} />
        <Rect x={thumbSize * 2 + 1} y="0" width={placeholderThumbSize} height={thumbSize} />
        <Rect x="1" y={thumbSize + 1} width={placeholderThumbSize} height={thumbSize} />
        <Rect x={thumbSize + 1} y={thumbSize + 1} width={placeholderThumbSize} height={thumbSize} />
        <Rect x={thumbSize * 2 + 1} y={thumbSize + 1} width={placeholderThumbSize} height={thumbSize} />
        <Rect x="1" y={thumbSize * 2 + 2} width={placeholderThumbSize} height={thumbSize} />
        <Rect x={thumbSize + 1} y={thumbSize * 2 + 2} width={placeholderThumbSize} height={thumbSize} />
        <Rect x={thumbSize * 2 + 1} y={thumbSize * 2 + 2} width={placeholderThumbSize} height={thumbSize} />
        <Rect x="1" y={thumbSize * 3 + 3} width={placeholderThumbSize} height={thumbSize} />
        <Rect x={thumbSize + 1} y={thumbSize * 3 + 3} width={placeholderThumbSize} height={thumbSize} />
        <Rect x={thumbSize * 2 + 1} y={thumbSize * 3 + 3} width={placeholderThumbSize} height={thumbSize} />
        <Rect x="1" y={thumbSize * 4 + 4} width={placeholderThumbSize} height={thumbSize} />
        <Rect x={thumbSize + 1} y={thumbSize * 4 + 4} width={placeholderThumbSize} height={thumbSize} />
        <Rect x={thumbSize * 2 + 1} y={thumbSize * 4 + 4} width={placeholderThumbSize} height={thumbSize} />
        <Rect x="1" y={thumbSize * 5 + 5} width={placeholderThumbSize} height={thumbSize} />
        <Rect x={thumbSize + 1} y={thumbSize * 5 + 5} width={placeholderThumbSize} height={thumbSize} />
        <Rect x={thumbSize * 2 + 1} y={thumbSize * 5 + 5} width={placeholderThumbSize} height={thumbSize} />
      </ContentLoader>
    </Box>
  );
}

export default PictureThumbList;

const styles = StyleSheet.create({
  contentLoaderWrapper: {
    position: 'absolute',
  },
  imageThumb: {
    height: thumbSize,
    width: thumbSize,
    borderWidth: 1,
  },
});
