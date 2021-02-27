import React from 'react';
import { observer } from 'mobx-react-lite';
import { useStore } from '../../stores';
import { Box, Text, LocationCounter } from '../../components';
import { ProtestDashboardProps } from '@types/navigation';
import { logEvent } from '@services/analytics';
import ProtestActionButton from './ProtestActionButton';

function ProtestDashboard({ navigation, route }: ProtestDashboardProps) {
  const { feedStore } = useStore();

  React.useLayoutEffect(() => {
    if (route.params?.checkIn?.locationName) {
      navigation.setOptions({
        headerTitle: route.params.checkIn.locationName,
      });
    }
  }, [route]);

  const onImageUpload = ({ image, text }: { image: TakePictureResponse; text?: string }) => {
    const {
      locationId: id,
      locationCity: city,
      locationName: name,
      locationProvince: province,
      coordinates,
    } = route.params.checkIn;

    const location = { id, city, name, province, coordinates };

    feedStore.uploadImage({ image, textContent: text, location });
  };

  return (
    <Box flex={1} style={{ backgroundColor: '#171b1f' }}>
      {/* <LocationCounter locationId={checkIn.locationId} style={{ backgroundColor: '#000000' }} /> */}
      <Box flexDirection="row" justifyContent="space-evenly" marginBottom="xl">
        <ProtestActionButton
          title="צ׳אט הפגנה"
          icon={require('@assets/icons/chat-icon.png')}
          onPress={() => navigation.navigate('ProtestChat')}
        />
        <ProtestActionButton
          title="צילום תמונה"
          icon={require('@assets/icons/camera-fluent.png')}
          onPress={() => navigation.navigate('ChatImageUpload')}
        />
      </Box>
      <Box flexDirection="row" justifyContent="space-evenly">
        <ProtestActionButton
          title="גלריית תמונות"
          icon={require('@assets/icons/gallery.png')}
          onPress={() =>
            navigation.navigate('EventPictures', {
              eventId: route.params.checkIn.eventId,
              eventTitle: route.params.checkIn.eventTitle,
            })
          }
        />
        <ProtestActionButton title="הזמנת חברים" icon={require('@assets/icons/fist-color.png')} />
      </Box>
    </Box>
  );
}

export default observer(ProtestDashboard);
