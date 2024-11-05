import { useTranslations } from 'next-intl';
import CartIcon from '@/../public/icons/cart.svg';
import LanguagesIcon from '@/../public/icons/languages.svg';
import UserIcon from '@/../public/icons/user.svg';
import Image from 'next/image';

const Links = () => {
  const t = useTranslations('Header.Links');
  const links = ['home', 'new', 'explore'] as const;

  return (
    <div>
      {links.map((link) => (
        <p key={link}>{t(link)}</p>
      ))}
    </div>
  );
};

const IconsBar = () => {
  return (
    <div>
      <Image src={LanguagesIcon} alt='Languages' />
      <Image src={CartIcon} alt='Cart' />
      <Image src={UserIcon} alt='User' />
    </div>
  );
};

export default function Header() {
  return (
    <header>
      <div>
        <p className='logo'>PhotoVault</p>
        <Links />
      </div>
      <div>Search...</div>
      <IconsBar />
    </header>
  );
}
