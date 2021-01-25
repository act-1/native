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

function PictureThumbList({ pictures }: { pictures: IPicturePost[] }) {
  const navigation = useNavigation();

  return (
    <Box flexDirection="row" flexWrap="wrap">
      {/* {pictures.map((picture, index) => (
        <TouchableOpacity onPress={() => navigation.navigate('ExploreList', { initialIndex: index })} key={picture.id}>
          <FastImage style={styles.imageThumb} source={{ uri: picture.pictureUrl }} />
        </TouchableOpacity>
      ))} */}
      {/* {tempPics.map(() => (
        <Box backgroundColor="sectionListSeperator" height={thumbSize} width={thumbSize} borderWidth={1}>
          <ContentLoader height={thumbSize} width={thumbSize} backgroundColor="#222222" foregroundColor="#333333" rtl>
            <Rect x="0" y="0" rx="3" ry="3" width="300" height="300" />
          </ContentLoader>
        </Box>
      ))} */}

      <ContentLoader width={deviceWidth} height={deviceHeight} backgroundColor="#222222" foregroundColor="#333333" rtl>
        <Rect x="0" y="0" rx="2" ry="2" width={thumbSize} height={thumbSize} />
        <Rect x={thumbSize + 1} y="0" rx="2" ry="2" width={thumbSize} height={thumbSize} />
        <Rect x={thumbSize * 2 + 2} y="0" rx="2" ry="2" width={thumbSize} height={thumbSize} />
        <Rect x="0" y={thumbSize + 1} rx="2" ry="2" width={thumbSize} height={thumbSize} />
        <Rect x={thumbSize + 1} y={thumbSize + 1} rx="2" ry="2" width={thumbSize} height={thumbSize} />
        <Rect x={thumbSize * 2 + 2} y={thumbSize + 1} rx="2" ry="2" width={thumbSize} height={thumbSize} />
        <Rect x="0" y={thumbSize * 2 + 2} rx="2" ry="2" width={thumbSize} height={thumbSize} />
        <Rect x={thumbSize + 1} y={thumbSize * 2 + 2} rx="2" ry="2" width={thumbSize} height={thumbSize} />
        <Rect x={thumbSize * 2 + 2} y={thumbSize * 2 + 2} rx="2" ry="2" width={thumbSize} height={thumbSize} />
      </ContentLoader>
    </Box>
  );
}

export default PictureThumbList;

const styles = StyleSheet.create({
  imageThumb: {
    height: thumbSize,
    width: thumbSize,
    borderWidth: 1,
  },
});
