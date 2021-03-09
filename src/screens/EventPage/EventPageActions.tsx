import React, { useState } from 'react';
import { Box, CircularButton } from '../../components';
import { AttendingModal } from '../../components/Modals';
import messaging from '@react-native-firebase/messaging';
import { Platform } from 'react-native';

type EventPageActionsProps = {
  isAttending: boolean;
  attendEvent: () => void;
};

function EventPageActions({ isAttending, attendEvent }: EventPageActionsProps) {
  const [isModalVisible, setModalVisible] = useState(false);

  const onAttendPress = async () => {
    if (Platform.OS === 'ios' && !isAttending) {
      const permission = await messaging().hasPermission();

      if (permission === messaging.AuthorizationStatus.NOT_DETERMINED) {
        setModalVisible(true);
      }
    }

    attendEvent();
  };

  return (
    <>
      <Box flexDirection="row" justifyContent="space-evenly" backgroundColor="mainBackground" marginBottom="l">
        <CircularButton
          iconName="check"
          color={isAttending ? 'green' : 'grey'}
          text="אישור הגעה"
          onPress={() => onAttendPress()}
        />
        <CircularButton iconName="share" color="blue" text="הזמנת חברים" />
      </Box>
      <AttendingModal isModalVisible={isModalVisible} setModalVisible={setModalVisible} />
    </>
  );
}

export default EventPageActions;
