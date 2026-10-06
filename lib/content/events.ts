import type { EventStatus, SageEvent } from './types';
import { events, SageEvent as RawSageEvent } from '../../data/events.data';

/**
 * Fixed timezone used to normalize date comparisons at day granularity.
 * Using a consistent timezone prevents off-by-one date shifts and guarantees
 * that an event occurring "today" does not flip status based on the current hour.
 */
export const FIXED_TIMEZONE = 'UTC';

/**
 * Normalizes any Date or date string to a YYYY-MM-DD day string in the fixed timezone.
 */
export function toDayString(dateInput: string | Date, timeZone: string = FIXED_TIMEZONE): string {
  if (typeof dateInput === 'string' && /^\d{4}-\d{2}-\d{2}$/.test(dateInput.trim())) {
    return dateInput.trim();
  }
  const dateObj = typeof dateInput === 'string' ? new Date(dateInput) : dateInput;
  if (isNaN(dateObj.getTime())) {
    return String(dateInput);
  }
  const formatter = new Intl.DateTimeFormat('en-CA', {
    timeZone,
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  });
  return formatter.format(dateObj);
}

/**
 * Returns today's date formatted as YYYY-MM-DD in the fixed timezone.
 */
export function getTodayDayString(referenceDate?: Date | string, timeZone: string = FIXED_TIMEZONE): string {
  if (referenceDate) {
    return toDayString(referenceDate, timeZone);
  }
  const formatter = new Intl.DateTimeFormat('en-CA', {
    timeZone,
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  });
  return formatter.format(new Date());
}

/**
 * Derives the event status ('upcoming' | 'past') based on day granularity in fixed timezone.
 * date >= today => 'upcoming'
 * date < today => 'past'
 */
export function deriveEventStatus(
  eventDate: string | Date,
  referenceDate?: Date | string,
  timeZone: string = FIXED_TIMEZONE
): EventStatus {
  const eventDay = toDayString(eventDate, timeZone);
  const today = getTodayDayString(referenceDate, timeZone);
  return eventDay >= today ? 'upcoming' : 'past';
}

/**
 * Maps a raw EventData to a SageEvent with dynamically derived status at read time.
 */
function toSageEvent(event: RawSageEvent, referenceDate?: Date | string): SageEvent {
  return {
    ...event,
    status: deriveEventStatus(event.date, referenceDate),
  };
}

/**
 * Returns all events with status derived at read time.
 */
export function getEvents(referenceDate?: Date | string): SageEvent[] {
  return events.map((event) => toSageEvent(event, referenceDate));
}

/**
 * Returns all upcoming events (date >= today in fixed timezone), sorted ascending by date.
 */
export function getUpcomingEvents(referenceDate?: Date | string): SageEvent[] {
  const today = getTodayDayString(referenceDate);
  return events
    .filter((event) => toDayString(event.date) >= today)
    .map((event) => toSageEvent(event, referenceDate))
    .sort((a, b) => a.date.localeCompare(b.date));
}

/**
 * Returns all past events (date < today in fixed timezone), sorted descending by date.
 */
export function getPastEvents(referenceDate?: Date | string): SageEvent[] {
  const today = getTodayDayString(referenceDate);
  return events
    .filter((event) => toDayString(event.date) < today)
    .map((event) => toSageEvent(event, referenceDate))
    .sort((a, b) => b.date.localeCompare(a.date));
}
