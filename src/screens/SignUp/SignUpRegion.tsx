import React from 'react';
import { Platform, Pressable, StyleSheet } from 'react-native';
import { Box, Text } from '../../components';
import { observer } from 'mobx-react-lite';
import { useStore } from '../../stores';
import { updateUserRegion } from '@services/user';
import HapticFeedback from 'react-native-haptic-feedback';
import RoundedButton from '@components/Buttons/RoundedButton';

import Ivrita from 'ivrita';

function SignUpRegion({ navigation }) {
  const { userStore } = useStore();
  const { pronoun, region } = userStore.signUpData;

  const onProvincePress = (value: Region) => {
    // Reset value if clicking the same option twice.
    HapticFeedback.trigger('impactLight');
    userStore.updateSignUpData({ region: value });
  };

  const nextStep = () => {
    updateUserRegion(region);

    if (userStore.userLocationPermission !== 'denied') {
      // Finish sign up
      // navigate to homepage
      navigation.navigate('');
    } else {
      // navigate to location permission page
    }
  };

  return (
    <Box flex={1} marginHorizontal="l">
      <Text
        variant="hugeTitle"
        color="primaryColor"
        fontSize={68}
        textAlign="center"
        style={{ marginBottom: Platform.select({ ios: 32, android: 8 }) }}
        maxFontSizeMultiplier={1.2}
      >
        ACT1
      </Text>

      <Text variant="extraLargeTitle" maxFontSizeMultiplier={1.1}>
        {Ivrita.genderize('מאיפה אתם.ן בארץ?', Ivrita[pronoun])}
      </Text>
      <Text variant="boxTitle" fontFamily="AtlasDL3.1AAA-Light" marginBottom="l" maxFontSizeMultiplier={1.1}>
        בשביל שנוכל להציג הפגנות באיזורך
      </Text>
      <Box flexDirection="row" flexWrap="wrap" marginBottom="l">
        <ProvinceOption value="הגליל העליון" onPress={(value) => onProvincePress(value)} selectedProvince={region} />
        <ProvinceOption value="הגליל התחתון" onPress={(value) => onProvincePress(value)} selectedProvince={region} />
        <ProvinceOption value="הגולן" onPress={(value) => onProvincePress(value)} selectedProvince={region} />
        <ProvinceOption value="חיפה והקריות" onPress={(value) => onProvincePress(value)} selectedProvince={region} />
        <ProvinceOption value="השרון" onPress={(value) => onProvincePress(value)} selectedProvince={region} />
        <ProvinceOption value="תל אביב" onPress={(value) => onProvincePress(value)} selectedProvince={region} />
        <ProvinceOption value="המרכז" onPress={(value) => onProvincePress(value)} selectedProvince={region} />
        <ProvinceOption value="השפלה" onPress={(value) => onProvincePress(value)} selectedProvince={region} />
        <ProvinceOption value="ירושלים" onPress={(value) => onProvincePress(value)} selectedProvince={region} />
        <ProvinceOption value="חוף אשקלון ועוטף עזה" onPress={(value) => onProvincePress(value)} selectedProvince={region} />
        <ProvinceOption value="הנגב" onPress={(value) => onProvincePress(value)} selectedProvince={region} />
        <ProvinceOption value="אילת והערבה" onPress={(value) => onProvincePress(value)} selectedProvince={region} />
      </Box>

      {/* <Box minHeight={70}>
        <Text variant="largeTitle" textAlign="center" marginBottom="xl">
          {getProvinceCaption(province)}
        </Text>
      </Box> */}

      <Box alignItems="center" marginBottom="m">
        <RoundedButton color="yellow" text="המשך" onPress={() => nextStep()} />
      </Box>
      <Box alignItems="center" opacity={0.55}>
        <RoundedButton
          color="grey"
          text="דילוג"
          onPress={() => {
            userStore.updateSignUpData({ region: null });
            nextStep();
          }}
        />
      </Box>
    </Box>
  );
}

export default observer(SignUpRegion);

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
      <Text variant="smallText" fontSize={fontSize} fontFamily="AtlasDL3.1AAA-Medium" maxFontSizeMultiplier={1.1}>
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
