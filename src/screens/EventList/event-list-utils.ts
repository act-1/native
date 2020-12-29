import { IEvent } from '@types/event';
import { formatShortDate, formatUpcomingDate, parseLocalDate } from '../../utils/date-utils';

export type EventsSectionListItem = {
  title: string;
  subtitle: string;
  data: [IEvent];
};

export function formatEventsForSectionList(events: [IEvent]): EventsSectionListItem[] {
  let sections: EventsSectionListItem[];
  const eventsByDates: { [key: string]: [IEvent] } = {};

  events.forEach((event) => {
    if (!eventsByDates[event.date]) {
      eventsByDates[event.date] = [event];
    } else {
      eventsByDates[event.date].push(event);
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
