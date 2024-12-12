'use client';

import { useTranslations } from 'next-intl';
import { useFeaturedPhotographers } from '@/services/query/photograph';
import LoadedQuery from '@/components/LoadedQuery/LoadedQuery';
import SliderSection from '../SliderSection';
import PhotographerCard from './PhotographerCard';
import { extendWithDuplicates } from '@/utils/array';

export default function PhotographerSlider() {
  const t = useTranslations('HomePage.Sections');
  const query = useFeaturedPhotographers();
  const photographers = query.data;

  return (
    <LoadedQuery query={query} handleError={true}>
      {photographers && (
        <SliderSection title={t('new-photographers')}>
          {extendWithDuplicates(photographers, 10).map((photographer) => (
            <div className='max-w-[600px]' key={photographer.id}>
              <PhotographerCard photographer={photographer} />
            </div>
          ))}
        </SliderSection>
      )}
    </LoadedQuery>
  );
}
