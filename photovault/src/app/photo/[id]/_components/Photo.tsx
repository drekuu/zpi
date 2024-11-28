'use client';

import { usePhoto } from '@/services/query/photo';
import LoadedQuery from '@/components/LoadedQuery/LoadedQuery';
import { useEffect } from 'react';
import { notFound } from 'next/navigation';
import AvatarPlaceholder from '@/../public/image/avatar-placeholder.svg';
import ChipList from './ChipList';
import Chip from '@/components/Chip/Chip';

const Separator = () => {
  return <div className='my-5 border-b border-b-black border-opacity-10'></div>;
};

export default function Photo({ id }: { id: number }) {
  const query = usePhoto(id);
  const photo = query.data;

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
            <div className='select-none cursor-pointer flex items-center gap-2'>
              <picture className='w-[50px] h-[50px] object-cover object-center'>
                {photo.photograph?.avatarURL ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    className='w-full h-full'
                    src={photo.photograph.avatarURL}
                    alt=''
                  />
                ) : (
                  <AvatarPlaceholder width='100%' height='100%' />
                )}
              </picture>
              <p>
                by{' '}
                <span className='font-semibold'>
                  {photo.photograph?.displayedUserName}
                </span>
              </p>
            </div>

            <Separator />

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

            <div className='flex flex-col gap-5 mt-10'>
              <ChipList name='Categories'>
                {photo?.categories?.map((category) => (
                  <Chip key={category.id}>{category.name}</Chip>
                ))}
              </ChipList>

              <ChipList name='Tags'>
                {photo?.tags?.map((tag) => (
                  <Chip key={tag.id}>{tag.name}</Chip>
                ))}
              </ChipList>
            </div>
          </div>
        </div>
      )}
    </LoadedQuery>
  );
}
