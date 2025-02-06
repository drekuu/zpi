'use client';

import SearchWithResult from '@/components/Search/SearchWithResult';
import Link from 'next/link';
import Links from './components/Links';
import Icons from './components/Icons';
import { useEffect, useMemo, useState } from 'react';
import { usePhotosByName } from '@/services/query/photo';
import { useDebounceValue } from 'usehooks-ts';
import { useRouter } from 'next/navigation';
import MenuIcon from '@/../public/icons/header/menu.svg';
import { useBreakpoints } from '@/utils/usehooks';

export default function Header() {
  const router = useRouter();
  const [search, setSearch] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useDebounceValue(search, 500);
  const query = usePhotosByName(debouncedSearch);
  const mdBreakpoint = useBreakpoints().md;

  const [menuOpen, setMenuOpen] = useState(false);

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

  const menuVisible = useMemo(
    () => mdBreakpoint || menuOpen,
    [mdBreakpoint, menuOpen],
  );

  useEffect(() => {
    setDebouncedSearch(search);
  }, [setDebouncedSearch, search]);

  return (
    <header className='grid grid-cols-1 md:grid-cols-[1fr_2fr_1fr] py-6 gap-4 md:gap-2 items-center border-b border-b-black border-opacity-10'>
      <div className='flex gap-8 md:gap-2 items-center justify-between flex-col md:flex-row'>
        <div className='flex items-center gap-5'>
          <Link href='/home' className='logo'>
            PhotoVault
          </Link>

          {!mdBreakpoint && (
            <MenuIcon
              onClick={() => setMenuOpen(!menuOpen)}
              className='cursor-pointer'
            />
          )}
        </div>

        {menuVisible && <Links />}
      </div>
      {menuVisible && (
        <>
          <SearchWithResult
            value={search}
            setValue={setSearch}
            className='w-full max-w-[1000px] place-self-center'
            results={results}
            isLoading={query.isLoading}
            dropdownAbsolute={true}
          />
          <Icons />
        </>
      )}
    </header>
  );
}
