import { ReactNode } from 'react';
import clsx from 'clsx';

interface MenuItemProps {
  children: ReactNode;
  onClick?: () => void;
}

export default function MenuItem({ children, onClick }: MenuItemProps) {
  return (
    <div
      className={clsx(
        onClick ? 'select-none cursor-pointer hover:bg-gray' : '',
        'flex items-center gap-2 px-2 py-2',
      )}
      onClick={onClick}
    >
      {children}
    </div>
  );
}
