'use client';

import { useTranslations } from 'next-intl';
import Image from 'next/image';
import LanguagesIcon from '@/../public/icons/header/languages.svg';
import CartIcon from '@/../public/icons/header/cart.svg';
import UserIcon from '@/../public/icons/header/user.svg';
import Menu from '@/components/Menu/Menu';
import Separator from '@/components/Menu/components/Separator';
import MenuItem from '@/components/Menu/components/MenuItem';
import CreditCardIcon from '@/../public/icons/menu/credit-card.svg';
import SettingsIcon from '@/../public/icons/menu/settings.svg';
import UserMenuIcon from '@/../public/icons/menu/user.svg';
import LogoutIcon from '@/../public/icons/menu/logout.svg';
import { useRouter } from 'next/navigation';
import { useRef, useState } from 'react';

export default function Icons() {
  const t = useTranslations('Header.Icons');
  const router = useRouter();
  const userMenuRef = useRef<HTMLDivElement>(null);
  const [userMenuOpen, setUserMenuOpen] = useState(false);

  return (
    <div className='flex ml-auto gap-4'>
      <Image src={LanguagesIcon} alt={t('alt-languages')} />
      <Image src={CartIcon} alt={t('alt-cart')} />

      <div ref={userMenuRef} className='relative'>
        <Image
          draggable={false}
          className='select-none cursor-pointer'
          src={UserIcon}
          alt={t('alt-user')}
          onClick={() => setUserMenuOpen(!userMenuOpen)}
        />
        <Menu
          open={userMenuOpen}
          setOpen={setUserMenuOpen}
          ref={userMenuRef}
          className='min-w-[220px] -bottom-[100%+12px] right-0'
        >
          <MenuItem>My Account</MenuItem>
          <Separator />

          <MenuItem onClick={() => router.push('/me')}>
            <Image draggable={false} src={UserMenuIcon} alt='' />
            <p>Profile</p>
          </MenuItem>

          <MenuItem onClick={() => router.push('/transactions')}>
            <Image draggable={false} src={CreditCardIcon} alt='' />
            <p>Transaction history</p>
          </MenuItem>

          <MenuItem onClick={() => router.push('/settings')}>
            <Image draggable={false} src={SettingsIcon} alt='' />
            <p>Settings</p>
          </MenuItem>

          <Separator />
          <MenuItem onClick={() => {}}>
            <Image draggable={false} src={LogoutIcon} alt='' />
            <p>Log out</p>
          </MenuItem>
        </Menu>
      </div>
    </div>
  );
}
