import { formatLongDate, formatUpcomingDate, parseLocalDate } from '../../utils/date-utils';
import { format } from 'date-fns';

export type CheckInListItem = {
  date: string;
  data: [CheckIn];
};

export function formatCheckInsForSectionList(checkIns: CheckIn[]): CheckInListItem[] {
  let sections: any[];
  const checkInsByDates: { [key: string]: [CheckIn] } = {};

  checkIns.forEach((checkIn) => {
    console.log('ho', checkIn.createdAt);
    const checkInDate = format(checkIn.createdAt.toDate(), 'dd/MM/yyyy');
    if (!checkInsByDates[checkInDate]) {
      checkInsByDates[checkInDate] = [checkIn];
    } else {
      checkInsByDates[checkInDate].push(checkIn);
    }
  });

  const uniqueDates: string[] = Object.keys(checkInsByDates);

  sections = uniqueDates.map(
    (date): CheckInListItem => ({
      date: formatLongDate(parseLocalDate(date)),
      data: checkInsByDates[date],
    })
  );

  return sections;
}
