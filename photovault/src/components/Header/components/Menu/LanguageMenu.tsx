'use client';

import { FlagComponent, PL, US } from 'country-flag-icons/react/3x2';
import Menu from '@/components/Menu/Menu';
import MenuItem from '@/components/Menu/components/MenuItem';
import { ReactNode, useRef, useState } from 'react';
import { setUserLocale } from '@/services/locale';
import { Locale } from '@/i18n/config';
import { useTranslations } from 'next-intl';
import Separator from '@/components/Menu/components/Separator';

interface LanguageMenuProps {
  children: ReactNode;
}

type Language = {
  locale: Locale;
  localizedName: string;
  flagComponent: FlagComponent;
};

export default function LanguageMenu({ children }: LanguageMenuProps) {
  const t = useTranslations('Header.LanguageMenu');
  const ref = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState(false);
  const languages: Array<Language> = [
    { locale: 'pl', localizedName: 'Polski', flagComponent: PL },
    { locale: 'en', localizedName: 'English', flagComponent: US },
  ];

  return (
    <div ref={ref} className='relative'>
      <div onClick={() => setOpen(!open)}>{children}</div>

      <Menu open={open} className='min-w-[150px]' setOpen={setOpen} ref={ref}>
        <MenuItem>{t('choose')}</MenuItem>
        <Separator />

        <>
          {languages.map((language) => (
            <MenuItem
              key={language.locale}
              onClick={() => setUserLocale(language.locale)}
            >
              <div className='flex items-center gap-1'>
                <language.flagComponent className='rounded-sm' width={20} />
                <p>{language.localizedName}</p>
              </div>
            </MenuItem>
          ))}
        </>
      </Menu>
    </div>
  );
}
