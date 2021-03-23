import React, { useState, useRef } from 'react';
import { Image, StyleSheet, Dimensions, Platform } from 'react-native';
import { Box, Text } from '../..';
import { RoundedButton } from '../../Buttons';
import { observer } from 'mobx-react-lite';
import { useStore } from '../../../stores';
import Modal from 'react-native-modal';
import { Pages } from 'react-native-pages';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { View as MotiView } from 'moti';
import Ivrita from 'ivrita';
import OnboardingPermission from './OnboardingPermission';

const isAndroid = Platform.OS === 'android';

type OnboardingModalProps = {
  isModalVisible: boolean;
  setModalVisible: (modalVisible: boolean) => void;
};

const actIcon = require('@assets/icons/fuck-fascists.png');
const pictureDoodle = require('@assets/illustrations/picture-doodle.png');
const calendarDoodle = require('@assets/illustrations/calendar-doodle.png');
const humanDoodle = require('@assets/illustrations/human-being.png');
const badDoodle = require('@assets/illustrations/bad-guys.png');
const goodDoodle = require('@assets/illustrations/peace-weapons.png');

function OnboardingmModal({ isModalVisible, setModalVisible }: OnboardingModalProps) {
  const { userStore } = useStore();
  const { pronoun } = userStore.userData;
  const [currentIndex, setCurrentIndex] = useState(0);

  const pages = useRef<any>(null);

  const nextPage = () => {
    const nextIndex = currentIndex + 1;
    setCurrentIndex(nextIndex);
    pages.current?.scrollToPage(nextIndex);
  };

  const finishOnboarding = () => {
    AsyncStorage.setItem('onboardingFinished', 'true');
    setModalVisible(false);
  };

  return (
    <Modal
      propagateSwipe
      isVisible={isModalVisible}
      backdropOpacity={0.65}
      animationIn="zoomIn"
      animationInTiming={400}
      animationOut="zoomOut"
      animationOutTiming={350}
      useNativeDriver
    >
      <Pages
        ref={pages}
        scrollEnabled={true}
        indicatorOpacity={0}
        indicatorColor="#111111"
        rtl={isAndroid}
        containerStyle={styles.modalWrapper}
      >
        <Box
          flex={1}
          style={{ alignItems: 'center', justifyContent: 'center', paddingTop: 0, paddingHorizontal: 16, paddingBottom: 28 }}
        >
          <Image source={actIcon} style={{ width: 94, height: 94, marginBottom: 16 }} />

          <Text
            variant="largeTitle"
            fontSize={22}
            color="primaryColor"
            marginBottom="s"
            textAlign="center"
            maxFontSizeMultiplier={1.15}
          >
            {Ivrita.genderize('ברוכים.ות הבאים.ות ל- ACT1', Ivrita[pronoun])}
          </Text>
          <Text variant="text" marginBottom="xm" textAlign="center" maxFontSizeMultiplier={1.15}>
            באפליקצייה יש 2 מצבים - מנוחה והפגנה
          </Text>
          <RoundedButton
            color="yellow"
            text="המשך"
            onPress={() => {
              nextPage();
            }}
          />
        </Box>

        <Box flex={1} style={{ alignItems: 'center', paddingHorizontal: 24 }}>
          <Box flexDirection="row" minHeight={130} alignItems="center">
            <MotiView
              from={{ translateY: 0 }}
              animate={{ translateY: -10 }}
              transition={{
                loop: true,
                type: 'timing',
                duration: 2500,
                delay: 0,
              }}
              style={{ position: 'absolute', top: 32.5, left: -7.5, zIndex: 10 }}
            >
              <Image source={calendarDoodle} style={{ width: 110, height: 94 }} />
            </MotiView>
            <MotiView
              from={{ translateY: -10 }}
              animate={{ translateY: 0 }}
              transition={{
                loop: true,
                type: 'timing',
                duration: 2500,
                delay: 10,
              }}
            >
              <Image source={pictureDoodle} style={{ width: 110, height: 90, marginLeft: 60 }} />
            </MotiView>
          </Box>

          <Text
            variant="largeTitle"
            fontSize={22}
            color="primaryColor"
            marginBottom="m"
            textAlign="center"
            maxFontSizeMultiplier={1.15}
          >
            מצב מנוחה
          </Text>
          <Text variant="text" fontFamily="AtlasDL3.1AAA-Medium" marginBottom="s" textAlign="center" maxFontSizeMultiplier={1.15}>
            כשנאבקים לאורך זמן, חשוב לנוח בשביל לשמור על שפיות.
          </Text>
          <Text variant="text" marginBottom="xm" textAlign="center" maxFontSizeMultiplier={1.15}>
            כאן תוכלו לראות הפגנות קרובות, תמונות ועדכונים מרחבי הארץ.
          </Text>
          <RoundedButton
            color="yellow"
            text="המשך"
            onPress={() => {
              nextPage();
            }}
          />
        </Box>

        <Box flex={1} style={{ alignItems: 'center', paddingTop: 16, paddingHorizontal: 24 }}>
          <Box flexDirection="row" marginBottom="m" alignItems="center">
            <MotiView
              from={{ translateY: 0 }}
              animate={{ translateY: 10 }}
              transition={{
                loop: true,
                type: 'timing',
                duration: 2000,
                delay: 0,
              }}
            >
              <Image
                source={badDoodle}
                style={{ width: 65, height: 75, opacity: 0.8, transform: [{ translateY: -30 }, { translateX: 10 }] }}
              />
            </MotiView>
            <Image source={humanDoodle} style={{ width: 110, height: 125 }} />

            <MotiView
              from={{ translateY: 15 }}
              animate={{ translateY: 0 }}
              transition={{
                loop: true,
                type: 'timing',
                duration: 2000,
                delay: 0,
              }}
            >
              <Image source={goodDoodle} style={{ width: 75, height: 69, opacity: 0.8, transform: [{ translateX: -3 }] }} />
            </MotiView>
          </Box>
          <Text variant="largeTitle" color="primaryColor" marginBottom="s" textAlign="center" maxFontSizeMultiplier={1.15}>
            מצב הפגנה
          </Text>
          <Text variant="text" marginBottom="xm" textAlign="center" maxFontSizeMultiplier={1.15}>
            מצב הפגנה יופעל אוטומטית כשתגיעו לאיזור בו מתקיימת הפגנה.
          </Text>
          <Text variant="text" marginBottom="xm" textAlign="center" maxFontSizeMultiplier={1.15}>
            תוכלו לקבל ולשלוח דיווחים, להעלות תמונות מהשטח ולראות כמה מפגינים באיזורכם.
          </Text>
          <RoundedButton
            color="yellow"
            text="המשך"
            onPress={() => {
              nextPage();
            }}
          />
        </Box>
        <OnboardingPermission finishOnboarding={finishOnboarding} />
      </Pages>
    </Modal>
  );
}

export default observer(OnboardingmModal);

const modalHeight = Dimensions.get('screen').height * 0.5;

const styles = StyleSheet.create({
  modalImage: {
    width: 200,
    marginTop: 4,
    marginBottom: -6,
  },
  modalWrapper: {
    maxHeight: modalHeight,
    marginHorizontal: 24,
    borderRadius: 6,
    shadowColor: '#000000',
    shadowOpacity: 0.45,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 4,
    backgroundColor: '#111111',
  },
});