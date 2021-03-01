import React, { useEffect, useRef } from 'react';
import { Platform } from 'react-native';
import { observer } from 'mobx-react-lite';
import { useStore } from '../../stores';
import { Box, Text, LocationCounter } from '../../components';
import { ProtestDashboardProps } from '@types/navigation';
import { logEvent } from '@services/analytics';
import ProtestActionButton from './ProtestActionButton';

import { Notification as BannerNotification } from 'react-native-in-app-message';
import UploadBanner from '@components/UploadBanner';

function ProtestDashboard({ navigation, route }: ProtestDashboardProps) {
  const { feedStore, checkInStore, chatStore } = useStore();
  const notificationRef = useRef<BannerNotification>(null);

  React.useLayoutEffect(() => {
    if (checkInStore.lastCheckIn) {
      navigation.setOptions({
        headerTitle: checkInStore.lastCheckIn.locationName,
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
    <Box flex={1} style={{ backgroundColor: '#181a1b' }}>
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
      <LocationCounter
        locationId={checkInStore.lastCheckIn.locationId}
        style={{ marginBottom: 16, backgroundColor: '#111111', zIndex: 0 }}
      />
      <Box flexDirection="row" justifyContent="space-evenly" marginBottom="xl">
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
      <Box flexDirection="row" justifyContent="space-evenly">
        <ProtestActionButton
          title="גלריית תמונות"
          icon={require('@assets/icons/gallery.png')}
          onPress={() =>
            navigation.navigate('EventPictures', {
              eventId: checkInStore.lastCheckIn.eventId,
              locationId: checkInStore.lastCheckIn.locationId,
              title: checkInStore.lastCheckIn.locationName,
            })
          }
        />
        <ProtestActionButton title="הזמנת חברים" icon={require('@assets/icons/fist-color.png')} />
      </Box>
    </Box>
  );
}

export default observer(ProtestDashboard);
