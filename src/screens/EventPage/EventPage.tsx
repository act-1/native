import React from 'react';
import { SafeAreaView, StyleSheet, StatusBar, Image } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import HTML from 'react-native-render-html';
import { Box, Text } from '../../components';
import { EventPageDetail, EventPageCounter, EventPageBottomDrawer } from './';

const htmlContent = `
<div style="textAlign: left;">
<p>ב 05/12/20 - "העם יקום על רגליו" </p>
<p>במוצ"ש הקרוב 05/12/20 כל תנועות המחאה בבלפור נפגשות בבלפור!!!</p>
<p>במשך שלושה חדשים ספרנו לאחור עד חידוש משפטו של הנאשם נתניהו, וכמו שהזהרנו, הוא שוב הצליח לדחות את התייצבותו להמשך משפטו, וזכה לעוד הארכה.</p>
<p>אבל אנחנו לא ניגרר למשחקי הדחיינות והבכיינות של הנאשם.
אנו נקיים את ההפגנה כמתוכנן ונתכנס לאירוע מחאה גדול, בהשתתפות *כל* ארגוני המחאה כדי הוציא את המדינה "מחושך לאור" ולהעביר מסר תקיף וחד משמעי: לנאשם במשרה מלאה אין ראש להיות ראש ממשלה. "אין אפשרות מלבד נבצרות"</p></div>
`;

function EventPage() {
  return (
    <ScrollView style={{ height: '100%' }}>
      <StatusBar barStyle="light-content" backgroundColor="#7254c8" />
      <Image style={styles.eventThumb} source={require('../../components/EventBox/event-thumb.jpg')} />
      <Box backgroundColor="dimmedBackground">
        <Box paddingVertical="xm" marginBottom="m" backgroundColor="mainBackground" alignItems="center">
          <Text style={{ writingDirection: 'rtl' }} variant="largeTitle" marginBottom="m" textAlign="center">
            באנו חושך לגרש - הפגנת ענק בבלפור
          </Text>
          <Text variant="text">יום רביעי הקרוב בשעה 19:00</Text>
        </Box>

        <EventPageCounter number={4241} text="אישרו הגעה" style={{ marginBottom: 12 }} />
        <Box padding="m" backgroundColor="mainBackground">
          <Text variant="largeTitle" marginBottom="m">
            פרטים
          </Text>
          <Box height={40} justifyContent="space-between" marginBottom="m">
            <EventPageDetail text="יום שבת בשעה 19:00" iconName="clock" />
            <EventPageDetail text="כיכר פריז, ירושלים" iconName="map-pin" />
          </Box>
          <HTML
            html={htmlContent}
            tagsStyles={{ p: { marginBottom: 12, fontSize: 15, fontFamily: 'Rubik-Regular' } }}
          />
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
