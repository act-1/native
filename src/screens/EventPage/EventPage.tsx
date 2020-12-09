import React from 'react';
import { StyleSheet, StatusBar, Image } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import MapView from 'react-native-maps';
import HTML from 'react-native-render-html';
import { EventPageProps } from '@types/navigation';
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
  return (
    <ScrollView style={{ height: '100%' }} showsVerticalScrollIndicator={false}>
      <StatusBar barStyle="light-content" backgroundColor="#7254c8" />
      <EventHeader goBack={() => navigation.goBack()} />
      <Image style={styles.eventThumb} source={require('../../components/EventBox/event-thumb.jpg')} />
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
          <CircularButton iconName="check" color="grey" text="אישור הגעה" />
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
    </ScrollView>
  );
}

export default EventPage;

const styles = StyleSheet.create({
  eventThumb: {
    width: '100%',
    height: 200,
  },
});
