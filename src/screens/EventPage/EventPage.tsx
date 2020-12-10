import React, { useRef } from 'react';
import { StyleSheet, Animated, StatusBar, Image } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { useModal, modalfy } from 'react-native-modalfy';
import MapView from 'react-native-maps';
import HTML from 'react-native-render-html';
import { EventPageProps } from '@types/navigation';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Box, Text, CircularButton } from '../../components';
import { EventHeader, EventPageDetail, EventPageCounter } from './';

const htmlContent = `
<div style="textAlign: left;">
<p>ב 05/12/20 - "העם יקום על רגליו" </p>
<p>במוצ"ש הקרוב 05/12/20 כל תנועות המחאה בבלפור נפגשות בבלפור!!!</p>
<p>במשך שלושה חדשים ספרנו לאחור עד חידוש משפטו של הנאשם נתניהו, וכמו שהזהרנו, הוא שוב הצליח לדחות את התייצבותו להמשך משפטו, וזכה לעוד הארכה.</p>
<p>אבל אנחנו לא ניגרר למשחקי הדחיינות והבכיינות של הנאשם.
אנו נקיים את ההפגנה כמתוכנן ונתכנס לאירוע מחאה גדול, בהשתתפות *כל* ארגוני המחאה כדי הוציא את המדינה "מחושך לאור" ולהעביר מסר תקיף וחד משמעי: לנאשם במשרה מלאה אין ראש להיות ראש ממשלה. "אין אפשרות מלבד נבצרות"</p></div>
`;

function EventPage({ navigation }: EventPageProps) {
  const { openModal } = useModal();
  const insets = useSafeAreaInsets();
  const scrollY = useRef(new Animated.Value(0)).current;

  const HEADER_MAX_HEIGHT = 200;
  const HEADER_MIN_HEIGHT = insets.top + 50;
  const HEADER_SCROLL_DISTANCE = HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT;
  const HEADER_SCROLL_DISTANCE_PADDING = HEADER_SCROLL_DISTANCE + 60;

  // Our header y-axis animated from 0 to HEADER_SCROLL_DISTANCE,
  // we move our element for -HEADER_SCROLL_DISTANCE at the same time.
  const headerTranslateY = scrollY.interpolate({
    inputRange: [-HEADER_SCROLL_DISTANCE, 0, HEADER_SCROLL_DISTANCE],
    outputRange: [HEADER_SCROLL_DISTANCE, 0, -HEADER_SCROLL_DISTANCE],
    extrapolate: 'clamp',
  });

  // Our opacity animated from 0 to 1 and our opacity will be 0
  const imageOpacity = scrollY.interpolate({
    inputRange: [0, HEADER_SCROLL_DISTANCE / 2, HEADER_SCROLL_DISTANCE],
    outputRange: [1, 1, 0],
    extrapolate: 'clamp',
  });

  const imageTranslateY = scrollY.interpolate({
    inputRange: [-HEADER_SCROLL_DISTANCE, 0, HEADER_SCROLL_DISTANCE],
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

  const attendEvent = () => openModal('AttendingModal');

  return (
    <Box flex={1}>
      <StatusBar barStyle="light-content" backgroundColor="#7254c8" />

      <Animated.ScrollView
        contentContainerStyle={{ paddingTop: HEADER_MAX_HEIGHT }}
        scrollEventThrottle={16}
        showsVerticalScrollIndicator={false}
        onScroll={Animated.event([{ nativeEvent: { contentOffset: { y: scrollY } } }], { useNativeDriver: true })}
      >
        <Box backgroundColor="dimmedBackground">
          <Box paddingVertical="xm" marginBottom="m" backgroundColor="mainBackground" alignItems="center">
            <Text style={{ writingDirection: 'rtl' }} variant="largeTitle" marginBottom="m" textAlign="center">
              באנו חושך לגרש - הפגנת ענק בבלפור
            </Text>
            <Text variant="text">יום רביעי הקרוב בשעה 19:00</Text>
          </Box>

          <EventPageCounter number={4241} text="אישרו הגעה" style={{ marginBottom: 12 }} />

          <Box
            flexDirection="row"
            justifyContent="space-evenly"
            backgroundColor="mainBackground"
            paddingVertical="xm"
            marginBottom="m"
          >
            <CircularButton iconName="check" color="grey" text="אישור הגעה" onPress={attendEvent} />
            <CircularButton iconName="share" color="blue" text="הזמנת חברים" />
          </Box>

          <Box padding="m" marginBottom="m" backgroundColor="mainBackground">
            <Text variant="largeTitle" marginBottom="m">
              פרטים
            </Text>

            <Box height={50} justifyContent="space-between" marginBottom="xm">
              <EventPageDetail text="יום שבת בשעה 19:00" iconName="clock" />
              <EventPageDetail text="כיכר פריז, ירושלים" iconName="map-pin" />
            </Box>

            <MapView
              style={{ height: 175, marginHorizontal: -12, marginBottom: 16 }}
              scrollEnabled={false}
              mapPadding={{ right: -40, top: 0, bottom: 0, left: 0 }}
              initialRegion={{
                latitude: 37.78825,
                longitude: -122.4324,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
              }}
            />

            <HTML
              html={htmlContent}
              tagsStyles={{ p: { marginBottom: 12, fontSize: 15, fontFamily: 'Rubik-Regular' } }}
            />
          </Box>

          <Box padding="m" backgroundColor="mainBackground">
            <Text variant="largeTitle" marginBottom="m">
              מארגנים
            </Text>
            <Box flexDirection="row" alignItems="center">
              <Image
                source={require('../../components/EventBox/event-thumb.jpg')}
                style={{ width: 35, height: 35, borderRadius: 25, marginEnd: 8 }}
              />
              <Text variant="text">הדגלים השחורים</Text>
            </Box>
          </Box>
        </Box>
      </Animated.ScrollView>
      <Animated.View
        style={[styles.header, { transform: [{ translateY: headerTranslateY }], height: HEADER_MAX_HEIGHT }]}
      >
        <Animated.Image
          style={[styles.eventThumb, { opacity: imageOpacity }, { transform: [{ translateY: imageTranslateY }] }]}
          source={require('../../components/EventBox/event-thumb.jpg')}
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
        <Box style={{ position: 'absolute', left: 14 }}>
          <CircularButton onPress={() => navigation.goBack()} iconName="arrow-right" color="white" size="small" />
        </Box>
        <Animated.View style={{ opacity: topBarTitleOpacity }}>
          <Text
            allowFontScaling={false}
            fontSize={16}
            variant="eventBoxTitle"
            color="mainBackground"
            textAlign="center"
          >
            הפגנת ענק בבלפור
          </Text>
        </Animated.View>
      </Animated.View>
    </Box>
  );
}

export default EventPage;

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
