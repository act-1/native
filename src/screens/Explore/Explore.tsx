import React from 'react';
import { SafeAreaView } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { Box, Text, PictureThumbList } from '../../components';
import Icon from 'react-native-vector-icons/Feather';

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
  return (
    <Box>
      <SafeAreaView />
      <ScrollView
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingTop: 8, paddingBottom: 8, paddingHorizontal: 8 }}
      >
        <Box
          borderWidth={1}
          backgroundColor="primaryColor"
          paddingHorizontal="xm"
          paddingVertical="xs"
          borderColor="seperator"
          borderRadius={5}
          marginRight="s"
          flexDirection="row"
          alignItems="center"
        >
          <Text variant="text" fontSize={14} fontWeight="600">
            נבחרות
          </Text>
        </Box>
        <Box borderWidth={1} paddingHorizontal="xm" paddingVertical="xs" borderColor="seperator" borderRadius={5} marginRight="s">
          <Text variant="text" fontSize={14} fontWeight="600">
            אחרונות
          </Text>
        </Box>
        <Box borderWidth={1} paddingHorizontal="xm" paddingVertical="xs" borderColor="seperator" borderRadius={5} marginRight="s">
          <Text variant="text" fontSize={14} fontWeight="600">
            באיזורי
          </Text>
        </Box>
        <Box borderWidth={1} paddingHorizontal="xm" paddingVertical="xs" borderColor="seperator" borderRadius={5} marginRight="s">
          <Text variant="text" fontSize={14} fontWeight="600">
            ירושלים
          </Text>
        </Box>
        <Box borderWidth={1} paddingHorizontal="xm" paddingVertical="xs" borderColor="seperator" borderRadius={5} marginRight="s">
          <Text variant="text" fontSize={14} fontWeight="600">
            תל אביב
          </Text>
        </Box>
        <Box borderWidth={1} paddingHorizontal="xm" paddingVertical="xs" borderColor="seperator" borderRadius={5} marginRight="s">
          <Text variant="text" fontSize={14} fontWeight="600">
            חיפה
          </Text>
        </Box>
      </ScrollView>
      <PictureThumbList pictures={data} />
    </Box>
  );
}

export default Explore;
