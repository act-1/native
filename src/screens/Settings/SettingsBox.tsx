import React from 'react';
import { ViewStyle, StyleSheet } from 'react-native';
import { Box, Text } from '../../components';
import { TouchableHighlight } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/Feather';

type SettingBoxProps = {
  title: string;
  icon: string;
  first?: boolean;
  last?: boolean;
  endIcon?: string | null;
  onPress?: () => void;
  style?: ViewStyle;
};

function SettingBox({ title, icon, first, last, onPress, endIcon = 'chevron-left', style }: SettingBoxProps) {
  let boxStyle: ViewStyle = {};

  if (!first) boxStyle = { borderTopColor: '#222222', borderTopWidth: 1 };

  if (first) {
    boxStyle = { borderTopLeftRadius: 10, borderTopRightRadius: 10, ...boxStyle };
  }

  if (last) {
    boxStyle = { borderBottomLeftRadius: 10, borderBottomRightRadius: 10, ...boxStyle };
  }

  return (
    <TouchableHighlight underlayColor="#222222" onPress={onPress} style={[styles.settingBoxBase, boxStyle, style]}>
      <Box flexDirection="row" justifyContent="space-between" alignItems="center" flex={1}>
        <Box flexDirection="row" alignItems="center">
          {icon && (
            <Text marginRight="s" variant="boxTitle">
              {icon}
            </Text>
          )}
          <Text variant="boxTitle" opacity={0.95}>
            {title}
          </Text>
        </Box>
        {endIcon && <Icon name={endIcon} color="#444444" size={22} />}
      </Box>
    </TouchableHighlight>
  );
}

export default SettingBox;

const styles = StyleSheet.create({
  settingBoxBase: {
    flexDirection: 'row',
    paddingVertical: 16,
    paddingHorizontal: 12,
  },
});
