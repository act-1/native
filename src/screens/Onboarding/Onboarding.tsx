import React, { useState, useRef } from 'react';
import { Platform, View, ImageBackground, StyleSheet, SafeAreaView, StatusBar } from 'react-native';
import analytics from '@react-native-firebase/analytics';
import { Box, Text } from '../../components';
import ViewPager from '@react-native-community/viewpager';
import { Pages } from 'react-native-pages';
import RoundedButton from '@components/Buttons/RoundedButton';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Welcome, About, Providers } from './steps';
import SignUpForm from '../SignUp/SignUpForm';
import { useStore } from '../../stores';

// react-native-pages has a different behaviour on iOS and Android devices.
// On android, the ....
const isAndroid = Platform.OS === 'android';

function Onboarding() {
  const store = useStore();
  const [currentIndex, setCurrentIndex] = useState(0);
  const pages = useRef<any>(null);

  const nextPage = () => {
    pages.current?.scrollToPage(currentIndex + 1);
  };

  const onScrollEnd = (index: number) => {
    setCurrentIndex(index);
  };

  const screens = [
    <Welcome nextPage={nextPage} key="welcome" />,
    <About nextPage={nextPage} key="about" />,
    <Providers nextPage={nextPage} currentIndex={currentIndex} key="providers" />,
    <SignUpForm currentIndex={currentIndex} key="signUpForm" />,
  ];

  return (
    <Box flex={1} backgroundColor="greyBackground">
      <StatusBar backgroundColor="#040506" barStyle="light-content" />
      <ImageBackground source={require('@assets/pictures/onboarding.png')} style={styles.imageBackground}>
        <Pages
          ref={pages}
          onScrollEnd={onScrollEnd}
          style={{ flex: 1 }}
          scrollEnabled={false}
          indicatorOpacity={0}
          rtl={isAndroid}
        >
          {isAndroid ? screens.reverse() : screens}
        </Pages>
      </ImageBackground>
    </Box>
  );
}

export default Onboarding;

const styles = StyleSheet.create({
  imageBackground: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
  },
});
