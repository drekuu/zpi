'use client';

import Search from '@/components/Search/Search';
import LabeledCheckbox from '@/components/Checkbox/LabeledCheckbox';
import Accordion from '@/components/Accordion/Accordion';
import { useEffect, useMemo, useState } from 'react';
import LoadedQuery from '@/components/LoadedQuery/LoadedQuery';
import { notFound } from 'next/navigation';
import { useAllCategories } from '@/services/query/category';
import { useTranslations } from 'next-intl';
import { getLocale } from '@/services/localeClient';

interface CategoryProps {
  selectedCategory: string | undefined;
  setSelectedCategory(value: string | undefined): void;
}

export default function Category({
  selectedCategory,
  setSelectedCategory,
}: CategoryProps) {
  const locale = getLocale();
  const t = useTranslations('NewPage.Filters');
  const categoryT = useTranslations('Categories');

  const query = useAllCategories();
  const categories = query.data ? Object.values(query.data) : undefined;

  const [search, setSearch] = useState('');
  const filteredCategories = useMemo(
    () =>
      categories
        ?.map((category) => ({
          ...category,
          name:
            locale === 'en'
              ? category.name
              : categoryT(category.hrefKey as any),
        }))
        ?.filter((category) =>
          category.name.toLowerCase().includes(search.toLowerCase()),
        ),
    [categories, search, categoryT, locale],
  );

  useEffect(() => {
    if (
      categories &&
      selectedCategory &&
      !categories.some((category) => category.hrefKey === selectedCategory)
    ) {
      notFound();
    }
  }, [categories, selectedCategory]);

  return (
    <Accordion childrenClassName='gap-5' name={t('category')}>
      <LoadedQuery handleError={true} query={query}>
        {filteredCategories && (
          <>
            <Search value={search} setValue={setSearch} />

            <div>
              {filteredCategories.map((category) => (
                <LabeledCheckbox
                  noCheckbox={true}
                  key={category.id}
                  checked={selectedCategory === category.hrefKey}
                  id={category.hrefKey}
                  label={
                    locale === 'en'
                      ? category.name
                      : categoryT(category.hrefKey as any)
                  }
                  onClick={() => {
                    if (selectedCategory === category.hrefKey) {
                      setSelectedCategory(undefined);
                    } else {
                      setSelectedCategory(category.hrefKey);
                    }
                  }}
                />
              ))}
            </div>
          </>
        )}
      </LoadedQuery>
    </Accordion>
  );
}
