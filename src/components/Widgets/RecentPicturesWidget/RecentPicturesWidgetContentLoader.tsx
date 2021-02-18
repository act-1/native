import React from 'react';
import { Dimensions } from 'react-native';
import ContentLoader, { Rect } from 'react-content-loader/native';

const { width: deviceWidth } = Dimensions.get('window');

function RecentPicturesWidgetContentLoader({ loadedPictures }: { loadedPictures: (true | undefined)[] }) {
  if (!loadedPictures.includes(undefined)) return null;

  return (
    <ContentLoader
      width={deviceWidth}
      height={360}
      backgroundColor="#222222"
      foregroundColor="#333333"
      rtl
      style={{ position: 'absolute', zIndex: 1 }}
    >
      {!loadedPictures[0] && <Rect x={12} y="0" width={'61.5%'} height={236} ry={2} />}
      {!loadedPictures[1] && <Rect x={deviceWidth - deviceWidth / 3 + 2} y="0" width={deviceWidth / 3.255} height={112} ry={2} />}
      {!loadedPictures[2] && (
        <Rect x={deviceWidth - deviceWidth / 3 + 2} y="122" width={deviceWidth / 3.255} height={114} ry={2} />
      )}
      {!loadedPictures[3] && <Rect x={12} y={248} width={deviceWidth / 3.35} height={112} ry={2} />}
      {!loadedPictures[4] && <Rect x={deviceWidth / 3.27 + 17.75} y="248" width={deviceWidth / 3.4} height={112} ry={2} />}
      {!loadedPictures[5] && <Rect x={deviceWidth / 1.59 + 17.75} y="248" width={deviceWidth / 3.35} height={112} ry={2} />}
    </ContentLoader>
  );
}

export default RecentPicturesWidgetContentLoader;
