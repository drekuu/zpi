'use client';

import Search from '@/components/Search/Search';
import Accordion from '@/components/Accordion/Accordion';
import { useState } from 'react';
import { useAllTags } from '@/services/query/tag';
import LoadedQuery from '@/components/LoadedQuery/LoadedQuery';

interface TagsProps {
  selectedTags: Array<string>;
  setSelectedTags(value: Array<string>): void;
}

export default function Tags({ selectedTags, setSelectedTags }: TagsProps) {
  const query = useAllTags();
  const data = query.data;

  const [search, setSearch] = useState('');

  return (
    <Accordion childrenClassName='gap-5' name='Tags'>
      <LoadedQuery handleError={true} query={query}>
        {data && (
          <>
            <Search value={search} setValue={setSearch} />

            <div className='flex flex-wrap gap-2'>
              {selectedTags.map((tag, idx) => (
                <div
                  key={idx}
                  className='select-none cursor-pointer flex items-center justify-center min-w-[50px] w-fit bg-gray border-[0.5px] border-black border-opacity-80 rounded-4xl'
                  onClick={() =>
                    setSelectedTags(selectedTags.toSpliced(idx, 1))
                  }
                >
                  <p className='text-sm text-black text-opacity-60'>{tag}</p>
                </div>
              ))}
            </div>
          </>
        )}
      </LoadedQuery>
    </Accordion>
  );
}
