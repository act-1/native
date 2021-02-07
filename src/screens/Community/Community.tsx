import React from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { Text } from '../../components';
import { LatestPictures } from '@components/Widgets';
import CommunityStats from './CommunityStats';
import LiveLocationBox from './LiveLocationBox';

const Community = () => {
  return (
    <ScrollView style={{ flex: 1 }}>
      <CommunityStats />
      <Text variant="largeTitle" color="lightText" paddingHorizontal="m" marginTop="m" marginBottom="xm">
        תמונות אחרונות
      </Text>

      <LatestPictures />

      <Text variant="largeTitle" color="lightText" paddingHorizontal="m" marginBottom="xm">
        הפגנות בשבוע האחרון
      </Text>

      <ScrollView showsHorizontalScrollIndicator={false} horizontal={true} style={{ marginBottom: 24 }}>
        <LiveLocationBox
          thumbnail="https://res.cloudinary.com/onekm/image/upload/v1611924820/event_thumbs/142885280_200352405168257_4781714021866219893_n_xr9xyp.jpg"
          city="תל אביב"
          locationName="כיכר דיזינגוף"
          attendingCount={432}
        />
        <LiveLocationBox
          thumbnail="https://res.cloudinary.com/onekm/image/upload/v1608216320/event_thumbs/131373524_176553364176153_165322839044322366_o_bqqkd0.jpg"
          city="ירושלים"
          locationName="כיכר פריז"
          attendingCount={3021}
        />
        <LiveLocationBox
          thumbnail="https://res.cloudinary.com/onekm/image/upload/v1608216629/event_thumbs/herzeliya-19-dec_zxm2fi.jpg"
          city="הרצליה"
          locationName="רחבת הסינמטק"
          attendingCount={189}
        />
      </ScrollView>
    </ScrollView>
  );
};

export default Community;
