import React from 'react';
import { ScrollView, StyleSheet, ViewStyle } from 'react-native';
import { observer } from 'mobx-react-lite';
// import analytics from '@react-native-firebase/analytics';
import { useNavigation } from '@react-navigation/native';
import { useStore } from '../../../stores';
import { Box } from '../..';
import FeaturedProtestBox from './FeaturedProtestBox';

type EventsWidgetProps = {
  style?: ViewStyle;
};

function FeaturedProtests({ style }: EventsWidgetProps) {
  const { eventStore } = useStore();

  return (
    <Box style={style} flex={1} width="100%">
      <ScrollView showsHorizontalScrollIndicator={false} horizontal={true} style={{ marginBottom: 24 }}>
        <FeaturedProtestBox
          thumbnail="https://res.cloudinary.com/onekm/image/upload/v1611924820/event_thumbs/142885280_200352405168257_4781714021866219893_n_xr9xyp.jpg"
          city="תל אביב"
          locationName="כיכר דיזינגוף"
          attendingCount={432}
        />
        <FeaturedProtestBox
          thumbnail="https://res.cloudinary.com/onekm/image/upload/v1608216320/event_thumbs/131373524_176553364176153_165322839044322366_o_bqqkd0.jpg"
          city="ירושלים"
          locationName="כיכר פריז"
          attendingCount={3021}
        />
        <FeaturedProtestBox
          thumbnail="https://res.cloudinary.com/onekm/image/upload/v1608216629/event_thumbs/herzeliya-19-dec_zxm2fi.jpg"
          city="הרצליה"
          locationName="רחבת הסינמטק"
          attendingCount={189}
        />
      </ScrollView>
    </Box>
  );
}

export default observer(FeaturedProtests);

const styles = StyleSheet.create({
  featuredEvents: {
    minWidth: '100%',
  },
});
