'use client';

import { useTranslations } from 'next-intl';
import React, { useEffect, useState } from 'react';
import ProfileAvatar from '../static/Profile_avatar_placeholder_large.png';
import EditIcon from '../static/edit.svg';
import EmailIcon from '../static/mail.svg';
import Image from 'next/image';
import { useGetMyself } from '@/services/query/photograph';
import LoadedQuery from '@/components/LoadedQuery/LoadedQuery';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateMyself } from '@/app/api/photograph';
import { PhotographUpdateData } from '@/models/photograph';

export default function PhotographerCardMe() {
  const t = useTranslations('Profile');

  const queryClient = useQueryClient();
  const query = useGetMyself();
  const data = query.data;

  const { mutate } = useMutation({
    mutationFn: (data: PhotographUpdateData) => updateMyself(data),
    onSuccess: async () =>
      await queryClient.invalidateQueries({ queryKey: ['photograph', 'me'] }),
    onError: (error) => console.error('Error updating user data:', error),
    onSettled: () => setIsEditing(false),
  });

  const [displayedUsernameTemp, setDisplayedUsernameTemp] = useState('');
  const [avatarUrlTemp, setAvatarUrlTemp] = useState<string>();
  const [aboutMeTemp, setDescriptionTemp] = useState<string>();
  const [emailTemp, setEmailTemp] = useState('');
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    if (data) {
      if (data.displayedUserName)
        setDisplayedUsernameTemp(data.displayedUserName);
      if (data.avatarURL) setAvatarUrlTemp(data.avatarURL);
      if (data.description) setDescriptionTemp(data.description);
      if (data.displayedEmail) setEmailTemp(data.displayedEmail);
    }
  }, [data]);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSaveClick = () => {
    mutate({
      displayedUserName: displayedUsernameTemp,
      avatarUrl: avatarUrlTemp,
      aboutMe: aboutMeTemp,
      email: emailTemp,
    });
  };

  const actualAvatarUrl = data?.avatarURL ? data.avatarURL : ProfileAvatar;

  return (
    <LoadedQuery query={query} handleError={true}>
      {data && (
        <header className='flex overflow-hidden z-0 flex-wrap gap-8 justify-center items-start self-center px-4 py-5 max-md:max-w-full'>
          <div className='flex overflow-hidden flex-col rounded-[62px] w-[162px]'>
            {isEditing ? (
              <input
                type='text'
                name='avatarUrl'
                value={avatarUrlTemp}
                onChange={(e) => setAvatarUrlTemp(e.target.value)}
                placeholder={t('enter-avatar')}
              />
            ) : (
              <Image
                src={actualAvatarUrl}
                alt={t('profile-picture')}
                className='object-contain aspect-square w-[162px]'
              />
            )}
          </div>

          <div className='flex overflow-hidden flex-col items-start px-16 pt-1.5 pb-9 text-xs text-black min-w-[240px] w-[558px] max-md:px-5 max-md:max-w-full relative'>
            {isEditing ? (
              <input
                type='text'
                name='displayedUsername'
                value={displayedUsernameTemp}
                onChange={(e) => setDisplayedUsernameTemp(e.target.value)}
                placeholder={t('enter-username')}
                className='text-3xl font-bold w-full'
              />
            ) : (
              <h1 className='text-3xl font-bold'>
                {data.displayedUserName
                  ? data.displayedUserName
                  : t('no-username')}
              </h1>
            )}
            <div className='flex gap-3.5 mt-9 whitespace-nowrap'>
              <EmailIcon
                alt='Email icon'
                className='object-contain w-6 aspect-square'
              />
              <div style={{ display: 'inline-block' }}>
                {isEditing ? (
                  <input
                    type='text'
                    name='email'
                    value={emailTemp}
                    onChange={(e) => setEmailTemp(e.target.value)}
                    placeholder={t('enter-email')}
                    className='basic-auto'
                  />
                ) : (
                  <span className='basic-auto'>
                    {data.displayedEmail ? data.displayedEmail : t('no-email')}
                  </span>
                )}
              </div>
            </div>
            <h2 className='mt-6 text-neutral-400'>{t('about-me')}</h2>
            {isEditing ? (
              <textarea
                name='aboutMe'
                value={aboutMeTemp}
                onChange={(e) => setDescriptionTemp(e.target.value)}
                placeholder={t('enter-about-me')}
                className='mt-3'
              />
            ) : (
              <p className='mt-3'>
                {data.description ? data.description : t('no-about-me')}
              </p>
            )}

            {isEditing ? (
              <div className='absolute top-3.5 right-0 flex flex-col items-end'>
                <button
                  onClick={handleSaveClick}
                  className='overflow-hidden self-center font-medium text-white bg-black min-h-[30px] rounded-[63px] w-[70px] mr-2'
                >
                  {t('save')}
                </button>
                <button
                  onClick={() => setIsEditing(false)}
                  className='overflow-hidden self-center mt-2 font-medium text-black bg-white min-h-[30px] rounded-[63px] w-[70px] mr-2'
                >
                  {t('cancel')}
                </button>
              </div>
            ) : (
              <button
                onClick={handleEditClick}
                className='absolute top-3.5 right-0'
              >
                <EditIcon
                  draggable={false}
                  className='object-contain shrink-0 w-6 aspect-square'
                  alt={t('edit')}
                />
              </button>
            )}
          </div>
        </header>
      )}
    </LoadedQuery>
  );
}
