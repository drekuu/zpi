import { useTranslations } from 'next-intl';
import LanguagesIcon from '@/../public/icons/header/languages.svg';
import CartIcon from '@/../public/icons/header/cart.svg';
import UserIcon from '@/../public/icons/header/user.svg';
import Link from 'next/link';
import UserMenu from './Menu/UserMenu';
import LanguageMenu from './Menu/LanguageMenu';

export default function Icons() {
  const t = useTranslations('Header.Icons');

  return (
    <div className='flex justify-end gap-4'>
      <LanguageMenu>
        <LanguagesIcon
          draggable={false}
          className='select-none cursor-pointer'
          alt={t('alt-languages')}
        />
      </LanguageMenu>

      <Link href='/cart'>
        <CartIcon
          draggable={false}
          className='select-none cursor-pointer'
          alt={t('alt-cart')}
        />
      </Link>

      <UserMenu>
        <UserIcon
          draggable={false}
          className='select-none cursor-pointer'
          alt={t('alt-user')}
        />
      </UserMenu>
    </div>
  );
}
