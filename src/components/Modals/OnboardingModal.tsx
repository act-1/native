import React, { useState, useRef } from 'react';
import { Image, StyleSheet, Dimensions, Platform } from 'react-native';
import { Box, Text } from '../';
import { RoundedButton } from '../Buttons';
import { observer } from 'mobx-react-lite';
import { useStore } from '../../stores';
import Modal from 'react-native-modal';
import { Pages } from 'react-native-pages';
import { View as MotiView } from 'moti';
import Ivrita from 'ivrita';

const isAndroid = Platform.OS === 'android';

type OnboardingModalProps = {
  isModalVisible: boolean;
  setModalVisible: (modalVisible: boolean) => void;
};

const actIcon = require('@assets/icons/fuck-fascists.png');
const pictureDoodle = require('@assets/illustrations/picture-doodle.png');
const calendarDoodle = require('@assets/illustrations/calendar-doodle.png');

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

  const onScrollEnd = (index: number) => {
    setCurrentIndex(index);
  };

  return (
    <Modal
      isVisible={isModalVisible}
      backdropOpacity={0.825}
      animationIn="zoomIn"
      animationInTiming={350}
      animationOut="zoomOut"
      animationOutTiming={350}
      onBackdropPress={() => setModalVisible(false)}
      useNativeDriver
    >
      {/* <Box style={styles.modalWrapper}> */}
      <Pages
        ref={pages}
        scrollEnabled={true}
        indicatorOpacity={0}
        indicatorColor="black"
        rtl={isAndroid}
        onScrollEnd={onScrollEnd}
        containerStyle={styles.modalWrapper}
      >
        <Box flex={1} style={{ alignItems: 'center', paddingHorizontal: 16, paddingBottom: 28 }}>
          <Image source={actIcon} style={{ width: 94, height: 94, marginBottom: 16 }} />

          <Text variant="largeTitle" color="primaryColor" marginBottom="s" textAlign="center" maxFontSizeMultiplier={1.15}>
            {Ivrita.genderize('ברוכים.ות הבאים.ות ל- ACT1', Ivrita[pronoun])}
          </Text>
          <Text variant="text" marginBottom="xm" textAlign="center" maxFontSizeMultiplier={1.15}>
            רצינו להסביר בקצרה מה הולך כאן :)
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
          <Box flexDirection="row">
            <MotiView
              from={{ translateY: 0 }}
              animate={{ translateY: -15 }}
              transition={{
                loop: true,
                type: 'timing',
                duration: 1500,
                delay: 0,
              }}
              style={{ position: 'absolute', top: 10, left: -10, zIndex: 10 }}
            >
              <Image source={calendarDoodle} style={{ width: 110, height: 94 }} />
            </MotiView>
            <MotiView
              from={{ translateY: -15 }}
              animate={{ translateY: 0 }}
              transition={{
                loop: true,
                type: 'timing',
                duration: 1500,
                delay: 0,
              }}
            >
              <Image source={pictureDoodle} style={{ width: 130, height: 110, marginLeft: 50 }} />
            </MotiView>
          </Box>

          <Text variant="largeTitle" color="primaryColor" marginBottom="s" textAlign="center" maxFontSizeMultiplier={1.15}>
            מצב מנוחה
          </Text>
          <Text variant="text" marginBottom="xm" textAlign="center" maxFontSizeMultiplier={1.15}>
            כשנאבקים לאורך זמן, חשוב לנוח בשביל לשמור על שפיות.
          </Text>
          <Text variant="text" marginBottom="xm" textAlign="center" maxFontSizeMultiplier={1.15}>
            במצב מנוחה תוכלו לראות הפגנות קרובות, תמונות ועדכונים מרחבי הארץ.
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
          <Text variant="largeTitle" color="primaryColor" marginBottom="s" textAlign="center" maxFontSizeMultiplier={1.15}>
            מצב הפגנה
          </Text>
          <Text variant="text" marginBottom="xm" textAlign="center" maxFontSizeMultiplier={1.15}>
            מצב הפגנה יופעל אוטומטית כשתגיעו לאיזור הפגנה.
          </Text>
          <Text variant="text" marginBottom="xm" textAlign="center" maxFontSizeMultiplier={1.15}>
            מצב הפגנה מאפשר לקבל ולשלוח דיווחים, להעלות תמונות מהשטח ולראות כמה מפגינים באיזורכם.
          </Text>
          <RoundedButton
            color="yellow"
            text="המשך"
            onPress={() => {
              nextPage();
            }}
          />
        </Box>
      </Pages>
      {/* </Box> */}
    </Modal>
  );
}
export default observer(OnboardingmModal);

const modalHeight = Dimensions.get('screen').height * 0.48;

const styles = StyleSheet.create({
  modalImage: {
    width: 200,
    marginTop: 4,
    marginBottom: -6,
  },
  modalWrapper: {
    maxHeight: modalHeight,
    marginHorizontal: 24,
    paddingTop: 16,
    borderRadius: 6,
    shadowColor: '#000000',
    shadowOpacity: 0.45,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 4,
    backgroundColor: '#111111',
  },
});
