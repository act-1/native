import React from 'react';
import { StyleSheet } from 'react-native';
import { Box, Text, Ticker } from '../..';
import FastImage from 'react-native-fast-image';
import TouchableScale from 'react-native-touchable-scale';
import { LiveEvent, PastEvent } from '@types/collections';
import FadeInOutView from '../../FadeInOutView';
import { observer } from 'mobx-react-lite';
import { useStore } from '../../../stores';

type LiveLocationBoxProps = {
  protest: LiveEvent | PastEvent;
  onPress: () => void;
};

const boxWidth = 280; // Substract 12 margins

function FeaturedProtestBox({ protest, onPress }: LiveLocationBoxProps) {
  const { liveStore } = useStore();
  const { status, title, city, locationName, locationId, thumbnail } = protest;

  let protestersCount = '---';

  if (protest.status === 'live' && liveStore.locationsCount[locationId]) {
    protestersCount = liveStore.locationsCount[locationId];
  }

  return (
    <TouchableScale activeScale={0.96} friction={20} onPress={onPress} style={{ width: boxWidth, marginHorizontal: 12 }}>
      <FastImage style={styles.eventThumbnail} source={{ uri: thumbnail }} />

      <Box alignItems="flex-start" flex={1}>
        <Text variant="boxTitle" fontSize={16} marginBottom="xs">
          {title}
        </Text>
        <Text variant="boxSubtitle" fontSize={14} marginBottom="xs">
          {locationName}, {city}
        </Text>
        <Box width={'100%'}>
          {status === 'live' && liveStore.locationProtesters[locationId]?.length === 3 && (
            <Box flexDirection="row" alignItems="center" marginLeft="xs">
              {liveStore.locationProtesters[locationId].map((profilePicture: string, index: number) => (
                <FastImage key={index} source={{ uri: profilePicture }} style={styles.attendingProfilePic} />
              ))}

              <FadeInOutView style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginLeft: 6 }}>
                {typeof protestersCount === 'number' ? (
                  <Ticker textStyle={{ fontSize: 16, fontFamily: 'AtlasDL3.1AAA-Bold', color: '#eb524b' }}>
                    {protestersCount}
                  </Ticker>
                ) : (
                  <Text variant="text" fontFamily="AtlasDL3.1AAA-Bold" color="primaryColor" marginLeft="xs">
                    ---
                  </Text>
                )}

                <Text variant="text" fontFamily="AtlasDL3.1AAA-Bold" color="primaryColor" marginLeft="xs">
                  עכשיו בהפגנה
                </Text>
              </FadeInOutView>
            </Box>
          )}

          {status === 'past' && (
            <Text variant="boxInfo" color="important" fontSize={14}>
              301 יצאו להפגין
            </Text>
          )}
        </Box>
      </Box>
    </TouchableScale>
  );
}

export default React.memo(observer(FeaturedProtestBox));

const styles = StyleSheet.create({
  eventThumbnail: {
    width: boxWidth,
    height: 146,
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
