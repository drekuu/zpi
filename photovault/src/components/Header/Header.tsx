'use client';

import SearchWithResult from '@/components/Search/SearchWithResult';
import Link from 'next/link';
import Links from './components/Links';
import Icons from './components/Icons';
import { useEffect, useMemo, useState } from 'react';
import { usePhotosByName } from '@/services/query/photo';
import { useDebounceValue } from 'usehooks-ts';
import { useRouter } from 'next/navigation';

export default function Header() {
  const router = useRouter();
  const [search, setSearch] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useDebounceValue(search, 500);
  const query = usePhotosByName(debouncedSearch);

  const results = useMemo(
    () =>
      query.data
        ? query.data.map((result) => ({
            id: result.id,
            displayName: result.title,
            onClick: () => router.push(`/photo/${result.id}`),
          }))
        : [],
    [router, query.data],
  );

  useEffect(() => {
    setDebouncedSearch(search);
  }, [setDebouncedSearch, search]);

  return (
    <header className='grid grid-cols-[1fr_2fr_1fr] py-6 gap-x-2 items-center border-b border-b-black border-opacity-10'>
      <div className='flex gap-2 items-center justify-between'>
        <Link href='/home' className='logo'>
          PhotoVault
        </Link>
        <Links />
      </div>
      <SearchWithResult
        value={search}
        setValue={setSearch}
        className='w-full max-w-[1000px] place-self-center'
        results={results}
        isLoading={query.isLoading}
        dropdownAbsolute={true}
      />
      <Icons />
    </header>
  );
}
