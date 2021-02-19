import React from 'react';
import { ScrollView, StyleSheet, ViewStyle } from 'react-native';
import { Box } from '../..';
// import analytics from '@react-native-firebase/analytics';

import { useNavigation } from '@react-navigation/native';

import FeaturedProtestBox from './FeaturedProtestBox';

import { IEvent } from '@types/event';

type EventsWidgetProps = {
  protests: IEvent[];
  style?: ViewStyle;
};

function FeaturedProtests({ protests, style }: EventsWidgetProps) {
  return (
    <Box style={style} flex={1} width="100%">
      <ScrollView showsHorizontalScrollIndicator={false} horizontal={true} style={{ marginBottom: 24 }}>
        {protests.map((protest) => (
          <FeaturedProtestBox
            key={protest.id}
            thumbnail={protest.thumbnail}
            city={protest.city}
            locationName={protest.locationName}
            attendingCount={3021}
          />
        ))}
      </ScrollView>
    </Box>
  );
}

export default FeaturedProtests;

const styles = StyleSheet.create({
  featuredEvents: {
    minWidth: '100%',
  },
});
