import React, { useState, useEffect } from 'react';
import { SectionList, TouchableOpacity, Image, StyleSheet, Platform } from 'react-native';
import { Box, Text, EditProfilePicture } from '../../components';
import { observer } from 'mobx-react-lite';
import { useStore } from '../../stores';
import { ProfileScreenProps } from '../../types/navigation';
import { getUserCheckIns } from '@services/checkIn';
import ProfileCheckInBox from './ProfileCheckInBox';
import { formatCheckInsForSectionList, CheckInListItem } from './profile-utils';

function Profile({ navigation }: ProfileScreenProps) {
  const { userStore } = useStore();
  const [checkInList, setCheckInList] = useState<CheckInListItem[]>([]);
  // Get user check ins

  useEffect(() => {
    getUserCheckIns().then((checkIns) => {
      const list = formatCheckInsForSectionList(checkIns);
      setCheckInList(list);
    });
  }, []);

  return (
    <SectionList
      sections={checkInList}
      renderSectionHeader={({ section }) => (
        <Box backgroundColor="seperator" width="100%" paddingVertical="s" paddingLeft="m">
          <Text variant="boxSubtitle" fontWeight="700" opacity={0.75}>
            {section.date}
          </Text>
        </Box>
      )}
      renderItem={({ item }) => <ProfileCheckInBox checkIn={item} />}
      ListHeaderComponent={() => (
        <Box paddingTop="xxm" justifyContent="center" alignItems="center">
          <Box marginBottom="xm">
            <EditProfilePicture displayEditLink={false} />
          </Box>
        </Box>
      )}
      style={{ width: '100%' }}
    />
  );
}

export default observer(Profile);

const styles = StyleSheet.create({});

{
  /* <Box
          flexDirection="row"
          width="100%"
          justifyContent="center"
          alignItems="center"
          paddingVertical="xm"
          backgroundColor="greyBackground"
          marginBottom="xm"
        >
          <Box alignItems="center" marginEnd="xxl" opacity={0.6}>
            <Image source={require('@assets/icons/strike.png')} style={{ width: 38, height: 38, tintColor: '#737373' }} />
            <Text variant="boxTitle" color="subText" fontSize={14}>
              8 הפגנות
            </Text>
          </Box>
          <Box alignItems="center" opacity={0.6}>
            <Image source={require('@assets/icons/camera.png')} style={{ width: 38, height: 38, tintColor: '#737373' }} />
            <Text variant="boxTitle" color="subText" fontSize={14}>
              12 תמונות
            </Text>
          </Box>
        </Box> */
}
