import { ReactNode } from 'react';
import { UseQueryResult } from '@tanstack/react-query';
import Button from '@/components/Form/Button';
import Loading from './components/Loading';
import { useTranslations } from 'next-intl';

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
  const t = useTranslations('LoadedQuery');

  return (
    <>
      {handleError && query.isError && (
        <div className='flex flex-col gap-2 items-center justify-center'>
          <p>{t('load-failed')}</p>
          <Button onClick={() => query.refetch()}>{t('try-again')}</Button>
        </div>
      )}
      {!query.isPending ? children : <Loading />}
    </>
  );
}
