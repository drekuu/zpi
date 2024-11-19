import { ReactNode } from 'react';
import { UseQueryResult } from '@tanstack/react-query';
import Button from '@/components/Form/Button';
import Loading from './components/Loading';

interface LoadedQueryProps {
  children: ReactNode;
  query: UseQueryResult;
  handleError?: boolean;
}

export default function LoadedQuery({
  children,
  query,
  handleError = false,
}: LoadedQueryProps) {
  return (
    <>
      {handleError && query.isError && (
        <div className='flex flex-col gap-2 items-center justify-center'>
          <p>Failed to load data</p>
          <Button onClick={() => query.refetch()}>Try again</Button>
        </div>
      )}
      {!query.isPending ? children : <Loading />}
    </>
  );
}
