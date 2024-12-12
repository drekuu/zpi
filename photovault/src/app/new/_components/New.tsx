'use client';

import Breadcrumbs from '@/components/Breadcrumbs/Breadcrumbs';
import Filters from './Filters/Filters';
import { usePathname } from 'next/navigation';
import { useCategories } from '@/services/query/category';
import LoadedQueries from '@/components/LoadedQuery/LoadedQueries';
import { useTags } from '@/services/query/tag';
import { useTranslations } from 'next-intl';
import { getLocale } from '@/services/localeClient';
import { ReactNode, useEffect, useMemo, useState } from 'react';
import { TunnelEntry } from '@mittwald/react-tunnel';

export default function New({ children }: { children: ReactNode }) {
  const locale = getLocale();
  const t = useTranslations('Categories');
  const pathname = usePathname();

  const [category, setCategory] = useState<string>();

  useEffect(() => {
    if (!pathname.startsWith('/photo')) {
      setCategory(pathname.split('/')?.[2]);
    }
  }, [pathname]);

  const categoriesQuery = useCategories();
  const categories = categoriesQuery.data;
  const categoryName = useMemo(() => {
    if (category && categories?.[category]) {
      return categories[category].name;
    }

    return undefined;
  }, [categories, category]);

  const tagsQuery = useTags();

  return (
    <TunnelEntry staticEntryId='NewPage'>
      <LoadedQueries queries={[categoriesQuery, tagsQuery]}>
        <div>
          <Breadcrumbs
            prefixesBlacklist={['/photo']}
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
    </TunnelEntry>
  );
}
