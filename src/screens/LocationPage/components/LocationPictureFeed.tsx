import React, { Component } from 'react';
import { StyleSheet } from 'react-native';
import FastImage from 'react-native-fast-image';
import { PictureList } from '@components';
import Icon from 'react-native-vector-icons/Feather';
import { IPicturePost } from '@types/post';

function LocationPictureFeed({ pictures }: { pictures: IPicturePost[] }) {
  return <PictureList pictures={pictures} />;
}

export default LocationPictureFeed;

const styles = StyleSheet.create({
  profilePic: {
    width: 42,
    height: 42,
    borderRadius: 50,
    marginRight: 8,
    borderColor: '#0a0d0f',
  },
  likeCount: {
    color: '#999999',
    fontFamily: 'AtlasDL3.1AAA-Medium',
    fontSize: 16,
  },
});
