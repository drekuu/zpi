'use client';

import { useTranslations } from 'next-intl';

export default function Home() {
  const t = useTranslations('HomePage');

  return (
    <div>
      <h1>Home page</h1>
    </div>
  );
}
