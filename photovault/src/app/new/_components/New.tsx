'use client';

import Breadcrumbs from '@/components/Breadcrumbs/Breadcrumbs';
import Filters from './Filters/Filters';
import { usePathname } from 'next/navigation';
import { useAllCategories } from '@/services/query/category';
import LoadedQueries from '@/components/LoadedQuery/LoadedQueries';
import { useAllTags } from '@/services/query/tag';
import { useTranslations } from 'next-intl';
import { getLocale } from '@/services/localeClient';
import { ReactNode, useEffect, useMemo, useState } from 'react';
import { TunnelEntry } from '@mittwald/react-tunnel';

export default function New({ children }: { children: ReactNode }) {
  const locale = getLocale();
  const t = useTranslations('Categories');
  const pathname = usePathname();

  const [startPathname, setStartPathname] = useState<string>();
  const [category, setCategory] = useState<string>();

  /**
   * Fixes following bug:
   * 1. Open a modal
   * 2. Navigate to a page from the modal (ex. user profile from photo modal)
   * 3. Navigate back in the browser
   */
  useEffect(() => {
    if (!startPathname && !pathname.startsWith('/new')) {
      window.location.reload();
    }
  }, [pathname, startPathname]);

  useEffect(() => {
    if (!pathname.startsWith('/photo')) {
      setStartPathname(pathname);
      setCategory(pathname.split('/')?.[2]);
    }
  }, [pathname]);

  const categoriesQuery = useAllCategories();
  const categories = categoriesQuery.data;
  const categoryName = useMemo(() => {
    if (category && categories?.[category]) {
      return categories[category].name;
    }

    return undefined;
  }, [categories, category]);

  const tagsQuery = useAllTags();

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
