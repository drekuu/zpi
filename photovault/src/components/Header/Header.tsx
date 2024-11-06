import Search from '@/components/Search/Search';
import Link from 'next/link';
import Links from './components/Links';
import Icons from './components/Icons';

export default function Header() {
  return (
    <header className='flex py-6 gap-2 items-center border-b border-b-black border-opacity-10'>
      <Link href='/' className='logo'>
        PhotoVault
      </Link>
      <Links />
      <Search className='w-full max-w-[700px] mr-auto' />
      <Icons />
    </header>
  );
}
