import { useTranslations } from 'next-intl';
import React from 'react';
import ProfileAvatar from '../static/Profile_avatar_placeholder_large.png';
import Image from 'next/image';
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

  const actualAvatarUrl = avatarUrl ? avatarUrl : ProfileAvatar;

  return (
    <header className='flex overflow-hidden z-0 flex-wrap gap-8 justify-center items-start self-center px-4 py-5 max-md:max-w-full'>
      <div className='flex overflow-hidden flex-col rounded-[62px] w-[162px]'>
        <Image
          src={actualAvatarUrl}
          alt='Profile picture'
          className='object-contain aspect-square w-[162px]'
        />
      </div>
      <div className='flex overflow-hidden flex-col items-start px-16 pt-1.5 pb-9 text-xs text-black min-w-[240px] w-[558px] max-md:px-5 max-md:max-w-full'>
        <h1 className='text-3xl font-bold'>
          {displayedUsername ? displayedUsername : t('no-username')}
        </h1>
        <div className='flex gap-3.5 mt-9 whitespace-nowrap'>
          <EmailIcon
            alt='Email icon'
            className='object-contain w-6 aspect-square'
          />
          <span className='basis-auto'>{email ? email : t('no-email')}</span>
        </div>
        <h2 className='mt-6 text-neutral-400'>{t('about-me')}</h2>
        <p className='mt-3'>{aboutMe ? aboutMe : t('no-about-me')}</p>
      </div>
    </header>
  );
}
