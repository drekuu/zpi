'use client';

import RightArrowIcon from '@/../public/icons/right-arrow.svg';
import { ReactNode, useState } from 'react';
import clsx from 'clsx';

interface AccordionProps {
  name: string;
  children: ReactNode;
  childrenClassName?: string;
}

export default function Accordion({
  name,
  children,
  childrenClassName,
}: AccordionProps) {
  const [open, setOpen] = useState(false);

  return (
    <div className='flex flex-col gap-6'>
      <div
        className='flex items-center gap-2 justify-between cursor-pointer'
        onClick={() => setOpen(!open)}
      >
        <p className='text-xl font-bold'>{name}</p>
        <RightArrowIcon
          draggable={false}
          style={{ rotate: open ? '-90deg' : '90deg' }}
        />
      </div>

      <div
        className={clsx(
          childrenClassName,
          open ? 'flex' : 'hidden',
          'overflow-hidden flex flex-col',
        )}
        style={{ height: open ? 'auto' : '0' }}
      >
        {children}
      </div>
    </div>
  );
}
