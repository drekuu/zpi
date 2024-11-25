'use client';

import { ReactNode, useEffect, useState } from 'react';
import { UseQueryResult } from '@tanstack/react-query';
import Loading from './components/Loading';
import Button from '@/components/Form/Button';

interface LoadedQueriesProps {
  children: ReactNode;
  queries: Array<UseQueryResult>;
  onlyFirstLoad?: boolean;
  handleError?: boolean;
}

export default function LoadedQueries({
  children,
  queries,
  onlyFirstLoad = true,
  handleError = false,
}: LoadedQueriesProps) {
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (queries.every((query) => !query.isPending)) {
      setLoaded(true);
    } else if (!onlyFirstLoad) {
      setLoaded(false);
    }
  }, [onlyFirstLoad, queries]);

  useEffect(() => {
    if (queries.some((query) => query.isError)) {
      setError(true);
    } else if (!onlyFirstLoad) {
      setError(false);
    }
  }, [onlyFirstLoad, queries]);

  return (
    <>
      {handleError && error && (
        <div className='flex flex-col gap-2 items-center justify-center'>
          <p>Failed to load data</p>
          <Button onClick={() => queries.forEach((query) => query.refetch())}>
            Try again
          </Button>
        </div>
      )}
      {loaded ? children : <Loading />}
    </>
  );
}
