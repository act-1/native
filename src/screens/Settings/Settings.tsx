import React, { ReactChild } from 'react';
import { StyleSheet, ScrollView, ViewStyle, Linking, Pressable } from 'react-native';
import { Box, Text } from '../../components';
import { observer } from 'mobx-react-lite';
import { useStore } from '../../stores';
import { SettingsScreenProps } from '../../types/navigation';
import { TouchableHighlight } from 'react-native-gesture-handler';
import DeviceInfo from 'react-native-device-info';
import Icon from 'react-native-vector-icons/Feather';

// TODO: REFACTOR SETTINGS BOX TO title, icon & on press :]

function Settings({ navigation }: SettingsScreenProps) {
  const { userStore } = useStore();

  return (
    <ScrollView style={{ flex: 1 }}>
      <Box margin="m" borderRadius={10} backgroundColor="sectionListSeperator">
        <SettingBox first title="פרטיות" icon="👀" />
        <SettingBox last title="התראות" icon="🚨" />
      </Box>

      <Box margin="m" borderRadius={10} backgroundColor="sectionListSeperator">
        <SettingBox first title="שאלות נפוצות" icon="❔" endIcon={null} />

        <SettingBox last endIcon={null} title="שליחת פידבק" icon="📨" onPress={() => Linking.openURL('mailto:team@act1.co.il')} />
      </Box>

      <Box margin="m" borderRadius={10} backgroundColor="sectionListSeperator">
        <SettingBox first endIcon="external-link" onPress={() => Linking.openURL('https://instagram.com/act1.co.il')}>
          <Text variant="boxTitle">😳{'  '}פייסבוק</Text>
        </SettingBox>
        <SettingBox last endIcon="external-link" onPress={() => Linking.openURL('twitter://user?screen_name=act1coil')}>
          <Text variant="boxTitle">🐦{'  '}טוויטר</Text>
        </SettingBox>
      </Box>

      <Box margin="m" borderRadius={10} backgroundColor="sectionListSeperator">
        <SettingBox first endIcon={null}>
          <Text variant="boxTitle">📜{'  '} מדיניות פרטיות</Text>
        </SettingBox>

        <SettingBox last endIcon={null}>
          <Text variant="boxTitle">🙏{'  '} תודות</Text>
        </SettingBox>
      </Box>

      <Text variant="boxSubtitle" textAlign="center" marginBottom="xxs" opacity={0.7}>
        Act1 v{DeviceInfo.getVersion()}
      </Text>
    </ScrollView>
  );
}

function SettingBox({
  title,
  icon,
  first,
  last,
  onPress,
  endIcon = 'chevron-left',
  style,
}: {
  title: string;
  icon: string;
  first?: boolean;
  last?: boolean;
  endIcon?: string;
  onPress: () => void;
  style?: ViewStyle;
}) {
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

export default observer(Settings);

const styles = StyleSheet.create({
  profilePicture: {
    height: 60,
    width: 60,
    marginRight: 12,
    borderRadius: 50,
  },
  settingBoxBase: {
    flexDirection: 'row',
    paddingVertical: 16,
    paddingHorizontal: 12,
  },
});
