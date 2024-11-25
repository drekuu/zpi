'use client';

import { useTranslations } from 'next-intl';
import Menu from '@/components/Menu/Menu';
import MenuItem from '@/components/Menu/components/MenuItem';
import Separator from '@/components/Menu/components/Separator';
import CreditCardIcon from '@/../public/icons/menu/credit-card.svg';
import SettingsIcon from '@/../public/icons/menu/settings.svg';
import UserIcon from '@/../public/icons/menu/user.svg';
import LogoutIcon from '@/../public/icons/menu/logout.svg';
import LoginIcon from '@/../public/icons/menu/login.svg';
import RegisterIcon from '@/../public/icons/menu/register.svg';
import { ReactNode, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { logout } from '@/app/api/auth/session';
import { useUserStore } from '@/stores/user';
import { useGetMyself } from '@/services/query/user';
import LoadedQuery from '@/components/LoadedQuery/LoadedQuery';

interface UserMenuProps {
  children: ReactNode;
}

export default function UserMenu({ children }: UserMenuProps) {
  const query = useGetMyself();
  const username = query.data?.username;

  const { setLoggedIn, loggedIn } = useUserStore((store) => store);
  const t = useTranslations('Header.UserMenu');
  const ref = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState(false);
  const router = useRouter();

  return (
    <div ref={ref} className='relative'>
      <div onClick={() => setOpen(!open)}>{children}</div>

      <Menu open={open} setOpen={setOpen} ref={ref} className='min-w-[220px]'>
        {loggedIn ? (
          <LoadedQuery query={query} handleError={true}>
            <MenuItem>{t('hello', { username })}</MenuItem>
            <Separator />

            <MenuItem onClick={() => router.push('/profile')}>
              <UserIcon draggable={false} />
              <p>{t('profile')}</p>
            </MenuItem>

            <MenuItem onClick={() => router.push('/transactions')}>
              <CreditCardIcon draggable={false} />
              <p>{t('transactions')}</p>
            </MenuItem>

            <MenuItem onClick={() => router.push('/settings')}>
              <SettingsIcon draggable={false} />
              <p>{t('settings')}</p>
            </MenuItem>

            <Separator />
            <MenuItem
              onClick={() => {
                void logout();
                setLoggedIn(false);
                setOpen(false);
              }}
            >
              <LogoutIcon draggable={false} />
              <p>{t('logout')}</p>
            </MenuItem>
          </LoadedQuery>
        ) : (
          <>
            <MenuItem>{t('hello-nologon')}</MenuItem>
            <Separator />

            <MenuItem
              onClick={() => {
                router.push('/login');
                setOpen(false);
              }}
            >
              <LoginIcon draggable={false} />
              <p>{t('login')}</p>
            </MenuItem>

            <MenuItem
              onClick={() => {
                router.push('/register');
                setOpen(false);
              }}
            >
              <RegisterIcon draggable={false} />
              <p>{t('register')}</p>
            </MenuItem>
          </>
        )}
      </Menu>
    </div>
  );
}
