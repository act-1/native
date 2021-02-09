import React from 'react';
import { observer } from 'mobx-react-lite';
import { Box, Text } from '../../components';
import { StatusBar, StyleSheet, ScrollView } from 'react-native';
import { Stats, FeaturedPictures, FeaturedEvents, FeaturedProtests } from '@components/Widgets';
import { TouchableNativeFeedback } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/Feather';

function Home() {
  return (
    <ScrollView style={styles.homeWrapper}>
      <StatusBar backgroundColor="#0a0a0a" barStyle="light-content" networkActivityIndicatorVisible={false} />
      <Stats />

      <Text variant="largeTitle" color="lightText" paddingHorizontal="m" marginTop="m" marginBottom="xm">
        תמונות נבחרות
      </Text>

      <FeaturedPictures style={{ marginBottom: 12 }} />

      <Text variant="largeTitle" color="lightText" paddingHorizontal="m" marginTop="m" marginBottom="xm">
        עכשיו מפגינים
      </Text>

      <FeaturedProtests />

      {/* <Box> */}
      {/* <TouchableNativeFeedback>
        <Box style={styles.upcomingProtestsButton}>
          <Icon name="calendar" size={16} color="white" />
          <Text variant="boxTitle" marginLeft="s">
            הפגנות קרובות
          </Text>
        </Box>
      </TouchableNativeFeedback> */}
      {/* <TouchableNativeFeedback>
          <Box style={styles.upcomingProtestsButton}>
            <Icon name="camera" size={16} color="white" />
            <Text variant="boxTitle" marginLeft="s">
              תמונות אחרונות
            </Text>
          </Box>
        </TouchableNativeFeedback>
      </Box> */}
      {/* 
      <Text variant="largeTitle" color="lightText" paddingHorizontal="m" marginTop="m" marginBottom="xm">
        הפגנות קרובות
      </Text>

      <FeaturedEvents style={{ marginBottom: 42 }} /> */}
    </ScrollView>
  );
}

export default observer(Home);

const styles = StyleSheet.create({
  homeWrapper: {
    flex: 1,
  },
  upcomingProtestsButton: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 40,
    borderRadius: 8,
    flex: 1,
    paddingVertical: 8,
    paddingHorizontal: 16,
    marginHorizontal: 12,
    marginBottom: 8,
    backgroundColor: '#191919',
  },
});
