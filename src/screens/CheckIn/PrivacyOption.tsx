import React, { useEffect, useRef } from 'react';
import { Pressable, Animated, StyleSheet } from 'react-native';
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
  const fade = useRef(new Animated.Value(selected ? 1 : 0.5)).current;

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
        toValue: 0.5,
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
          <Icon name={optionIcon} color="white" size={42.5} />
        </Box>
        <Box>
          <Text variant="largeTitle" marginBottom="s">
            {optionTitle}
          </Text>
          <Box>
            {descriptionList.map((item, index) => (
              <Box flexDirection="row" alignItems="center" marginBottom="xxs" key={index}>
                <Icon
                  name={item.check ? 'check' : 'x'}
                  color={selected ? (item.check ? 'green' : 'tomato') : '#767678'}
                  size={16}
                  style={{ marginRight: 4 }}
                />
                <Text variant="text">{item.text}</Text>
              </Box>
            ))}
          </Box>
        </Box>
      </Animated.View>
    </Pressable>
  );
}

export default PrivacyOption;

const styles = StyleSheet.create({
  privacyOptionWrapper: {
    flexDirection: 'row',
    paddingHorizontal: 24,
    marginBottom: 24,
  },
  privacyOptionImage: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 75,
    height: 75,
    borderRadius: 50,
    backgroundColor: '#222222',
  },
});
