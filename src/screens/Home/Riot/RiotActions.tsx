import React from 'react';
import { StyleSheet } from 'react-native';
import { Box, Text } from '../../../components';
import Icon from 'react-native-vector-icons/Feather';

export default function RiotActions() {
  return (
    <Box style={styles.actionsWrapper}>
      <RiotAction title="שליחת דיווח" iconName="alert-circle" />
      <RiotAction title="צילום תמונה" iconName="camera" />
      <RiotAction title="הזמנת חברים" iconName="share" />
    </Box>
  );
}

const RiotAction = ({ title, iconName, onPress }: { title: string; iconName: string; onPress?: () => void }) => (
  <Box alignItems="center" minWidth={72.5}>
    <Icon name={iconName} size={34} color="white" style={{ marginBottom: 6 }} />
    <Text variant="smallText" fontSize={12}>
      {title}
    </Text>
  </Box>
);

const styles = StyleSheet.create({
  actionsWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    paddingVertical: 12,
    marginTop: 12,
    backgroundColor: '#222222',
    borderRadius: 8,
  },
});
