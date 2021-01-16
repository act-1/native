import React, { useState, useRef } from 'react';
import { View, ImageBackground, StyleSheet, SafeAreaView, StatusBar } from 'react-native';
import analytics from '@react-native-firebase/analytics';
import { Box, Text } from '../../components';
import ViewPager from '@react-native-community/viewpager';
import { Pages } from 'react-native-pages';
import RoundedButton from '@components/Buttons/RoundedButton';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Welcome, About, Signup } from './steps';
import { useStore } from '../../stores';

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

  return (
    <Box flex={1} backgroundColor="greyBackground">
      <StatusBar backgroundColor="#040506" barStyle="light-content" />
      <ImageBackground source={require('@assets/pictures/onboarding.png')} style={styles.imageBackground}>
        <Pages ref={pages} onScrollEnd={onScrollEnd} style={{ flex: 1 }} initialPage={2}>
          <Welcome nextPage={nextPage} />
          <About nextPage={nextPage} />
          <Signup />
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
