import React from 'react';
import { ImageBackground, StyleSheet } from 'react-native';
import { Box, Text } from '../../../components';
import { RoundedButton } from '@components/Buttons';

function Welcome() {
  return (
    <Box flex={1}>
      <ImageBackground source={require('@assets/pictures/onboarding.png')} style={styles.imageBackground}>
        <Box flex={1} justifyContent="flex-end" alignItems="center" style={{ marginBottom: 140 }}>
          <Text variant="hugeTitle" fontSize={68} fontWeight="900" color="headerTitle">
            ACT1
          </Text>
          <Text variant="hugeTitle" color="lightText">
            יוצאים להפגין.
          </Text>
          <Text variant="hugeTitle" color="lightText" marginBottom="xm">
            ככה זה מתחיל.
          </Text>
          <RoundedButton text="בואו נתחיל" color="yellow" />
        </Box>
      </ImageBackground>
    </Box>
  );
}

const styles = StyleSheet.create({
  imageBackground: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
  },
});

export default Welcome;
