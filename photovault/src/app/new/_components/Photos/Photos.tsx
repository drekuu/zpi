'use client';

import { usePhotos } from '@/services/query/photo';
import LoadedQuery from '@/components/LoadedQuery/LoadedQuery';
import { useNewPageStore } from '@/stores/page/new';
import { useTranslations } from 'next-intl';
import Photo from './Photo';
import Link from 'next/link';

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
              <Link key={photo.id} href={`/photo/${photo.id}`} passHref>
                <Photo photo={photo} />
              </Link>
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
