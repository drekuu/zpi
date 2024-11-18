'use client';

import Accordion from '@/components/Accordion/Accordion';
import { useMemo, useState } from 'react';
import { useAllTags } from '@/services/query/tag';
import LoadedQuery from '@/components/LoadedQuery/LoadedQuery';
import SearchWithResult from '@/components/Search/SearchWithResult';

interface TagsProps {
  selectedTags: Array<string>;
  setSelectedTags(value: Array<string>): void;
}

export default function Tags({ selectedTags, setSelectedTags }: TagsProps) {
  const query = useAllTags();
  const tags = query.data;
  const [search, setSearch] = useState('');
  const filteredTags = useMemo(
    () =>
      tags
        ?.map((tag) => ({
          id: tag.id,
          name: tag.name,
          onClick: () => {
            setSelectedTags([...selectedTags, tag.name]);
          },
        }))
        .filter(
          (tag) =>
            !selectedTags.includes(tag.name) &&
            (!search || tag.name.includes(search.toLowerCase())),
        ),
    [selectedTags, search, setSelectedTags, tags],
  );

  return (
    <Accordion childrenClassName='gap-5' name='Tags'>
      <LoadedQuery handleError={true} query={query}>
        {tags && filteredTags && (
          <>
            <SearchWithResult
              results={filteredTags}
              value={search}
              setValue={setSearch}
            />

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
