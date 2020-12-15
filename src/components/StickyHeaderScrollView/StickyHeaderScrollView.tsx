import React, { useRef, ReactNode } from 'react';
import { StyleSheet, Animated, RefreshControl } from 'react-native';
import { Box, Text, CircularButton } from '../';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

type StickyHeaderScrollViewProps = {
  children: ReactNode;
  headerTitle: string;
  goBack?: () => void;
};

function StickyHeaderScrollView({ children, headerTitle, goBack }: StickyHeaderScrollViewProps) {
  const [refreshing, setRefreshing] = React.useState(false);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);

  const insets = useSafeAreaInsets();

  const scrollY = useRef(new Animated.Value(0)).current;

  const HEADER_MAX_HEIGHT = 200;
  const HEADER_MIN_HEIGHT = insets.top + 50;
  const HEADER_SCROLL_DISTANCE = HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT;
  const HEADER_SCROLL_DISTANCE_PADDING = HEADER_SCROLL_DISTANCE + 60;

  // Our header y-axis animated from 0 to HEADER_SCROLL_DISTANCE,
  // we move our element for -HEADER_SCROLL_DISTANCE at the same time.
  const headerTranslateY = scrollY.interpolate({
    inputRange: [-HEADER_SCROLL_DISTANCE - 80, 0, HEADER_SCROLL_DISTANCE],
    outputRange: [HEADER_SCROLL_DISTANCE + 80, 0, -HEADER_SCROLL_DISTANCE],
    extrapolate: 'clamp',
  });

  const headerBGColor = scrollY.interpolate({
    inputRange: [-HEADER_SCROLL_DISTANCE, HEADER_SCROLL_DISTANCE + 80],
    outputRange: ['transparent', '#4e23bb'],
    extrapolate: 'clamp',
  });

  // Our opacity animated from 0 to 1 and our opacity will be 0
  const imageOpacity = scrollY.interpolate({
    inputRange: [0, HEADER_SCROLL_DISTANCE / 2, HEADER_SCROLL_DISTANCE],
    outputRange: [1, 1, 0],
    extrapolate: 'clamp',
  });

  const imageTranslateY = scrollY.interpolate({
    inputRange: [-HEADER_SCROLL_DISTANCE - 40, 0, HEADER_SCROLL_DISTANCE],
    outputRange: [-1, 0, 3],
    extrapolate: 'clamp',
  });

  // Change header title size from 1 to 0.9
  const topBarTitleOpacity = scrollY.interpolate({
    inputRange: [0, HEADER_SCROLL_DISTANCE, HEADER_SCROLL_DISTANCE_PADDING],
    outputRange: [0, 0.25, 1],
    extrapolate: 'clamp',
  });

  // Change header title y-axis
  const titleTranslateY = scrollY.interpolate({
    inputRange: [0, HEADER_SCROLL_DISTANCE, HEADER_SCROLL_DISTANCE_PADDING],
    outputRange: [0, 0, 1],
    extrapolate: 'clamp',
  });

  return (
    <Box flex={1}>
      <Animated.ScrollView
        contentContainerStyle={{ paddingTop: HEADER_MAX_HEIGHT }}
        scrollEventThrottle={16}
        showsVerticalScrollIndicator={false}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} enabled={true} />}
        onScroll={Animated.event([{ nativeEvent: { contentOffset: { y: scrollY } } }])}
      >
        {children}
      </Animated.ScrollView>

      <Animated.View
        style={[styles.header, { transform: [{ translateY: headerTranslateY }], height: HEADER_MAX_HEIGHT }]}
      >
        <Animated.Image
          style={[styles.eventThumb, { opacity: imageOpacity }, { transform: [{ translateY: imageTranslateY }] }]}
          source={require('../../components/EventBox/balfur-5-dec.jpg')}
        />
      </Animated.View>

      <Animated.View
        style={[
          styles.topBar,
          {
            marginTop: insets.top + 5,
            transform: [{ translateY: titleTranslateY }],
          },
        ]}
      >
        {goBack && (
          <Box style={{ position: 'absolute', left: 14 }}>
            <CircularButton onPress={() => goBack()} iconName="arrow-right" color="white" size="small" />
          </Box>
        )}
        <Animated.View style={{ opacity: topBarTitleOpacity }}>
          <Text
            allowFontScaling={false}
            fontSize={16}
            variant="eventBoxTitle"
            color="mainBackground"
            textAlign="center"
          >
            {headerTitle}
          </Text>
        </Animated.View>
      </Animated.View>
    </Box>
  );
}

export default StickyHeaderScrollView;

const styles = StyleSheet.create({
  header: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 80,
    overflow: 'hidden',
    backgroundColor: '#4e23bb',
  },
  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    top: 8,
    width: '100%',
  },
  eventThumb: {
    width: '100%',
    height: 200,
  },
});
