import React from 'react';
import { StyleSheet, Dimensions } from 'react-native';
import { Box, Text } from '../';
import { RoundedButton } from '../Buttons';
import { logEvent } from '@services/analytics';
import Modal from 'react-native-modal';
import messaging from '@react-native-firebase/messaging';
import LottieView from 'lottie-react-native';

const checkMarkAnimation = require('@assets/checkmark.json');

type AttendingModalProps = {
  isModalVisible: boolean;
  setModalVisible: (modalVisible: boolean) => void;
};
function AttendingModal({ isModalVisible, setModalVisible }: AttendingModalProps) {
  const notificationPermissionsRequest = async () => {
    const authorizationStatus = await messaging().requestPermission();

    if (authorizationStatus) {
      logEvent('event_notification_permission_received', { authorizationStatus });
      setModalVisible(false);
    }
  };

  const notificationButtonPress = () => {
    logEvent('notification_modal_permission_click');
    notificationPermissionsRequest();
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
      <Box style={styles.modalWrapper}>
        <LottieView source={checkMarkAnimation} autoPlay speed={0.85} loop={false} style={styles.modalImage} />
        <Text variant="largeTitle" marginBottom="s" maxFontSizeMultiplier={1.15}>
          נתראה בקרוב!
        </Text>
        <Text variant="text" fontWeight="300" textAlign="center" marginBottom="m" maxFontSizeMultiplier={1.1}>
          תרצו לקבל עדכונים על ההפגנה?
        </Text>
        <RoundedButton text="הפעלת התראות" color="yellow" style={{ marginBottom: -4 }} onPress={notificationButtonPress} />
        <Text variant="text" fontSize={15} fontWeight="300" textAlign="center" marginVertical="m" maxFontSizeMultiplier={1}>
          זה נטו להודעות חשובות ועדכונים בלוחות זמנים. לא חופרים, באמא.
        </Text>
        <RoundedButton
          text="לא עכשיו"
          color="porcelain"
          onPress={() => {
            logEvent('notification_modal_cancel_click');
            setModalVisible(false);
          }}
        />
      </Box>
    </Modal>
  );
}
export default AttendingModal;

const modalHeight = Dimensions.get('screen').height * 0.48;

const styles = StyleSheet.create({
  modalImage: {
    width: 200,
    marginTop: 4,
    marginBottom: -6,
  },
  modalWrapper: {
    height: modalHeight,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingBottom: 28,
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
