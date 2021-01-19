import React from 'react';
import { ImageBackground, StyleSheet } from 'react-native';
import { Box, Text } from '../../../components';
import { RoundedButton } from '@components/Buttons';

function Welcome({ nextPage }: BoardingScreenProps) {
  return (
    <Box flex={1} justifyContent="flex-end" alignItems="center" zIndex={3} style={{ marginBottom: 112 }}>
      <Text variant="hugeTitle" fontSize={68} fontWeight="900" color="headerTitle">
        ACT1
      </Text>
      <Text variant="hugeTitle" color="lightText">
        יוצאים להפגין.
      </Text>
      <Text variant="hugeTitle" color="lightText" marginBottom="xm">
        ככה זה מתחיל.
      </Text>
      <RoundedButton text="בואו נתחיל" color="yellow" onPress={nextPage} />
    </Box>
  );
}

export default Welcome;
