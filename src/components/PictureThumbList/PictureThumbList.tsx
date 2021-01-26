import React, { useEffect, useState } from 'react';
import { FlatList, Dimensions, StyleSheet, Platform } from 'react-native';
import FastImage from 'react-native-fast-image';
import { IPicturePost } from '@types/post';
import { Box } from '../../components';
import { toJS } from 'mobx';
import { useNavigation } from '@react-navigation/native';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import ContentLoader, { Rect } from 'react-content-loader/native';

const tempPics = Array.from(Array(30).keys());
const deviceWidth = Dimensions.get('window').width;
const deviceHeight = Dimensions.get('window').height;
const thumbSize = deviceWidth / 3;
const placeholderThumbSize = thumbSize - 2;

const placeholderThumb = (index: number, loadedImages: number[]) => {
  if (loadedImages.includes(index)) return null;

  // Default x & y values for the first thumb in the row.
  let x = 1;
  let y = 1;

  // For the second thumb in the row.
  if (index % 3 === 2) {
    x = thumbSize + 1; // +1 to cover the image thumb stroke.
  }

  // 3rd thumb in the row.
  if (index % 3 === 0) {
    // +1 to cover the image thumb stroke.
    x = thumbSize * 2 + 1;
  }

  // Get the current row index.
  const row = Math.floor(index / 3 - 0.01); // 0.01 is a hack to revert full numbers to the previous line.

  if (row > 0) {
    y = thumbSize * row + 1; // Set the y axis to accomodate the thumbSize and the stroke
  }

  return <Rect x={x} y={y} width={placeholderThumbSize} height={placeholderThumbSize} key={index} />;
};

function PictureThumbList({ pictures }: { pictures: IPicturePost[] }) {
  const navigation = useNavigation();
  const [loadedImages, setLoadedImages] = useState<number[]>([]);

  useEffect(() => {
    setLoadedImages([]);
  }, []);

  const renderThumbItem = ({ item, index }: { item: IPicturePost; index: number }) => (
    <TouchableOpacity onPress={() => navigation.navigate('ExploreList', { initialIndex: index })}>
      <FastImage
        style={styles.imageThumb}
        source={{ uri: item.pictureUrl }}
        onLoad={() => setLoadedImages((prevState) => [...prevState, index + 1])}
      />
    </TouchableOpacity>
  );
  const standardPicturesArray = toJS(pictures);
  console.log(loadedImages.length, pictures.length);
  console.log(loadedImages.length >= pictures.length);
  return (
    <Box>
      <FlatList
        data={standardPicturesArray}
        numColumns={3}
        renderItem={renderThumbItem}
        style={{ zIndex: 3 }}
        ListFooterComponent={() => <Box />}
        ListFooterComponentStyle={{ height: Platform.OS === 'android' ? 150 : 190 }}
      />

      {loadedImages.length < pictures.length && (
        <ContentLoader
          width={deviceWidth}
          height={deviceHeight}
          backgroundColor="#222222"
          foregroundColor="#333333"
          rtl
          style={styles.contentLoaderWrapper}
        >
          {pictures.map((_, index) => placeholderThumb(index + 1, loadedImages))}
        </ContentLoader>
      )}

      {pictures.length === 0 && (
        <ContentLoader
          width={deviceWidth}
          height={deviceHeight}
          backgroundColor="#222222"
          foregroundColor="#333333"
          rtl
          style={styles.contentLoaderWrapper}
        >
          {tempPics.map((_, index) => placeholderThumb(index + 1, loadedImages))}
        </ContentLoader>
      )}
    </Box>
  );
}

export default PictureThumbList;

const styles = StyleSheet.create({
  contentLoaderWrapper: {
    position: 'absolute',
    zIndex: 1,
  },
  imageThumb: {
    height: thumbSize,
    width: thumbSize,
    borderWidth: 1,
  },
});

{
  /* <Rect x="1" y="0" width={placeholderThumWidth} height={placeholderThumHeight} strokeWidth={1} stroke="#fff" />
        <Rect x={thumbSize + 1} y="0" width={placeholderThumWidth} height={placeholderThumHeight} />
        <Rect x={thumbSize * 2 + 1} y="0" width={placeholderThumWidth} height={placeholderThumHeight} />
        <Rect x="1" y={thumbSize + 1} width={placeholderThumWidth} height={placeholderThumHeight} />
        <Rect x={thumbSize + 1} y={thumbSize + 1} width={placeholderThumWidth} height={placeholderThumHeight} />
        <Rect x={thumbSize * 2 + 1} y={thumbSize + 1} width={placeholderThumWidth} height={placeholderThumHeight} />
        <Rect x="1" y={thumbSize * 2 + 2} width={placeholderThumWidth} height={placeholderThumHeight} />
        <Rect x={thumbSize + 1} y={thumbSize * 2 + 2} width={placeholderThumWidth} height={placeholderThumHeight} />
        <Rect x={thumbSize * 2 + 1} y={thumbSize * 2 + 2} width={placeholderThumWidth} height={placeholderThumHeight} />
        <Rect x="1" y={thumbSize * 3 + 3} width={placeholderThumWidth} height={placeholderThumHeight} />
        <Rect x={thumbSize + 1} y={thumbSize * 3 + 3} width={placeholderThumWidth} height={placeholderThumHeight} />
        <Rect x={thumbSize * 2 + 1} y={thumbSize * 3 + 3} width={placeholderThumWidth} height={placeholderThumHeight} />
        <Rect x="1" y={thumbSize * 4 + 4} width={placeholderThumWidth} height={placeholderThumHeight} />
        <Rect x={thumbSize + 1} y={thumbSize * 4 + 4} width={placeholderThumWidth} height={placeholderThumHeight} />
        <Rect x={thumbSize * 2 + 1} y={thumbSize * 4 + 4} width={placeholderThumWidth} height={placeholderThumHeight} />
        <Rect x="1" y={thumbSize * 5 + 5} width={placeholderThumWidth} height={placeholderThumHeight} />
        <Rect x={thumbSize + 1} y={thumbSize * 5 + 5} width={placeholderThumWidth} height={placeholderThumHeight} />
        <Rect x={thumbSize * 2 + 1} y={thumbSize * 5 + 5} width={placeholderThumWidth} height={placeholderThumHeight} /> */
}
