import { ReactNode } from 'react';
import clsx from 'clsx';

interface SectionProps {
  title: string;
  className?: string;
  children: ReactNode;
}

export default function Section({ title, className, children }: SectionProps) {
  return (
    <div
      className={clsx(
        className,
        'px-6 py-5 flex flex-col gap-6 rounded-2xxl border border-black border-opacity-10',
      )}
    >
      <p className='font-bold text-2xl'>{title}</p>
      <div>{children}</div>
    </div>
  );
}
