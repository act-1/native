import React from 'react';
import { Image, Pressable, StyleSheet, ViewStyle } from 'react-native';
import { Box, Text } from '../';

type LocationBoxProps = {
  name: string;
  address?: string;
  style?: ViewStyle;
  onPress: () => void;
};

function LocationBox({ name, address, onPress, style }: LocationBoxProps) {
  return (
    <Pressable style={({ pressed }) => [{ backgroundColor: pressed ? '#e4e4e4' : 'white' }]} onPress={onPress}>
      <Box flexDirection="row" padding="m" width="100%" style={style}>
        <Image style={styles.eventThumb} source={require('../../assets/icons/map-pin-rounded.png')} />
        <Box alignItems="flex-start" flex={1}>
          <Text variant="boxTitle" fontSize={16}>
            {name}
          </Text>
          <Text variant="boxSubtitle" color="primaryText">
            {address}
          </Text>
        </Box>
      </Box>
    </Pressable>
  );
}

export default LocationBox;

const styles = StyleSheet.create({
  eventThumb: {
    marginRight: 10,
  },
});
