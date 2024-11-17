'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { useState, useEffect, ReactNode } from 'react';
import { updateSession } from '@/app/api/auth/session';
import { useUserStore } from '@/stores/user';

export default function Providers({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            retry: false,
            retryOnMount: false,
          },
        },
      }),
  );
  const setLoggedIn = useUserStore((store) => store.setLoggedIn);

  useEffect(() => {
    updateSession().then((success) => setLoggedIn(success));
  }, [setLoggedIn]);

  return (
    <QueryClientProvider client={queryClient}>
      {children}
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}
