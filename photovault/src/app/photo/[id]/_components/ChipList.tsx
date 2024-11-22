import { ReactNode } from 'react';

interface ChipListProps {
  name: string;
  children: ReactNode;
}

export default function ChipList({ name, children }: ChipListProps) {
  return (
    <div className='flex flex-col gap-2'>
      <p className='text-2xl font-semibold'>{name}</p>
      <div className='flex flex-wrap gap-2'>{children}</div>
    </div>
  );
}
