import React from 'react';
import { ImageBackground, StyleSheet, StatusBar } from 'react-native';
import { Box, Text } from '../../components';
import { signInAnonymously } from '@services/auth';
import RoundedButton from '@components/Buttons/RoundedButton';
import { observer } from 'mobx-react-lite';
import { useStore } from '../../stores';

function SignUpLanding({ navigation }) {
  const { userStore } = useStore();

  React.useEffect(() => {
    if (!userStore.user) {
      signInAnonymously();
    }
  }, [userStore]);

  return (
    <Box flex={1}>
      <StatusBar translucent backgroundColor="transparent" barStyle="light-content" />

      <ImageBackground resizeMode="cover" source={require('@assets/pictures/onboarding.png')} style={styles.imageBackground}>
        <Box style={styles.landingWrapper}>
          <Text variant="hugeTitle" fontSize={68} fontWeight="900" color="headerTitle" maxFontSizeMultiplier={1.2}>
            ACT1
          </Text>
          <Text variant="hugeTitle" fontSize={30} color="lightText" marginBottom="xm" maxFontSizeMultiplier={1.1}>
            יוצאים להפגין
          </Text>
          <RoundedButton text="בואו נתחיל" color="yellow" onPress={() => navigation.navigate('SignUpHello')} />
        </Box>
      </ImageBackground>
    </Box>
  );
}

export default observer(SignUpLanding);

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
