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
          thumbnail="https://scontent.ftlv5-1.fna.fbcdn.net/v/t1.0-9/148103400_4944746045600209_1753518546398248567_n.jpg?_nc_cat=106&ccb=2&_nc_sid=340051&_nc_ohc=a3kqKd5jYX0AX-Kql4B&_nc_ht=scontent.ftlv5-1.fna&oh=7e0751d5bf3b29fefaf9e95e4409d4b2&oe=60483E85"
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
