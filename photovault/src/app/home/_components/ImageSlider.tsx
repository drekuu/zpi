'use client';

import { useTranslations } from 'next-intl';
import { usePhotos } from '@/services/query/photo';
import LoadedQuery from '@/components/LoadedQuery/LoadedQuery';
import SliderSection from './SliderSection';
import Link from 'next/link';
import { extendWithDuplicates } from '@/utils/array';

export default function ImageSlider() {
  const t = useTranslations('HomePage.Sections');
  const query = usePhotos();
  const photos = query.data;

  return (
    <LoadedQuery query={query} handleError={true}>
      {photos && (
        <SliderSection title={t('new-photos')}>
          {extendWithDuplicates(photos, 10).map((photo) => (
            <div className='!w-auto' key={photo.id}>
              <Link scroll={false} href={`/photo/${photo.id}`}>
                <picture>
                  <img
                    className='max-h-[220px]'
                    src={photo.photoURL}
                    alt={photo.title}
                  />
                </picture>
              </Link>
            </div>
          ))}
        </SliderSection>
      )}
    </LoadedQuery>
  );
}
