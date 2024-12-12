'use client';

import type { GalleryPhoto } from '@/models/photo';

interface PhotoProps {
  photo: GalleryPhoto;
}

export default function Photo({ photo }: PhotoProps) {
  return (
    <div className='relative flex-auto h-[250px] [&:nth-last-child(-n+2)]:max-w-[300px] cursor-pointer'>
      <picture>
        <img
          className='object-cover object-center w-full h-full'
          src={photo.photoURL}
          alt={photo.title}
        />
      </picture>
    </div>
  );
}
