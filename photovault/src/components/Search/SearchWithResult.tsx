'use client';

import Search, { SearchProps } from './Search';
import { useRef, useState } from 'react';
import { useOnClickOutside } from 'usehooks-ts';
import { useTranslations } from 'next-intl';
import clsx from 'clsx';

type SearchResult = {
  id: number;
  displayName: string;
  onClick(): void;
};

interface SearchWithResultProps extends SearchProps {
  results: Array<SearchResult>;
  isLoading?: boolean;
  dropdownAbsolute?: boolean;
}

export default function SearchWithResult(props: SearchWithResultProps) {
  const t = useTranslations('Search');
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useOnClickOutside(ref, () => setOpen(false));

  return (
    <div ref={ref} className='flex flex-col gap-2 relative'>
      <Search onClick={() => setOpen(true)} {...props} />

      {open && (
        <div
          className={clsx(
            'drop-shadow-md select-none max-h-[150px] overflow-y-auto flex flex-col gap-2 bg-gray rounded-2xl px-3 py-2',
            props.dropdownAbsolute
              ? 'absolute w-full top-[calc(100%+5px)] left-0 z-10'
              : '',
          )}
        >
          {props.isLoading ? (
            <p>{t('loading')}</p>
          ) : (
            <>
              {props.results.map((result) => (
                <div
                  className='cursor-pointer'
                  key={result.id}
                  onClick={result.onClick}
                >
                  {result.displayName}
                </div>
              ))}
              {props.results.length === 0 && <p>{t('no-results')}</p>}
            </>
          )}
        </div>
      )}
    </div>
  );
}
