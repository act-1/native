import React from 'react';
import { ImageBackground, StyleSheet, StatusBar } from 'react-native';
import { Box, Text } from '../../components';
import RoundedButton from '@components/Buttons/RoundedButton';

function SignUpLanding({ navigation }) {
  return (
    <Box flex={1} backgroundColor="primaryColor">
      <StatusBar backgroundColor="#040506" barStyle="light-content" />

      <ImageBackground resizeMode="cover" source={require('@assets/pictures/onboarding.png')} style={styles.imageBackground}>
        <Box style={styles.landingWrapper}>
          <Text variant="hugeTitle" fontSize={68} fontWeight="900" color="headerTitle">
            ACT1
          </Text>
          <Text variant="hugeTitle" fontSize={30} color="lightText" marginBottom="xm">
            יוצאים להפגין
          </Text>
          <RoundedButton text="בואו נתחיל" color="yellow" onPress={() => navigation.navigate('SignUpHello')} />
        </Box>
      </ImageBackground>
    </Box>
  );
}

export default SignUpLanding;

const styles = StyleSheet.create({
  landingWrapper: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-end',
    paddingBottom: 15,
  },
  imageBackground: {
    flex: 1,
    justifyContent: 'center',
  },
});
