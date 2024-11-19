'use server';

import { cookies } from 'next/headers';
import { Locale, defaultLocale } from '@/i18n/config';
import { COOKIE_NAME } from './localeClient';

export async function getUserLocale() {
  return cookies().get(COOKIE_NAME)?.value || defaultLocale;
}

export async function setUserLocale(locale: Locale) {
  cookies().set(COOKIE_NAME, locale);
}
