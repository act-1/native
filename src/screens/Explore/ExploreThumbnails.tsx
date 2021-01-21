import React, { Component } from 'react';
import { Dimensions, StyleSheet } from 'react-native';
import FastImage from 'react-native-fast-image';
import { Box, Text } from '../../components';

export default class Explore extends Component {
  render() {
    return (
      <Box flexDirection="row" flexWrap="wrap">
        <FastImage
          style={styles.imageThumb}
          source={{
            uri:
              'https://res.cloudinary.com/onekm/image/upload/v1606579377/protest_pictures/nqiXhtQzjhzBTrx3Raf3/2020-11-28/kbxEsnONs8uJdPTkLhE19.jpg',
          }}
        />
        <FastImage
          style={styles.imageThumb}
          source={{
            uri:
              'https://res.cloudinary.com/onekm/image/upload/v1606577477/protest_pictures/OASal66GwOGQlFqKvqWA/2020-11-28/Zqei2e2QesBWtsaVyHJc7.jpg',
          }}
        />
        <FastImage
          style={styles.imageThumb}
          source={{
            uri:
              'https://res.cloudinary.com/onekm/image/upload/v1604779084/protest_pictures/voTcndBEKWlMmvvife42/2020-11-07/UyTcQyng-A0oEKUaYdEDj.jpg',
          }}
        />
        <FastImage
          style={styles.imageThumb}
          source={{
            uri:
              'https://res.cloudinary.com/onekm/image/upload/v1605370910/protest_pictures/AYO4DtS8ATOzWJ780tEJ/2020-11-14/o-_O8C-ztclkESiI0U5xr.jpg',
          }}
        />
      </Box>
    );
  }
}

const deviceWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
  imageThumb: {
    height: deviceWidth / 3,
    width: deviceWidth / 3,
    borderWidth: 1,
  },
});
