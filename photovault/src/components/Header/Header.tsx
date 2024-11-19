'use client';

import Search from '@/components/Search/Search';
import Link from 'next/link';
import Links from './components/Links';
import Icons from './components/Icons';
import { useState } from 'react';

export default function Header() {
  const [search, setSearch] = useState('');

  return (
    <header className='grid grid-cols-[1fr_2fr_1fr] py-6 gap-x-2 items-center border-b border-b-black border-opacity-10'>
      <div className='flex gap-2 items-center justify-between'>
        <Link href='/home' className='logo'>
          PhotoVault
        </Link>
        <Links />
      </div>
      <Search
        value={search}
        setValue={setSearch}
        className='w-full max-w-[1000px] place-self-center'
      />
      <Icons />
    </header>
  );
}
