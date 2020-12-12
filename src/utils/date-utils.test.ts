import { formatLocalDay, parseLocalDate, formatUpcomingDate, formatShortDate } from './date-utils';

test('creates date from local date', () => {
  const dateString = '14/07/2020';
  const date = parseLocalDate(dateString);

  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();

  expect(day).toBe(14);
  expect(month).toBe(7);
  expect(year).toBe(2020);
});

test('formats the date to the local day string', () => {
  const sunday = new Date('2020-12-27');
  const formattedDay = formatLocalDay(sunday);
  expect(formattedDay).toBe('יום ראשון');
});

test('formats upcoming date correctly', () => {
  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);
  const sunday = new Date('2020-11-01');


  const formattedToday = formatUpcomingDate(today);
  const formattedTomorrow = formatUpcomingDate(tomorrow);
  const formattedSunday = formatUpcomingDate(sunday);

  expect(formattedToday).toBe('היום');
  expect(formattedTomorrow).toBe('מחר');
  expect(formattedSunday).toBe('יום ראשון');
});

test('formats short date correctly', () => {
  const date = new Date('2020-12-31');
  const shortDate = formatShortDate(date);
  
  expect(shortDate).toBe('31 בדצמבר');
})