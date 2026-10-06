import type { Course } from './types';
import { courses as rawCourses } from '../../data/courses.data';

/**
 * Returns all courses stripped of sensitive commercial fields.
 * Specifically, `price` and `currency` are removed before returning
 * to ensure that no price data ever reaches page components.
 */
export function getCourses(): Course[] {
  return rawCourses.map(({ price, currency, ...courseWithoutPrice }) => ({
    ...courseWithoutPrice,
  }));
}
