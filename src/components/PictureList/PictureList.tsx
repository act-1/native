import React from 'react';
import { StyleSheet, FlatList, Dimensions } from 'react-native';
import FastImage from 'react-native-fast-image';
import { Box, Text, Ticker } from '../';
import Icon from 'react-native-vector-icons/Feather';
import { useNavigation } from '@react-navigation/native';

const deviceWidth = Dimensions.get('window').width;

const itemHeights: number[] = [];

const getItemLayout = (data: Picture[] | null | undefined, index: number) => {
  const length = itemHeights[index];
  const offset = itemHeights.slice(0, index).reduce((a, c) => a + c, 0);
  return { length, offset, index };
};

export default function PictureList({ pictures, initialIndex }: { pictures: Picture[]; initialIndex?: number }) {
  const navigation = useNavigation();

  const pictureItem = ({ item, index }: { item: Picture; index: number }) => (
    <Box onLayout={(object) => (itemHeights[index] = object.nativeEvent.layout.height)}>
      <Box flexDirection="row" alignItems="center" marginBottom="m" paddingHorizontal="m">
        <FastImage source={{ uri: item.authorPicture }} style={styles.profilePic} />
        <Box>
          <Text variant="boxTitle">{item.authorName}</Text>
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
      <Box style={{ marginHorizontal: -16, marginBottom: 12 }}>
        {/* Height is calculated propotionaly to the device width */}
        <FastImage
          source={{ uri: item.pictureUrl }}
          style={{ height: item.height / (item.width / deviceWidth), width: '100%' }}
        />
      </Box>
      <Box paddingHorizontal="m" flexDirection="row" justifyContent="space-between">
        <Box flexDirection="row" alignItems="center" marginBottom="s">
          <Icon name="heart" color={false ? '#ec534b' : '#999999'} size={18} style={{ marginRight: 6 }} />
          <Ticker textStyle={{ ...styles.likeCount, color: false ? '#ec534b' : '#999999' }}>42</Ticker>
        </Box>
        <Text variant="boxSubtitle" textAlign="left">
          לפני 2 דק׳
        </Text>
      </Box>
      <Box paddingHorizontal="m">
        <Text variant="text" fontSize={14} marginBottom="s">
          אני והח’ברס בהפגנוס. לא היה פשוט אבל הטוב ניצח. ככה הלכתי הביתה ודרשתי צדק לכולן!
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
