import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text } from '../../../components';
import { RoundedButton } from '@components/Buttons';
import { logEvent } from '@services/analytics';

function Welcome({ nextPage, style }: BoardingScreenProps) {
  const startButtonPress = () => {
    logEvent('start_button_press');
    nextPage();
  };

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
      <RoundedButton text="בואו נתחיל" color="yellow" onPress={startButtonPress} />
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
