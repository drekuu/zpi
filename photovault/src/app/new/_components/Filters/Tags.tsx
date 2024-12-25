'use client';

import Accordion from '@/components/Accordion/Accordion';
import { useMemo, useState } from 'react';
import { useTags } from '@/services/query/tag';
import LoadedQuery from '@/components/LoadedQuery/LoadedQuery';
import SearchWithResult from '@/components/Search/SearchWithResult';
import { useTranslations } from 'next-intl';
import { getLocale } from '@/services/localeClient';
import Chip from '@/components/Chip/Chip';

interface TagsProps {
  selectedTags: Array<string>;
  setSelectedTags(value: Array<string>): void;
}

export default function Tags({ selectedTags, setSelectedTags }: TagsProps) {
  const locale = getLocale();
  const t = useTranslations('NewPage.Filters');
  const tagsT = useTranslations('Tags');

  const query = useTags();
  const tags = query.data;

  const [search, setSearch] = useState('');
  const filteredTags = useMemo(
    () =>
      tags
        ?.map((tag) => ({
          ...tag,
          displayName: locale === 'en' ? tag.name : tagsT(tag.name as any),
          onClick: () => {
            setSelectedTags([...selectedTags, tag.name]);
          },
        }))
        ?.filter(
          (tag) =>
            !selectedTags.includes(tag.name) &&
            (!search || tag.displayName.includes(search.toLowerCase())),
        ),
    [locale, selectedTags, search, setSelectedTags, tags, tagsT],
  );

  return (
    <Accordion childrenClassName='gap-5' name={t('tags')}>
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
                <Chip
                  key={idx}
                  onClick={() =>
                    setSelectedTags(selectedTags.toSpliced(idx, 1))
                  }
                >
                  <p className='text-sm text-black text-opacity-60'>
                    {locale === 'en' ? tag : tagsT(tag as any)}
                  </p>
                </Chip>
              ))}
            </div>
          </>
        )}
      </LoadedQuery>
    </Accordion>
  );
}
