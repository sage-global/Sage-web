import type { Course as RawCourse } from '../../data/courses.data';
import type { SageEvent as RawSageEvent } from '../../data/events.data';
import type { Service } from '../../data/services.data';

export type EventStatus = 'upcoming' | 'past';

export interface SageEvent extends RawSageEvent {
  /**
   * Derived dynamically at read time from the event date.
   * Never stored in raw data files.
   */
  status: EventStatus;
}

export type { Service };

/**
 * Public Course representation.
 * Notice: 'price' and 'currency' are intentionally stripped so that
 * no pricing information ever reaches user-facing pages.
 */
export type Course = Omit<RawCourse, 'price' | 'currency'>;
