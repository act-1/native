import firestore from '@react-native-firebase/firestore';
import { format, isToday, isTomorrow } from 'date-fns';
const heLocale = require('date-fns/locale/he');
import * as timeago from 'timeago.js';
import he from 'timeago.js/lib/lang/he';
timeago.register('he', he);

/**
 * Parse a localized date string to a date object.
 * JavaScript's `Date()` constructor parses strings using the ISO 8601 format (`YYYY-MM-DD`).
 * The function standarizes the local format `DD-MM-YYYY` to work with the `Date` constructor correctly.
 *
 * @param date {string} - The date to parse, formatted as dd/mm/yyyy.
 * @returns The date object to th.
 */
export function parseLocalDate(date: string): Date {
  const dateParts = date.split('/');
  const [day, month, year] = dateParts;
  const standardDate = `${year}-${month}-${day}`;
  return new Date(standardDate);
}

/**
 * Format the date to it's local day.
 * @param date - The date to format.
 * @returns The formatted day, e.g. יום ראשון, יום שני.
 */
export function formatLocalDay(date: Date): string {
  return format(date, 'iiii', { locale: heLocale });
}

/**
 * Format the date to display it's upcoming local day.
 * @param date - The date to format.
 * @returns The formatted upcoming day:
 * Today's date will return 'היום', tomorrow's date reeturns 'מחר' and the rest will display the local day.
 */
export function formatUpcomingDate(date: Date): string {
  if (isToday(date)) return 'היום';
  if (isTomorrow(date)) return 'מחר';
  return formatLocalDay(date);
}

/**
 * Format the date to it's local short version.
 * @param date The date to format.
 * @returns The short date, e.g. 31 בדצמבר.
 */
export function formatShortDate(date: Date): string {
  return format(new Date(date), 'd בMMMM', { locale: heLocale });
}

/**
 * Format the date to it's local short version.
 * @param date The date to format.
 * @returns The short date, e.g. 31 בדצמבר.
 */
export function formatLongDate(date: Date): string {
  return format(new Date(date), 'd בMMMM, yyyy', { locale: heLocale });
}

/**
 * Creates a firestore timestamp object.
 */
export function createTimestamp(seconds: number, nanoseconds: number) {
  return new firestore.Timestamp(seconds, nanoseconds);
}

export function timeAgo(date: timeago.TDate) {
  return timeago.format(date, 'he');
}
