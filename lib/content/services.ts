import type { Service } from './types';
import { services } from '../../data/services.data';

/**
 * Returns all available services.
 */
export function getServices(): Service[] {
  return services.map((service) => ({ ...service }));
}
