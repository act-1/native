import React from 'react';
import { Dimensions, StyleSheet } from 'react-native';
import { Box, Text, Ticker } from '../..';
import FastImage from 'react-native-fast-image';
import TouchableScale from 'react-native-touchable-scale';
import { Event } from '@types/collections';
import FadeInOutView from '../../FadeInOutView';
import { observer } from 'mobx-react-lite';
import { useStore } from '../../../stores';

type LiveLocationBoxProps = {
  protest: Event;
  onPress: () => void;
};

function FeaturedProtestBox({ protest, onPress }: LiveLocationBoxProps) {
  const { status, title, city, locationName, thumbnail } = protest;

  return (
    <TouchableScale activeScale={0.96} friction={20} onPress={onPress} style={{ marginHorizontal: 12 }}>
      <FastImage style={styles.eventThumbnail} source={{ uri: thumbnail }} />

      <Box alignItems="flex-start" flex={1}>
        <Text variant="boxTitle" fontSize={16} marginBottom="xs">
          {title}
        </Text>
        <Text variant="boxSubtitle" fontSize={14} marginBottom="xs">
          {locationName}, {city}
        </Text>
        <Box width={'100%'}>
          {status === 'past' && (
            <Text variant="boxInfo" color="important" fontSize={14}>
              {protest.protestersCount > 10 && `${protest.protestersCount} יצאו להפגין`}
            </Text>
          )}
        </Box>
      </Box>
    </TouchableScale>
  );
}

export default React.memo(observer(FeaturedProtestBox));

const { width: deviceWidth } = Dimensions.get('screen');

let boxWidth = 280;
let boxHeight = 146;

if (deviceWidth > 400) {
  boxWidth = 310;
  boxHeight = 158;
}

const styles = StyleSheet.create({
  eventThumbnail: {
    width: boxWidth,
    height: boxHeight,
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginBottom: 6,
    borderRadius: 4,
  },
  attendingProfilePic: {
    height: 32,
    width: 32,
    borderRadius: 25,
    borderWidth: 4,
    borderColor: '#0a0d0f',
    marginLeft: -8,
  },
});
