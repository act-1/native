import React, { ReactChild } from 'react';
import { StyleSheet, ScrollView, ViewStyle } from 'react-native';
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
        <SettingBox first>
          <Text variant="boxTitle">👀{'  '}פרטיות</Text>
        </SettingBox>

        <SettingBox last>
          <Text variant="boxTitle">🚨{'  '}התראות</Text>
        </SettingBox>
      </Box>

      <Box margin="m" borderRadius={10} backgroundColor="sectionListSeperator">
        <SettingBox first>
          <Text variant="boxTitle">📨{'  '}שליחת פידבק</Text>
        </SettingBox>

        <SettingBox>
          <Text variant="boxTitle">❔{'  '} שאלות נפוצות</Text>
        </SettingBox>
        <SettingBox>
          <Text variant="boxTitle">📜{'  '} מדיניות פרטיות</Text>
        </SettingBox>
      </Box>

      <Box margin="m" borderRadius={10} backgroundColor="sectionListSeperator">
        <SettingBox first>
          <Text variant="boxTitle">😳{'  '}פייסבוק</Text>
        </SettingBox>
        <SettingBox last>
          <Text variant="boxTitle">🐦{'  '}טוויטר</Text>
        </SettingBox>
      </Box>

      <Box margin="m" borderRadius={10} backgroundColor="sectionListSeperator">
        <SettingBox first last>
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
  children,
  first,
  last,
  style,
}: {
  children: ReactChild;
  first?: boolean;
  last?: boolean;
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
    <TouchableHighlight underlayColor="#222222" onPress={() => null} style={[styles.settingBoxBase, boxStyle, style]}>
      <Box flexDirection="row" justifyContent="space-between" alignItems="center" flex={1}>
        {children}
        <Icon name="chevron-left" color="#444444" size={22} />
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
