import React from 'react';
import { StyleSheet, FlatList, Dimensions } from 'react-native';
import FastImage from 'react-native-fast-image';
import { Box, Text, Ticker } from '../';
import Icon from 'react-native-vector-icons/Feather';
import { useNavigation } from '@react-navigation/native';
import { IPicturePost } from '@types/post';

import * as timeago from 'timeago.js';
import he from 'timeago.js/lib/lang/he';
timeago.register('he', he);

const deviceWidth = Dimensions.get('window').width;

const itemHeights: number[] = [];

const getItemLayout = (data: IPicturePost[] | null | undefined, index: number) => {
  const length = itemHeights[index];
  const offset = itemHeights.slice(0, index).reduce((a, c) => a + c, 0);
  console.log(itemHeights, length);
  return { length, offset, index };
};

export default function PictureList({ pictures, initialIndex }: { pictures: IPicturePost[]; initialIndex?: number }) {
  const navigation = useNavigation();

  const pictureItem = ({ item, index }: { item: IPicturePost; index: number }) => (
    <Box onLayout={(object) => (itemHeights[index] = object.nativeEvent.layout.height)}>
      <Box flexDirection="row" alignItems="center" marginBottom="m" paddingHorizontal="s">
        <FastImage
          source={{
            uri:
              'https://scontent.ftlv15-1.fna.fbcdn.net/v/t1.0-9/120795507_338405427579471_6909790557627558055_o.jpg?_nc_cat=111&ccb=2&_nc_sid=09cbfe&_nc_ohc=m1-VKWy6OHoAX90JQPy&_nc_ht=scontent.ftlv15-1.fna&oh=80185911315cbb9176816b026298a887&oe=6032F1FF',
          }}
          style={styles.profilePic}
        />
        <Box>
          <Text variant="boxTitle">גיא טפר</Text>
          <Box flexDirection="row" alignItems="center">
            <Text
              variant="boxSubtitle"
              textAlign="left"
              onPress={() => navigation.navigate('LocationPage', { locationId: 'habima' })}
            >
              כיכר הפעמון
            </Text>
          </Box>
        </Box>
      </Box>
      <Box style={{ marginHorizontal: -16, marginBottom: 8 }}>
        {/* Height is calculated propotionaly to the device width */}
        <FastImage
          source={{ uri: item.pictureUrl }}
          style={{ height: item.pictureHeight / (item.pictureWidth / deviceWidth), width: '100%' }}
        />
      </Box>
      <Box paddingHorizontal="m" flexDirection="row" alignItems="center" justifyContent="space-between" marginBottom="s">
        <Box flexDirection="row" alignItems="center">
          <Icon name="heart" color={false ? '#ec534b' : '#fff'} size={19} style={{ marginRight: 6 }} />
          <Ticker textStyle={{ ...styles.likeCount, color: false ? '#ec534b' : '#fff' }}>{item.likeCounter}</Ticker>
        </Box>
        <Text variant="boxSubtitle" fontSize={14} textAlign="left">
          {timeago.format(item.createdAt.toDate(), 'he')}
        </Text>
      </Box>
      <Box paddingHorizontal="m">
        <Text variant="text" fontSize={14} marginBottom="s">
          {item.text}
        </Text>
      </Box>
    </Box>
  );

  return (
    <FlatList
      data={pictures}
      keyExtractor={(item) => item.id}
      renderItem={pictureItem}
      initialScrollIndex={initialIndex}
      initialNumToRender={pictures.length}
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
    fontSize: 17,
  },
});
