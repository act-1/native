import React from 'react';
import { Dimensions, StyleSheet } from 'react-native';
import FastImage from 'react-native-fast-image';
import { Box } from '../../components';

function Explore({ pictures }: { pictures: Picture[] }) {
  return (
    <Box flexDirection="row" flexWrap="wrap">
      {pictures.map((picture) => (
        <FastImage style={styles.imageThumb} source={{ uri: picture.pictureUrl }} />
      ))}
    </Box>
  );
}

export default Explore;

const deviceWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
  imageThumb: {
    height: deviceWidth / 3,
    width: deviceWidth / 3,
    borderWidth: 1,
  },
});
