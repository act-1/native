import React from 'react';
import { Image, StyleSheet } from 'react-native';
import { Box, Text } from '../../../components';
import { RoundedButton } from '@components/Buttons';

const features = [
  {
    key: 'checkIn',
    icon: require('@assets/icons/strike.png'),
    title: 'צ׳ק אין',
    description: 'עשו צ׳ק אין להפגנה וצפו מי עוד מפגין ברחבי הארץ.',
  },
  {
    key: 'pictures',
    icon: require('@assets/icons/camera.png'),
    title: 'תמונות',
    description: 'העלו צילומים וצפו בתמונות מהאירועים האחרונים.',
  },
  {
    key: 'events',
    icon: require('@assets/icons/camera.png'),
    title: 'אירועים',
    description: 'בדקו הפגנות קרובות, סמנו הגעה וקבלו עדכונים.',
  },
  {
    key: 'feed',
    icon: require('@assets/icons/camera.png'),
    title: 'פיד מחאה',
    description: 'חדשות אחרונות מהמאבקים השונים בארצנו.',
  },
];

function Features({ nextPage }: BoardingScreenProps) {
  return (
    <Box flex={1} justifyContent="flex-start" alignItems="center" marginTop="xm" style={{ paddingHorizontal: 60 }}>
      {features.map((feature) => (
        <Box flexDirection="row" marginBottom="xm" key={feature.key}>
          <Image source={feature.icon} style={styles.featureIcon} />
          <Box width="100%">
            <Text variant="boxTitle">{feature.title}</Text>
            <Text variant="boxTitle" fontWeight="500">
              {feature.description}
            </Text>
          </Box>
        </Box>
      ))}

      <RoundedButton text="המשך" color="yellow" onPress={nextPage} />
    </Box>
  );
}

export default Features;

const styles = StyleSheet.create({
  featureIcon: {
    width: 64,
    height: 64,
    opacity: 0.75,
    marginRight: 12,
  },
});
