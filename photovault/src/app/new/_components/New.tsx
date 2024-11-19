'use client';

import Breadcrumbs from '@/components/Breadcrumbs/Breadcrumbs';
import Filters from './Filters/Filters';
import { usePathname } from 'next/navigation';
import { useAllCategories } from '@/services/query/category';
import LoadedQueries from '@/components/LoadedQuery/LoadedQueries';
import { useAllTags } from '@/services/query/tag';
import { useTranslations } from 'next-intl';
import { getLocale } from '@/services/localeClient';
import { ReactNode } from 'react';

export default function New({ children }: { children: ReactNode }) {
  const locale = getLocale();
  const t = useTranslations('Categories');
  const pathname = usePathname();
  const category = pathname.split('/')?.[2];

  const categoriesQuery = useAllCategories();
  const categories = categoriesQuery.data;
  const categoryName = categories?.[category]?.name;

  const tagsQuery = useAllTags();

  return (
    <LoadedQueries queries={[categoriesQuery, tagsQuery]}>
      <div>
        <Breadcrumbs
          additionalNames={
            categoryName
              ? [locale === 'en' ? categoryName : t(category as any)]
              : undefined
          }
        />

        <div className='flex gap-10 items-start'>
          <Filters urlCategory={category} />
          {children}
        </div>
      </div>
    </LoadedQueries>
  );
}
