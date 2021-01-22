import React from 'react';
// import { View, Text } from 'react-native';
import { Box, Text } from '../../components';
import ActionButton from './ActionButton';

export default function ActionScreen() {
  return (
    <Box padding="m">
      <ActionButton
        backgroundImage={require('@assets/pictures/check-in-action.png')}
        icon={require('@assets/icons/location-icon.png')}
        title="צ׳ק אין"
        description="הצטרפו להפגנה וראו מי מפגין אתכם"
        color="red"
        style={{ marginBottom: 12 }}
      />
      <ActionButton
        backgroundImage={require('@assets/pictures/check-in-action.png')}
        icon={require('@assets/icons/camera.png')}
        title="העלאת תמונה"
        color="blue"
        description="המהפכה לא תשודר בטלוויזיה"
      />
    </Box>
  );
}
