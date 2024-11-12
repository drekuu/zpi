import React from 'react';

interface ButtonProps {
  children: React.ReactNode;
  type?: 'button' | 'submit' | 'reset';
}

const Button = ({ children, type = 'button' }: ButtonProps) => {
  return (
    <button
      type={type}
      className="overflow-hidden gap-3 self-stretch px-4 py-3 mt-3.5 w-full font-medium text-white whitespace-nowrap bg-zinc-800 rounded-[62px]"
    >
      {children}
    </button>
  );
};

export default Button;