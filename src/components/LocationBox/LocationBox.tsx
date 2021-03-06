import React from 'react';
import { Image, Pressable, StyleSheet, ViewStyle } from 'react-native';
import { Box, Text, Ticker } from '../';
import { Location } from '@types/collections';

type LocationBoxProps = {
  location: Location;
  style?: ViewStyle;
  counter?: string;
  onPress?: () => void;
};

function LocationBox({ location, counter, onPress, style }: LocationBoxProps) {
  return (
    <Pressable style={({ pressed }) => [{ backgroundColor: pressed ? '#1e262d' : '#0a0d0f' }]} onPress={onPress}>
      <Box flexDirection="row" alignItems="center" paddingVertical="s" paddingHorizontal="m" style={style}>
        <Image style={styles.locationPin} source={require('../../assets/icons/map-pin-rounded.png')} />
        <Box alignItems="flex-start" flex={1}>
          <Text variant="boxTitle" fontSize={16}>
            {location.name}
          </Text>
          <Text variant="boxSubtitle" color="subText">
            {location.city}
          </Text>
        </Box>
        <Box>
          {counter && (
            <Box flexDirection="row-reverse" alignItems="center">
              <Image source={require('@assets/icons/people-protest.png')} style={styles.protestersIcon} />
              <Ticker textStyle={styles.counterStyle}>{counter}</Ticker>
            </Box>
          )}
        </Box>
      </Box>
    </Pressable>
  );
}

export default LocationBox;

const styles = StyleSheet.create({
  locationPin: {
    marginRight: 10,
  },
  protestersIcon: {
    marginLeft: 8,
  },
  counterStyle: {
    fontFamily: 'AtlasDL3.1AAA-Bold',
    fontSize: 16,
    color: '#8b8b8b',
  },
});
