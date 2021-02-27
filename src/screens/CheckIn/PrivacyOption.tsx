import React from 'react';
import { Pressable, StyleSheet } from 'react-native';
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
  return (
    <Pressable onPress={onPress}>
      <Box flexDirection="row" paddingHorizontal="l" marginBottom="l" style={{ opacity: selected ? 1 : 0.6 }}>
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
      </Box>
    </Pressable>
  );
}

export default PrivacyOption;

const styles = StyleSheet.create({
  privacyOptionImage: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 75,
    height: 75,
    borderRadius: 50,
    backgroundColor: '#222222',
  },
});
