'use client';

import { usePhoto } from '@/services/query/photo';
import LoadedQuery from '@/components/LoadedQuery/LoadedQuery';
import { useEffect } from 'react';
import { notFound } from 'next/navigation';
import AvatarPlaceholder from '@/../public/image/avatar-placeholder.svg';

export default function Photo({ id }: { id: number }) {
  const query = usePhoto(id);
  const photo = query.data;

  console.log(photo);

  useEffect(() => {
    if (photo === null) {
      notFound();
    }
  }, [photo]);

  return (
    <LoadedQuery query={query} handleError={true}>
      {photo && (
        <div className='flex items-start gap-5 my-8'>
          <div className='w-1/2'>
            <picture>
              <img src={photo.photoURL} alt={photo.title} />
            </picture>
          </div>

          <div className='w-1/2'>
            <p className='text-4xl font-bold mb-2'>{photo.title}</p>
            <div className='select-none cursor-pointer flex items-center gap-2 mb-10'>
              <p>by</p>
              <picture className='w-[50px] h-[50px] object-cover object-center'>
                {photo.photograph?.avatarURL ? (
                  <img
                    className='w-full h-full'
                    src={photo.photograph.avatarURL}
                  />
                ) : (
                  <AvatarPlaceholder width='inherit' height='inherit' />
                )}
              </picture>
              <p>{photo.photograph?.displayedUserName}</p>
            </div>
            <p className='text-xl'>
              <span className='text-2xl font-semibold'>Price:</span>{' '}
              {photo.price?.toLocaleString()} zł
            </p>
            <p className='text-xl'>
              <span className='text-2xl font-semibold'>
                Commercial license price:
              </span>{' '}
              {photo.licensePrice?.toLocaleString()} zł
            </p>
          </div>
        </div>
      )}
    </LoadedQuery>
  );
}
