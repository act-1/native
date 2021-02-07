import React from 'react';
import { Dimensions } from 'react-native';
import { Box } from '../..';
import ContentLoader, { Rect } from 'react-content-loader/native';

const { width: deviceWidth, height: deviceHeight } = Dimensions.get('window');

export default function FeaturedEventsContentLoader() {
  return (
    <Box paddingHorizontal="m">
      <ContentLoader width={deviceWidth} height={deviceHeight} backgroundColor="#222222" foregroundColor="#333333" rtl>
        <Rect x="0" y={0} rx={8} width={154} height={180} />
        <Rect x="3" y={187} width={90} height={12} />
        <Rect x="3" y={204} width={135} height={12} />
        <Rect x="3" y={222} width={108} height={12} />

        <Rect x="178" y={0} rx={8} width={154} height={180} />
        <Rect x="181" y={187} width={90} height={12} />
        <Rect x="181" y={204} width={135} height={12} />
        <Rect x="181" y={222} width={108} height={12} />

        <Rect x="356" y={0} rx={8} width={154} height={180} />
        <Rect x="362" y={187} width={90} height={12} />
        <Rect x="362" y={204} width={135} height={12} />
        <Rect x="362" y={222} width={108} height={12} />
      </ContentLoader>
    </Box>
  );
}
