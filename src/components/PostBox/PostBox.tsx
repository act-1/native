import React from 'react';
import { StyleSheet, ViewStyle } from 'react-native';
import Ticker from 'react-native-ticker';
import FastImage from 'react-native-fast-image';
import Icon from 'react-native-vector-icons/Feather';
import { Box, Text } from '../../components';

type PostBoxProps = {
  authorName: string;
  authorPicture: URL;
  content: string;
  image?: URL;
  style?: ViewStyle;
  timestamp: string;
};

function PostBox(props: PostBoxProps) {
  const { authorName, authorPicture, content, timestamp, style } = props;
  return (
    <Box backgroundColor="mainBackground" alignItems="flex-start" style={style}>
      <Box flexDirection="row" paddingHorizontal="m">
        <FastImage
          source={{
            uri: authorPicture.href,
          }}
          style={styles.authorImage}
        />
        <Box marginTop="m" marginLeft="s">
          <Box flexDirection="row" marginBottom="xxs">
            <Box flexDirection="row" alignItems="center">
              <Text variant="boxTitle" fontSize={15} marginRight="s">
                {authorName}
              </Text>
              <Text variant="boxSubtitle" fontSize={15}>
                לפני 4 שעות
              </Text>
            </Box>
          </Box>
          <Box alignItems="flex-start">
            <Text variant="text" fontFamily="Arial" fontSize={15} paddingRight="xl" style={{ lineHeight: 20 }}>
              {content}
            </Text>
            <Box flexDirection="row" alignItems="center" width="100%" marginTop="xs">
              <Icon name="heart" color="#999999" size={18} style={{ marginRight: 6 }} />
              <Ticker textStyle={styles.likeCount}>52</Ticker>
            </Box>
          </Box>
        </Box>
      </Box>

      <Box width="100%" height={2} backgroundColor="seperator" marginTop="m" />
    </Box>
  );
}

export default PostBox;

const styles = StyleSheet.create({
  authorImage: {
    width: 40,
    height: 40,
    borderRadius: 25,
    marginRight: 0,
    marginTop: 12,
  },
  likeCount: {
    color: '#999999',
    fontFamily: 'Rubik-Bold',
    fontSize: 12,
  },
});
