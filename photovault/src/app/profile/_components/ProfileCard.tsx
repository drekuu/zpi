import { useTranslations } from 'next-intl';
import React from 'react';
import EmailIcon from '../static/mail.svg';

interface UserViewButtonProps {
  displayedUsername?: string | null;
  email?: string | null;
  aboutMe?: string | null;
  avatarUrl?: string | null;
}

export default function PhotographerCard({
  displayedUsername,
  email,
  aboutMe,
  avatarUrl,
}: UserViewButtonProps) {
  const t = useTranslations('Profile');

  const actualAvatarUrl = avatarUrl
    ? avatarUrl
    : '/image/avatar-placeholder.png';

  return (
    <div className='flex gap-4 md:gap-20 justify-center px-4 py-5 items-center flex-col md:flex-row'>
      <picture className='object-cover aspect-square rounded-4xl shrink-0 w-[162px]'>
        <img
          src={actualAvatarUrl}
          alt='Profile picture'
          className='rounded-[inherit]'
        />
      </picture>
      <div className='flex flex-col items-center md:items-start text-xs text-black min-w-[240px] max-w-[600px] text-center md:text-left'>
        <h1 className='text-3xl font-bold'>
          {displayedUsername ? displayedUsername : t('no-username')}
        </h1>
        <div className='flex gap-3.5 mt-3 md:mt-9'>
          <EmailIcon
            alt='Email icon'
            className='object-contain w-6 aspect-square'
          />
          <p>{email ? email : t('no-email')}</p>
        </div>
        <h2 className='mt-6 text-neutral-400'>{t('about-me')}</h2>
        <p className='mt-3'>{aboutMe ? aboutMe : t('no-about-me')}</p>
      </div>
    </div>
  );
}
