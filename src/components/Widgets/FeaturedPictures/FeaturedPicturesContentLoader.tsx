import React from 'react';
import { Dimensions, ViewStyle } from 'react-native';
import { Box } from '../..';
import ContentLoader, { Rect } from 'react-content-loader/native';

const { width: deviceWidth } = Dimensions.get('window');

export default function FeaturedPicturesContentLoader({ style }: { style?: ViewStyle }) {
  return (
    <Box style={style}>
      <ContentLoader width={deviceWidth} height={220} backgroundColor="#222222" foregroundColor="#333333" rtl>
        <Rect x="30" y={0} rx={8} width={deviceWidth - 60} height={220} />
      </ContentLoader>
    </Box>
  );
}
