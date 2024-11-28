'use client';

import RightArrowIcon from '@/../public/icons/right-arrow.svg';
import { usePathname } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { Fragment, useMemo } from 'react';
import Link from 'next/link';
import clsx from 'clsx';

type Breadcrumb = {
  id: any;
  displayName: string;
  href: string;
};

interface BreadcrumbsProps {
  /**
   * Names of parts excluding the first one
   * @example
   * // path /new/nature/5
   * additionalNames = [
   *   'Nature' // provide name to the 'nature' part,
   *   'Example' // provide name to the '5' part
   * ];
   */
  additionalNames?: Array<string>;
}

/**
 * Component that divides the current path into parts and renders links to them
 * @note An additional `/home` crumb is added by default, however it is not added to the href's of other crumbs \
 * When the `additionalNames` parameter is omitted, the component only renders the first part
 * @example
 * // href /new/nature/5
 * additionalNames = [
 *   'Nature'
 * ];
 * // resulting breadcrumbs: Home (/home), New (/new), Nature (/new/nature)
 */
export default function Breadcrumbs({ additionalNames }: BreadcrumbsProps) {
  const t = useTranslations('Pages');
  const pathname = usePathname();

  const breadcrumbs = useMemo(() => {
    // Use only the first part when `additionalNames` is not provided
    const parts = pathname
      .split('/')
      .slice(1)
      .splice(0, 1 + (additionalNames?.length ?? 0));

    // Additional home part, always included
    const result: Array<Breadcrumb> = [
      { id: 'home', displayName: t('home'), href: '/home' },
    ];

    let accumulatedHref = '';
    parts.forEach((part, idx) => {
      accumulatedHref += '/' + part;

      if (idx === 0) {
        result.push({
          id: part,
          displayName: t(part as any),
          href: accumulatedHref,
        });
      } else {
        result.push({
          id: part,
          displayName: additionalNames?.[idx - 1] ?? '',
          href: accumulatedHref,
        });
      }
    });

    return result;
  }, [t, additionalNames, pathname]);

  return (
    <div className='gap-1 my-8 flex items-center capitalize'>
      {breadcrumbs.map((breadcrumb, idx) => (
        <Fragment key={idx}>
          <Link
            className={clsx(idx === 0 ? 'text-black text-opacity-60' : '')}
            href={breadcrumb.href}
          >
            {breadcrumb.displayName}
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
