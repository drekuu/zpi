'use client';

import { useTranslations } from 'next-intl';
import Image from 'next/image';
import Menu from '@/components/Menu/Menu';
import MenuItem from '@/components/Menu/components/MenuItem';
import Separator from '@/components/Menu/components/Separator';
import CreditCardIcon from '@/../public/icons/menu/credit-card.svg';
import SettingsIcon from '@/../public/icons/menu/settings.svg';
import UserIcon from '@/../public/icons/menu/user.svg';
import LogoutIcon from '@/../public/icons/menu/logout.svg';
import { ReactNode, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';

interface UserMenuProps {
  children: ReactNode;
}

export default function UserMenu({ children }: UserMenuProps) {
  const t = useTranslations('Header.UserMenu');
  const ref = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState(false);
  const router = useRouter();

  return (
    <div ref={ref} className='relative'>
      <div onClick={() => setOpen(!open)}>{children}</div>

      <Menu open={open} setOpen={setOpen} ref={ref} className='min-w-[220px]'>
        <MenuItem>{t('my-account')}</MenuItem>
        <Separator />

        <MenuItem onClick={() => router.push('/me')}>
          <Image draggable={false} src={UserIcon} alt='' />
          <p>{t('profile')}</p>
        </MenuItem>

        <MenuItem onClick={() => router.push('/transactions')}>
          <Image draggable={false} src={CreditCardIcon} alt='' />
          <p>{t('transactions')}</p>
        </MenuItem>

        <MenuItem onClick={() => router.push('/settings')}>
          <Image draggable={false} src={SettingsIcon} alt='' />
          <p>{t('settings')}</p>
        </MenuItem>

        <Separator />
        <MenuItem onClick={() => {}}>
          <Image draggable={false} src={LogoutIcon} alt='' />
          <p>{t('logout')}</p>
        </MenuItem>
      </Menu>
    </div>
  );
}
