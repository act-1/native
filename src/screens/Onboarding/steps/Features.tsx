import React from 'react';
import { Image, StyleSheet } from 'react-native';
import { Box, Text } from '../../../components';
import { RoundedButton } from '@components/Buttons';

const features = [
  {
    key: 'checkIn',
    icon: require('@assets/icons/strike-color.png'),
    title: 'צ׳ק אין',
    description: 'עשו צ׳ק אין להפגנה וצפו מי עוד מפגין ברחבי הארץ',
  },
  {
    key: 'events',
    icon: require('@assets/icons/event.png'),
    title: 'אירועים',
    description: 'בדקו הפגנות קרובות, סמנו הגעה וקבלו התראות על שינויים',
  },
  {
    key: 'pictures',
    icon: require('@assets/icons/camera-color.png'),
    title: 'תמונות',
    description: 'העלו צילומים וצפו בתמונות מהאירועים האחרונים',
  },
  {
    key: 'feed',
    icon: require('@assets/icons/news.png'),
    title: 'צ׳אט הפגנה',
    description: 'עדכונים ודיווחים ישירות מהמפגינים שאיתכם ',
  },
];

function Features({ nextPage }: BoardingScreenProps) {
  return (
    <Box flex={1} justifyContent="flex-start" alignItems="center" style={{ paddingHorizontal: 60 }}>
      {features.map((feature) => (
        <Box flexDirection="row" marginBottom="xm" key={feature.key}>
          <Box marginRight="xm">
            <Image source={feature.icon} style={styles.featureIcon} />
          </Box>

          <Box width="100%">
            <Text variant="boxTitle">{feature.title}</Text>
            <Text variant="boxTitle" fontFamily="AtlasDL3.1AAA-Medium">
              {feature.description}
            </Text>
          </Box>
        </Box>
      ))}

      <Text variant="boxTitle" marginTop="s">
        וזו רק ההתחלה.
      </Text>
      <Text variant="text" textAlign="center">
        האפליקצייה נמצאת בהרצה, ובשבועות הקרובים יתווספו פיצ’רים שיקחו את המאבקים שלנו לשלב הבא.
      </Text>

      <RoundedButton text="המשך" color="yellow" style={{ marginTop: 24 }} onPress={nextPage} />
    </Box>
  );
}

export default Features;

const styles = StyleSheet.create({
  featureIcon: {
    width: 64,
    height: 64,
    opacity: 0.8,
  },
});
