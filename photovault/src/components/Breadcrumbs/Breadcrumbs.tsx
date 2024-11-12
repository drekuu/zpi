'use client';

import RightArrowIcon from '@/../public/icons/right-arrow.svg';
import { usePathname } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { Fragment, useMemo } from 'react';
import Link from 'next/link';
import clsx from 'clsx';

type Breadcrumb = {
  name: any;
  href: string;
};

export default function Breadcrumbs() {
  const t = useTranslations('Pages');
  const pathname = usePathname();
  const breadcrumbs = useMemo(() => {
    const parts = pathname.split('/').slice(1);
    let accumulatedHref = '/';
    const result: Array<Breadcrumb> = [{ name: 'home', href: '/home' }];

    parts.forEach((part) => {
      accumulatedHref += part;
      result.push({ name: part, href: accumulatedHref });
    });

    return result;
  }, [pathname]);

  return (
    <div className='gap-1 my-8 flex items-center capitalize'>
      {breadcrumbs.map((breadcrumb, idx) => (
        <Fragment key={idx}>
          <Link
            className={clsx(idx === 0 ? 'text-black text-opacity-60' : '')}
            href={breadcrumb.href}
          >
            {t(breadcrumb.name)}
          </Link>
          {idx !== breadcrumbs.length - 1 && (
            <RightArrowIcon
              className='pointer-events-none select-none'
              draggable={false}
            />
          )}
        </Fragment>
      ))}
    </div>
  );
}
