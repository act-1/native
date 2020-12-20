import React from 'react';
import { Image, StyleSheet, Dimensions } from 'react-native';
import { Box, Text } from '../';
import { RoundedButton } from '../Buttons';
import messaging from '@react-native-firebase/messaging';
import { modalfy } from 'react-native-modalfy';

const modalWidth = Dimensions.get('screen').width * 0.8;
const modalHeight = Dimensions.get('screen').height * 0.55;

function AttendingModal() {
  const notificationPermissionsRequest = async () => {
    const authorizationStatus = await messaging().requestPermission();

    if (authorizationStatus) {
      modalfy().closeModal('AttendingModal');
    }
  };

  return (
    <Box
      width={modalWidth}
      minHeight={modalHeight}
      justifyContent="center"
      alignItems="center"
      paddingHorizontal="xm"
      borderRadius={6}
      style={{ shadowColor: '#333333' }}
      shadowOpacity={1}
      shadowOffset={{ width: 0, height: 2 }}
      shadowRadius={4}
      backgroundColor="mainBackground"
    >
      <Image source={require('../../assets/illustrations/hand-v.png')} style={styles.modalImage} />
      <Text variant="largeTitle" marginBottom="s">
        נתראה בקרוב!
      </Text>
      <Text variant="text" fontWeight="300" textAlign="center" marginBottom="m">
        תרצו לקבל עדכונים על ההפגנה?
      </Text>
      <RoundedButton text="הפעלת התראות" color="yellow" onPress={() => notificationPermissionsRequest()} />
      <Text variant="text" fontSize={15} fontWeight="300" textAlign="center" marginVertical="m">
        זה נטו להודעות חשובות ועדכונים בלוחות זמנים. לא חופרים, באמא.{' '}
      </Text>
      <RoundedButton text="לא עכשיו" color="porcelain" onPress={() => modalfy().closeModal('AttendingModal')} />
    </Box>
  );
}
export default AttendingModal;

const styles = StyleSheet.create({
  modalImage: {
    marginBottom: 16,
  },
});
