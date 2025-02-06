/**
 * usehooks-ts wrappers supplied with parameters that work with SSR.
 */

'use client';

import { useMediaQuery as useMediaQueryOrig } from 'usehooks-ts';

/**
 * Wrapper for useMediaQuery, supplied with SSR parameters.
 * @see useMediaQueryOrig
 */
export const useMediaQuery = (query: string): boolean => {
  return useMediaQueryOrig(query, {
    initializeWithValue: false,
  });
};

/**
 * Predefined default Tailwind breakpoints.
 */
export const useBreakpoints = () => ({
  sm: useMediaQuery('(min-width: 640px)'),
  md: useMediaQuery('(min-width: 768px)'),
  lg: useMediaQuery('(min-width: 1024px)'),
  xl: useMediaQuery('(min-width: 1280px)'),
  '2xl': useMediaQuery('(min-width: 1536px)'),
});
