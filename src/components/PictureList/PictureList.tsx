import React from 'react';
import { StyleSheet, FlatList, Dimensions } from 'react-native';
import FastImage from 'react-native-fast-image';
import { Box, Text, Ticker } from '../';
import Icon from 'react-native-vector-icons/Feather';

const deviceWidth = Dimensions.get('window').width;

const itemHeights: number[] = [];

const getItemLayout = (data, index) => {
  const length = itemHeights[index];
  const offset = itemHeights.slice(0, index).reduce((a, c) => a + c, 0);
  return { length, offset, index };
};

const pictureItem = ({ item, index }: { item: Picture; index: number }) => (
  <Box onLayout={(object) => (itemHeights[index] = object.nativeEvent.layout.height)}>
    <Box flexDirection="row" alignItems="center" marginBottom="m" paddingHorizontal="m">
      <FastImage source={{ uri: item.authorPicture }} style={styles.profilePic} />
      <Box>
        <Text variant="boxTitle">{item.authorName}</Text>
        <Text variant="boxSubtitle">לפני 2 דק׳</Text>
      </Box>
    </Box>
    <Box style={{ marginHorizontal: -16, marginBottom: 12 }}>
      {/* Height is calculated propotionaly to the device width */}
      <FastImage source={{ uri: item.pictureUrl }} style={{ height: item.height / (item.width / deviceWidth), width: '100%' }} />
    </Box>
    <Box paddingHorizontal="m">
      <Box width="100%" flexDirection="row" alignItems="center" marginBottom="s">
        <Icon name="heart" color={false ? '#ec534b' : '#999999'} size={18} style={{ marginRight: 6 }} />
        <Ticker textStyle={{ ...styles.likeCount, color: false ? '#ec534b' : '#999999' }}>42</Ticker>
      </Box>
      {/* 
      <Text variant="text" fontSize={14}>
        אני והח’ברס בהפגנוס. לא היה פשוט אבל הטוב ניצח. ככה הלכתי הביתה ודרשתי צדק לכולן!
      </Text> */}
    </Box>
  </Box>
);

export default function PictureList({ pictures, initialIndex }: { pictures: Picture[]; initialIndex?: number }) {
  return (
    <FlatList
      data={pictures}
      keyExtractor={(item) => item.id}
      renderItem={pictureItem}
      initialScrollIndex={initialIndex}
      getItemLayout={getItemLayout}
    />
  );
}

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

/**
 * <ScrollView>
      <Box paddingHorizontal="m">
        <Text variant="largeTitle" marginBottom="m">
          תמונות אחרונות
        </Text>

        <Box marginBottom="l">
          <Box flexDirection="row" alignItems="center" marginBottom="m">
            <FastImage
              source={{
                uri: 'https://avatars0.githubusercontent.com/u/13344923?s=460&u=608d14c4d6c542d8f173dc2093e1763a7d18794c&v=4',
              }}
              style={styles.profilePic}
            />
            <Box>
              <Text variant="boxTitle">גיא טפר</Text>
              <Text variant="boxSubtitle">לפני 2 דק׳</Text>
            </Box>
          </Box>
          <Box style={{ marginHorizontal: -16, marginBottom: 12 }}>
            <FastImage
              source={{
                uri:
                  'https://res.cloudinary.com/onekm/image/upload/v1604266088/weekend_pictures/31-10-2020/clock-square-rabin_u5wwtg.jpg',
              }}
              style={{ height: 600, width: '100%' }}
            />
          </Box>
          <Box width="100%" flexDirection="row" alignItems="center" marginBottom="s">
            <Icon name="heart" color={false ? '#ec534b' : '#999999'} size={18} style={{ marginRight: 6 }} />
            <Ticker textStyle={{ ...styles.likeCount, color: false ? '#ec534b' : '#999999' }}>42</Ticker>
          </Box>

          <Text variant="text" fontSize={14}>
            אני והח’ברס בהפגנוס. לא היה פשוט אבל הטוב ניצח. ככה הלכתי הביתה ודרשתי צדק לכולן!
          </Text>
        </Box>

        <Box>
          <Box flexDirection="row" alignItems="center" marginBottom="m">
            <FastImage
              source={{
                uri: 'https://avatars0.githubusercontent.com/u/13344923?s=460&u=608d14c4d6c542d8f173dc2093e1763a7d18794c&v=4',
              }}
              style={[styles.profilePic, { marginRight: 4 }]}
            />
            <Box>
              <Text variant="boxTitle">גיא טפר</Text>
              <Text variant="boxSubtitle">לפני 2 דק׳</Text>
            </Box>
          </Box>
          <Box style={{ marginHorizontal: -16 }}>
            <FastImage
              source={{
                uri:
                  'https://res.cloudinary.com/onekm/image/upload/v1604264028/weekend_pictures/31-10-2020/rabin-sqaure_pmcyeu.jpg',
              }}
              style={{ height: 300, width: '100%' }}
            />
          </Box>
        </Box>
      </Box>
    </ScrollView>
 */

// getItemLayout={(data, index) => {
//   // Image height propotional calculation
//   const height = data![index].height / (data![index].width / deviceWidth) + 20;
//   console.log(data![index].height, data![index].height / (data![index].width / deviceWidth));
//   return { length: height, offset: height * index, index };
// }}
