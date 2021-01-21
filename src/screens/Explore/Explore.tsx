import React, { Component } from 'react';
import { Dimensions, StyleSheet } from 'react-native';
import FastImage from 'react-native-fast-image';
import { Box, PictureList, Text } from '../../components';
import { ScrollView } from 'react-native-gesture-handler';
import ExploreThumbnails from './ExploreThumbnails';

const data: Picture[] = [
  {
    id: '1',
    authorName: 'גיא טפר',
    authorPicture: 'https://avatars0.githubusercontent.com/u/13344923?s=460&u=608d14c4d6c542d8f173dc2093e1763a7d18794c&v=4',
    pictureUrl:
      'https://res.cloudinary.com/onekm/image/upload/v1604266088/weekend_pictures/31-10-2020/clock-square-rabin_u5wwtg.jpg',
    likeCounter: 42,
    width: 942,
    height: 1254,
  },
  {
    id: '2',
    authorName: 'גיא טפר',
    authorPicture: 'https://avatars0.githubusercontent.com/u/13344923?s=460&u=608d14c4d6c542d8f173dc2093e1763a7d18794c&v=4',
    pictureUrl: 'https://res.cloudinary.com/onekm/image/upload/v1604264028/weekend_pictures/31-10-2020/rabin-sqaure_pmcyeu.jpg',
    likeCounter: 42,
    width: 1440,
    height: 1050,
  },
  {
    id: '3',
    authorName: 'גיא טפר',
    authorPicture: 'https://avatars0.githubusercontent.com/u/13344923?s=460&u=608d14c4d6c542d8f173dc2093e1763a7d18794c&v=4',
    pictureUrl:
      'https://res.cloudinary.com/onekm/image/upload/v1605370910/protest_pictures/AYO4DtS8ATOzWJ780tEJ/2020-11-14/o-_O8C-ztclkESiI0U5xr.jpg',
    likeCounter: 42,
    width: 1920,
    height: 1440,
  },
  {
    id: '4',
    authorName: 'גיא טפר',
    authorPicture: 'https://avatars0.githubusercontent.com/u/13344923?s=460&u=608d14c4d6c542d8f173dc2093e1763a7d18794c&v=4',
    pictureUrl:
      'https://res.cloudinary.com/onekm/image/upload/v1604779084/protest_pictures/voTcndBEKWlMmvvife42/2020-11-07/UyTcQyng-A0oEKUaYdEDj.jpg',
    likeCounter: 42,
    width: 1080,
    height: 1920,
  },
  {
    id: '44',
    authorName: 'אורן זיו',
    authorPicture:
      'https://www.mekomit.co.il/wp-content/uploads/2018/08/Oren-%D7%AA%D7%9E%D7%95%D7%A0%D7%AA%D7%9B%D7%AA%D7%91.png',
    pictureUrl:
      'https://www.mekomit.co.il/wp-content/uploads/2021/01/138494830_4018913371474425_7239211741525027616_o-e1610549049157.jpg',
    likeCounter: 42,
    width: 720,
    height: 404,
  },
];

function Explore() {
  return <ExploreThumbnails pictures={data} />;
}

export default Explore;

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