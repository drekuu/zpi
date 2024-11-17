'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import FilterIcon from '@/../public/icons/filter.svg';
import Category from './Category';
import Price from './Price';
import Tags from './Tags';
import Button from '@/components/Form/Button';

const Separator = () => {
  return <div className='border-b border-b-black border-opacity-10'></div>;
};

interface FiltersProps {
  category: string;
}

export default function Filters({ category }: FiltersProps) {
  const PAGE_PATH = '/new';
  const router = useRouter();

  const [selectedCategory, setSelectedCategory] = useState<string | undefined>(
    category,
  );
  const [selectedPriceRange, setSelectedPriceRange] = useState<number[]>();
  const [selectedTags, setSelectedTags] = useState<Array<string>>([]);

  useEffect(() => {
    setSelectedCategory(category);
  }, [category]);

  return (
    <div className='flex flex-col max-w-[260px] gap-6 px-6 py-5 rounded-2xxl border border-black border-opacity-10'>
      <div className='flex items-center justify-between gap-2'>
        <p className='text-xl font-bold'>Filters</p>
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
          if (selectedCategory) {
            router.push(`${PAGE_PATH}/${selectedCategory}`);
          } else {
            router.push(PAGE_PATH);
          }
        }}
        className='mb-10'
      >
        Apply Filter
      </Button>
    </div>
  );
}
