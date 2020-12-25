import React from 'react';
import { StyleSheet } from 'react-native';
import Ticker from 'react-native-ticker';
import FastImage from 'react-native-fast-image';
import Icon from 'react-native-vector-icons/Feather';
import { Box, Text } from '../../components';

type PostBoxProps = {
  authorName: string;
  authorPicture: URL;
  content: string;
  image?: URL;
  timestamp: string;
};

function PostBox(props: PostBoxProps) {
  const { authorName, authorPicture, content, timestamp } = props;
  return (
    <Box backgroundColor="mainBackground" alignItems="flex-start" padding="m">
      <Box flexDirection="row" marginBottom="s">
        <FastImage
          source={{
            uri: authorPicture.href,
          }}
          style={styles.authorImage}
        />
        <Box alignItems="flex-start">
          <Text variant="boxTitle">{authorName}</Text>
          <Text variant="boxSubtitle">לפני 4 שעות</Text>
        </Box>
      </Box>
      <Box alignItems="flex-start" marginBottom="m">
        <Text variant="text" fontFamily="Arial">
          {content}
        </Text>
      </Box>
      <Box width="100%" height={2} backgroundColor="seperator" marginBottom="m" />
      <Box flexDirection="row" justifyContent="center" alignItems="center" width="100%">
        <Ticker textStyle={styles.likeCount}>52</Ticker>
        <Icon name="heart" color="#999999" size={22.5} style={{ marginLeft: 6 }} />
      </Box>
    </Box>
  );
}

export default PostBox;

const styles = StyleSheet.create({
  authorImage: {
    width: 40,
    height: 40,
    borderRadius: 25,
    marginRight: 8,
  },
  likeCount: {
    color: '#999999',
    fontFamily: 'Rubik-Bold',
  },
});
