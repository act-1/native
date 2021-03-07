import React from 'react';
import { Platform, Pressable, StyleSheet } from 'react-native';
import { Box, Text } from '../../components';
import { observer } from 'mobx-react-lite';
import { useStore } from '../../stores';
import HapticFeedback from 'react-native-haptic-feedback';
import RoundedButton from '@components/Buttons/RoundedButton';
import Ivrita from 'ivrita';

// function getProvinceCaption(province) {
//   switch (province) {
//     case 'חוף אשקלון ועוטף עזה':
//       return 'פיצוץ! 🚀';
//     case 'אילת והערבה':
//       return 'עיר של מלכים 👑';
//     case 'הגדה המערבית':
//       return 'כבשתן אותנו 👹';
//     case 'הגדה המערבית':
//       return 'כבשתן אותנו 👹';

//     default:
//       '';
//   }
// }

function SignUpProvince({ navigation }) {
  const { userStore } = useStore();
  const { pronoun, province } = userStore.signUpData;

  const onProvincePress = (value: Province) => {
    // Reset value if clicking the same option twice.
    HapticFeedback.trigger('impactLight');
    userStore.updateSignUpData({ province: value });
  };

  const skipStep = () => {
    userStore.updateSignUpData({ province: null });
    navigation.navigate('SignUpIncitement');
  };

  return (
    <Box flex={1}>
      <Text variant="extraLargeTitle">{Ivrita.genderize('מאיפה אתם.ן בארץ?', Ivrita[pronoun])}</Text>
      <Text variant="boxTitle" fontFamily="AtlasDL3.1AAA-Light" marginBottom="l">
        בשביל שנוכל להציג הפגנות באיזורך
      </Text>
      <Box flexDirection="row" flexWrap="wrap" marginBottom="l">
        <ProvinceOption value="הגליל העליון" onPress={(value) => onProvincePress(value)} selectedProvince={province} />
        <ProvinceOption value="הגליל התחתון" onPress={(value) => onProvincePress(value)} selectedProvince={province} />
        <ProvinceOption value="הגולן" onPress={(value) => onProvincePress(value)} selectedProvince={province} />
        <ProvinceOption value="חיפה והקריות" onPress={(value) => onProvincePress(value)} selectedProvince={province} />
        <ProvinceOption value="השרון" onPress={(value) => onProvincePress(value)} selectedProvince={province} />
        <ProvinceOption value="תל אביב" onPress={(value) => onProvincePress(value)} selectedProvince={province} />
        <ProvinceOption value="המרכז" onPress={(value) => onProvincePress(value)} selectedProvince={province} />
        <ProvinceOption value="הגדה המערבית" onPress={(value) => onProvincePress(value)} selectedProvince={province} />
        <ProvinceOption value="השפלה" onPress={(value) => onProvincePress(value)} selectedProvince={province} />
        <ProvinceOption value="ירושלים" onPress={(value) => onProvincePress(value)} selectedProvince={province} />
        <ProvinceOption value="חוף אשקלון ועוטף עזה" onPress={(value) => onProvincePress(value)} selectedProvince={province} />
        <ProvinceOption value="הנגב" onPress={(value) => onProvincePress(value)} selectedProvince={province} />
        <ProvinceOption value="אילת והערבה" onPress={(value) => onProvincePress(value)} selectedProvince={province} />
      </Box>

      {/* <Box minHeight={70}>
        <Text variant="largeTitle" textAlign="center" marginBottom="xl">
          {getProvinceCaption(province)}
        </Text>
      </Box> */}

      <Box alignItems="center" marginBottom="m">
        <RoundedButton color="yellow" text="המשך" onPress={() => navigation.navigate('SignUpIncitement')} />
      </Box>
      <Box alignItems="center" opacity={0.55}>
        <RoundedButton color="grey" text="דילוג" onPress={skipStep} />
      </Box>
    </Box>
  );
}

export default observer(SignUpProvince);

type ProvinceOptionProps = {
  value: Province;
  selectedProvince: Province;
  onPress: (value: Province) => void;
};

const fontSize = Platform.select({ ios: 16, android: 14 });

const ProvinceOption = ({ value, selectedProvince, onPress }: ProvinceOptionProps) => {
  return (
    <Pressable
      style={[styles.provinceOptionWrapper, value === selectedProvince && styles.provinceOptionSelected]}
      onPress={() => onPress(value)}
    >
      <Text variant="smallText" fontSize={fontSize} fontFamily="AtlasDL3.1AAA-Medium" maxFontSizeMultiplier={1.15}>
        {value}
      </Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  provinceOptionWrapper: {
    paddingVertical: 6,
    paddingHorizontal: 20,
    marginEnd: 8,
    marginBottom: 12,
    borderRadius: 25,
    borderWidth: 2,
    borderColor: '#fff',
  },
  provinceOptionSelected: {
    borderWidth: 2,
    borderColor: '#FF5858',
    backgroundColor: '#FF5858',
  },
});
