'use client';

import React from 'react';
import ProfileCard from '../_components/ProfileCard';
import { useGetPhotosByPhotographer } from '@/services/query/photo';
import { useGetPhotographer } from '@/services/query/photograph';
import LoadedQueries from '@/components/LoadedQuery/LoadedQueries';
import { useTranslations } from 'next-intl';

export default function Profile({ params }: { params: { name: string } }) {
  const t = useTranslations('Profile');

  const photosQuery = useGetPhotosByPhotographer(params.name);
  const photos = photosQuery.data;

  const photographerQuery = useGetPhotographer(params.name);
  const photographer = photographerQuery.data;

  return (
    <LoadedQueries
      queries={[photosQuery, photographerQuery]}
      onlyFirstLoad={false}
    >
      {photos && photographer && (
        <div className='my-8'>
          <div className='flex overflow-hidden relative flex-col py-12 gap-20'>
            <ProfileCard
              displayedUsername={photographer.displayedUserName}
              email={photographer.displayedEmail}
              avatarUrl={photographer.avatarURL}
              aboutMe={photographer.description}
            />
            <div className='w-full flex flex-wrap gap-5'>
              {photos && (
                <>
                  {photos.map((photo) => (
                    <div
                      className='flex-auto  max-w-[300px] cursor-pointer'
                      key={photo.id}
                    >
                      <picture>
                        <img
                          className='object-cover object-center w-full h-full'
                          src={photo.photoURL}
                          alt={photo.title}
                        />
                      </picture>
                    </div>
                  ))}
                  {photos.length === 0 && (
                    <p className='mx-auto'>{t('no-results')}</p>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </LoadedQueries>
  );
}
