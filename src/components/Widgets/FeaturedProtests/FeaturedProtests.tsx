import React from 'react';
import { ScrollView, StyleSheet, ViewStyle } from 'react-native';
import { Box } from '../..';
// import analytics from '@react-native-firebase/analytics';

import { useNavigation } from '@react-navigation/native';

import FeaturedProtestBox from './FeaturedProtestBox';

import { Event } from '@types/collections';

type EventsWidgetProps = {
  protests: Event[];
  style?: ViewStyle;
};

function FeaturedProtests({ protests, style }: EventsWidgetProps) {
  const navigation = useNavigation();
  return (
    <Box style={style} flex={1} width="100%">
      <ScrollView showsHorizontalScrollIndicator={false} horizontal={true} contentContainerStyle={styles.featuredProtests}>
        {protests.map((protest) => (
          <FeaturedProtestBox
            key={protest.id}
            protest={protest}
            attendingCount={3021}
            onPress={() => navigation.navigate('EventPage', { eventId: protest.id })}
          />
        ))}
      </ScrollView>
    </Box>
  );
}

export default FeaturedProtests;

const styles = StyleSheet.create({
  featuredProtests: {
    minWidth: '100%',
  },
});
