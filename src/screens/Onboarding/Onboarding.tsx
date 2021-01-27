import React, { useState, useRef, useEffect } from 'react';
import { Platform, Animated, ImageBackground, StyleSheet, Dimensions, StatusBar } from 'react-native';
import analytics from '@react-native-firebase/analytics';
import { Box } from '../../components';
import { Pages } from 'react-native-pages';
import { Welcome, About, Features, Providers } from './steps';
import SignUpForm from '../SignUp/SignUpForm';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const { width } = Dimensions.get('window');

// react-native-pages has a different behaviour on iOS and Android devices.
// On android, the ....
const isAndroid = Platform.OS === 'android';

function Onboarding() {
  const insets = useSafeAreaInsets();

  const pageProgress = useRef(new Animated.Value(0)).current;
  const [currentIndex, setCurrentIndex] = useState(0);

  const pages = useRef<any>(null);

  const nextPage = () => {
    pages.current?.scrollToPage(currentIndex + 1);
  };

  const scrollToPage = (index: number) => {
    pages.current?.scrollToPage(index);
  };

  const onScrollEnd = (index: number) => {
    setCurrentIndex(index);
  };

  const screens = [
    <Welcome nextPage={nextPage} key="welcome" style={{ marginBottom: insets.bottom + 55 }} />,
    <About nextPage={nextPage} key="about" />,
    <Features nextPage={nextPage} key="features" />,
    <Providers nextPage={nextPage} currentIndex={currentIndex} scrollToPage={scrollToPage} key="providers" />,
    <SignUpForm currentIndex={currentIndex} key="signUpForm" />,
  ];

  return (
    <Box flex={1} backgroundColor="greyBackground">
      <StatusBar backgroundColor="#040506" barStyle="light-content" />

      <ImageBackground source={require('@assets/pictures/onboarding.png')} style={styles.imageBackground}>
        <Animated.View
          style={{
            position: 'absolute',
            top: 0,
            height: '100%',
            width: '100%',
            opacity: pageProgress.interpolate({
              inputRange: [0, 1, 2, 3, 4],
              outputRange: [0, 0.75, 0.8, 0.8, 0.9],
            }),
            backgroundColor: '#000',
            zIndex: 0,
          }}
        />
        {currentIndex < 4 && (
          <Animated.Text
            style={[
              styles.heading,
              {
                marginTop: 36 + insets.top,
                opacity: pageProgress.interpolate({
                  inputRange: [0, 0.9, 1, 2, 3, 4],
                  outputRange: [0, 1, 1, 1, 1, 0],
                }),
                transform: [
                  {
                    translateX: pageProgress.interpolate({
                      inputRange: [0, 0.95, 1, 2, 3, 4],
                      outputRange: [-width, 0, 1, 1, 1, width],
                    }),
                  },
                ],
              },
            ]}
          >
            ACT1
          </Animated.Text>
        )}
        <Pages
          style={{ flex: 1, position: 'absolute' }}
          ref={pages}
          onScrollEnd={onScrollEnd}
          scrollEnabled={false}
          indicatorOpacity={0}
          progress={pageProgress}
          indicatorColor="black"
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
  heading: {
    fontSize: 56,
    textAlign: 'center',
    fontFamily: 'AtlasDL3.1AAA-Bold',
    fontWeight: '900',
    marginBottom: 20,
    color: '#eb524b',
  },
});
