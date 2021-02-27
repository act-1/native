import React, { useEffect, useRef } from 'react';
import { Pressable, Animated, StyleSheet, Dimensions, Platform } from 'react-native';
import { Box, Text } from '../../components';
import Icon from 'react-native-vector-icons/Feather';

type PrivacyOptionProps = {
  optionIcon: string;
  optionTitle: string;
  descriptionList: { check: boolean; text: string }[];
  selected: boolean;
  onPress: () => void;
};

function PrivacyOption({ optionIcon, optionTitle, descriptionList, selected, onPress }: PrivacyOptionProps) {
  const fade = useRef(new Animated.Value(selected ? 1 : 0.25)).current;

  useEffect(() => {
    // Animate fade on option selection
    if (selected === true) {
      Animated.timing(fade, {
        toValue: 1,
        duration: 150,
        useNativeDriver: true,
      }).start();
    } else {
      Animated.timing(fade, {
        toValue: 0.25,
        duration: 150,
        useNativeDriver: true,
      }).start();
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selected]);

  return (
    <Pressable onPress={onPress}>
      <Animated.View style={[styles.privacyOptionWrapper, { opacity: fade }]}>
        <Box style={styles.privacyOptionImage} marginRight="m">
          <Icon name={optionIcon} color="white" size={optionSize.size} />
        </Box>
        <Box>
          <Text variant="largeTitle" marginBottom="s">
            {optionTitle}
          </Text>
          <Box>
            {descriptionList.map((item, index) => (
              <Box flexDirection="row" alignItems="center" marginBottom="xs" key={index}>
                <Icon
                  name={item.check ? 'check' : 'x'}
                  color={selected ? (item.check ? 'green' : 'tomato') : '#767678'}
                  size={16}
                  style={{ marginRight: 5 }}
                />
                <Text variant="text" fontSize={optionSize.textSize} maxFontSizeMultiplier={1.1}>
                  {item.text}
                </Text>
              </Box>
            ))}
          </Box>
        </Box>
      </Animated.View>
    </Pressable>
  );
}

export default PrivacyOption;

const smallDimension = {
  size: Platform.select({ ios: 32.5, android: 30 }),
  width: Platform.select({ ios: 65, android: 60 }),
  height: Platform.select({ ios: 65, android: 60 }),
  textSize: Platform.select({ ios: 15, android: 14.2 }),
};

const largeDimension = {
  size: 42.5,
  width: 75,
  height: 75,
  textSize: Platform.select({ ios: 16, android: 15.5 }),
};

const { width: deviceWidth } = Dimensions.get('screen');
const optionSize = deviceWidth < 400 ? smallDimension : largeDimension;

const styles = StyleSheet.create({
  privacyOptionWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 24,
    marginBottom: 24,
  },
  privacyOptionImage: {
    alignItems: 'center',
    justifyContent: 'center',
    width: optionSize.width,
    height: optionSize.height,
    borderRadius: 50,
    backgroundColor: '#222222',
  },
});
