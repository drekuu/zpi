'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import FilterIcon from '@/../public/icons/filter.svg';
import Category from './Category';
import Price from './Price';
import Tags from './Tags';
import Button from '@/components/Form/Button';
import { useNewPageStore } from '@/stores/page/new';
import {
  mapCategoriesByHrefKey,
  useCategories,
} from '@/services/query/category';
import { mapTagsByName, useTags } from '@/services/query/tag';
import { useTranslations } from 'next-intl';

const Separator = () => {
  return <div className='border-b border-b-black border-opacity-10'></div>;
};

interface FiltersProps {
  urlCategory?: string;
}

export default function Filters({ urlCategory }: FiltersProps) {
  const t = useTranslations('NewPage.Filters');
  const PAGE_PATH = '/new';
  const router = useRouter();

  const categoriesQuery = useCategories();
  const categories = mapCategoriesByHrefKey(categoriesQuery.data);

  const tagsQuery = useTags();
  const tags = mapTagsByName(tagsQuery.data);

  const { setCategoryFilter, setPriceRangeFilter, setTagsFilter } =
    useNewPageStore((store) => store);

  const [selectedCategory, setSelectedCategory] = useState<
    string | undefined
  >();
  const [selectedPriceRange, setSelectedPriceRange] = useState<number[]>([]);
  const [selectedTags, setSelectedTags] = useState<Array<string>>([]);

  useEffect(() => {
    setSelectedCategory(urlCategory);

    if (categories && urlCategory) {
      setCategoryFilter(categories[urlCategory]?.id);
    }
  }, [setCategoryFilter, categories, urlCategory]);

  return (
    <div className='flex flex-col w-full max-w-[260px] gap-6 px-6 py-5 rounded-2xxl border border-black border-opacity-10'>
      <div className='flex items-center justify-between gap-2'>
        <p className='text-xl font-bold'>{t('filters')}</p>
        <FilterIcon draggable={false} />
      </div>
      <Separator />

      <Category
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
      />
      <Separator />

      <Price setValue={setSelectedPriceRange} />
      <Separator />

      <Tags selectedTags={selectedTags} setSelectedTags={setSelectedTags} />
      <Separator />

      <Button
        onClick={() => {
          if (categories) {
            setCategoryFilter(
              selectedCategory ? categories[selectedCategory]?.id : undefined,
            );
          }
          setPriceRangeFilter(selectedPriceRange);
          setTagsFilter(selectedTags.map((tag) => tags![tag].id));

          if (selectedCategory) {
            router.push(`${PAGE_PATH}/${selectedCategory}`);
          } else {
            router.push(PAGE_PATH);
          }
        }}
        className='mb-10'
      >
        {t('apply')}
      </Button>
    </div>
  );
}
