'use client';

import Breadcrumbs from '@/components/Breadcrumbs/Breadcrumbs';
import Filters from './Filters/Filters';
import { usePathname } from 'next/navigation';
import { useAllCategories } from '@/services/query/category';
import LoadedQueries from '@/components/LoadedQuery/LoadedQueries';
import { useAllTags } from '@/services/query/tag';
import Photos from './Photos';

export default function New() {
  const pathname = usePathname();
  const category = pathname.split('/')?.[2];

  const categoriesQuery = useAllCategories();
  const tagsQuery = useAllTags();

  return (
    <LoadedQueries queries={[categoriesQuery, tagsQuery]}>
      <div>
        <Breadcrumbs additionalNames={category ? [category] : undefined} />

        <div className='flex gap-10 items-start'>
          <Filters urlCategory={category} />
          <Photos />
        </div>
      </div>
    </LoadedQueries>
  );
}
