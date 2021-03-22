import React, { useState } from 'react';
import { Platform, Pressable, StyleSheet } from 'react-native';
import { Box, Text } from '../../components';
import { observer } from 'mobx-react-lite';
import { useStore } from '../../stores';
import { updateUserRegion, completeSignUp } from '@services/user';
import HapticFeedback from 'react-native-haptic-feedback';
import RoundedButton from '@components/Buttons/RoundedButton';

import Ivrita from 'ivrita';

function SignUpRegion({ navigation }) {
  const { userStore } = useStore();
  const [isLoading, setLoading] = useState(false);
  const { pronoun, region } = userStore.signUpData;

  const onRegionPress = (value: Region) => {
    // Reset value if clicking the same option twice.
    HapticFeedback.trigger('impactLight');
    userStore.updateSignUpData({ region: value });
  };

  const nextStep = () => {
    setLoading(true);
    updateUserRegion(region);
    // Sets the `signupCompleted` user flag to true.
    // Once the update hits firestore, the navigator will automatically switch to Home (see `AppNavigator`).
    completeSignUp();
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
        <RegionOption value="הגליל העליון" onPress={(value) => onRegionPress(value)} selectedRegion={region} />
        <RegionOption value="הגליל התחתון" onPress={(value) => onRegionPress(value)} selectedRegion={region} />
        <RegionOption value="הגולן" onPress={(value) => onRegionPress(value)} selectedRegion={region} />
        <RegionOption value="חיפה והקריות" onPress={(value) => onRegionPress(value)} selectedRegion={region} />
        <RegionOption value="השרון" onPress={(value) => onRegionPress(value)} selectedRegion={region} />
        <RegionOption value="תל אביב" onPress={(value) => onRegionPress(value)} selectedRegion={region} />
        <RegionOption value="המרכז" onPress={(value) => onRegionPress(value)} selectedRegion={region} />
        <RegionOption value="השפלה" onPress={(value) => onRegionPress(value)} selectedRegion={region} />
        <RegionOption value="ירושלים" onPress={(value) => onRegionPress(value)} selectedRegion={region} />
        <RegionOption value="חוף אשקלון ועוטף עזה" onPress={(value) => onRegionPress(value)} selectedRegion={region} />
        <RegionOption value="הנגב" onPress={(value) => onRegionPress(value)} selectedRegion={region} />
        <RegionOption value="אילת והערבה" onPress={(value) => onRegionPress(value)} selectedRegion={region} />
      </Box>

      <Box alignItems="center" marginBottom="m">
        <RoundedButton
          color="yellow"
          text="סיום"
          loading={isLoading}
          onPress={() => {
            if (!isLoading) nextStep();
          }}
        />
      </Box>
    </Box>
  );
}

export default observer(SignUpRegion);

type RegionOptionProps = {
  value: Region;
  selectedRegion: Region;
  onPress: (value: Region) => void;
};

const fontSize = Platform.select({ ios: 16, android: 14 });

const RegionOption = ({ value, selectedRegion, onPress }: RegionOptionProps) => {
  return (
    <Pressable
      style={[styles.provinceOptionWrapper, value === selectedRegion && styles.provinceOptionSelected]}
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
