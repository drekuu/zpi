'use client';

import Search, { SearchProps } from './Search';
import { useRef, useState } from 'react';
import { useOnClickOutside } from 'usehooks-ts';

type SearchResult = {
  id: number;
  name: string;
  onClick(): void;
};

interface SearchWithResultProps extends SearchProps {
  results: Array<SearchResult>;
}

export default function SearchWithResult(props: SearchWithResultProps) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useOnClickOutside(ref, () => setOpen(false));

  return (
    <div ref={ref} className='flex flex-col gap-2'>
      <Search onClick={() => setOpen(true)} {...props} />

      {open && (
        <div className='flex flex-col gap-2 bg-gray rounded-2xl px-3 py-2'>
          {props.results.map((result) => (
            <div
              className='cursor-pointer'
              key={result.id}
              onClick={result.onClick}
            >
              {result.name}
            </div>
          ))}
          {props.results.length === 0 && <p>No results</p>}
        </div>
      )}
    </div>
  );
}
