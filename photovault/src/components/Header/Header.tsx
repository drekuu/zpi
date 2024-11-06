import { useTranslations } from 'next-intl';
import CartIcon from '@/../public/icons/cart.svg';
import LanguagesIcon from '@/../public/icons/languages.svg';
import UserIcon from '@/../public/icons/user.svg';
import Image from 'next/image';
import Search from '@/components/Search/Search';
import Link from 'next/link';

const Links = () => {
  const t = useTranslations('Pages');
  const links = [
    { name: 'home', href: '/' },
    { name: 'new', href: '/new' },
    { name: 'explore', href: '/explore' },
  ] as const;

  return (
    <div className='flex gap-10 mx-auto'>
      {links.map((link) => (
        <Link href={link.href} key={link.name}>
          {t(link.name)}
        </Link>
      ))}
    </div>
  );
};

const Actions = () => {
  const t = useTranslations('Header.IconsBar');

  return (
    <div className='flex ml-auto gap-4'>
      <Image src={LanguagesIcon} alt={t('alt-languages')} />
      <Image src={CartIcon} alt={t('alt-cart')} />
      <Image src={UserIcon} alt={t('alt-user')} />
    </div>
  );
};

export default function Header() {
  return (
    <header className='flex py-6 gap-2 items-center border-b border-b-black border-opacity-10'>
      <Link href='/' className='logo'>
        PhotoVault
      </Link>
      <Links />
      <Search className='w-full max-w-[700px] mr-auto' />
      <Actions />
    </header>
  );
}
