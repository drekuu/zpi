import { useTranslations } from 'next-intl';
import Image from 'next/image';
import LanguagesIcon from '@/../public/icons/header/languages.svg';
import CartIcon from '@/../public/icons/header/cart.svg';
import UserIcon from '@/../public/icons/header/user.svg';
import Link from 'next/link';
import UserMenu from '@/components/Header/components/UserMenu';
import LanguageMenu from '@/components/Header/components/LanguageMenu';

export default function Icons() {
  const t = useTranslations('Header.Icons');

  return (
    <div className='flex ml-auto gap-4'>
      <LanguageMenu>
        <Image
          draggable={false}
          className='select-none cursor-pointer'
          src={LanguagesIcon}
          alt={t('alt-languages')}
        />
      </LanguageMenu>

      <Link href='/cart'>
        <Image src={CartIcon} alt={t('alt-cart')} />
      </Link>

      <UserMenu>
        <Image
          draggable={false}
          className='select-none cursor-pointer'
          src={UserIcon}
          alt={t('alt-user')}
        />
      </UserMenu>
    </div>
  );
}
