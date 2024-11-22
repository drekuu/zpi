import { ReactNode } from 'react';

interface ChipProps {
  onClick?: () => void;
  children: ReactNode;
}

export default function Chip({ onClick, children }: ChipProps) {
  return (
    <div
      className='px-2 select-none cursor-pointer flex items-center justify-center min-w-[50px] w-fit bg-gray border-[0.5px] border-black border-opacity-80 rounded-4xl'
      onClick={onClick}
    >
      {children}
    </div>
  );
}
