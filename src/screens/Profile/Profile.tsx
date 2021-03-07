import React, { useState, useEffect } from 'react';
import { SectionList, ActivityIndicator, Image, StyleSheet, Platform } from 'react-native';
import { Box, Text, EditProfilePicture, RoundedButton } from '../../components';
import { observer } from 'mobx-react-lite';
import { useStore } from '../../stores';
import { ProfileScreenProps } from '../../types/navigation';
import { getUserCheckIns } from '@services/checkIn';
import ProfileCheckInBox from './ProfileCheckInBox';
import { formatCheckInsForSectionList, CheckInListItem } from './profile-utils';

function Profile({ navigation }: ProfileScreenProps) {
  const { userStore } = useStore();
  const [checkInList, setCheckInList] = useState<CheckInListItem[]>([]);
  const [listLoading, setListLoading] = useState(true);
  const [checkInsLength, setCheckInsLength] = useState(0);
  // Get user check ins

  useEffect(() => {
    getUserCheckIns().then((checkIns) => {
      setCheckInsLength(checkIns.length);
      const list = formatCheckInsForSectionList(checkIns);
      setCheckInList(list);
      setListLoading(false);
    });
  }, []);

  const NoCheckInsComponent = () => {
    if (listLoading) {
      return (
        <Box alignItems="center" marginTop="xm">
          <ActivityIndicator color="grey" />
        </Box>
      );
    }

    return (
      <Box alignItems="center" marginTop="xm">
        <Text variant="boxTitle" color="subText" textAlign="center" marginBottom="xs">
          כאן יופיעו ההפגנות שהלכת אליהן
        </Text>
        <Text variant="boxTitle" color="subText" textAlign="center" marginBottom="m">
          עכשיו בהפגנה? עשו צ׳ק אין!
        </Text>

        <RoundedButton
          text="צ׳ק אין"
          color="red"
          style={{ opacity: 0.55 }}
          onPress={() => {
            navigation.goBack();
            setTimeout(() => {
              navigation.navigate('Secondary', { screen: 'CheckInModal' });
            }, 75);
          }}
        />
      </Box>
    );
  };

  return (
    <SectionList
      sections={checkInList}
      ListEmptyComponent={<NoCheckInsComponent />}
      renderSectionHeader={({ section }) => (
        <Box backgroundColor="greyBackground" width="100%" paddingVertical="s" paddingLeft="m">
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
          <Box
            flexDirection="row"
            width="100%"
            justifyContent="center"
            alignItems="center"
            paddingVertical="xm"
            backgroundColor="greyBackground"
            marginBottom="xm"
          >
            <Box alignItems="center" opacity={0.6}>
              <Image source={require('@assets/icons/strike.png')} style={{ width: 38, height: 38, tintColor: '#737373' }} />
              <Text variant="boxTitle" color="subText" fontSize={14}>
                {checkInsLength === 1 ? 'הפגנה אחת' : `${checkInsLength} הפגנות`}
              </Text>
            </Box>
            {/* <Box alignItems="center" opacity={0.6}>
              <Image source={require('@assets/icons/camera.png')} style={{ width: 38, height: 38, tintColor: '#737373' }} />
              <Text variant="boxTitle" color="subText" fontSize={14}>
                12 תמונות
              </Text>
            </Box> */}
          </Box>
        </Box>
      )}
      style={{ width: '100%' }}
    />
  );
}

export default observer(Profile);

const styles = StyleSheet.create({});
