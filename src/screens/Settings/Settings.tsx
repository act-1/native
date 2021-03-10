import React from 'react';
import { ScrollView, Linking } from 'react-native';
import { Box, Text } from '../../components';
import { observer } from 'mobx-react-lite';
import { useStore } from '../../stores';
import { SettingsScreenProps } from '../../types/navigation';
import SettingBox from './SettingsBox';
import DeviceInfo from 'react-native-device-info';

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
        <SettingBox
          first
          endIcon="external-link"
          title="פייסבוק"
          icon="😳"
          onPress={() => Linking.openURL('https://instagram.com/act1.co.il')}
        />
        <SettingBox
          last
          endIcon="external-link"
          title="טוויטר"
          icon="🐦"
          onPress={() => Linking.openURL('twitter://user?screen_name=act1coil')}
        />
      </Box>

      <Box margin="m" borderRadius={10} backgroundColor="sectionListSeperator">
        <SettingBox first endIcon={null} title="מדיניות פרטיות" icon="📜" />

        <SettingBox last endIcon={null} title="תודות" icon="🙏" />
      </Box>

      <Text variant="boxSubtitle" textAlign="center" marginBottom="xxs" opacity={0.7}>
        Act1 v{DeviceInfo.getVersion()}
      </Text>
    </ScrollView>
  );
}

export default observer(Settings);
