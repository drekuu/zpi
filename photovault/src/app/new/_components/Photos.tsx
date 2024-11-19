'use client';

import { usePhotos } from '@/services/query/photo';
import LoadedQuery from '@/components/LoadedQuery/LoadedQuery';
import { useNewPageStore } from '@/stores/page/new';
import { useTranslations } from 'next-intl';

export default function Photos() {
  const t = useTranslations('NewPage.Photos');
  const filters = useNewPageStore((store) => store.filters);

  const query = usePhotos(filters);
  const photos = query.data;

  return (
    <div className='w-full flex flex-wrap gap-5'>
      <LoadedQuery handleError={true} query={query}>
        {photos && (
          <>
            {photos.map((photo) => (
              <div
                className='flex-auto h-[250px] [&:nth-last-child(-n+2)]:max-w-[300px] cursor-pointer'
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
      </LoadedQuery>
    </div>
  );
}
