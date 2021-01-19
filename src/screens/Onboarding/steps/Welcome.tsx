import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text } from '../../../components';
import { RoundedButton } from '@components/Buttons';

function Welcome({ nextPage, style }: BoardingScreenProps) {
  return (
    <View style={[styles.welcomeWrapper, style]}>
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
    </View>
  );
}

const styles = StyleSheet.create({
  welcomeWrapper: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
});

export default Welcome;
