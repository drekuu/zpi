'use client';

import { useTranslations } from 'next-intl';
import { usePhotos } from '@/services/query/photo';
import LoadedQuery from '@/components/LoadedQuery/LoadedQuery';
import SliderSection from './SliderSection';
import Link from 'next/link';

export default function ImageSlider() {
  const t = useTranslations('HomePage.Sections');
  const query = usePhotos();
  const photos = query.data;

  return (
    <LoadedQuery query={query} handleError={true}>
      {photos && (
        <SliderSection title={t('new-photos')}>
          {photos.map((photo) => (
            <div className='!w-auto' key={photo.id}>
              <Link href={`/photo/${photo.id}`}>
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
