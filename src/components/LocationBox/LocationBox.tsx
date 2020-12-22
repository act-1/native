import React from 'react';
import { Image, Pressable, StyleSheet } from 'react-native';
import { Box, Text } from '../';

type LocationBoxProps = {
  name: string;
  address?: string;
  onPress: () => void;
};

function LocationBox({ name, address, onPress }: LocationBoxProps) {
  return (
    <Pressable style={({ pressed }) => [{ backgroundColor: pressed ? '#e4e4e4' : 'white' }]} onPress={onPress}>
      <Box flexDirection="row" padding="m" width="100%">
        <Box alignItems="flex-start" flex={1}>
          <Text variant="boxTitle" color="lightText">
            {name}
          </Text>
          <Text variant="boxSubtitle" color="lightText">
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
    width: '100%',
    height: 50,
    borderRadius: 10,
    marginRight: 10,
  },
});
