'use client';

import clsx from 'clsx';
import SearchIcon from '@/../public/icons/search.svg';
import { useTranslations } from 'next-intl';

interface SearchProps {
  className?: string;
  value: string;
  setValue(value: string): void;
}

export default function Search({ className, value, setValue }: SearchProps) {
  const t = useTranslations('Search');

  return (
    <div
      className={clsx(
        'bg-gray flex items-center gap-3 relative rounded-4xl px-3 py-2',
        className,
      )}
    >
      <SearchIcon className='absolute pointer-events-none' />
      <input
        value={value}
        onChange={(e) => setValue(e.target.value)}
        className='bg-inherit pl-9 w-full rounded-[inherit]'
        placeholder={t('placeholder')}
      />
    </div>
  );
}
