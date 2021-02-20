import { Event } from '@types/collections';
import { formatShortDate, formatUpcomingDate, parseLocalDate } from '../../utils/date-utils';
import { format } from 'date-fns';

export type EventsSectionListItem = {
  title: string;
  subtitle: string;
  data: [Event];
};

export function formatEventsForSectionList(events: [Event]): EventsSectionListItem[] {
  let sections: EventsSectionListItem[];
  const eventsByDates: { [key: string]: [Event] } = {};

  events.forEach((event) => {
    const eventDate = format(event.startDate, 'dd/MM/yyyy');
    if (!eventsByDates[eventDate]) {
      eventsByDates[eventDate] = [event];
    } else {
      eventsByDates[eventDate].push(event);
    }
  });

  const uniqueDates: string[] = Object.keys(eventsByDates);

  sections = uniqueDates.map(
    (date): EventsSectionListItem => ({
      title: formatUpcomingDate(parseLocalDate(date)),
      subtitle: formatShortDate(parseLocalDate(date)),
      data: eventsByDates[date],
    })
  );

  return sections;
}
