/**
 * SAGE Content Access Layer
 * 
 * Single access layer over data/*.ts.
 * Pages and view components should always import content from this module
 * and NEVER directly import raw data files from data/*.ts.
 */

export * from './types';
export * from './events';
export * from './services';
export * from './courses';
