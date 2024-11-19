import { getCookie } from 'cookies-next';
import { defaultLocale } from '@/i18n/config';

export const COOKIE_NAME = 'NEXT_LOCALE';

export function getLocale() {
  return getCookie(COOKIE_NAME) || defaultLocale;
}
