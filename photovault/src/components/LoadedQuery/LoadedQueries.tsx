'use client';

import { ReactNode, useEffect, useState } from 'react';
import { UseQueryResult } from '@tanstack/react-query';
import Loading from './components/Loading';

interface LoadedQueriesProps {
  children: ReactNode;
  queries: Array<UseQueryResult>;
  onlyFirstLoad?: boolean;
}

export default function LoadedQueries({
  children,
  queries,
  onlyFirstLoad = true,
}: LoadedQueriesProps) {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    if (queries.every((query) => !query.isPending)) {
      setLoaded(true);
    } else if (!onlyFirstLoad) {
      setLoaded(false);
    }
  }, [onlyFirstLoad, queries]);

  return <>{loaded ? children : <Loading />}</>;
}
