import { formatLocalDay, parseLocalDate } from './date-utils';

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
