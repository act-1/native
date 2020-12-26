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
    <Pressable style={({ pressed }) => [{ backgroundColor: pressed ? '#e4e4e4' : '#fff' }]} onPress={onPress}>
      <Box flexDirection="row" paddingVertical="s" paddingHorizontal="m" style={style}>
        <Image style={styles.locationPin} source={require('../../assets/icons/map-pin-rounded.png')} />
        <Box alignItems="flex-start" flex={1}>
          <Text variant="boxTitle" color="subText" fontSize={16}>
            {name}
          </Text>
          <Text variant="boxSubtitle" color="subText">
            {address}
          </Text>
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
});
