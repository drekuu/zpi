'use client';

import { useTranslations } from 'next-intl';
import React, { useEffect, useState } from 'react';
import EditIcon from '../static/edit.svg';
import EmailIcon from '../static/mail.svg';
import { useMyself } from '@/services/query/photograph';
import LoadedQuery from '@/components/LoadedQuery/LoadedQuery';
import { useMutation } from '@tanstack/react-query';
import { PhotographUpdateData } from '@/models/photograph';
import { updateMyself } from '@/app/api/photograph';
import { trpc } from '@/trpc/client';

export default function PhotographerCardMe() {
  const t = useTranslations('Profile');

  const query = useMyself();
  const data = query.data;
  const utils = trpc.useUtils();

  const { mutate } = useMutation({
    mutationFn: (data: PhotographUpdateData) => {
      const formData = new FormData();
      formData.append('image', avatarUrlFile!);
      return updateMyself(avatarUrlFile!.name, formData, data);
    },
    onSuccess: () => utils.photograph.getMyself.invalidate(),
    onError: (error) => console.error('Error updating user data:', error),
    onSettled: () => setIsEditing(false),
  });

  const [displayedUsernameTemp, setDisplayedUsernameTemp] = useState('');
  const [avatarUrlTemp, setAvatarUrlTemp] = useState<string>();
  const [aboutMeTemp, setDescriptionTemp] = useState<string>();
  const [emailTemp, setEmailTemp] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [avatarUrlFile, setAvatarUrlFile] = useState<File>();

  useEffect(() => {
    if (data) {
      if (data.displayedUserName)
        setDisplayedUsernameTemp(data.displayedUserName);
      if (data.description) setDescriptionTemp(data.description);
      if (data.displayedEmail) setEmailTemp(data.displayedEmail);
      if (data.avatarURL) setAvatarUrlTemp(data.avatarURL);
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

  const actualAvatarUrl = data?.avatarURL
    ? data.avatarURL
    : '/image/avatar-placeholder.png';

  return (
    <LoadedQuery query={query} handleError={true}>
      {data && (
        <header className='flex overflow-hidden z-0 flex-wrap gap-8 justify-center items-start self-center px-4 py-5 max-md:max-w-full'>
          <div className='flex overflow-hidden flex-col'>
            {isEditing ? (
              <input
                type='file'
                accept='image/*'
                name='avatar'
                onChange={(e: any) => {
                  const file = e.target.files[0];
                  setAvatarUrlTemp(file.name);
                  setAvatarUrlFile(file);
                }}
                placeholder={t('enter-avatar')}
              />
            ) : (
              <picture>
                <img
                  src={actualAvatarUrl}
                  alt={t('profile-picture')}
                  className='object-cover rounded-[62px] w-[162px] h-[162px]'
                />
              </picture>
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
