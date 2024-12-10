'use client';

import { useTranslations } from 'next-intl';
import { usePhotographers } from '@/services/query/photograph';
import LoadedQuery from '@/components/LoadedQuery/LoadedQuery';
import SliderSection from '../SliderSection';
import PhotographerCard from './PhotographerCard';

export default function PhotographerSlider() {
  const t = useTranslations('HomePage.Sections');
  const query = usePhotographers();
  const photographers = query.data;

  return (
    <LoadedQuery query={query} handleError={true}>
      {photographers && (
        <SliderSection title={t('new-photographers')}>
          {photographers.map((photographer) => (
            <div className='max-w-[450px]' key={photographer.id}>
              <PhotographerCard photographer={photographer} />
            </div>
          ))}
        </SliderSection>
      )}
    </LoadedQuery>
  );
}
