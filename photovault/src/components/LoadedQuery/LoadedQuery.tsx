import { ReactNode } from 'react';
import { UseQueryResult } from '@tanstack/react-query';
import Button from '@/components/Form/Button';
import LoadingSpinner from '../LoadingSpinner/LoadingSpinner';
import { useTranslations } from 'next-intl';
import { UseTRPCQueryResult } from '@trpc/react-query/shared';

interface LoadedQueryProps {
  children: ReactNode;
  query: UseQueryResult | UseTRPCQueryResult<any, any>;
  handleError?: boolean;
}

export default function LoadedQuery({
  children,
  query,
  handleError = false,
}: LoadedQueryProps) {
  const t = useTranslations('LoadedQuery');

  return (
    <>
      {handleError && query.isError && (
        <div
          data-testid='loadedquery-error'
          className='flex flex-col gap-2 items-center justify-center'
        >
          <p>{t('load-failed')}</p>
          <Button onClick={() => query.refetch()}>{t('try-again')}</Button>
        </div>
      )}
      {!query.isPending ? children : <LoadingSpinner />}
    </>
  );
}
