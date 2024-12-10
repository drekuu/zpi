'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { useEffect, ReactNode, useState, useMemo, useRef } from 'react';
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
            refetchOnWindowFocus: false,
          },
        },
      }),
  );
  const setLoggedIn = useUserStore((store) => store.setLoggedIn);

  useEffect(() => {
    updateSession().then((success) => setLoggedIn(success));
  }, [setLoggedIn]);

  /**
   * Fixes following bug:
   * 1. Open a modal
   * 2. Navigate to a page from the modal (ex. user profile from photo modal)
   * 3. Navigate back in the browser
   */
  const modalPathnames = useMemo(() => ['/photo'], []);
  const previousPathnameRef = useRef(window.location.pathname);

  useEffect(() => {
    // On browser back
    const handlePopState = () => {
      const currentPathname = window.location.pathname;
      const previousPathname = previousPathnameRef.current;

      const matchedModalPathname = modalPathnames.find((modalPathname) =>
        currentPathname.includes(modalPathname),
      );

      if (
        matchedModalPathname &&
        !previousPathname.includes(matchedModalPathname)
      ) {
        window.location.reload();
      }

      previousPathnameRef.current = currentPathname;
    };

    window.addEventListener('popstate', handlePopState);

    return () => {
      window.removeEventListener('popstate', handlePopState);
    };
  }, [modalPathnames]);

  return (
    <QueryClientProvider client={queryClient}>
      {children}
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}
