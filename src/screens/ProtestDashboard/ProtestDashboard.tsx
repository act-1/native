import React, { useEffect, useRef } from 'react';
import { Platform, StatusBar } from 'react-native';
import { observer } from 'mobx-react-lite';
import { useStore } from '../../stores';
import { Box, Text, LocationCounter } from '../../components';
import { ProtestDashboardProps } from '@types/navigation';
import { logEvent } from '@services/analytics';
import ProtestActionButton from './ProtestActionButton';
import EventPagePictures from '../EventPage/EventPagePictures';

import { Notification as BannerNotification } from 'react-native-in-app-message';
import UploadBanner from '@components/UploadBanner';

function ProtestDashboard({ navigation, route }: ProtestDashboardProps) {
  const { feedStore, checkInStore, chatStore } = useStore();
  const notificationRef = useRef<BannerNotification>(null);

  React.useLayoutEffect(() => {
    if (checkInStore.lastCheckIn) {
      navigation.setOptions({
        headerTitle: checkInStore.lastCheckIn.eventName || checkInStore.lastCheckIn.locationName,
      });
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [checkInStore.lastCheckIn]);

  const onImageUpload = ({ imageUri, text }: { imageUri: string; text?: string }) => {
    let event,
      location = null;

    if (checkInStore.lastCheckIn.eventId) {
      event = checkInStore.currentEvent;
    } else {
      location = checkInStore.currentLocation;
    }

    feedStore.uploadImage({ imageUri, text, event, location });
    navigation.popToTop();

    // TODO: Better UX for gallery image upload
    // The current implementation shows the upload banner, and only on android, without refreshing
    // A better UX would be adding a 'pending' picture, which shows an overlay with the upload progress on it
    if (Platform.OS === 'android') {
      navigation.navigate('EventPictures', {
        eventId: checkInStore.lastCheckIn.eventId,
        locationId: checkInStore.lastCheckIn.locationId,
        title: checkInStore.lastCheckIn.locationName,
      });
    }
  };

  // Upload image banner
  useEffect(() => {
    if (feedStore.uploadStatus === 'in_progress') {
      setTimeout(() => {
        notificationRef.current?.show();
      }, 400);
    }

    if (feedStore.uploadStatus === 'done') {
      // Wait for the completion to finish and hide the banner
      setTimeout(() => {
        notificationRef.current?.hide();
      }, 2700);
    }
  }, [feedStore.uploadStatus]);

  return (
    <Box flex={1} style={{ backgroundColor: '#222222' }}>
      <StatusBar backgroundColor="#121314" />
      {Platform.OS === 'ios' && (
        <BannerNotification
          customComponent={<UploadBanner />}
          ref={notificationRef}
          showKnob={false}
          blurType="light"
          autohide={false}
          hideStatusBar={false}
        />
      )}

      <LocationCounter locationId={checkInStore.lastCheckIn.locationId} variant="large" />

      <EventPagePictures
        event={checkInStore.lastCheckIn.eventId ? checkInStore.currentEvent : undefined}
        location={checkInStore.lastCheckIn.eventId ? undefined : checkInStore.currentLocation}
        size="small"
      />

      <Box flexDirection="row" justifyContent="space-evenly" marginBottom="xl" backgroundColor="seperator" paddingVertical="xxl">
        {chatStore.currentRoomName !== undefined && (
          <ProtestActionButton
            title="צ׳אט הפגנה"
            icon={require('@assets/icons/chat-icon.png')}
            onPress={() => navigation.navigate('ProtestChat')}
          />
        )}
        <ProtestActionButton
          title="צילום תמונה"
          icon={require('@assets/icons/camera-fluent.png')}
          onPress={() => navigation.navigate('ChatImageUpload', { onImageUpload })}
        />
      </Box>
    </Box>
  );
}

export default observer(ProtestDashboard);
