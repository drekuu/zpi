import React from 'react';
import clsx from 'clsx';

interface ButtonProps {
  children: React.ReactNode;
  className?: string;
  type?: 'button' | 'submit' | 'reset';
  onClick?: () => void;
}

const Button = ({
  children,
  className,
  type = 'button',
  onClick,
}: ButtonProps) => {
  return (
    <button
      type={type}
      className={clsx(
        className,
        'overflow-hidden gap-3 self-stretch px-4 py-3 mt-3.5 w-full font-medium text-white whitespace-nowrap bg-zinc-800 rounded-4xl',
      )}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Button;
