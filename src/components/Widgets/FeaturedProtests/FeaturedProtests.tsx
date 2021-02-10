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
          thumbnail="https://www.activestills.org/media-lib/main_image44700_medium.jpg?rnd=1562778758"
          city="ירושלים"
          locationName="כיכר פריז"
          attendingCount={3021}
        />
        <FeaturedProtestBox
          thumbnail="https://www.activestills.org/media-lib/main_image44946_medium.jpg?rnd=1755488128"
          city="תל אביב"
          locationName="כיכר רבין"
          attendingCount={1839}
        />
        <FeaturedProtestBox
          thumbnail="https://www.activestills.org/media-lib/main_image44946_medium.jpg?rnd=1755488128"
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
