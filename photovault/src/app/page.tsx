'use client';

import { useTranslations } from 'next-intl';
import { setUserLocale } from '@/services/locale';

export default function Home() {
  const t = useTranslations('HomePage');

  return (
    <div>
      <h1>{t('hello')}</h1>
      <button onClick={() => setUserLocale('en')}>{t('changeLanguage')}</button>
    </div>
  );
}
