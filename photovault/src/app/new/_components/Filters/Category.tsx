'use client';

import Search from '@/components/Search/Search';
import LabeledCheckbox from '@/components/Checkbox/LabeledCheckbox';
import Accordion from '@/components/Accordion/Accordion';
import { useEffect, useMemo, useState } from 'react';
import LoadedQuery from '@/components/LoadedQuery/LoadedQuery';
import { notFound } from 'next/navigation';
import { useAllCategories } from '@/services/query/category';

interface CategoryProps {
  selectedCategory: string | undefined;
  setSelectedCategory(value: string | undefined): void;
}

export default function Category({
  selectedCategory,
  setSelectedCategory,
}: CategoryProps) {
  const query = useAllCategories();
  const data = query.data;

  const categories = useMemo(
    () =>
      data?.map((category) => ({
        ...category,
        hrefKey: category.name.toLowerCase().replace(' ', '_'),
      })),
    [data],
  );
  const [search, setSearch] = useState('');
  const filteredCategories = useMemo(
    () =>
      categories?.filter((category) =>
        category.name.toLowerCase().includes(search.toLowerCase()),
      ),
    [categories, search],
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
    <Accordion childrenClassName='gap-5' name='Category'>
      <LoadedQuery handleError={true} query={query}>
        {filteredCategories && (
          <>
            <Search value={search} setValue={setSearch} />

            <div>
              {filteredCategories.map((category) => (
                <LabeledCheckbox
                  key={category.id}
                  checked={selectedCategory === category.hrefKey}
                  id={category.hrefKey}
                  label={category.name}
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
