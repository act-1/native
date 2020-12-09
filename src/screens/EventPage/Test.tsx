import React from 'react';
import { StyleSheet, StatusBar, Image } from 'react-native';
import { Box, Text } from '../../components';
// import { default as HeaderImageScrollView } from 'react-native-image-header-scroll-view';
const HeaderImageScrollView: any = require('react-native-image-header-scroll-view');
// const HeaderImageScrollViewHAHA = () => <HeaderImageScrollView.default />;

function Test() {
  return (
    <HeaderImageScrollView>
      <Text>Hi!</Text>
    </HeaderImageScrollView>
  );
}
